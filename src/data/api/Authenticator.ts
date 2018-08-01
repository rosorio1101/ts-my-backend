import { AccessToken } from "./AccessToken";

export interface Authenticator {
    authenticate(): Promise<AccessToken>;
}
