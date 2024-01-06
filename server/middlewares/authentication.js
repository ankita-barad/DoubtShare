import jwt from "jsonwebtoken";
import { supabase } from "../db/index.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const { id } = decodedToken;

    const { data: user } = await supabase
      .from("user")
      .select("id, email, role, name, grade, language")
      .eq("id", id)
      .single();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
