CREATE TABLE `reservations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`confirmationCode` varchar(24) NOT NULL,
	`venueId` varchar(80) NOT NULL,
	`venueName` varchar(160) NOT NULL,
	`customerName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`reservationDate` varchar(24) NOT NULL,
	`reservationTime` varchar(24) NOT NULL,
	`partySize` int NOT NULL,
	`serviceName` varchar(120) NOT NULL,
	`membershipTier` varchar(60) NOT NULL,
	`addOns` text NOT NULL,
	`subtotalCents` int NOT NULL,
	`benefitCents` int NOT NULL DEFAULT 0,
	`totalCents` int NOT NULL,
	`referralCode` varchar(80),
	`status` enum('pending','confirmed','arrived','seated','completed','cancelled','no_show') NOT NULL DEFAULT 'confirmed',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`),
	CONSTRAINT `reservations_confirmationCode_unique` UNIQUE(`confirmationCode`)
);
--> statement-breakpoint
CREATE TABLE `venues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`slug` varchar(180) NOT NULL,
	`city` varchar(100) NOT NULL,
	`category` varchar(100) NOT NULL,
	`address` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `venues_id` PRIMARY KEY(`id`),
	CONSTRAINT `venues_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `walletTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reservationId` int,
	`customerEmail` varchar(320) NOT NULL,
	`direction` enum('credit','debit') NOT NULL,
	`amountCents` int NOT NULL,
	`description` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `walletTransactions_id` PRIMARY KEY(`id`)
);
