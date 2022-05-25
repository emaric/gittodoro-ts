import Record from '@/examples/external-users-app/model/Record'

export default interface RecordViewInterface {
  render(record: Record): unknown
}
