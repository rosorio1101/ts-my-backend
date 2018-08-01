import * as moxios from 'moxios';
import { SpotifyClientFlowAuthenticator ,authenticationApiUrl } from '../SpotifyClientFlowAuthenticator';
import Secrets from '../../../domain/model/Secrets';
import { AccessToken } from '../AccessToken';

const secrets: Secrets = {
    clientId: "myClientId",
    clientSecret: "myClientSecret" 
}

describe('SpotifyClientFlowAuthenticator', () => {

    let spotifyClientFlowAuthenticator: SpotifyClientFlowAuthenticator;

    beforeEach(() => {
        moxios.install();
        spotifyClientFlowAuthenticator = new SpotifyClientFlowAuthenticator(secrets);
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('getAccessToken should return new AccessToken', async () => {
        moxios.stubRequest(authenticationApiUrl, {
            status: 200,
            response: {
                "access_token": "myAccessToken",
                "type_token":"bearer",
                "expires_in":3600
            }
        });

        let accessToken: AccessToken = await spotifyClientFlowAuthenticator.authenticate();
        
        expect(accessToken).not.toBeNull();
        expect(accessToken.access_token).toBe("myAccessToken");
    })

    it('getAccessToken should refresh when expire time is near', () => {
        moxios.wait(async () => {
            let oldAccessToken: AccessToken = await spotifyClientFlowAuthenticator.authenticate();
            let firstRequest = moxios.request.mostRecent();
            firstRequest.respondWith({
                status: 200,
                response: {
                    "access_token": "myOldAccessToken",
                    "type_token":"bearer",
                    "expires_in":1
                }
            }).then(() => {
                expect(oldAccessToken).not.toBeNull();
                expect(oldAccessToken.access_token).toBe("myOldAccessToken");

                moxios.wait(async () => {
                    let newAccessToken: AccessToken = await spotifyClientFlowAuthenticator.authenticate();
                    let secondRequest = moxios.request.mostRecent();
                    secondRequest.respondWith({
                        status: 200,
                        response: {
                            "access_token": "myNewAccessToken",
                            "type_token":"bearer",
                            "expires_in":3600
                        }
                    });
                            
                    expect(newAccessToken).not.toBeNull();    
                    expect(newAccessToken.access_token).toBe("myNewAccessToken");
                });
            });
        });
    })
})