CREATE TABLE "property" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"purchase_date" timestamp NOT NULL,
	"sale_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "tenancy" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"unit_id" integer NOT NULL,
	"tenant_id" integer NOT NULL,
	"lease_start_date" timestamp NOT NULL,
	"lease_end_date" timestamp,
	"monthly_rent" integer NOT NULL,
	"security_deposit" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text
);
--> statement-breakpoint
CREATE TABLE "unit" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"unit_number" text NOT NULL,
	"rooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"square_meters" integer,
	"monthly_rent" integer NOT NULL
);
