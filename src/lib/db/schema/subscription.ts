import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { userTable } from "./user";

export const durationUnitEnum = pgEnum("duration_unit", [
  "day",
  "week",
  "month",
  "year",
]);

export const subscriptionTypeTable = pgTable("subscription_type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  features: text("features").array().notNull(),
  duration: durationUnitEnum("duration").notNull().default("month"),
  createdAt: timestamp("created_at").defaultNow(),
  subscriptionTypeAbilitiesId: integer("subscription_type_abilities_id")
    .notNull()
    .references(() => subscriptionTypeAbilitiesTable.id),
});

export const subscriptionTypeTableRelations = relations(
  subscriptionTypeTable,
  ({ one }) => ({
    subscriptionTypeAbilities: one(subscriptionTypeAbilitiesTable, {
      fields: [subscriptionTypeTable.subscriptionTypeAbilitiesId],
      references: [subscriptionTypeAbilitiesTable.id],
    }),
  }),
);

export type SubscriptionTypeInsert = typeof subscriptionTypeTable.$inferInsert;
export type SubscriptionType = typeof subscriptionTypeTable.$inferSelect;

export const subscriptionTypeAbilitiesTable = pgTable(
  "subscription_type_abilities",
  {
    id: serial("id").primaryKey(),
    maxRestaurants: integer("max_restaurants"),
    maxMenus: integer("max_menus"),
    maxMenuCategories: integer("max_menu_categories"),
    maxDishes: integer("max_dishes"),
    maxTables: integer("max_tables"),
  },
);

export const subscriptionTypeAbilitiesTableRelations = relations(
  subscriptionTypeAbilitiesTable,
  ({ many }) => ({
    subscriptionType: many(subscriptionTypeTable),
  }),
);

export type SubscriptionTypeAbilitiesInsert =
  typeof subscriptionTypeAbilitiesTable.$inferInsert;
export type SubscriptionTypeAbilities =
  typeof subscriptionTypeAbilitiesTable.$inferSelect;

export const subscriptionTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  subscriptionTypeId: integer("subscription_type_id")
    .notNull()
    .references(() => subscriptionTypeTable.id),
  endDate: timestamp("end_date").notNull(),
  paymentId: text("payment_id").notNull().unique(),
  paymentStatus: text("payment_status").notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentAmount: integer("payment_amount").notNull(),
  paymentCurrency: text("payment_currency").notNull(),
  paymentDate: timestamp("payment_date").notNull(),
  paymentType: text("payment_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptionTableRelations = relations(
  subscriptionTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [subscriptionTable.userId],
      references: [userTable.id],
    }),
    subscriptionType: one(subscriptionTypeTable, {
      fields: [subscriptionTable.subscriptionTypeId],
      references: [subscriptionTypeTable.id],
    }),
  }),
);

export type SubscriptionInsert = typeof subscriptionTable.$inferInsert;
export type Subscription = typeof subscriptionTable.$inferSelect;
