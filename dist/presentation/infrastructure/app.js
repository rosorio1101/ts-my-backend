"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Routes_1 = require("../routes/Routes");
const AlbumController_1 = require("../controller/AlbumController");
const SearchAlbumByNameUseCase_1 = require("../../domain/usecase/SearchAlbumByNameUseCase");
const SpotifyAlbumRepository_1 = require("../../data/repository/SpotifyAlbumRepository");
const SpotifyApi_1 = require("../../data/api/SpotifyApi");
const secrets = {
    clientId: "5de5cc1dea9a49248447e9c1fc8c883e",
    clientSecret: "f96497e6b670460a8b68279f9d9a1375",
    authenticationApiUrl: "https://accounts.spotify.com/api/token",
    spotifyApiUrl: "https://api.spotify.com/v1"
};
class App {
    constructor() {
        this.spotifyApi = new SpotifyApi_1.SpotifyApi(secrets);
        this.albumRepository = new SpotifyAlbumRepository_1.default(this.spotifyApi);
        this.searchAlbumByNameUseCase = new SearchAlbumByNameUseCase_1.default(this.albumRepository);
        this.albumController = new AlbumController_1.default(this.searchAlbumByNameUseCase);
        this.routes = new Routes_1.Routes(this.albumController);
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map