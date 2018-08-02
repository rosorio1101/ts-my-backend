import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'

import { Authenticator } from "./Authenticator";
import { AccessToken } from "./AccessToken";
import Secrets from "../../domain/model/Secrets";

export const authenticationApiUrl = "https://accounts.spotify.com/api/token";

const accessTokenLifeTime = 300000; //5 minutes in miliseconds

export class SpotifyClientFlowAuthenticator implements Authenticator {

    private accessToken: AccessToken;
    private expiresTimes: number;

    public constructor(private secrets: Secrets) { }
    
    public authenticate = async () : Promise<AccessToken> => {    
        let currentTime = new Date().getMilliseconds();
        
        if (!this.accessToken) {
            this.accessToken = await this.getAccessToken();  
            this.expiresTimes = currentTime + (this.accessToken.expires_in * 1000);    
        } else {
            let diffTime = currentTime - this.expiresTimes;         
            if (diffTime <= accessTokenLifeTime) {
                this.accessToken = await this.getAccessToken();  
                this.expiresTimes = currentTime + (this.accessToken.expires_in * 1000);
            }
        }
        
        return this.accessToken;
    }

    private async getAccessToken(): Promise<AccessToken> {    
        let response = await this.getAccessTokenResponse();
        return response.data;
    }

    private async getAccessTokenResponse(): Promise<AxiosResponse<AccessToken>> {    
        const encodedSecrets = Buffer.from(`${this.secrets.clientId}:${this.secrets.clientSecret}`).toString('base64');

        const authorization = `Basic ${encodedSecrets}`;      

        return await axios.post(authenticationApiUrl, 
            stringify({"grant_type":"client_credentials"}), 
            {              
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": authorization
                }
            }
        );
    }
}
