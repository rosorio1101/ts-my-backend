import { AxiosResponse } from "../../../../node_modules/axios";
import { resolve } from "path";
import { SpotifyApi } from "../SpotifyApi";

export class MockSpotifyApi implements SpotifyApi {

    constructor() { }

    public getAlbums = jest.fn((album: string, authorization: string) => {});
}