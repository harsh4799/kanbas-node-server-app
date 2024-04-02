import Database from "../Database/index.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const coursesData = Database.courses;
    res.send(coursesData);
  });

  app.post("/api/courses", (req, res) => {
    const newCourse = {
      ...req.body,
      _id: new Date().getTime().toString(),
    };
    Database.courses.push(newCourse);
    res.send(newCourse);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((course) => course._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const updatedCourse = req.body;
    Database.courses = Database.courses.map((course) =>
      course._id === id ? { ...course, ...updatedCourse } : course
    );
    res.sendStatus(204);
  });

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const foundCourse = Database.courses.find((course) => course._id === id);

    if (!foundCourse) {
      res.status(404).send("Cannot find Course!");
      return;
    }
    res.send(foundCourse);
  });
}
