import Album from "../../domain/model/Album";

export default interface AlbumStorage {
    saveAll(albums: Array<Album>): void;
}