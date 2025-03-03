const Controller = require("../controller/controller");
const MiddleWare = require("../middleware/middleware");

// Setting routes for the controller

module.exports = (app) => {
  app.post("/api/register", Controller.register);
  app.post("/api/login", Controller.login);

  app.get("/authCheck", MiddleWare, Controller.authCheck);
};