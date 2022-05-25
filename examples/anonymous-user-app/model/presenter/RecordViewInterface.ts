import Record from '@/examples/anonymous-user-app/model/Record'

export default interface RecordViewInterface {
  render(record: Record): unknown
}
