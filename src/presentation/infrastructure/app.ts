import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "../routes/Routes";
import AlbumController from "../controller/AlbumController";
import SearchAlbumByNameUseCase from "../../domain/usecase/SearchAlbumByNameUseCase";
import { AlbumRepository } from "../../domain/repository/AlbumRepository";
import SpotifyAlbumRepository from "../../data/repository/SpotifyAlbumRepository";
import Secrets from "../../domain/model/Secrets";
import { SpotifyApi } from "../../data/api/SpotifyApi";


const secrets: Secrets = {
    clientId: "5de5cc1dea9a49248447e9c1fc8c883e",
    clientSecret: "f96497e6b670460a8b68279f9d9a1375",
    authenticationApiUrl: "https://accounts.spotify.com/api/token",
    spotifyApiUrl: "https://api.spotify.com/v1"
}

class App {
    public app: express.Application;

    private albumController: AlbumController;
    private searchAlbumByNameUseCase: SearchAlbumByNameUseCase;
    private albumRepository: AlbumRepository;
    private spotifyApi: SpotifyApi;
    public routes: Routes;

    constructor() {
        this.spotifyApi = new SpotifyApi(secrets);
        this.albumRepository = new SpotifyAlbumRepository(this.spotifyApi); 
        this.searchAlbumByNameUseCase = new SearchAlbumByNameUseCase(this.albumRepository);
        this.albumController = new AlbumController(this.searchAlbumByNameUseCase);
        this.routes = new Routes(this.albumController);
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }

    public config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app