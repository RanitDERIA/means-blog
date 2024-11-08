<div align="center">
  
  ![GitHub repo size](https://img.shields.io/github/repo-size/RanitDERIA/means-blog?color=gold)
  ![GitHub stars](https://img.shields.io/github/stars/ranitderia/means-blog?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/ranitderia/means-blog?style=social)

  [![Twitter Follow](https://img.shields.io/twitter/follow/DeriaRanit?style=social)](https://twitter.com/intent/follow?screen_name=DeriaRanit)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn%20%40ranit--deria-blue?style=flat-square)](https://www.linkedin.com/in/ranit-deria-916864257/)

  <br />
  <br />
  
  <img src="./Readme-assets/logo.png" />

  <h2 align="center">Thoughts Amplified</h2>

  MEANS is a modern blogging platform that allows users to create, manage, and share their personal blogs. It features an easy-to-use interface with rich text formatting, media embedding, and customizable themes. Users can publish posts and explore a wide range of blogs based on their interests. With secure user authentication, responsive design, and dynamic content, MEANS offers an engaging and personalized blogging experience.<br />
  
<a href="https://means-blog.vercel.app/"><strong>➥ Live Demo</strong></a>

<br/>
<img src="./Readme-assets/brand.png" />
</div>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Technologies Utilized](#technologies-utilized)
- [Features](#features)
- [Run Locally](#run-locally)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

### Prerequisites:<a name="prerequisites"></a>

Before running the application on your local machine, ensure you have the following installed:

- **[React.js](https://reactjs.org/)** (for frontend development)
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** (for backend development)
- **[Zod](https://github.com/colinhacks/zod)** (for input validation)
- **[TypeScript](https://www.typescriptlang.org/)** (for static typing)
- **[Prisma](https://www.prisma.io/)** (for ORM)
- **[PostgreSQL](https://www.postgresql.org/)** (for database management)
- **[JSON Web Tokens (JWT)](https://jwt.io/)** (for authentication)

You will also need to set up the required environment variables mentioned in the documentation.

### Technologies and Services Utilized: <a name="technologies-utilized"></a>
- **Frontend:** <img align="center" alt="React.js" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"> React.js
- **Backend:** <img align="center" alt="Cloudflare Workers" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflareworkers/cloudflareworkers-original.svg"> Cloudflare Workers
- **Validation Library:** <img align="center" alt="Zod" height="30" width="40" src="https://zod.dev/logo.svg"> Zod
- **Programming Language:** <img align="center" alt="TypeScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"> Typescript 
- **ORM:** <img align="center" alt="Prisma" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"> Prisma
- **Database:** <img align="center" alt="PostgreSQL" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"> PostgreSQL
- **Authentication:** <img align="center" alt="JSON Web Tokens" height="30" width="40" src="https://jwt.io/img/pic_logo.svg"> JSON Web Tokens
- **Deployment Platform:** <img align="center" alt="Vercel" height="30" width="30" src="https://cdn.sanity.io/images/34ent8ly/production/223a29eb0698fb7fbc6d158a6f7e698d155e025f-824x824.png"> Vercel
- **Packages:** <img align="center" alt="npm" height="30" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"> npm
- **Cloud Services:** <img align="center" alt="Aiven" height="30" width="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTCwEXWODkWQsnWvvmrNYeI7y2P-W8XPluA&s"> Aiven
- **Web Framework:** <img align="center" alt="Hono" height="30" width="30" src="https://hono.dev/images/logo-small.png"> Aiven
- **CSS Framework:** <img align="center" alt="Tailwind" height="30" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"> Tailwind
- **Hosting for Static Assets:** <img align="center" alt="cloudflare" height="30" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg">Cloudflare


### Features: <a name="features"></a>
* **User Authentication:** Secure user authentication using JWT tokens.
* **Article Management:** Publishing and editing articles with Markdown support.
* **User Profiles:** View and manage user profiles, including authored articles.
* **Blogging Experience:** Write and publish blogs in Markdown format.
* **Social Interaction:** View others' profiles.
* **Publish Control:** Articles can only be published when ready.


### Run Locally: <a name="run-locally"></a>
To run **MEANS** locally, follow the steps below:

**Linux and macOS:**
1. **Clone the repository:** Open your terminal and run the following command to clone the project repository:
   ```bash
   git clone https://github.com/RanitDERIA/means-blog.git
   ```
2. **Install dependencies:** After cloning the repository, navigate into the project directory:

   ```bash
   cd <project-directory>
   ```
   
   Then, install the required dependencies using npm:

    ```bash
    npm install
    ```
   
3. **Configure your PostgreSQL database:**

- Create a PostgreSQL database.
- Update the connection string in the Prisma configuration file (prisma/schema.prisma) with your PostgreSQL credentials.
  ```bash
  DATABASE_URL="postgres://username:password@host:port/database_name"
  ```
4. **Run database migrations:** Run the following command to apply Prisma migrations to your database:
    ```bash
    npx prisma migrate dev
      ```
5. **Start the frontend and backend servers:** Use the following command to start both the frontend and backend servers:

    ```bash
   npm run dev
    ```




**Windows:**
1. **Clone the repository:** Open PowerShell and run the following command to clone the project repository:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:** After cloning the repository, navigate into the project directory:

    ```bash
   cd <project-directory>
   ```
    Then, install the required dependencies using npm:

    ```bash
    npm install
    ```

3. **Configure your PostgreSQL database:**

- Create a PostgreSQL database.
- Update the connection string in the Prisma configuration file (prisma/schema.prisma) with your PostgreSQL credentials.
  ```bash
  DATABASE_URL="postgres://username:password@host:port/database_name"
  ```

4. **Run database migrations:** Run the following command to apply Prisma migrations to your database:

    ```bash
   npx prisma migrate dev
   ```

5. **Start the frontend and backend servers:** Use the following command to start both the frontend and backend servers:

    ```bash
   npm run dev
    ```


### Installation: <a name="installation"></a>
Clone the repository from GitHub:

<img src="https://github.com/machiav3lli/oandbackupx/blob/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png" alt="Get it on GitHub" height="80">

### Usage: <a name="usage"></a>
* **Create Blog Posts:** Write and publish your own blogs with ease using Markdown support.
* **View Articles:** Explore articles published by others and stay updated on various topics.
* **Manage Profile:** Customize and manage your profile, including viewing and editing your published posts.
* **Social Sharing:** Share articles and posts on social media platforms directly from the website.

### Deployment: <a name="deployment"></a>
Your blog website can be deployed to platforms like Netlify, Vercel, or any service that supports PostgreSQL and Node.js with Cloudflare Workers.

### Environment Variables: <a name="environment-variables"></a>
You will need the following environment variables in your .env file or hosting provider’s environment settings:

```bash
DATABASE_URL=<your PostgreSQL database URL>
```
### Contributing: <a name="contributing"></a>
Contributions are always welcome!

If you'd like to contribute to this project, please follow these guidelines:

Fork the repository.
1. Create a new branch for your feature or bug fix.
2. Make your changes and commit them with descriptive messages.
3. Push your changes to your fork.
4. Submit a pull request.

Thank you for contributing to this project!

### License: <a name="license"></a>
This project is free to use and is licensed under the MIT License.

### Contact: <a name="contact"></a>

If you want to get in touch or have any questions regarding this project, feel free to reach out to me on **[LinkedIn](https://www.linkedin.com/in/ranit-deria-916864257/)** or follow me on **[Twitter](https://twitter.com/DeriaRanit)**.

For any inquiries, you can also open an issue or send a message directly via GitHub.
