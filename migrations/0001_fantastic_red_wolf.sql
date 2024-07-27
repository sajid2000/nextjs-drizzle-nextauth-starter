CREATE TABLE `resetToken` (
	`email` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `token`;