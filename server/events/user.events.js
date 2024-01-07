import { supabase } from "../db/index.js";

export const setOnline = async (userId, online, socketId) => {
  try {
    console.log("setting user id", userId, "online", online);

    socketId = online ? socketId : null;

    const { error } = await supabase
      .from("user")
      .update({ online, socket_id: socketId })
      .eq("id", userId);
  } catch (error) {
    console.log(error);
  }
};
