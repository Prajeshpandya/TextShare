import { Router } from "express";
import { getText, getTextDataByCustomUrl, SendText,getUserTexts } from "../controller/text.js";

const router = Router();


//route like: /text
router.post("/share",SendText);
router.get("/gettext",getText);
router.get("/getusertext",getUserTexts);
router.get("/:customurl",getTextDataByCustomUrl);

export default router;