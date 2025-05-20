CREATE TABLE "auth" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"login" text NOT NULL,
	"provider" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"password_hash" text NOT NULL,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_login_unique" UNIQUE("login")
);
--> statement-breakpoint
CREATE TABLE "permission_table" (
	"permission_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permission_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" integer NOT NULL,
	"permission_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_table" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "role_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_role_table_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role_table"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permission_table_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission_table"("permission_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_role_table_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role_table"("role_id") ON DELETE no action ON UPDATE no action;