import { AxiosResponse } from "../../../../node_modules/axios";
import { resolve } from "path";

export class SpotifyApi {

    constructor() { }

    public getAccessTokenRequest =  jest.fn(() => { });

    public getAlbums = jest.fn((album: string, authorization: string) => {});
}