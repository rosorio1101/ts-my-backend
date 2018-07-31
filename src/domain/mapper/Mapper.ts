export default abstract class Mapper<I, O> {
    public abstract map(input: I): O;

    public mapAll(inputs: Array<I>) : Array<O> {
        return inputs.map((input : I) => this.map(input));
    }
}