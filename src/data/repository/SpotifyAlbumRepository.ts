
import { AlbumRepository } from "../../domain/repository/AlbumRepository";
import Album from "../../domain/model/Album";
import { SpotifyApi } from "../api/SpotifyApi";
import AlbumStorage from "../storage/AlbumStorage";


export default class SpotifyAlbumRepository implements AlbumRepository {
    private spotifyApi: SpotifyApi;
    private storage: AlbumStorage;
    
    public constructor(spotifyApi: SpotifyApi, albumStorage: AlbumStorage) {
        this.spotifyApi = spotifyApi;
        this.storage = albumStorage;
    }

    public async findAllByName(name: string): Promise<Array<Album>> {    
        let albums = await this.spotifyApi.getAlbums(name);
        
        this.storage.saveAll(albums);

        return albums;
    }
}