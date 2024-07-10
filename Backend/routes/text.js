import { Router } from "express";
import { getText, getTextDataByCustomUrl, SendText } from "../controller/text.js";

const router = Router();


//route like: /text
router.post("/share",SendText);
router.get("/gettext",getText);
router.get("/:customurl",getTextDataByCustomUrl);

export default router;