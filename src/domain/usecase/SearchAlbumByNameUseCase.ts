import Album from "../model/Album";
import { UseCase } from "./UseCase";
import { AlbumRepository } from "../repository/AlbumRepository";

export default class SearchAlbumByNameUseCase implements UseCase<Promise<Array<Album>>, string> {

    private albumRepository: AlbumRepository;

    constructor(albumRepository: AlbumRepository) {
        this.albumRepository = albumRepository;
    }

    public execute = async (name: string): Promise<Array<Album>> => {
        return this.albumRepository.findAllByName(name);
    }
}