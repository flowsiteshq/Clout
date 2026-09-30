CREATE TABLE `employeeApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`roleInterest` varchar(100) NOT NULL,
	`preferredVenue` varchar(160) NOT NULL,
	`socialHandle` varchar(120),
	`availability` varchar(255) NOT NULL,
	`note` text,
	`status` enum('new','reviewing','approved','declined') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `employeeApplications_id` PRIMARY KEY(`id`)
);
