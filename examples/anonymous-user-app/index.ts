import * as DefaultDurationAPI from '@/examples/anonymous-user-app/api/duration'

console.log('This is a basic app using the Gittodoro module.')
console.log('The primary actor is an Anonymous User.')

DefaultDurationAPI.onDefaultDurationChanged(() => {
  console.log(
    'The default Duration is: ' +
      JSON.stringify(DefaultDurationAPI.getDefaultDuration())
  )
})
