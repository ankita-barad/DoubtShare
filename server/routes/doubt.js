import express from "express";
import { supabase } from "../db/index.js";
import { auth } from "../middlewares/authentication.js";
import { ROLES } from "../enums/roles.js";

const doubtRouter = express.Router();

doubtRouter.post("/", auth, async (req, res, next) => {
  try {
    const { content, subject_id } = req.body;

    // Insert doubt into Supabase doubts table
    const { data, error } = await supabase
      .from("doubt")
      .upsert({
        content,
        subject_id,
        created_by: req.user.id,
        resolved: false,
      })
      .select(
        "id, content, resolved, subject(name), created_by:created_by(name), tutored_by:tutored_by(name)"
      )
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const { data: eligibleTutors } = await supabase
      .from("user")
      .select(
        "id, name, role, language, grade, online, email, socket_id, subject(name)"
      )
      .eq("role", ROLES.TUTOR)
      .eq("online", true)
      .eq("language", req.user.language)
      .eq("subject.id", subject_id);

    for (const tutor of eligibleTutors) {
      console.log("notifying tutor", tutor);

      req.app.io.in(`user:${tutor.id}`).emit("new_doubt", data);
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

    const { data, error } = await supabase
      .from("doubt")
      .select(
        "id, content, resolved, subject(name), created_by:created_by(name), tutored_by:tutored_by(name)"
      )
      .eq("resolved", resolved === "true")
      .eq(
        req.user.role === ROLES.STUDENT ? "created_by" : "tutored_by",
        req.user.id
      );

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
      .select(
        "id, content, resolved, subject(name), created_by:created_by(id, name), tutored_by:tutored_by(id, name),chat(id,message,user:user_id(id, name))"
      )
      .eq("id", doubtId)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data) {
      return res.status(404).json({ error: "Doubt not found" });
    }

    const userSocket = await req.app.io.sockets.sockets.get(req.user.socket_id);

    if (userSocket) {
      userSocket.join(`doubt:${doubtId}`);
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

doubtRouter.post("/:doubtId/chat", auth, async (req, res, next) => {
  try {
    const doubtId = req.params.doubtId;
    const { userId, text } = req.body;

    const { data, error } = await supabase
      .from("chat")
      .insert({
        message: text,
        user_id: userId,
        doubt_id: doubtId,
      })
      .select("id, message, user:user_id(id, name), doubt_id")
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data) {
      return res.status(404).json({ error: "Doubt not found" });
    }
    req.app.io.in(`doubt:${data.id}`).emit("new_message", data);

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

doubtRouter.put("/:doubtId/accept", auth, async (req, res, next) => {
  try {
    const doubtId = req.params.doubtId;

    const { data, error } = await supabase
      .from("doubt")
      .update({
        tutored_by: req.user.id,
        resolved: false,
      })
      .eq("id", doubtId)
      .select("id, created_by, tutored_by")
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

doubtRouter.put("/:doubtId/resolve", auth, async (req, res, next) => {
  try {
    const doubtId = req.params.doubtId;

    const { data, error } = await supabase
      .from("doubt")
      .update({
        resolved: true,
      })
      .eq("id", doubtId);

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
