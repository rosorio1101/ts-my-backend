import { AlbumRepository } from "../../domain/repository/AlbumRepository";
import Album from "../../domain/model/Album";
import { SpotifyApi } from "../api/SpotifyApi";
import AlbumsMapper from "../mapper/AlbumsMapper";

export default class SpotifyAlbumRepository implements AlbumRepository {
    private spotifyApi: SpotifyApi;

    public constructor(spotifyApi: SpotifyApi) {
        this.spotifyApi = spotifyApi;
    }

    public async findAllByName(name: string): Promise<Array<Album>> {    
        let response = await this.spotifyApi.getAlbums(name);
        return new AlbumsMapper().mapAll(response.data["albums"]["items"]);
    }
}