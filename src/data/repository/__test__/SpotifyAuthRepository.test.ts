jest.mock('../../api/SpotifyApi')

import { SpotifyAuthRepository } from "../SpotifyAuthRepository";
import { SpotifyApi } from "../../api/SpotifyApi";

describe("SpotifyAuthRepository", () => {

    let spotifyAuthRepository: SpotifyAuthRepository;

    beforeEach(() => {
        spotifyAuthRepository = new SpotifyAuthRepository(new SpotifyApi({
            clientId: "",
            clientSecret: "",
            authenticationApiUrl: "",
            spotifyApiUrl: ""
        }));
    });

    it("should return accessToken when no refresh", async () => {
        let accessToken: string = await spotifyAuthRepository.getAccessToken(false);
        expect(accessToken).toBe("myAccessToken");
    });
});
