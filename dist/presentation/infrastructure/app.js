"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Routes_1 = require("../routes/Routes");
const AlbumController_1 = require("../controller/AlbumController");
const SearchAlbumByNameUseCase_1 = require("../../domain/usecase/SearchAlbumByNameUseCase");
const SpotifyAlbumRepository_1 = require("../../data/repository/SpotifyAlbumRepository");
const MongooseAlbumStorage_1 = require("../../data/storage/MongooseAlbumStorage");
const AxiosSpotifyApi_1 = require("../../data/api/AxiosSpotifyApi");
const SpotifyClientFlowAuthenticator_1 = require("../../data/api/SpotifyClientFlowAuthenticator");
const secrets = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    authenticationApiUrl: "https://accounts.spotify.com/api/token",
    spotifyApiUrl: "https://api.spotify.com/v1"
};
const mongoUrl = "mongodb://localhost/mySpotifyDataBase";
class App {
    constructor() {
        this.authenticator = new SpotifyClientFlowAuthenticator_1.SpotifyClientFlowAuthenticator(secrets);
        this.albumStorage = new MongooseAlbumStorage_1.default();
        this.spotifyApi = new AxiosSpotifyApi_1.AxiosSpotifyApi(this.authenticator);
        this.albumRepository = new SpotifyAlbumRepository_1.default(this.spotifyApi, this.albumStorage);
        this.searchAlbumByNameUseCase = new SearchAlbumByNameUseCase_1.default(this.albumRepository);
        this.albumController = new AlbumController_1.default(this.searchAlbumByNameUseCase);
        this.routes = new Routes_1.Routes(this.albumController);
        this.app = express();
        this.config();
        this.mongooseConfig();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongooseConfig() {
        mongoose.connect(mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map