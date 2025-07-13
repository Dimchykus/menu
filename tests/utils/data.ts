import { randomBytes } from "crypto";

export const generateRandomString = () => {
  return randomBytes(4).toString("hex");
};

export const generateRandomEmail = () => {
  return `${generateRandomString()}@example.com`;
};

export const generateRandomName = () => {
  return `Test User ${generateRandomString()}`;
};

export const generateRandomPassword = () => {
  const randomString = generateRandomString();
  return `TestPass${randomString}123!`;
};
