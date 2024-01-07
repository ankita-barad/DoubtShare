import { supabase } from "../db/index.js";

export const saveMessage = async ({ message, userId, doubtId }) => {
  try {
    const { data, error } = await supabase
      .from("chat")
      .insert({ message, user_id: userId, doubt_id: doubtId })
      .select("id,message,user:user_id(id, name)")
      .single();

    return data;
  } catch (error) {
    console.log(error);
  }
};
