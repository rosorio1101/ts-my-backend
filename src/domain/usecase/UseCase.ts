export interface UseCase<T, Params> {
    execute(params: Params) : T
}