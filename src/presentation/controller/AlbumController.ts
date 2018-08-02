import {Request, Response} from 'express'
import SearchAlbumByNameUseCase from '../../domain/usecase/SearchAlbumByNameUseCase';
import Album from '../../domain/model/Album';


export default class AlbumController {
    public searchAlbumByNameUseCase: SearchAlbumByNameUseCase;

    constructor(searchAlbumByNameUseCase: SearchAlbumByNameUseCase) {
        this.searchAlbumByNameUseCase = searchAlbumByNameUseCase;
    }

    public searchAlbumsByName = (request: Request, response: Response): void => {
        let albumName: string = request.query["q"];
        let page: number;

        if (request.query["page"]) {
            page = request.query["page"];
        } else {
            page = 1;
        }
    
        this.searchAlbumByNameUseCase.execute({
            albumName: albumName,
            page: page
        }).then((albums: Array<Album>)=> {
            response.status(200).json(albums);
        }).catch((error)=> {
            response.status(500).send(error);
        });

    }
}