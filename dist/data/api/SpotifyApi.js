"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const querystring_1 = require("querystring");
class AccessToken {
    constructor(token) {
        this.token = token;
    }
}
class SpotifyApi {
    constructor(secrets) {
        this.getAccessTokenRequest = () => {
            const encodedSecrets = Buffer.from(`${this.secrets.clientId}:${this.secrets.clientSecret}`)
                .toString('base64');
            const authorization = `Basic ${encodedSecrets}`;
            return axios_1.default.post(this.secrets.authenticationApiUrl, querystring_1.stringify({ "grant_type": "client_credentials" }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": authorization
                }
            });
        };
        this.getAlbums = (album) => {
            const map = new Map();
            map["q"] = album;
            map["type"] = "album";
            return this.searchData(map);
        };
        this.searchData = (query) => __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                this.accessToken = yield this.getAccessToken();
            }
            var url = `${this.secrets.spotifyApiUrl}/search`;
            if (query) {
                url += `?${querystring_1.stringify(query)}`;
            }
            try {
                let response = yield axios_1.default.get(url, {
                    headers: {
                        "Authorization": `Bearer ${this.accessToken.token}`
                    }
                });
                if (response.status == 401) {
                    this.accessToken = null;
                    return this.searchData(query);
                }
                if (response.status >= 200 && response.status < 400) {
                    return response;
                }
            }
            catch (e) {
                this.accessToken = null;
                return this.searchData(query);
            }
        });
        this.secrets = secrets;
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                let response = yield this.getAccessTokenRequest();
                this.accessToken = new AccessToken(response.data["access_token"]);
            }
            return this.accessToken;
        });
    }
}
exports.SpotifyApi = SpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map