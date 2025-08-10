import { Router } from "express";
import { fetchInstagramMedia } from "../controllers/instagramController";

const router = Router();

// POST /api/instagram/media - Fetch Instagram media data
router.post("/media", fetchInstagramMedia);

export default router;
