import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Secrets from '../../domain/model/Secrets';
import Album from '../../domain/model/Album';


export interface SpotifyApi {
    getAlbums(album: string): Promise<Array<Album>>;
}