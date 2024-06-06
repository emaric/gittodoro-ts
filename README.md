# Gittodoro

Following the principles of Clean Architecture.

## Constraints

1. **Sessions**

   - Sessions last for up to 10 hours.
   - Users can start a new session if needed.
   - Minimum session duration is 5 minutes; shorter sessions will be disregarded.
   - Sessions can only be stopped if the last active time (`Session.lastTimeActive`) is less than 5 minutes.

2. **Pomodoro**

   - Minimum duration: 25 minutes
   - Maximum duration: 120 minutes

3. **Short Breaks**

   - Minimum duration: 1 minute
   - Maximum duration: 15 minutes

4. **Long Breaks**

   - Minimum duration: 3 minutes
   - Maximum duration: 60 minutes

5. **Long Intervals**
   - Minimum count: 2
   - Maximum count: 6

## Interactors

### Actor: External Users

1. - [x] Can read the default duration.
1. - [x] Can modify the default duration.
1. - [x] Can reset the default duration.
1. - [ ] Can sign in to the app using their GitHub account.
1. - [x] Can start sessions.
1. - [x] Can stop sessions.
1. - [ ] Can stop sessions across platforms based on the last active time.
1. - [ ] Can view a session by start date.
1. - [ ] Can view sessions by a range of dates (start date inclusive; end date exclusive), filtering both the start date and end date of the session.
1. - [ ] Can copy sessions from local/offline storage to their account.
1. - [ ] Can delete sessions from local/offline storage.
1. - [ ] Can create new notes.
1. - [ ] Can read notes by ID or by the date they were created/updated.
1. - [ ] Can update notes.
1. - [ ] Can delete notes.
1. - [ ] Can select the repo/project/issue to associate with a new session.
1. - [ ] Can view the total number of Pomodori for each repo/project/issue.
1. - [ ] Store default duration constraints in the database.

## Running Tests

```sh
npm test
npm run build && node ./lib/examples/external-users-app/index.js
```

## MVC

- The **Model** is the application object, the **View** is its screen representation, and the **Controller** defines how the user interface reacts to user input.
- Views and Models are decoupled by establishing a subscribe/notify protocol between them.
- The **View** ensures that its appearance reflects the state of the model.
- The **View** uses an instance of a Controller subclass to implement specific response strategies.

## Releasing Updates

```sh
npm version major|minor|patch
```

This version is more consistent and clearer, making it easier for users to understand the project's constraints, functionalities, and how to interact with the application.
