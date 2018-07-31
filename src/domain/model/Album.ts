export default class Album {
    private name: string;
    private releaseDate: string;
    private spotifyUrl: string;
    private imageUrl : string;

    constructor(name: string, releaseDate: string, spotifyUrl: string, imageUrl: string) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.spotifyUrl = spotifyUrl;
        this.imageUrl = imageUrl;
    }

    public getName = () => this.name;

    public getReleaseDate = () => this.releaseDate;

    public getSpotifyUrl = () => this.spotifyUrl;

    public getImageUrl = () => this.imageUrl;
}