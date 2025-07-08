import { expect, test, vi, beforeEach } from "vitest";
import { createRestaurant, updateRestaurant } from "./menu";
import type { NewRestaurant } from "../schema/menu";

// Mock external dependencies
vi.mock("@/lib/actions/auth", () => ({
  getUser: vi.fn(),
}));

// Mock the entire db module
vi.mock("..", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn(),
        })),
      })),
    })),
  },
}));

import { getUser } from "@/lib/actions/auth";
import { db } from "..";

const mockGetUser = vi.mocked(getUser);

beforeEach(() => {
  vi.clearAllMocks();
});

test("createRestaurant successfully creates a restaurant", async () => {
  const mockUser = { userId: 1 };
  const mockRestaurantData: NewRestaurant = {
    name: "Test Restaurant",
    description: "A test restaurant",
    address: "123 Test St",
    phone: "555-1234",
  };

  const mockCreatedRestaurant = {
    id: 1,
    userId: 1,
    name: "Test Restaurant",
    description: "A test restaurant",
    address: "123 Test St",
    phone: "555-1234",
    createdAt: new Date(),
  };

  mockGetUser.mockResolvedValue(mockUser);

  const mockReturning = vi.fn().mockResolvedValue([mockCreatedRestaurant]);
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockInsert = vi.fn().mockReturnValue({ values: mockValues });

  db.insert = mockInsert;

  const result = await createRestaurant(mockRestaurantData);

  expect(mockGetUser).toHaveBeenCalledOnce();
  expect(mockInsert).toHaveBeenCalledWith(expect.anything());
  expect(mockValues).toHaveBeenCalledWith({
    ...mockRestaurantData,
    userId: mockUser.userId,
  });
  expect(mockReturning).toHaveBeenCalledOnce();
  expect(result).toEqual(mockCreatedRestaurant);
});

test("createRestaurant fails create a restaurant", async () => {
  const mockUser = { userId: 1 };
  const mockRestaurantData: NewRestaurant = {
    name: "Test Restaurant",
    description: "A test restaurant",
    address: "123 Test St",
    phone: "555-1234",
  };

  const mockCreatedRestaurant = {
    id: 1,
    userId: 1,
    name: "Test Restaurant",
    description: "A test restaurant",
    address: "123 Test St",
    phone: "555-1234",
    createdAt: new Date(),
  };

  mockGetUser.mockResolvedValue(mockUser);

  const mockReturning = vi.fn().mockResolvedValue([mockCreatedRestaurant]);
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockInsert = vi.fn().mockRejectedValue(new Error("Test error"));

  db.insert = mockInsert;

  const result = await createRestaurant(mockRestaurantData);

  expect(result).toBeNull();
});

test("updateRestaurant successfully updates a restaurant", async () => {
  const mockUser = { userId: 1 };
  const restaurantId = 1;
  const mockRestaurantData: NewRestaurant = {
    name: "Updated Restaurant",
    description: "An updated restaurant",
    address: "456 Updated St",
    phone: "555-5678",
  };

  const mockUpdatedRestaurant = {
    id: restaurantId,
    userId: 1,
    name: "Updated Restaurant",
    description: "An updated restaurant",
    address: "456 Updated St",
    phone: "555-5678",
    createdAt: new Date(),
  };

  mockGetUser.mockResolvedValue(mockUser);

  const mockReturning = vi.fn().mockResolvedValue([mockUpdatedRestaurant]);
  const mockWhere = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockSet = vi.fn().mockReturnValue({ where: mockWhere });
  const mockUpdate = vi.fn().mockReturnValue({ set: mockSet });

  db.update = mockUpdate;

  const result = await updateRestaurant(restaurantId, mockRestaurantData);

  expect(mockGetUser).toHaveBeenCalledOnce();
  expect(mockUpdate).toHaveBeenCalledWith(expect.anything());
  expect(mockSet).toHaveBeenCalledWith(mockRestaurantData);
  expect(mockWhere).toHaveBeenCalledWith(expect.anything());
  expect(mockReturning).toHaveBeenCalledOnce();
  expect(result).toEqual(mockUpdatedRestaurant);
});

test("updateRestaurant fails to update a restaurant", async () => {
  const mockUser = { userId: 1 };
  const restaurantId = 1;
  const mockRestaurantData: NewRestaurant = {
    name: "Updated Restaurant",
    description: "An updated restaurant",
    address: "456 Updated St",
    phone: "555-5678",
  };

  mockGetUser.mockResolvedValue(mockUser);

  const mockUpdate = vi.fn().mockRejectedValue(new Error("Test error"));

  db.update = mockUpdate;

  const result = await updateRestaurant(restaurantId, mockRestaurantData);

  expect(result).toBeNull();
});
