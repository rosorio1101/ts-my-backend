jest.mock('../../api/SpotifyApi')

import SpotifyAlbumRepository from "../SpotifyAlbumRepository";
import Album from "../../../domain/model/Album";
import { SpotifyApi } from "../../api/SpotifyApi";
import { AxiosResponse } from "../../../../node_modules/axios";
import Secrets from "../../../domain/model/Secrets";
import AlbumStorage from "../../storage/AlbumStorage";
import { MockAlbumStorage } from "../../storage/__mocks__/AlbumStorage";
import { AxiosSpotifyApi } from "../../api/AxiosSpotifyApi";

const secrets: Secrets = {
    clientId: "",
    clientSecret: "",
    authenticationApiUrl: "",
    spotifyApiUrl: ""
}

describe('SpotifyAlbumRepository', () => {
    let spotifyApi: SpotifyApi;
    let albumStorage: AlbumStorage;
    let albumRepository: SpotifyAlbumRepository;

    beforeEach(() => {
        spotifyApi = new AxiosSpotifyApi(secrets);
        albumStorage = new MockAlbumStorage();
        albumRepository = new SpotifyAlbumRepository(spotifyApi, albumStorage);
    })

    it('should get album list by name', async () => {
        let albumName = "Currents";
        spotifyApi.getAlbums = jest.fn(async (albumName: string, authorization: string): Promise<Array<Album>> => {
            let albums: Array<Album> = new Array<Album>();
            albums.push(new Album("","","",""))
            return albums;
        });

        let albumArray: Array<Album> = await albumRepository.findAllByName(albumName);

        expect(spotifyApi.getAlbums).toBeCalled();
        expect(albumArray.length).toBe(1);
    })

    it('when get albums from api then save on storage', async () => {
        let albumName = "Currents";
        spotifyApi.getAlbums = jest.fn(async (albumName: string, authorization: string): Promise<Array<Album>> => {
            let albums: Array<Album> = new Array<Album>();
            albums.push(new Album("","","",""))
            return albums;
        });

        let albumArray: Array<Album> = await albumRepository.findAllByName(albumName);

        expect(spotifyApi.getAlbums).toBeCalled();
        expect(albumStorage.saveAll).lastCalledWith(albumArray);
        expect(albumArray.length).toBe(1);
    })
    
});
