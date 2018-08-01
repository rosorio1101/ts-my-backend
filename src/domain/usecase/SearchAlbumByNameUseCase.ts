import Album from "../model/Album";
import { UseCase } from "./UseCase";
import { AlbumRepository } from "../repository/AlbumRepository";

interface Params {
    albumName: string,
    page: number
}

export default class SearchAlbumByNameUseCase implements UseCase<Promise<Array<Album>>, Params> {

    private albumRepository: AlbumRepository;

    constructor(albumRepository: AlbumRepository) {
        this.albumRepository = albumRepository;
    }

    public execute = async (params: Params): Promise<Array<Album>> => {
        return this.albumRepository.findAllBy(params.albumName, params.page);
    }
}
