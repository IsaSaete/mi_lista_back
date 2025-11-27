import jwt from "jsonwebtoken";

export const testToken = jwt.sign(
  { userId: "test-user-id" },
  process.env.JWT_SECRET!,
  { expiresIn: "1h" },
);
