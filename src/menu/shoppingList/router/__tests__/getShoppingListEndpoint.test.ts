import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import ShoppingList from "../../model/shoppingList.js";
import app from "../../../../server/app.js";
import { aceiteOlivaDto, tomateDto } from "../../fixtures/fixturesDto.js";
import { GetShoppingListResponseBody } from "../../types.js";

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

describe("Given the GET /shopping-list endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200", async () => {
      await ShoppingList.create(tomateDto);

      const response = await request(app).get("/shopping-list");

      expect(response.status).toBe(200);
    });

    test("Then it should respons with a total of 2 ingredients: Tomate & Aceite de Oliva Virgen extra", async () => {
      await ShoppingList.create({
        ingredients: [tomateDto, aceiteOlivaDto],
      });

      const expectedIngredientsTotal = 2;

      const response = await request(app).get("/shopping-list");

      const body = response.body as GetShoppingListResponseBody;

      const shoppingListIngredients = body.shoppingList.ingredients;

      expect(shoppingListIngredients.length).toBe(expectedIngredientsTotal);

      expect(shoppingListIngredients).toContainEqual(
        expect.objectContaining({ name: tomateDto.name }),
      );
      expect(shoppingListIngredients).toContainEqual(
        expect.objectContaining({ name: aceiteOlivaDto.name }),
      );
    });
  });
});
