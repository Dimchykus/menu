import { test, vi } from "vitest";
import { render } from "@testing-library/react";
import MenuEditor from ".";
import EditDishes from "./edit-dish";
import EditCategories from "./edit-category";
import EditMenus from "./edit-menus";
import EditRestaurants from "./edit-restaurant";

vi.mock("@/lib/db/actions/menu", () => ({
  getUserEditDishes: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Dish",
      description: "Test Description",
      order: 1,
      categoryId: 1,
      image: "",
      price: 1000,
      weight: 100,
      weight_type: "g",
    },
  ]),
  getUserEditCategories: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Category",
      description: "Test Description",
      order: 1,
      restaurantId: 1,
    },
  ]),
  getUserEditMenus: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Menu",
      description: "Test Description",
      order: 1,
      restaurantId: 1,
      categoriesCount: 1,
    },
  ]),
  getUserEditRestaurants: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Restaurant",
      description: "Test Description",
      menusCount: 1,
    },
  ]),
}));

test("MenuEditor component can be imported and is a function", () => {
  render(<MenuEditor />);
});

test("EditDishes component can be imported and is a function", () => {
  render(<EditDishes categoryId={1} />);
});

test("EditCategories component can be imported and is a function", () => {
  render(<EditCategories menuId={1} restaurantId={1} />);
});

test("EditMenus component can be imported and is a function", () => {
  render(<EditMenus restaurantId={1} />);
});

test("EditRestaurants component can be imported and is a function", () => {
  render(<EditRestaurants />);
});
