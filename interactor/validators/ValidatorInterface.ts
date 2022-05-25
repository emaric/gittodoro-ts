export default interface ValidatorInterface<T> {
  validate(object: T): Promise<boolean>
}
