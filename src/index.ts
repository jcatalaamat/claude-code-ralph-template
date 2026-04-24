import { log } from "./logger.js";

log.info("boot", { project: process.env.npm_package_name ?? "unknown" });

// replace this stub with your project's entrypoint as the ralph loop progresses through phase 1+
