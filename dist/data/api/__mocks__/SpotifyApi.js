"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpotifyApi {
    constructor() { }
    getAccessTokenRequest() {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    "access_token": "myAccessToken"
                },
                config: {},
                headers: [],
                status: 200,
                statusText: ""
            });
        });
    }
    getAlbums(album, authorization) {
        return new Promise((resolve, reject) => {
            return {
                data: {
                    "access_token": "myAccessToken"
                },
                config: {},
                headers: [],
                status: 200,
                statusText: ""
            };
        });
    }
}
exports.SpotifyApi = SpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map