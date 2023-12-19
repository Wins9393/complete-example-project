import argon2 from "argon2";
import { fastify } from "../server.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const query =
      "SELECT firstname, lastname, image_link, email, password, age, role FROM public.user WHERE email=$1";
    const values = [email];

    const response = await fastify.pg.query(query, values);
    console.log("RESPONSE: ", response);

    if (response.rowCount === 0) {
      return res.code(404).send("Email ou mot de passe incorrect !");
    }

    if (await argon2.verify(response.rows[0].password, password)) {
      req.session.authenticated = true;
      req.session.user = {
        firstname: response.rows[0].firstname,
        lastname: response.rows[0].lastname,
        email: response.rows[0].email,
        age: response.rows[0].age,
        role: response.rows[0].role,
      };
      res.code(200).send(req.session);
    } else {
      req.session.authenticated = false;
      res.code(404).send("Email ou mot de passe incorrect !");
    }
  } catch (error) {
    res.code(500).send("Erreur interne");
  }
}

export async function register(req, res) {
  try {
    const { firstname, lastname, image_link, email, password, age, role } =
      req.body;

    const hash_password = await argon2.hash(password);

    const query =
      "INSERT INTO public.user(firstname, lastname, image_link, email, password, age, role) VALUES ($1, $2, $3, $4, $5, $6, $7)";

    const values = [
      firstname,
      lastname,
      image_link,
      email,
      hash_password,
      age,
      role,
    ];

    const result = await fastify.pg.query(query, values);

    if (result.rowCount === parseInt(1)) {
      req.session.authenticated = true;
      req.session.user = {
        firstname,
        lastname,
        email,
        age,
        role,
      };
      res.code(200).send(req.session);
    } else {
      res
        .code(500)
        .send(
          "Une erreur est survenue lors de l'enregistrement de l'utilisateur"
        );
    }
  } catch (error) {
    res.code(500).send({
      error: "Erreur lors de l'enregistrement de l'utilisateur",
      details: error.toString(),
    });
  }
}

export async function logout(req, res) {
  if (req.session.authenticated) {
    req.session.destroy((err) => {
      if (err) {
        res.code(500).send("Erreur interne");
      } else {
        res.code(200).redirect("/");
      }
    });
  } else {
    res.code(401).send("Pas de sessions !");
  }
}

export async function getCurrentUser(req, res) {
  if (req.session.authenticated && req.session.user) {
    res.code(200).send(req.session);
  } else {
    res.code(401).send({ message: "Non authentifié" });
  }
}
