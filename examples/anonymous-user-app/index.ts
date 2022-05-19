import * as DefaultDurationAPI from '@/examples/anonymous-user-app/api/duration'
import * as SessionAPI from '@/examples/anonymous-user-app/api/session'
import { logger } from '@/examples/anonymous-user-app/components/loggers'
import { createRecordsForSession } from '@/examples/anonymous-user-app/components/records'
import SessionTimer from '@/examples/anonymous-user-app/components/timers/SessionTimer'
import Session from '@/examples/anonymous-user-app/model/Session'

const timer = new SessionTimer(logger)

console.log('This is a basic app using the Gittodoro module.')
console.log('The primary actor is an Anonymous User.')

DefaultDurationAPI.updateDefaultDuration(5, 1, 2, 4)

DefaultDurationAPI.onDefaultDurationChanged(() => {
  const defaultDuration = DefaultDurationAPI.getDefaultDuration()
  console.log('The default Duration is: ' + JSON.stringify(defaultDuration))

  if (defaultDuration?.id == '1') {
    const start = new Date()
    defaultDuration && SessionAPI.start(defaultDuration?.id, start)
  }
})

SessionAPI.onSessionChanged((session: Session) => {
  logger.debug('onSessionChanged... \nsession:', session, '\n')
  if (session.end == undefined) {
    timer.start(session)
    const ms = 1000 * 28
    const to = setTimeout(() => {
      timer.stop()
      const end = new Date()
      SessionAPI.stop(end)
      clearInterval(to)
    }, ms)
  } else {
    logger.debug('Finished a Session:')
    logger.debug('Finished Records:', timer.finishedRecords, '\n\n')
  }

  if (session && session.end) {
    logger.debug('records:', createRecordsForSession(session, session.end))
  }
})
