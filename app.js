import express from "express";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import Lab5 from "./lab_5.js";
import Hello from "./hello.js";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import "dotenv/config";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || process.env.MONGODB;
mongoose.connect(CONNECTION_STRING);

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
