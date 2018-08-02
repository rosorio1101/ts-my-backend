import { AlbumRepository } from "../AlbumRepository";
import Album from "../../model/Album";

export class MockAlbumRepository implements AlbumRepository {
    public findAllByName = jest.fn( async (name: string): Promise<Array<Album>> => { 
        let albums = new Array<Album>();
        albums.push(new Album("Currents","","",""));
        return albums;        
    });

    public findAllBy = jest.fn( async (name: string, page: number): Promise<Array<Album>> => { 
        let albums = new Array<Album>();
        albums.push(new Album("Currents","","",""));
        return albums;        
    });
}