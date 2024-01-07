import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.js";
import subjectRouter from "./routes/subject.js";
import doubtRouter from "./routes/doubt.js";
import { setOnline } from "./events/user.events.js";
import { saveMessage } from "./events/doubt.events.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  socket.on("online", async (userId) => {
    await setOnline(userId, true, socket.id);
    socket.data = {
      userId,
    };
    // join a room to be self notified
    socket.join(`user:${userId}`);
  });

  socket.on("offline", async (userId) => {
    await setOnline(userId, false);
    socket.leave(`user:${userId}`);
  });

  socket.on("new_message", async ({ message, userId, doubtId }) => {
    console.log("new message recieved", message, userId, doubtId);

    const savedMessage = await saveMessage({
      message,
      userId,
      doubtId,
    });

    console.log("SAVED MESSAGE", savedMessage);

    io.in(`doubt:${doubtId}`).emit("message", savedMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.io = io;

app.use("/user", userRouter);
app.use("/subject", subjectRouter);
app.use("/doubt", doubtRouter);

// app.get("/playground", auth, async (req, res) => {
//   const sockets = await io.sockets.sockets.entries();

//   for (const [key, value] of sockets) {
//     console.log(key);
//     console.log(value.data);
//     console.log(value.adapter.rooms);
//   }

//   io.in("doubt:36").emit("message", {
//     id: 123123,
//     message: "hey there",
//     user: {
//       id: 123123123,
//       name: "Admin",
//     },
//   });

//   res.json("x");
// });

server.listen(process.env.PORT ?? 3300, async () => {
  console.log("server started on port 3300");
});
