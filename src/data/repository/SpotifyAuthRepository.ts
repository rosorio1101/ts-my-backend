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
        console.log(`needRefresh: ${needRefresh}`);
        if (this.accessToken == null || needRefresh) {
            let response: AxiosResponse = await this.spotifyApi.getAccessTokenRequest();    
            console.log(`response: ${response}`);
            if (response.status >= 200 && response.status < 400) {
                this.accessToken = response.data["access_token"];                
            }
            console.log(`newAccessToken: ${this.accessToken}`);
        }
        return this.accessToken;
    }
}