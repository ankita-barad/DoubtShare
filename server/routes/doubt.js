import express from "express";
import { supabase } from "../db/index.js";
import { auth } from "../middlewares/authentication.js";

const doubtRouter = express.Router();

doubtRouter.post("/", auth, async (req, res, next) => {
  try {
    const { content, subject_id } = req.body;

    // Insert doubt into Supabase doubts table
    const { data, error } = await supabase.from("doubt").upsert([
      {
        content,
        subject_id,
        created_by: req.user.id,
        resolved: false,
      },
    ]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ message: "Doubt created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

doubtRouter.get("/", auth, async (req, res, next) => {
  try {
    const { resolved } = req.query;

    console.log(req.query);
    const { data, error } = await supabase
      .from("doubt")
      .select(
        "id, content, resolved, subject(name), created_by:created_by(name), tutored_by:tutored_by(name)"
      )
      .eq("resolved", resolved === "true");

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

doubtRouter.get("/:doubtId", auth, async (req, res, next) => {
  try {
    const doubtId = req.params.doubtId;

    // Retrieve doubt from Supabase by ID
    const { data, error } = await supabase
      .from("doubt")
      .select("*")
      .eq("id", doubtId)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data) {
      return res.status(404).json({ error: "Doubt not found" });
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default doubtRouter;
