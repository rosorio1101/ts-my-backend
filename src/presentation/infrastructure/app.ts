import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import { Routes } from "../routes/Routes";
import AlbumController from "../controller/AlbumController";
import SearchAlbumByNameUseCase from "../../domain/usecase/SearchAlbumByNameUseCase";
import { AlbumRepository } from "../../domain/repository/AlbumRepository";
import SpotifyAlbumRepository from "../../data/repository/SpotifyAlbumRepository";
import Secrets from "../../domain/model/Secrets";
import { SpotifyApi } from "../../data/api/SpotifyApi";
import AlbumStorage from "../../data/storage/AlbumStorage";
import MongooseAlbumStorage from "../../data/storage/MongooseAlbumStorage";
import { AxiosSpotifyApi } from "../../data/api/AxiosSpotifyApi";
import { Authenticator } from "../../data/api/Authenticator";
import { SpotifyClientFlowAuthenticator } from "../../data/api/SpotifyClientFlowAuthenticator";

const secrets: Secrets = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
}

const mongoUser = process.env.MY_BACKEND_MONGO_USER;
const mongoPassword = process.env.MY_BACKEND_MONGO_PASSWORD;

const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-94zih.mongodb.net/mySpotifyDataBase?retryWrites=true`;

class App {
    public app: express.Application;

    private authenticator: Authenticator;
    private albumController: AlbumController;
    private searchAlbumByNameUseCase: SearchAlbumByNameUseCase;
    private albumRepository: AlbumRepository;
    private spotifyApi: SpotifyApi;
    private albumStorage: AlbumStorage;
    public routes: Routes;

    constructor() {
        this.authenticator = new SpotifyClientFlowAuthenticator(secrets);
        this.albumStorage = new MongooseAlbumStorage();
        this.spotifyApi = new AxiosSpotifyApi(this.authenticator);
        this.albumRepository = new SpotifyAlbumRepository(this.spotifyApi, this.albumStorage); 
        this.searchAlbumByNameUseCase = new SearchAlbumByNameUseCase(this.albumRepository);
        this.albumController = new AlbumController(this.searchAlbumByNameUseCase);
        this.routes = new Routes(this.albumController);
        this.app = express();
        this.config();
        this.mongooseConfig();
        this.routes.routes(this.app);
    }

    public config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    private mongooseConfig(): void {
        mongoose.connect(mongoUrl);    
    }
}

export default new App().app