ALTER TABLE `employeeApplications` ADD `ndaAccepted` int NOT NULL;--> statement-breakpoint
ALTER TABLE `employeeApplications` ADD `ndaSignatureName` varchar(160) NOT NULL;--> statement-breakpoint
ALTER TABLE `employeeApplications` ADD `ndaVersion` varchar(48) NOT NULL;--> statement-breakpoint
ALTER TABLE `employeeApplications` ADD `ndaAcceptedAt` timestamp DEFAULT (now()) NOT NULL;