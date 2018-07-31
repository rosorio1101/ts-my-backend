jest.mock('../../api/SpotifyApi')

import { SpotifyAuthRepository } from "../SpotifyAuthRepository";
import { SpotifyApi } from "../../api/SpotifyApi";
import { AxiosResponse } from "../../../../node_modules/axios";
import { resolve } from "path";

describe("SpotifyAuthRepository", () => {

    let spotifyAuthRepository: SpotifyAuthRepository;
    let spotifyApi: SpotifyApi;
    beforeEach(() => {

        spotifyApi = new SpotifyApi({
            clientId: "",
            clientSecret: "",
            authenticationApiUrl: "",
            spotifyApiUrl: ""
        });

        spotifyAuthRepository = new SpotifyAuthRepository(spotifyApi);
    });

    it("should return accessToken when no refresh", async () => {
        let spy = jest.spyOn(spotifyApi, 'getAccessTokenRequest');
        
        let accessToken: string = await spotifyAuthRepository.getAccessToken(false);
        
        expect(spy).toHaveBeenCalledTimes(1);
        expect(accessToken).toBe("myAccessToken");
    });

    it("given previous accessToken should return same accessToken when no refresh", async () => {
        let spy = jest.spyOn(spotifyApi, 'getAccessTokenRequest');

        let oldAccessToken: string = await spotifyAuthRepository.getAccessToken(false);
        let newAccessToken: string = await spotifyAuthRepository.getAccessToken(false);    

        expect(spy).toHaveBeenCalledTimes(1);
        expect(newAccessToken).toBe(oldAccessToken);
    });

    it("given previous accessToken should return new accessToken when refresh", async () => {
        let spy = jest.spyOn(spotifyApi, 'getAccessTokenRequest');

        await spotifyAuthRepository.getAccessToken(false);
        //TODO: Aqui necesito poder cambiar el mock para retornar otro accessToken
        await spotifyAuthRepository.getAccessToken(true);    
        
        expect(spy).toHaveBeenCalledTimes(2);    
    });
});
