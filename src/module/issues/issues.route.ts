import { Router } from "express";
import auth from "../../middleware/auth";
import { ROLES } from "../../types";
import { issuesController } from "./issues.controller";

const router = Router()

router.post("/", auth(ROLES.contributor,ROLES.maintainer), issuesController.createIssues)

export const issuesRoute = router