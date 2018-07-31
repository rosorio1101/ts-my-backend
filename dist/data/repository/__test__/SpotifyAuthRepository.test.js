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
jest.mock('../../api/SpotifyApi');
const SpotifyAuthRepository_1 = require("../SpotifyAuthRepository");
const SpotifyApi_1 = require("../../api/SpotifyApi");
describe("SpotifyAuthRepository", () => {
    let spotifyAuthRepository;
    beforeEach(() => {
        spotifyAuthRepository = new SpotifyAuthRepository_1.SpotifyAuthRepository(new SpotifyApi_1.SpotifyApi({
            clientId: "",
            clientSecret: "",
            authenticationApiUrl: "",
            spotifyApiUrl: ""
        }));
    });
    it("should return accessToken when no refresh", () => __awaiter(this, void 0, void 0, function* () {
        let accessToken = yield spotifyAuthRepository.getAccessToken(false);
        expect(accessToken).toBe("myAccessToken");
    }));
});
//# sourceMappingURL=SpotifyAuthRepository.test.js.map