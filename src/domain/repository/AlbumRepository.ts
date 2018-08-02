import Album from "../model/Album";

export interface AlbumRepository {
    findAllByName(name: string): Promise<Array<Album>>;
    findAllBy(name: string, page: number): Promise<Array<Album>>;
}