import axios from 'axios'

const secrets = {
    clientId: "",
    clientSecret: "",
    tokenUrl: "https://accounts.spotify.com/api/token"
}

export class SpotifyApi {

    public getAccessTokenRequest = () => {
        try {
            const encodedSecrets = btoa(secrets.clientId+":"+secrets.clientSecret);
            const authorization = "Basic "+encodedSecrets;
    
            return axios.post(secrets.tokenUrl, 
                {
                "grant_type": "client_credentials"
                }, 
                {
                    headers: {"Authorization": authorization}
                }
            )
        } catch (ex) {
            console.error(ex);
        }
    }
}