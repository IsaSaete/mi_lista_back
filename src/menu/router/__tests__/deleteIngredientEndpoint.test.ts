import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import ShoppingList from "../../model/shoppingList.js";
import { aceiteOliva } from "../../fixtures/fixtures.js";
import app from "../../../server/app.js";
import { IngredientBody } from "../../controller/types.js";

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
  await ShoppingList.deleteMany();
});

describe("Given the DELETE /ingredients/:ingredientId endpoint", () => {
  describe("When it receives a request with Aceite's ingredint id", () => {
    test("then it should respond with a 200 status code and Aceite ingredient data", async () => {
      const expectedStatus = 200;

      await ShoppingList.create({ ingredients: [aceiteOliva] });

      const response = await request(app).delete(
        `/shopping-list/ingredients/${aceiteOliva._id}`,
      );

      const body = response.body as IngredientBody;

      expect(response.status).toBe(expectedStatus);
      expect(body.ingredient).toEqual({
        ...aceiteOliva,
        createdAt: aceiteOliva.createdAt.toISOString(),
      });
    });
  });
});
