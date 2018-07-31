import { AxiosResponse } from "../../../../node_modules/axios";
import { resolve } from "path";

export class SpotifyApi {

    constructor() { }
    
    public getAccessTokenRequest(): Promise<AxiosResponse> {
        return new Promise<AxiosResponse>((resolve, reject) => {
            resolve({
                data: {
                    "access_token":"myAccessToken"
                },
                config: {},
                headers: [],
                status:200,
                statusText:""
            });
        });
    }

    public getAlbums(album: string, authorization: string): Promise<AxiosResponse> {
        return new Promise<AxiosResponse>((resolve, reject) => {
            return {
                data: {
                    "access_token":"myAccessToken"
                },
                config: {},
                headers: [],
                status:200,
                statusText:""
            };
        });
    }
}