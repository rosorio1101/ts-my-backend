import { AuthRepository } from "../AuthRepository";

export class MockAuthRepository implements AuthRepository {
    public getAccessToken = jest.fn(() => { });
}