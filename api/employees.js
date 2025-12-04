import express from "express";
const router = express.Router();
export default router;

import {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res, next) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  const body = req.body;

  if (!body) return res.status(400).send("Request body required.");

  const { name, birthday, salary } = body;

  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

/* GET /employees/:id */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employee);
});

/* PUT /employees/:id */
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const body = req.body;

  if (!body) return res.status(400).send("Request body required.");

  const { name, birthday, salary } = body;

  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  const updated = await updateEmployee({
    id,
    name,
    birthday,
    salary,
  });

  res.send(updated);
});

/* DELETE /employees/:id */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  await deleteEmployee(id);
  res.sendStatus(204);
});
