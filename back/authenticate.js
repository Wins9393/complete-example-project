export async function authenticate(req, res) {
  const session = req.session;

  if (!session.user && !session.authenticated) {
    return res.code(401).send("Accès restreint");
  }
}
