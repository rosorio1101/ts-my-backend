import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Secrets from '../../domain/model/Secrets';
import Album from '../../domain/model/Album';
import AlbumsMapper from '../mapper/AlbumsMapper';


interface IAccessToken {
    token: string
}

class AccessToken implements IAccessToken {
    public token: string;

    public constructor(token: string) {
        this.token = token;
    }

}

export class SpotifyApi {

    private secrets: Secrets;
    private accessToken: IAccessToken;
    private mapper: AlbumsMapper;

    constructor(secrets: Secrets) {
        this.secrets = secrets;
        this.mapper = new AlbumsMapper;
    }


    private async getAccessToken(): Promise<IAccessToken> {

        if(!this.accessToken) {
            let response = await this.getAccessTokenRequest();
            this.accessToken = new AccessToken(response.data["access_token"]);
        }

        return this.accessToken;
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

    public getAlbums = async (album: string): Promise<Array<Album>> =>  {
        
        const map = new Map<string, string>();
        map["q"] = album;
        map["type"]= "album";

        let searchData = await this.searchData(map);

        return this.mapper.mapAll(searchData.data["albums"]["items"]);
    }

    protected searchData = async (query: Map<string, string>) : Promise<AxiosResponse> => {

        if (!this.accessToken) {
            this.accessToken = await this.getAccessToken();
        }

        var url = `${this.secrets.spotifyApiUrl}/search`;

        if (query) {
            url += `?${stringify(query)}`;
        }
        
        try {
            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${this.accessToken.token}`
                }
            });
            if (response.status == 401) {
                this.accessToken = null;
                return this.searchData(query);     
            } 

            if (response.status >= 200 && response.status < 400) {
                return response;
            }
        } catch(e) {
            this.accessToken = null;
            return this.searchData(query);
        }
    }
}