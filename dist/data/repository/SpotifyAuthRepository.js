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
class SpotifyAuthRepository {
    constructor(api) {
        this.spotifyApi = api;
    }
    getAccessToken(needRefresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken == null || needRefresh) {
                console.log(this.spotifyApi.getAccessTokenRequest);
                let response = yield this.spotifyApi.getAccessTokenRequest();
                if (response.status >= 200 && response.status < 400) {
                    this.accessToken = response.data["access_token"];
                }
            }
            return this.accessToken;
        });
    }
}
exports.SpotifyAuthRepository = SpotifyAuthRepository;
//# sourceMappingURL=SpotifyAuthRepository.js.map