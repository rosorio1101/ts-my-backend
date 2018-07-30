"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const TestLoginAccessController_1 = require("../controller/TestLoginAccessController");
const GetSpotifyTokenUseCase_1 = require("../../domain/usecase/GetSpotifyTokenUseCase");
const SpotifyApi_1 = require("../../data/api/SpotifyApi");
const SpotifyAuthRepository_1 = require("../../data/repository/SpotifyAuthRepository");
class App {
    constructor() {
        this.spotifyApi = new SpotifyApi_1.SpotifyApi();
        this.authRepository = new SpotifyAuthRepository_1.SpotifyAuthRepository(this.spotifyApi);
        this.useCase = new GetSpotifyTokenUseCase_1.GetSpotifyTokenUseCase(this.authRepository);
        this.loginController = new TestLoginAccessController_1.TestLoginAccessController(this.useCase);
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    configureRoutes() {
        this.app.route("/accessToken").get(this.loginController.getAccessToken);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map