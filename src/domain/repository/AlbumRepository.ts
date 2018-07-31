import Album from "../model/Album";

export interface AlbumRepository {
    findAllByName(): Promise<Array<Album>>
}