import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignmentsData = db.assignments.filter(
      (assignment) => assignment.course === cid
    );
    res.status(200).send(assignmentsData);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignmentData = {
      ...req.body,
      _id: new Date().getTime().toString(),
      course: cid,
    };
    db.assignments.push(newAssignmentData);
    res.status(201).send(newAssignmentData);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== aid
    );
    res.status(200).send("Assignment deleted successfully!");
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (assignment) => assignment._id === aid
    );
    if (assignmentIndex !== -1) {
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body,
      };
      res.status(200).send(db.assignments[assignmentIndex]);
    } else {
      res.status(404).send("Assignment not found!");
    }
  });
}
