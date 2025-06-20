ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_subscription_type_id_subscription_type_id_fk";
--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "subscription_type_id";