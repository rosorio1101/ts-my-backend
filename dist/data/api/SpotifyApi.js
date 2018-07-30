"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const secrets = {
    clientId: "",
    clientSecret: "",
    tokenUrl: "https://accounts.spotify.com/api/token"
};
class SpotifyApi {
    constructor() {
        this.getAccessTokenRequest = () => {
            try {
                const encodedSecrets = btoa(secrets.clientId + ":" + secrets.clientSecret);
                const authorization = "Basic " + encodedSecrets;
                return axios_1.default.post(secrets.tokenUrl, {
                    "grant_type": "client_credentials"
                }, {
                    headers: { "Authorization": authorization }
                });
            }
            catch (ex) {
                console.error(ex);
            }
        };
    }
}
exports.SpotifyApi = SpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map