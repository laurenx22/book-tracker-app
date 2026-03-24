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
 1. Claude Code
 2. React (Vite)
 3. Cloud storage and authentication through Supabase
 5. Tailwind CSS
 6. Recharts

## Setup Instructions ##
1. Clone the repository
2. Run npm install
3. Create a .env.local file and input these:
   
   `VITE_SUPABASE_URL=https://onadyxpuqxfddxhcmcyw.supabase.co
    VITE_SUPABASE_ANON_KEY=sb_publishable_3hPg_7KvjeKJgLhuobIutQ_eAfCoWLf`
5. Run npm run dev
6. Click your localhost link
7. From there you can signup, login, and interact with the bookshelf tracker.

## Known Bugs Or Limitations ##
1. User email must be confirmed before users are allowed to login for security reasons. This might limit people who are trying to make an account.
2. There is no way to upload media yet, so there are no photos for your book covers.
3. As of right now there is also no "home page" that allows users to interact with other users.

## What I Learned ##
I learned how to build a full-stack application using React and Supabase. I have not previously worked with Supabase before, so I  learned about how to set up a database and connect keys within that platform. I am also learning how to perfect my process when using
AI tools and making sure I go one step at a time while focusing on getting something functional first.

## Architecture Overview ##
The frontend is build using React. This handles all of the user interactions, routing, and state management. The backend is built using Supabase. It handles authentication and cloud storage.

## Database Structure ##
Profiles table holds user infomation with user id (unique and generated), name, username, and biography.
Books table holds row id, user id, book title, author, reading status, rating, review, and a time stamp.

## Live Site Link ##
[https://midterm-book-tracker.netlify.app/](https://midterm-book-tracker.netlify.app/)
