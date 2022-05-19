import * as DefaultDurationAPI from '@/examples/anonymous-user-app/api/duration'
import * as SessionAPI from '@/examples/anonymous-user-app/api/session'
import storage from './api/storage'

import Session from './model/Session'

console.log('This is a basic app using the Gittodoro module.')
console.log('The primary actor is an Anonymous User.')

DefaultDurationAPI.updateDefaultDuration(25, 5, 15, 4)

DefaultDurationAPI.onDefaultDurationChanged(() => {
  const defaultDuration = DefaultDurationAPI.getDefaultDuration()
  console.log('The default Duration is: ' + JSON.stringify(defaultDuration))

  if (defaultDuration?.id == '1') {
    defaultDuration && SessionAPI.start(defaultDuration?.id, new Date())
  }
})

SessionAPI.onSessionChanged((session: Session) => {
  console.log('The Session changed. session:', session)
  if (session.end == undefined) {
    const end = new Date(session.start.getTime() + 10 * 60 * 1000)
    SessionAPI.stop(end)
  }
})
