# Bookshelf Tracker #

## Project Overview ##
This is a simple React app for tracking books you want to read, are currently reading, and have finished. It allows users to manage all of their personal reading in one place and keep track of their progress.

## Core Features ##
1. Create, Edit, and Delete Books
2. Search Books by Title or Author
3. Sort Books Alphabetically by Title
4. User Preference View Toggle

## Enhanced Features ##
1. Advanced Filtering Books by Reading Status
2. Rate and Review Books
3. User Profile with Editable Information
4. Data Visualization Chart

## Technologies Used ##
 1. React (Vite)
 2. Supabase (Authentication & Database)
 3. Tailwind CSS (Styling)
 4. Recharts (Data Visualization)

## AI-Assisted Development ##
This class uses AI-assisted coding as part of the curriculum. This project used Claude Code to accelerate to improve the overall workflow while I understood and validated all of the code.

## Setup Instructions ##
1. Clone the repository
2. Run npm install
3. Create a .env.local file and input these:
   
   `VITE_SUPABASE_URL=your_url_here
    VITE_SUPABASE_ANON_KEY=your_key_here`
4. Run npm run dev
5. Click your localhost link that is shown in your terminal
6. From there you can signup, login, and interact with the bookshelf tracker.

## Limitations & Future Improvements ##
1. User email must be confirmed before users are allowed to login for security reasons. This might limit people who are trying to make an account.
2. There is no way to upload media yet, so there are no photos for your book covers.
3. As of right now there is also no "home page" that allows users to interact with other users.

## What I Learned ##
I build my first full-stack application using React and Supabase including authentication and database integration. I also worked on improving my workflow when using AI tools to assist my development.

## Architecture Overview ##
The frontend is build using React. This handles all of the user interactions, routing, and state management. The backend is built using Supabase. It handles authentication and cloud storage.

## Database Structure ##
Profiles table holds user infomation with user id (unique and generated), name, username, and biography.
Books table holds row id, user id, book title, author, reading status, rating, review, and a time stamp.

## Live Site Link ##
[https://midterm-book-tracker.netlify.app/](https://midterm-book-tracker.netlify.app/)
