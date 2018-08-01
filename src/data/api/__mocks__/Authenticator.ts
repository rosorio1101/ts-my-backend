import { Authenticator } from "../Authenticator";

export class MockAuthenticator implements Authenticator {

    constructor() { }

    public authenticate = jest.fn(() => { });
}