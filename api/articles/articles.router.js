const express = require("express");
const router = express.Router();
const ArticleController = require("./articles.controller");
const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

router.post("/", authMiddleware, ArticleController.create);
router.put("/:id", authMiddleware, adminMiddleware, ArticleController.update);
router.delete("/:id", authMiddleware, adminMiddleware, ArticleController.delete);

module.exports = router;
