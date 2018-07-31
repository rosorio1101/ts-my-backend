import axios, { AxiosResponse } from 'axios'
import Secrets from '../../domain/model/Secrets';
import { stringify } from 'querystring'

export class SpotifyApi {

    private secrets: Secrets;

    constructor(secrets: Secrets) {
        this.secrets = secrets;
    }

    public getAccessTokenRequest = () : Promise<AxiosResponse> => {
        const encodedSecrets = Buffer.from(`${this.secrets.clientId}:${this.secrets.clientSecret}`)
                                    .toString('base64');

        const authorization = `Basic ${encodedSecrets}`;       

        return axios.post(this.secrets.authenticationApiUrl, 
            stringify({"grant_type":"client_credentials"}), 
            {              
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": authorization
                }
            }
        );
    }

    public getAlbums = (album: string, authorization: string): Promise<AxiosResponse> =>  {

        const map = new Map<string, string>();
        map["q"] = album;
        map["type"]= "album";

        return this.searchData(map, authorization);
    }

    protected searchData = (query: Map<string, string>, authorization: string) : Promise<AxiosResponse> => {
        var url = `${this.secrets.spotifyApiUrl}/search`;

        if (query) {
            url += `?${stringify(query)}`;
        }
        
        return axios.get(url, {
            headers: {
                "Authorization": authorization
            }
        });

    }
}