import { Request, Response } from 'express';
import GetSpotifyTokenUseCase from "../../domain/usecase/GetSpotifyTokenUseCase";

export default class TestLoginAccessController {

    private getSpotifyTokenUseCase: GetSpotifyTokenUseCase;
    constructor(useCase: GetSpotifyTokenUseCase) {
        this.getSpotifyTokenUseCase = useCase;
    }

    public getAccessToken(request: Request, response: Response) {
        console.log("getAccessToken");
        console.log(this.getSpotifyTokenUseCase);
        this.getSpotifyTokenUseCase.execute({
            needRefresh: false
        }).then((accessToken: string) => {
            response.json({
                "accessToken": accessToken
            })
        })
    }
}