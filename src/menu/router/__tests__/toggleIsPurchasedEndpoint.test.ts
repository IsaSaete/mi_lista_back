import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import ShoppingList from "../../model/shoppingList.js";
import app from "../../../server/app.js";
import { IngredientBody } from "../../controller/types.js";
import { tomate } from "../../fixtures/fixtures.js";

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

describe("Given the PATCH /ingredients/:ingredientId endpoint", () => {
  describe("When it receives a request with Tomato's ingredient id", () => {
    test("Then it should respond with a 200nstatus code and Tomato new data", async () => {
      const expectedStatus = 200;

      await ShoppingList.create({ ingredients: [tomate] });

      const response = await request(app).patch(
        `/shopping-list/ingredients/${tomate._id}`,
      );

      const body = response.body as IngredientBody;

      expect(response.status).toBe(expectedStatus);
      expect(body.ingredient.isPurchased).toBe(true);
    });
  });
});
