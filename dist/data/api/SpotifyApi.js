"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const querystring_1 = require("querystring");
class SpotifyApi {
    constructor(secrets) {
        this.getAccessTokenRequest = () => {
            const encodedSecrets = Buffer.from(this.secrets.clientId + ":" + this.secrets.clientSecret).toString('base64');
            const authorization = `Basic ${encodedSecrets}`;
            return axios_1.default.post(this.secrets.authenticationApiUrl, querystring_1.stringify({ "grant_type": "client_credentials" }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": authorization
                }
            });
        };
        this.getAlbums = (album, authorization) => {
            const map = new Map();
            map["q"] = album;
            map["type"] = "album";
            return this.searchData(map, authorization);
        };
        this.searchData = (query, authorization) => {
            var url = this.secrets.spotifyApiUrl + "/search";
            if (query) {
                url += `?${querystring_1.stringify(query)}`;
            }
            return axios_1.default.get(url, {
                headers: {
                    "Authorization": authorization
                }
            });
        };
        this.secrets = secrets;
    }
}
exports.SpotifyApi = SpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map