import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    if (!token) {
      console.log("no token");

      return res
        .status(401)
        .json({ error: "Unauthorized Access, please create an Account" });
    }
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: "Unauthorized Access, please create an Account" });
      }
      req.user = decoded;
      console.log(decoded);
      next();
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized Access, please create an Account" });
  }
};
export default verifyToken;
