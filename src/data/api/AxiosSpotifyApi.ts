
import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Album from '../../domain/model/Album';
import AlbumsMapper from '../mapper/AlbumsMapper';
import { SpotifyApi } from './SpotifyApi';
import { Authenticator } from './Authenticator';
import { AccessToken } from './AccessToken';

export const spotifyApiUrl = "https://api.spotify.com/v1";

export class AxiosSpotifyApi implements SpotifyApi {
    
    private authenticator: Authenticator;
    private mapper: AlbumsMapper;

    constructor(authenticator: Authenticator) {
        this.authenticator = authenticator;
        this.mapper = new AlbumsMapper();
    }

    public getAlbums = async (album: string): Promise<Array<Album>> =>  {
        
        const map = new Map<string, string>();
        map["q"] = album;
        map["type"]= "album";

        let searchData = await this.searchData(map);

        return this.mapper.mapAll(searchData.data["albums"]["items"]);
    }

    protected searchData = async (query: Map<string, string>) : Promise<AxiosResponse> => {
    
        let accessToken: AccessToken = await this.authenticator.authenticate();
        
        let url = `${spotifyApiUrl}/search`;

        if (query) {
            url += `?${stringify(query)}`;
        }
      
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken.access_token}`
            }
        });

        return response;
    }
}