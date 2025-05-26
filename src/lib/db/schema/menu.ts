import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const restaurantTable = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const menuTable = pgTable("menus", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const menuCategoryTable = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  menuId: integer("menu_id")
    .notNull()
    .references(() => menuTable.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const dishTable = pgTable("dishes", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => menuCategoryTable.id),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  price: integer("price"),
  weight: integer("weight"),
  weight_type: text("weight_type"),
  // ingredients
});

export type NewRestaurant = Omit<typeof restaurantTable.$inferInsert, "userId">;
export type Restaurant = typeof restaurantTable.$inferSelect;

export type InsertMenu = typeof menuTable.$inferInsert;
export type SelectMenu = typeof menuTable.$inferSelect;

export type InsertMenuCategory = typeof menuCategoryTable.$inferInsert;
export type SelectMenuCategory = typeof menuCategoryTable.$inferSelect;

export type InsertDish = typeof dishTable.$inferInsert;
export type SelectDish = typeof dishTable.$inferSelect;
