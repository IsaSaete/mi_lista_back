import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import app from "../../../server/app.js";
import { isaNewUser, isaUserRegistered } from "../../fixtures/fixturesAuth.js";
import AuthUser from "../../model/User.js";

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
  await AuthUser.deleteMany({});
});

describe("Given the POST/auth/login endpoint", () => {
  describe("When it receives a request with Isa's email & password", () => {
    test("Then it should respond with a 200 status code and Isa data registered", async () => {
      const expectedStatusCode = 200;

      await AuthUser.create(isaNewUser);

      const response = await request(app).post(`/auth/login`).send({
        email: isaUserRegistered.email,
        password: isaUserRegistered.password,
      });

      expect(response.status).toBe(expectedStatusCode);
    });
  });

  describe("When it receives a request with Isa's email & password but isn't registered", () => {
    test("Then it should respond with a 401 status code and 'Credenciales inválidas' message", async () => {
      const expectedStatusCode = 401;

      const response = await request(app).post(`/auth/login`).send({
        email: isaUserRegistered.email,
        password: isaUserRegistered.password,
      });

      expect(response.status).toBe(expectedStatusCode);
    });
  });

  describe("When it receives a request with Isa's email and not valid password", () => {
    test("Then it should respond with a 401 status code and 'Credenciales inválidas' message", async () => {
      const expectedStatusCode = 401;

      await AuthUser.create(isaNewUser);

      const response = await request(app).post(`/auth/login`).send({
        email: isaUserRegistered.email,
        password: "invalid",
      });

      expect(response.status).toBe(expectedStatusCode);
    });
  });
});
