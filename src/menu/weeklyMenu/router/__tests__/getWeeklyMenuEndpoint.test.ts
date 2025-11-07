import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import app from "../../../../server/app.js";

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

      const response = await request(app).get("/weekly-menu");

      expect(response.status).toBe(expectedStatus);
    });
  });
});
