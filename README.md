### BookRater - Personal Book Rating System

BookRater is a web application that allows users to track, rate, and manage their personal book collection. Built with Next.js,
TypeScript, and Tailwind CSS, this application provides a clean and intuitive interface for book enthusiasts to maintain their 
reading history and discover patterns in their reading habits.



## Features

- **User Authentication**

- Secure email and password authentication
- User registration and login functionality
- Protected routes and session management



- **Book Management**

- Add books with title, author, genre, and personal rating
- Delete books from your collection
- Persistent storage of your book data



- **Library Exploration**

- View all your books in a visually appealing grid layout
- Sort books by rating (highest to lowest or lowest to highest)
- Quick access to book details including genre and date added



- **Reading Statistics**

- Overview of your reading habits
- Track your average book rating
- Identify your most-read genres
- Highlight your highest-rated books





## Technologies Used

- **Frontend**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- shadcn/ui components



- **State Management**

- React Context API
- Local storage for data persistence





## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/Racheal-stack/book-rater.git
cd book-rater
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Usage Guide

### Creating an Account

1. Navigate to the Sign Up page
2. Enter your name, email, and password
3. Click "Create Account" to register


### Adding Books

1. Log in to your account
2. Navigate to the "Add Book" page from the dashboard
3. Enter the book title, enter the book author, select a genre, and set your rating (1-10)
4. Click "Add Book" to save to your collection


### Exploring Your Library

1. Navigate to the "Library" page
2. View all your books sorted by rating
3. Use the sort button to toggle between highest-first and lowest-first
4. Delete books using the trash icon on each book card


### Viewing Statistics

1. Navigate to the "Stats" page
2. See your total book count, average rating, and top genres
3. View your highest-rated book and reading patterns


## Project Structure

```plaintext
book-rater/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard and protected routes
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── dashboard-layout.tsx  # Dashboard layout wrapper
├── lib/                  # Utility functions and services
│   ├── auth-provider.tsx # Authentication context
│   ├── book-service.ts   # Book data management
│   └── utils.ts          # Helper utilities
└── public/               # Static assets
```

## Data Storage

BookRater currently uses the browser's localStorage for data persistence. This means:

- Your data is stored locally in your browser
- Data will persist between sessions on the same device
- Data will not sync between different devices
- Clearing browser data will erase your book collection


## Future Enhancements

- **Database Integration**: Replace localStorage with a proper database for cross-device synchronization
- **Social Features**: Share your book collection with friends and see their recommendations
- **Advanced Filtering**: Search, filter, and categorize books by multiple criteria
- **Reading Goals**: Set and track reading goals and achievements
- **Book Cover Integration**: Add book cover images via upload or API integration
- **Export/Import**: Export your book collection data or import from other services
- **Dark Mode**: Toggle between light and dark themes


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)


---

Created with ❤️ by Racheal-stack
