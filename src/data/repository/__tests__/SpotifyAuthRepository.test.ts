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
        spotifyApi.getAccessTokenRequest = jest.fn( (): Promise<AxiosResponse> => {
            return new Promise((resolve ,reject )=> {
                resolve({
                    data: {
                        "access_token":"myAccessToken"
                    },
                    headers: [],
                    config: {},
                    status: 200,
                    statusText: ""
                })
            });
        })


        let accessToken: string = await spotifyAuthRepository.getAccessToken(false);
        
        expect(spotifyApi.getAccessTokenRequest).toHaveBeenCalledTimes(1);
        expect(accessToken).toBe("myAccessToken");
    });

    it("given previous accessToken should return same accessToken when no refresh", async () => {
        spotifyApi.getAccessTokenRequest = jest.fn( (): Promise<AxiosResponse> => {
            return new Promise((resolve ,reject )=> {
                resolve({
                    data: {
                        "access_token":"myAccessToken"
                    },
                    headers: [],
                    config: {},
                    status: 200,
                    statusText: ""
                })
            });
        })


        let oldAccessToken: string = await spotifyAuthRepository.getAccessToken(false);
        let newAccessToken: string = await spotifyAuthRepository.getAccessToken(false);    

        expect(spotifyApi.getAccessTokenRequest).toHaveBeenCalledTimes(1);
        expect(newAccessToken).toBe(oldAccessToken);
    });

    it("given previous accessToken should return new accessToken when refresh", async () => {
        let accessToken = "myAccessToken";
        spotifyApi.getAccessTokenRequest = jest.fn( (): Promise<AxiosResponse> => {
            return new Promise((resolve ,reject )=> {
                resolve({
                    data: {
                        "access_token":accessToken
                    },
                    headers: [],
                    config: {},
                    status: 200,
                    statusText: ""
                })
            });
        })
        let oldAccessToken = await spotifyAuthRepository.getAccessToken(false);

        accessToken = "myNewAccessToken";
        
        let newAccessToken = await spotifyAuthRepository.getAccessToken(true);    
        
        expect(spotifyApi.getAccessTokenRequest).toHaveBeenCalledTimes(2);    
        expect(oldAccessToken).toBe("myAccessToken");
        expect(newAccessToken).toBe("myNewAccessToken")
    });
});
