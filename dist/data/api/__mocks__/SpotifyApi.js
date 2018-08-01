"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockSpotifyApi {
    constructor() {
        this.getAlbums = jest.fn((album, authorization) => { });
    }
}
exports.MockSpotifyApi = MockSpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map