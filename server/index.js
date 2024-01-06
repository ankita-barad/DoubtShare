import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import subjectRouter from "./routes/subject.js";
import doubtRouter from "./routes/doubt.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/subject", subjectRouter);
app.use("/doubt", doubtRouter);

app.listen(process.env.PORT ?? 3300, async () => {
  console.log("server started on port 3300");
});
