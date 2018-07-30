export interface AuthRepository {
    getAccessToken(needRefresh: boolean): Promise<string>
}