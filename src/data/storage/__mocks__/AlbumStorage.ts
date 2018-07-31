import AlbumStorage from "../AlbumStorage";
import Album from "../../../domain/model/Album";

export class MockAlbumStorage implements AlbumStorage{ 
    public saveAll = jest.fn((albums: Array<Album>) => {

    });
}