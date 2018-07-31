import {Request, Response} from 'express'
import SearchAlbumByNameUseCase from '../../domain/usecase/SearchAlbumByNameUseCase';


export default class AlbumController {
    public searchAlbumByNameUseCase: SearchAlbumByNameUseCase;

    constructor(searchAlbumByNameUseCase: SearchAlbumByNameUseCase) {
        this.searchAlbumByNameUseCase = searchAlbumByNameUseCase;
    }

    public searchAlbumsByName = (request: Request, response: Response): void => {
        response.status(200).send("Find!");
    }
}