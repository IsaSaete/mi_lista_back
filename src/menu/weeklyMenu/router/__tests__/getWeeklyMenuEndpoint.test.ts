import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import app from "../../../../server/app.js";
import { testToken } from "../../../shoppingList/fixtures/authFixtures.js";
import WeeklyMenu from "../../model/weeklyMenu.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the GET/weekly-menu endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatus = 200;
      const userId = "test-user-id";

      await WeeklyMenu.create({
        userId,
        weeklyMenu: {
          L: { lunch: {}, dinner: {} },
          M: { lunch: {}, dinner: {} },
          X: { lunch: {}, dinner: {} },
          J: { lunch: {}, dinner: {} },
          V: { lunch: {}, dinner: {} },
          S: { lunch: {}, dinner: {} },
          D: { lunch: {}, dinner: {} },
        },
      });

      const response = await request(app)
        .get("/weekly-menu")
        .set("Authorization", `Bearer ${testToken}`);

      expect(response.status).toBe(expectedStatus);
    });
  });
});
