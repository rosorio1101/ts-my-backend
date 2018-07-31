
import {Request, Response} from "express";
import GetSpotifyTokenUseCase from "../../domain/usecase/GetSpotifyTokenUseCase";
import TestLoginAccessController from "../controller/TestLoginAccessController";
import { SpotifyApi } from "../../data/api/SpotifyApi";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { SpotifyAuthRepository } from "../../data/repository/SpotifyAuthRepository";

export class Routes {

    private useCase: GetSpotifyTokenUseCase;
    private loginController: TestLoginAccessController;

    private spotifyApi: SpotifyApi;
    private authRepository: AuthRepository;

    //TODO: sacar todos esos news...
    constructor() {
        this.spotifyApi = new SpotifyApi({
            clientId : "5de5cc1dea9a49248447e9c1fc8c883e",
            clientSecret: "f96497e6b670460a8b68279f9d9a1375",
            authenticationApiUrl: "https://accounts.spotify.com/api/token",
            spotifyApiUrl: "https://api.spotify.com/v1"
        });
        this.authRepository = new SpotifyAuthRepository(this.spotifyApi)
        this.useCase = new GetSpotifyTokenUseCase(this.authRepository);
        this.loginController = new TestLoginAccessController(this.useCase);
    }
    
    public routes(app) :void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send("my-backend");
        })

        app.route("/accessToken").get(this.loginController.getAccessToken);
    }

}