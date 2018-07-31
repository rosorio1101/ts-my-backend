import axios from 'axios'

const secrets = {
    clientId: "",
    clientSecret: "",
    tokenUrl: "https://accounts.spotify.com/api/token"
}

export class SpotifyApi {

    public getAccessTokenRequest = () => {
        try {
            const encodedSecrets = Buffer.from(secrets.clientId+":"+secrets.clientSecret).toString('base64');
            const authorization = "Basic "+encodedSecrets;
    
            return axios.post(secrets.tokenUrl, 
                {
                    "grant_type": "client_credentials"
                }, 
                {              
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Authorization": authorization}
                }
            )
        } catch (ex) {
            console.error(ex);
        }
    }
}