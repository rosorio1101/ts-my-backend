import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import Secrets from '../../domain/model/Secrets';


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

    constructor(secrets: Secrets) {
        this.secrets = secrets;
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

    public getAlbums = (album: string): Promise<AxiosResponse> =>  {
        
        const map = new Map<string, string>();
        map["q"] = album;
        map["type"]= "album";

        return this.searchData(map);
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