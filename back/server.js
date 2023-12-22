import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import * as dotenv from "dotenv";
import cors from "@fastify/cors";
import { authenticate } from "./authenticate.js";
import { login, register, logout, getCurrentUser } from "./controllers/auth.js";
import { deleteUserById, editUserById, getUsers } from "./controllers/users.js";
dotenv.config();

export const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyPostgres, {
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/project_test`,
});

fastify.register(cors, {
  // ajouter des options plus tard
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  credentials: true,
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  cookieName: "sessionId",
  secret: "a secret with minimum length of 32 characters",
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
  expires: 1800000,
});

// Auth
fastify.post("/login", login);
fastify.post("/register", register);
fastify.post("/logout", logout);
fastify.get("/me", getCurrentUser);

// Users
fastify.get("/users", { preHandler: authenticate }, getUsers);
fastify.delete(
  "/user/delete/:id",
  { preHandler: authenticate },
  deleteUserById
);
fastify.put("/user/edit/:id", { preHandler: authenticate }, editUserById);

fastify.listen({ port: 4000 }, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server listening on port ${fastify.server.address().port}`);
});
