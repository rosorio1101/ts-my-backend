import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Secrets from '../../domain/model/Secrets';
import Album from '../../domain/model/Album';

export interface Query {
    name: string,
    page?: number
}
export interface SpotifyApi {
    getAlbums(query: Query): Promise<Array<Album>>;
}