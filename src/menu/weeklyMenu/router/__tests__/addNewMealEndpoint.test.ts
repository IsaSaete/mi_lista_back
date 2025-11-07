import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import app from "../../../../server/app.js";
import {
  tuesdayLunchRequest,
  tuesdayLunchResponse,
} from "../../fixtures/fixtures.js";
import { NewMealBodyResponse } from "../../controller/types.js";

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

describe("Given the POST /weekly-menu endpoint", () => {
  describe("When it receives a request with tuesday lunch data", () => {
    test("Then it should respond wit a 201 status code ant Tuesday lunch meal", async () => {
      const expectedStatus = 200;

      const response = await request(app)
        .post("/weekly-menu")
        .send(tuesdayLunchRequest);

      const body = (await response.body) as NewMealBodyResponse;

      expect(response.status).toBe(expectedStatus);
      expect(body).toEqual(tuesdayLunchResponse);
    });
  });
});
