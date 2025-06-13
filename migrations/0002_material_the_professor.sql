CREATE TABLE "schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer NOT NULL,
	"day_of_week" text NOT NULL,
	"opening_time" time NOT NULL,
	"closing_time" time NOT NULL,
	"is_closed" boolean DEFAULT false,
	CONSTRAINT "unique_restaurant_day" UNIQUE("restaurant_id","day_of_week")
);
--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;