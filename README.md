# SwiftLink 🔗

> **A high-performance, full-stack URL shortening service with user accounts and click analytics.**

**Live Demo:** [https://swiftlink-delta.vercel.app](https://swiftlink-delta.vercel.app) 

---

## About The Project

SwiftLink is a modern, full-stack URL shortener built to be fast, reliable, and user-friendly. It allows users to create short, memorable links from long URLs, either anonymously or through a registered account.

This project was built to demonstrate a deep understanding of full-stack development with a focus on a different kind of backend architecture, utilizing a relational (SQL) database. It showcases sk# SwiftLink 🔗

> **A high-performance, full-stack URL shortening service with user accounts and click analytics.**

---

## About The Project

SwiftLink is a modern, full-stack URL shortener built to be fast, reliable, and user-friendly. It allows users to create short, memorable links from long URLs, either anonymously or through a registered account.

This project was built to demonstrate a deep understanding of full-stack development with a focus on a different kind of backend architecture, utilizing a relational (SQL) database. It showcases skills in user authentication, database relationships, API design, and building a polished, interactive frontend.

### Key Features

-   **Anonymous & Authenticated Use:** Quickly shorten links without an account, or sign up to get more features.
-   **User Authentication:** Secure user registration and login system built from scratch using `jose` for JWTs and `HttpOnly` cookies.
-   **Protected Dashboard:** A private dashboard for logged-in users to view and manage all their created links.
-   **Click Analytics:** Tracks the number of clicks for each shortened link.
-   **Custom Short Codes:** Uses `nanoid` to generate unique, random, and URL-friendly short codes.
-   **Efficient Redirection:** A fast and reliable redirection system that also increments the click count for analytics.

---

## Tech Stack

This project is built with a modern, scalable, and secure technology stack, showcasing experience with relational databases.

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Frontend:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend:** Next.js API Routes
-   **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Authentication:** `jose` for JWTs, `bcryptjs` for password hashing
-   **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   A free Neon account for a PostgreSQL database

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/Arun-s21/swiftlink.git](https://github.com/Arun-s21/swiftlink.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd swiftlink
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    -   Create a file named `.env` in the root of the project.
    -   Add the following variables, replacing the placeholder values with your own keys from your Neon project:
        ```env
        DATABASE_URL="your_neon_postgresql_connection_string"
        JWT_SECRET=your_super_secret_jwt_key
        ```
5.  **Sync the database schema**
    -   This command will create the necessary tables in your database based on the schema.
    ```sh
    npx prisma db push
    ```
6.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application should now be running at `http://localhost:3000`.

---

## Contact

Arun Singh - arunsng18@gmail.com

Project Link: [https://github.com/Arun-s21/swiftlink](https://github.com/Arun-s21/swiftlink)