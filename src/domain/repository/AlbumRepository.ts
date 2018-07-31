import Album from "../model/Album";

export interface AlbumRepository {
    findAllByName(name: string): Promise<Array<Album>>
}