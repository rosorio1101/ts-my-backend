jest.mock('../../repository/AuthRepository')

import GetSpotifyTokenUseCase from "../GetSpotifyTokenUseCase";
import { AuthRepository } from "../../repository/AuthRepository";
import { MockAuthRepository } from "../../repository/__mocks__/AuthRepository";

describe('GetSpotifyTokenUseCase', () => {
    let getSpotifyTokenUseCase: GetSpotifyTokenUseCase;
    let authRepository: AuthRepository;   
    
    beforeEach(() => {
        authRepository = new MockAuthRepository();
        getSpotifyTokenUseCase = new GetSpotifyTokenUseCase(authRepository);
    })

    it('should return AccessToken', async () => {
        authRepository.getAccessToken = jest.fn( async (): Promise<string> => {
            return "myAccessToken";
        });
        
        let accessToken = await getSpotifyTokenUseCase.execute({needRefresh: false});

        expect(accessToken).toBe("myAccessToken");
    });
})