const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("Tester API articles", () => {
  let token;
  const USER_ID = "6092c19cf3205c31d86d6fa3"; // ID d'utilisateur fictif
  const MOCK_ARTICLE = {
    _id: mongoose.Types.ObjectId(),
    title: "Test Article",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user: USER_ID,
    status: "draft",
  };

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    mockingoose.resetAll(); // Réinitialiser mockingoose avant chaque test

    // Mock pour la création d'un article
    mockingoose(Article).toReturn(MOCK_ARTICLE, "save");

    // Mock pour la mise à jour d'un article
    mockingoose(Article).toReturn(MOCK_ARTICLE, "findOneAndUpdate");

    // Mock pour la suppression d'un article
    mockingoose(Article).toReturn(MOCK_ARTICLE, "findOneAndDelete");
  });

  test("[Articles] Create Article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_ARTICLE)
      .set("x-access-token", token);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_ARTICLE.title);
  });

  test("[Articles] Update Article", async () => {
    const updatedArticle = { ...MOCK_ARTICLE, title: "Updated Title" };

    mockingoose(Article).toReturn(updatedArticle, "findOneAndUpdate");

    const res = await request(app)
      .put(`/api/articles/${MOCK_ARTICLE._id}`)
      .send(updatedArticle)
      .set("x-access-token", token);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedArticle.title);
  });

  test("[Articles] Delete Article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${MOCK_ARTICLE._id}`)
      .set("x-access-token", token);

    expect(res.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaurer tous les mocks
  });
  
});
