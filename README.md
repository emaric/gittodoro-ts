# Gittodoro.

Trying to follow the Clean Architecture principles.

## Constraints

1. **Sessions** only last for around 10 hours.
   - The user can start another session if needed.
   - The minimum duration is 5 minutes. Less than that, the session will be disregarded.
1. **Sessions** can only be stopped if the last time it was active (Session.lastTimeActive) is lesser than 5 minutes.
1. **Pomodoro** must be at least 25 minutes, but must not go over 120 minutes.
1. **Short** breaks must be at least 1 minute, but must not go over 15 minutes.
1. **Long** breaks must be at least 3 minutes, but must not go over 60 minutes.
1. **Long Intervals** must be at least 2, but not more than 6.

## Interactors

### Actor: External Users

1. - [x] External Users can read the default Duration
1. - [x] External Users can modify the default Duration.
1. - [x] External Users can reset the default Duration.
1. - [ ] External Users can sign in to the app using their Github account.
1. - [x] External Users can start Sessions.
1. - [x] External Users can stop Sessions.
1. - [ ] External Users can stop Sessions across platforms based on the last time it was active.
1. - [ ] External Users can view a Session by start date.
1. - [ ] External Users can view Sessions by a range of dates (start date inclusive; end date exclusive). Which will filter both the start date and end date of the Session.
1. - [ ] External Users can copy Sessions from the local/offline storage to their account.
1. - [ ] External Users can delete Sessions from the local/offline storage.
1. - [ ] External Users can create a new Notes.
1. - [ ] External Users can read Notes by ID or by the date it was created and/or updated.
1. - [ ] External Users can update Notes.
1. - [ ] External Users can delete Notes.
1. - [ ] External Users can select the Repo/Project/Issue to associate with a new Session.
1. - [ ] External Users can view the total number of Pomodori they have for each Repo/Project/Issue

1. - [ ] Store Default Duration constraints in database. 

## Running Tests

`npm test`

`npm run build && node ./lib/examples/external-users-app/index.js`

## MVC

- The **Model** is the application object, the **View** is its screen representation, and the **Controller** defines the way the user interface reacts to user input.
- Views and Models are decoupled by establishing a subscribe/notify protocol between them.
- View: ensure that its appearance reflects the state of the model.
- View uses an instance of a Controller subclass to implement a particular response strategy.

## Releasing updates

`npm version major|minor|patch`