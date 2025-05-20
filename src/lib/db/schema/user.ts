import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const authTable = pgTable("auth", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  login: text("login").notNull().unique(),
  provider: text("provider").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  password: text("password_hash").notNull(),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const roleTable = pgTable("role_table", {
  roleId: serial("role_id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const permissionTable = pgTable("permission_table", {
  permissionId: serial("permission_id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const userRolesTable = pgTable("user_roles", {
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  roleId: integer("role_id")
    .notNull()
    .references(() => roleTable.roleId),
});

export const rolePermissionsTable = pgTable("role_permissions", {
  roleId: integer("role_id")
    .notNull()
    .references(() => roleTable.roleId),
  permissionId: integer("permission_id") 
    .notNull()
    .references(() => permissionTable.permissionId),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertUserAuth = typeof authTable.$inferInsert;
export type SelectUserAuth = typeof authTable.$inferSelect;

export type InsertRole = typeof roleTable.$inferInsert;
export type SelectRole = typeof roleTable.$inferSelect;

export type InsertPermission = typeof permissionTable.$inferInsert;
export type SelectPermission = typeof permissionTable.$inferSelect;
