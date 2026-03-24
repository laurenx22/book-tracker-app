# Transcript Highlights #

## 1. Planning the React App ##
`plan a react app called Bookshelf Tracker. features: CRUD book list, edit reading status, filter books, rate books. use localStorange. authentication, cloud database, more features  will be added later. suggest: data model, component structure`

This was the very first prompt I did and the goal was to start planning out the React app. This mattered a lot because it was the initial information Claude had to start the project.

## 2. Be more specific in planning ##
`this is more complex than needed. plan a small react app with 6-8 features. simplify the architecture.`

Claude's initial planning was way too overcomplicated because I wasn't specific enough in my initial prompt. This helped Claude narrow ot back down to what the project needed.

## 3. Updating Features Plan##
`update the implementation plan. use this for the features: 1. create, edit, and delete books 2. search books by title or author 3. filter books by reading status 4. sort books alphabetically by title 5. rate and review books 6. user profile with editable info (name, username, bio) 7. data visualization chart using recharts (books by reading status) 8. saved user preference to toggle between grid and list view. updaye the app to support these features. return: updated data model, component structure, new state needed, changes for app.tsx. dont modify files yet`

This prompt was the first one after the inital planning phase was done. This mattered a lot because I needed to update my features to match the assignment criteria better.

## 4. Fixing an issue I found while self testing ##
`fix the issue of the user getting logged out when the page is refreshed even though the session exists. update AuthContent.tsx and ProtectedRoute.tsx so the session persists after refresh and dont redirect before the session is loaded`

While I was self testing the Bookshelf Tracker, I realized that the user gets logged out if the page is refreshed so I wanted to fix that error before moving onto anything else. This is
important because data persistence is part of the rubric.

 ## 5. Prompt for testing ##
 `what are some potential errors that could happen`

 Once I found errors, I wanted Claude to test and find some potential erros. This was important because I ended up doing this several times as it would find more potential errors.