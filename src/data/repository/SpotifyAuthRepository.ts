import { AuthRepository } from "../../domain/repository/AuthRepository";
import { SpotifyApi } from "../api/SpotifyApi";

export class SpotifyAuthRepository implements AuthRepository {
    private spotifyApi: SpotifyApi;

    private accessToken: string;

    constructor(api: SpotifyApi) {
        this.spotifyApi = api;
    }

    public async getAccessToken(needRefresh: boolean): Promise<string> {
        return new Promise<string>( async (resolve, reject) => {
            if (this.accessToken == null || needRefresh) {
                await this.spotifyApi.getAccessTokenRequest().then((response) => {
                    if (response.status >= 200 && response.status < 400) {
                        this.accessToken = response.data["access_token"];
                    }

                    resolve(this.accessToken);                
                }).catch((error) => {
                    reject(error);
                })        
            }
            
            resolve(this.accessToken);
        });
    }
}