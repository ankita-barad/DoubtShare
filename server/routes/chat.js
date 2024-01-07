import express from "express";
import { supabase } from "../db/index.js";
import { auth } from "../middlewares/authentication.js";

const chattRouter = express.Router();

chattRouter.get("/", auth, async (req, res, next) => {
    try {
      const { data, error } = await supabase.from("chat").select("id, message,user:user_id(name)");
  
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

export default doubtRouter;
