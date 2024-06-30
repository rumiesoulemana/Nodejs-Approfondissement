const ArticleService = require("./articles.service");

class ArticleController {
  async create(req, res, next) {
    try {
      const data = { ...req.body, user: req.user._id };
      const article = await ArticleService.createArticle(data);
      req.io.emit("articleCreated", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const article = await ArticleService.updateArticle(req.params.id, req.body);
      req.io.emit("articleUpdated", article);
      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await ArticleService.deleteArticle(req.params.id);
      req.io.emit("articleDeleted", req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();


