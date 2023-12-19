import { fastify } from "../server.js";

export async function getUsers(req, res) {
  try {
    const query =
      "SELECT firstname, lastname, image_link, email, age, role FROM public.user";
    const response = await fastify.pg.query(query);
    res.code(200).send(response.rows);
  } catch (error) {
    res.code(500).send("Erreur lors de la récupération des users");
  }
}
