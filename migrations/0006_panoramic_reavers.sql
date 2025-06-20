CREATE TYPE "public"."duration_unit" AS ENUM('day', 'week', 'month', 'year');--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subscription_type_id" integer NOT NULL,
	"end_date" timestamp NOT NULL,
	"payment_id" text NOT NULL,
	"payment_status" text NOT NULL,
	"payment_method" text NOT NULL,
	"payment_amount" integer NOT NULL,
	"payment_currency" text NOT NULL,
	"payment_date" timestamp NOT NULL,
	"payment_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscription_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"duration" "duration_unit" DEFAULT 'month' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscription_type_id_subscription_type_id_fk" FOREIGN KEY ("subscription_type_id") REFERENCES "public"."subscription_type"("id") ON DELETE no action ON UPDATE no action;