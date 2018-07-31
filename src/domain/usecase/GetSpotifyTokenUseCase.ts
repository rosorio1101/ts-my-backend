import { UseCase } from './UseCase'
import { AuthRepository } from '../repository/AuthRepository';

interface Params {
    needRefresh: boolean
}

export default class GetSpotifyTokenUseCase implements UseCase<Promise<string>, Params> {

    private authRepository: AuthRepository;

    constructor(repository: AuthRepository) {
        this.authRepository = repository;
    }

    public async execute(params: Params) : Promise<string> {
        return this.authRepository.getAccessToken(params.needRefresh);  
    }
}