"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Album {
    constructor(name, releaseDate, spotifyUrl, imageUrl) {
        this.getName = () => this.name;
        this.getReleaseDate = () => this.releaseDate;
        this.getSpotifyUrl = () => this.spotifyUrl;
        this.getImageUrl = () => this.imageUrl;
        this.name = name;
        this.releaseDate = releaseDate;
        this.spotifyUrl = spotifyUrl;
        this.imageUrl = imageUrl;
    }
}
exports.default = Album;
//# sourceMappingURL=Album.js.map