import express from "express";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";

const app = express();
app.use(cors());
app.use(express.json());

CourseRoutes(app);

app.listen(process.env.PORT || 4000);
