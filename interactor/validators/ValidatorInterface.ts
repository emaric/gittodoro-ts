export default interface ValidatorInterface<T> {
  validate(object: T): boolean
}
