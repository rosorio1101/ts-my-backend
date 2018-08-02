jest.mock("../../repository/AlbumRepository");

import SearchAlbumByNameUseCase from "../SearchAlbumByNameUseCase";
import { AlbumRepository } from "../../repository/AlbumRepository";
import Album from "../../model/Album";
import { MockAlbumRepository } from "../../repository/__mocks__/AlbumRepository";



describe('SearchAlbumByNameUseCase', () => {
    let albumRepository: AlbumRepository;
    let searchAlbumByNameUseCase: SearchAlbumByNameUseCase;

    beforeEach(() => {
        albumRepository = new MockAlbumRepository();
        searchAlbumByNameUseCase = new SearchAlbumByNameUseCase(albumRepository);
    });
    
    it('execute should return album list', async () => {    
        let albumArray = await searchAlbumByNameUseCase.execute({
            albumName: "Currents",
            page: 1
        });
        expect(albumRepository.findAllBy).toBeCalledWith("Currents", 1);
        expect(albumArray.length).toBe(1);
    })
})