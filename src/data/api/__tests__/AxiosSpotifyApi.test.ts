jest.mock('../Authenticator')

import * as moxios from 'moxios';
import { AxiosSpotifyApi, spotifyApiUrl } from '../AxiosSpotifyApi';
import { Authenticator } from '../Authenticator';
import { MockAuthenticator } from '../__mocks__/Authenticator';
import { AccessToken } from '../AccessToken';

describe('SpotifyApi', () => {
    let api: AxiosSpotifyApi;
    let authenticator: Authenticator;

    beforeEach(() => {    
        moxios.install()
        authenticator = new MockAuthenticator();
        api = new AxiosSpotifyApi(authenticator);
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('getAlbums -> should return albums data from Spotify', async () => {
        authenticator.authenticate = jest.fn(async (): Promise<AccessToken> => {
            return {
                access_token: "",
                token_type: "",
                expires_in: 0
            };
        });

        moxios.stubRequest(`${spotifyApiUrl}/search?q=currents&type=album`, {
            status: 200, 
            response: responseSingleAlbum
        });

        let albums = await api.getAlbums({
            name: 'currents'        
        });

        expect(albums.length).toBe(1);
    }); 
    
    it('getAlbums -> should return albums data from Spotify where page 2', async () => {
        authenticator.authenticate = jest.fn(async (): Promise<AccessToken> => {
            return {
                access_token: "",
                token_type: "",
                expires_in: 0
            };
        });

        moxios.stubRequest(`${spotifyApiUrl}/search?q=currents&type=album&limit=20&offset=21`, {
            status: 200, 
            response: responseSingleAlbum
        });

        let albums = await api.getAlbums({
            name: 'currents',
            page: 2        
        });

        expect(albums.length).toBe(1);
    }); 
});


const responseSingleAlbum = {
    "albums": {
        "href": "https://api.spotify.com/v1/search?query=currents&type=album&offset=0&limit=1",
        "items": [
            {
                "album_type": "album",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb"
                        },
                        "href": "https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb",
                        "id": "5INjqkS1o8h1imAzPqGZBb",
                        "name": "Tame Impala",
                        "type": "artist",
                        "uri": "spotify:artist:5INjqkS1o8h1imAzPqGZBb"
                    }
                ],
                "available_markets": [
                    "AD",
                    "AR",
                    "AT",
                    "AU",
                    "BE",
                    "BG",
                    "BO",
                    "BR",
                    "CA",
                    "CH",
                    "CL",
                    "CO",
                    "CR",
                    "CY",
                    "CZ",
                    "DE",
                    "DK",
                    "DO",
                    "EC",
                    "EE",
                    "ES",
                    "FI",
                    "FR",
                    "GB",
                    "GR",
                    "GT",
                    "HK",
                    "HN",
                    "HU",
                    "ID",
                    "IE",
                    "IL",
                    "IS",
                    "IT",
                    "LI",
                    "LT",
                    "LU",
                    "LV",
                    "MC",
                    "MT",
                    "MX",
                    "MY",
                    "NI",
                    "NL",
                    "NO",
                    "NZ",
                    "PA",
                    "PE",
                    "PH",
                    "PL",
                    "PT",
                    "PY",
                    "RO",
                    "SE",
                    "SG",
                    "SK",
                    "SV",
                    "TH",
                    "TR",
                    "TW",
                    "US",
                    "UY",
                    "VN",
                    "ZA"
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/79dL7FLiJFOO0EoehUHQBv"
                },
                "href": "https://api.spotify.com/v1/albums/79dL7FLiJFOO0EoehUHQBv",
                "id": "79dL7FLiJFOO0EoehUHQBv",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/fed3593129c6254d7620b58f5af2754dff0c36a8",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/05ba2339972970b53df22c114eff9d09c352bf0f",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/7461f7153fb323847f770c6f6b9f337826d9e80c",
                        "width": 64
                    }
                ],
                "name": "Currents",
                "release_date": "2015-07-17",
                "release_date_precision": "day",
                "type": "album",
                "uri": "spotify:album:79dL7FLiJFOO0EoehUHQBv"
            }
        ],
        "limit": 1,
        "next": "https://api.spotify.com/v1/search?query=currents&type=album&offset=1&limit=1",
        "offset": 0,
        "previous": null,
        "total": 215
    }
};