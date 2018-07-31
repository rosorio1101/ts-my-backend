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
                var request, error = await this.spotifyApi.getAccessTokenRequest();
                if (error != null) {
                    reject(error);
                    return;
                }
                if (request.status >= 200 && request.status < 400) {
                    this.accessToken = request.data["access_token"];
                } else {
                    reject();
                    return;
                }
            }
            
            resolve(this.accessToken);
        });
    }
}