
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

    constructor() {
        this.spotifyApi = new SpotifyApi();
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