import { Router } from "express";
import auth from "../../middleware/auth";
import { ROLES } from "../../types";
import { issuesController } from "./issues.controller";
import updateAuth from "../../middleware/updateAuth";

const router = Router()

router.post("/", auth(ROLES.contributor,ROLES.maintainer), issuesController.createIssues)

router.get("/", issuesController.getAllIssues)
router.get("/:id", issuesController.getSingleIssue)
router.patch("/:id", auth(ROLES.contributor, ROLES.maintainer), updateAuth(),issuesController.updateIssue)
router.delete("/:id", auth(ROLES.maintainer), issuesController.deleteIssue)

export const issuesRoute = router