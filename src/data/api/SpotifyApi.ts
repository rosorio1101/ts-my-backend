import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Secrets from '../../domain/model/Secrets';
import Album from '../../domain/model/Album';
import AlbumsMapper from '../mapper/AlbumsMapper';


export interface IAccessToken {
    token: string
}

class AccessToken implements IAccessToken {
    public token: string;

    public constructor(token: string) {
        this.token = token;
    }

}

export interface SpotifyApi {
    getAlbums(album: string): Promise<Array<Album>>;
}