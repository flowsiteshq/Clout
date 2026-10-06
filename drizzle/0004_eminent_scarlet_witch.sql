ALTER TABLE `employeeApplications` MODIFY COLUMN `ndaAccepted` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `employeeApplications` MODIFY COLUMN `ndaSignatureName` varchar(160) NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE `employeeApplications` MODIFY COLUMN `ndaVersion` varchar(48) NOT NULL DEFAULT 'legacy-no-nda';