import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const fakeEmployee = {
      name: faker.person.fullName(),
      birthday: faker.date
        .birthdate({ min: 22, max: 68, mode: "age" })
        .toISOString()
        .split("T")[0],
      salary: faker.number.int({ min: 60000, max: 300000, multipleOf: 100 }),
    };

    await createEmployee(fakeEmployee);
  }
  // TODO
}
