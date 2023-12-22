import { fastify } from "../server.js";

export async function getUsers(req, res) {
  try {
    const query =
      "SELECT id, firstname, lastname, image_link, email, age, role FROM public.user";
    const response = await fastify.pg.query(query);
    res.code(200).send(response.rows);
  } catch (error) {
    res.code(500).send({
      error: "Erreur lors de la récupération des users",
      details: error.toString(),
    });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const query = "DELETE FROM public.user WHERE id=$1";
    const values = [id];
    const response = await fastify.pg.query(query, values);
    res.code(200).send(response.rows);
  } catch (error) {
    res.code(500).send({
      error: "Erreur lors de la suppression de l'utilisateur",
      details: error.toString(),
    });
  }
}

export async function editUserById(req, res) {
  const { id } = req.params;
  const { firstname, lastname, image_link, email, age, role } = req.body;

  try {
    const query =
      "UPDATE public.user SET firstname=$1, lastname=$2, image_link=$3, age=$4, role=$5 WHERE id=$6";
    const values = [firstname, lastname, image_link, age, role, id];
    const response = await fastify.pg.query(query, values);
    res.code(200).send(response.rows);
  } catch (error) {
    res.code(500).send({
      error: "Erreur lors de la modification de l'utilisateur",
      details: error.toString(),
    });
  }
}
