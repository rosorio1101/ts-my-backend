jest.mock('../../api/SpotifyApi')

import SpotifyAlbumRepository from "../SpotifyAlbumRepository";
import Album from "../../../domain/model/Album";
import { SpotifyApi } from "../../api/SpotifyApi";
import { AxiosResponse } from "../../../../node_modules/axios";
import Secrets from "../../../domain/model/Secrets";

const secrets: Secrets = {
    clientId: "",
    clientSecret: "",
    authenticationApiUrl: "",
    spotifyApiUrl: ""
}

describe('SpotifyAlbumRepository', () => {
    let spotifyApi: SpotifyApi;
    let albumRepository: SpotifyAlbumRepository;

    beforeEach(() => {
        spotifyApi = new SpotifyApi(secrets);
        albumRepository = new SpotifyAlbumRepository(spotifyApi);
    })

    it('should get album list by name', async () => {
        let albumName = "Currents";
        spotifyApi.getAlbums = jest.fn(async (albumName: string, authorization: string): Promise<AxiosResponse> => {
            return {
                data: responseSingleAlbum,
                headers: [],
                config: {},
                status: 200,
                statusText: ""
            };
        });

        let albumArray: Array<Album> = await albumRepository.findAllByName(albumName);

        expect(spotifyApi.getAlbums).toBeCalled();
        expect(albumArray.length).toBe(1);
    })
    
})



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