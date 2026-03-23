# Bookshelf Tracker #

## Project Overview ##
This is a simple React app for tracking books you want to read, are currently reading, and have finished. It allows users to manage all of their personal reading in one place and keep track of their progress.

## Planned Features ##
1. Create, Edit, and Delete Books (core)
2. Search Books by Title or Author (core)
3. Advanced Filtering Books by Reading Status (additional)
4. Sort Books Alphabetically by Title (core)
5. Rate and Review Books (additional)
6. User Profile with Editable Information (additional)
7. Data Visualization Chart (additional)
8. User Preference View Toggle (core)

## Technologies Used ##
 1. React (Vite)
 3. Cloud storage and authentication through Supabase
 5. Tailwind CSS
 6. Recharts

## Setup Instructions ##
- create profile
- check email
- log in
- add books to have database and stats shown
- go to settings to edit profile

## Known Bugs Or Limitations ##
- email must be approved before login

## What I Learned ##
- take one step at a time
- get it functioning first
- how to set up the database on supabase and how to connect it all
- about env keys etc

## Architecture Overview ##
frontend-
backend-

## Database Structure ##
Profiles table holds user infomation with user id (unique and generated), name, username, and biography.
Books table holds row id, user id, book title, author, reading status, rating, review, and a time stamp.

## Live Site Link ##
[https://midterm-book-tracker.netlify.app/](https://midterm-book-tracker.netlify.app/)
