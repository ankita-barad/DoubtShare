import express from "express";
import { supabase } from "../db/index.js";
import { auth } from "../middlewares/authentication.js";

const subjectRouter = express.Router();

subjectRouter.get("/", auth, async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("subject").select("id, name");

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default subjectRouter;
