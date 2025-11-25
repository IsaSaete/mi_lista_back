import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import app from "../../../server/app.js";
import { isaNewUser } from "../../fixtures/fixturesAuth.js";
import { AuthResponseBody } from "../../controller/types.js";
import AuthUser from "../../model/User.js";
import { ResponsBodyError } from "../../userTypes.js";

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

beforeEach(async () => {
  await AuthUser.deleteMany({}); // ← Limpiar antes de cada test
});

describe("Given the POST/auth/register endpoint", () => {
  describe("When it receives a request wuith 'Isa' data new user", () => {
    test("Then it should respond with a 201 status code and Isa data registered", async () => {
      const expectedName = "Isabel";
      const expectedStatusCode = 201;

      const response = await request(app)
        .post(`/auth/register`)
        .send(isaNewUser);

      const body = (await response.body) as AuthResponseBody;

      expect(response.status).toBe(expectedStatusCode);
      expect(body.user.name).toBe(expectedName);
    });
  });

  describe("When it receives a request with 'Isa' data and this user already exists", () => {
    test("Then it should respond with a 409 status code and 'El usuario ya existe' message", async () => {
      const expectedStatus = 409;
      const expectedErrorMessage = "El usuario ya existe";

      await AuthUser.create(isaNewUser);

      const response = await request(app)
        .post(`/auth/register`)
        .send(isaNewUser);

      const body = (await response).body as ResponsBodyError;

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
