const { Router } = require("express");
const { temperamentsHandler } = require("../Handlers/temperamentsHandler")
const temperamentsRouter = Router()

temperamentsRouter.get("/", temperamentsHandler)

module.exports = temperamentsRouter
