import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import ShoppingList from "../../model/shoppingList.js";
import app from "../../../../server/app.js";
import { alcachofa } from "../../fixtures/fixturesDto.js";
import { NewIngredientBodyResponse } from "../../controller/types.js";
import { testToken } from "../../fixtures/authFixtures.js";

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

describe("Given the POST /shopping-list endpoint", () => {
  describe("When it receives a request with Alcachoda new ingredient data", () => {
    test("Then it should respond with a 201 status code and Alcachofa ingredient data", async () => {
      const expectedStatus = 201;

      const response = await request(app)
        .post("/shopping-list")
        .send({ name: alcachofa.name })
        .set("Authorization", `Bearer ${testToken}`);

      const body = (await response).body as NewIngredientBodyResponse;

      expect(response.status).toBe(expectedStatus);
      expect(body.ingredient).toEqual(
        expect.objectContaining({
          name: "Alcachofas",
          category: "otros",
          isPurchased: false,
        }),
      );
    });
  });
});
