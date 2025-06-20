CREATE TABLE "subscription_type_abilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"max_restaurants" integer,
	"max_menus" integer,
	"max_menu_categories" integer,
	"max_dishes" integer,
	"max_tables" integer
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "subscription_type_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_type" ADD COLUMN "subscription_type_abilities_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscription_type_id_subscription_type_id_fk" FOREIGN KEY ("subscription_type_id") REFERENCES "public"."subscription_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_type" ADD CONSTRAINT "subscription_type_subscription_type_abilities_id_subscription_type_abilities_id_fk" FOREIGN KEY ("subscription_type_abilities_id") REFERENCES "public"."subscription_type_abilities"("id") ON DELETE no action ON UPDATE no action;