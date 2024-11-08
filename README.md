# Medium Clone

This project is a clone of Medium, a platform for publishing articles and engaging with readers. It leverages modern technologies such as React for the frontend, Cloudflare Workers for the backend, and various other tools and libraries to create a seamless user experience.

## You can check out the website [here](https://medium-blog-simple.vercel.app/)

## Technologies Used

-   **Frontend**: React.js
-   **Backend**: Cloudflare Workers
-   **Validation Library**: Zod
-   **Language**: TypeScript
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Authentication**: JSON Web Tokens (JWT)

## Features

-   **User Authentication**: Secure user authentication using JWT tokens.
-   **Article Management**: Publishing and editing articles with Markdown support.
-   **User Profiles**: View and manage user profiles, including authored articles.
-   **Blogging Experience**: Write and publish blogs in Markdown format.
-   **Social Interaction**: View others' profiles.
-   **Publish Control**: Articles can only be published when ready.

## Frontend

The frontend of this project is built using React.js, a popular JavaScript library for building user interfaces. TypeScript enhances code quality and provides better type safety. Zod is used for data validation, ensuring data integrity and consistency.

## Backend

The backend, powered by Cloudflare Workers, ensures low latency and high performance globally. Authentication is implemented using JWT tokens to secure endpoints and validate user access.

## Database

PostgreSQL serves as the database management system, providing reliability and scalability. Prisma is used as the ORM tool for seamless database interaction and efficient connection pooling.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure your PostgreSQL database and update the connection settings in the Prisma configuration file.
4. Run database migrations using `npx prisma migrate dev`.
5. Start the frontend and backend servers using `npm run dev`.

## Contributing

Contributions to this project are welcome. Feel free to open issues for bug fixes, feature requests, or general improvements. Pull requests are also appreciated. Please ensure to follow the existing code style and conventions.

### Acknowledgements

-   This project was part of Harkirat Singh's 100xdev cohort-2 course.
-   Inspiration drawn from the functionality and design of Medium.
