import { AuthRepository } from "../../domain/repository/AuthRepository";
import { SpotifyApi } from "../api/SpotifyApi";
import { AxiosResponse } from "../../../node_modules/axios";

export class SpotifyAuthRepository implements AuthRepository {
    private spotifyApi: SpotifyApi;

    private accessToken: string;

    constructor(api: SpotifyApi) {
        this.spotifyApi = api;
    }

    public async getAccessToken(needRefresh: boolean): Promise<string> {

        if (this.accessToken == null || needRefresh) {
            let response: AxiosResponse = await this.spotifyApi.getAccessTokenRequest();    
        
            if (response.status >= 200 && response.status < 400) {
                this.accessToken = response.data["access_token"];                
            }    
        }
        
        return this.accessToken;
    }
}