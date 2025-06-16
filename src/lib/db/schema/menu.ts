import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { relations } from "drizzle-orm/relations";

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

export const restaurantTableRelations = relations(
  restaurantTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [restaurantTable.userId],
      references: [userTable.id],
    }),
  }),
);

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
  order: integer("order").default(0),
  // ingredients
});

export type NewRestaurant = Omit<typeof restaurantTable.$inferInsert, "userId">;
export type Restaurant = typeof restaurantTable.$inferSelect;

export type InsertMenu = typeof menuTable.$inferInsert;
export type Menu = typeof menuTable.$inferSelect;

export type InsertCategory = typeof menuCategoryTable.$inferInsert;
export type Category = typeof menuCategoryTable.$inferSelect;

export type InsertDish = typeof dishTable.$inferInsert;
export type Dish = typeof dishTable.$inferSelect;

export const scheduleTable = pgTable(
  "schedule",
  {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id")
      .notNull()
      .references(() => restaurantTable.id, { onDelete: "cascade" }),
    dayOfWeek: text("day_of_week", {
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    }).notNull(),
    open: text("opening_time").notNull(),
    close: text("closing_time").notNull(),
    isClosed: boolean("is_closed").default(false),
  },
  (table) => ({
    uniqueRestaurantDay: unique("unique_restaurant_day").on(
      table.restaurantId,
      table.dayOfWeek,
    ),
  }),
);

export type InsertSchedule = typeof scheduleTable.$inferInsert;
export type SelectSchedule = typeof scheduleTable.$inferSelect;
