import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../db/index.js";
import { auth } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.get("/me", auth, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, role, name, grade, language } = req.body;

    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from("user").upsert([
      {
        email,
        password: hashedPassword,
        role,
        name,
        grade,
        language,
        online: false,
      },
    ]);

    console.log(data);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ message: "User registered successfully" });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//login

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query user from Supabase by email
    const { data, error } = await supabase
      .from("user")
      .select("id, email, password")
      .eq("email", email)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.SECRET_KEY
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;
