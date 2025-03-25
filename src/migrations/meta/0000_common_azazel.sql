CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"name" text
);
