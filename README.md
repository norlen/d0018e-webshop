# Shop

MVP for a made up web shop 

## Tech stack

- Frontend framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- For database connection: [pg](https://github.com/brianc/node-postgres/)
- Databse migrations: [db-migrate](https://github.com/db-migrate/node-db-migrate)

For local development

- [Docker](https://www.docker.com/)

## Getting Started

Initial setup

```bash
npm install                                     # Install node dependencies
docker-compose -f docker-compose.yml up -d      # Start db locally.
```

To run migrations on the database, put the connection string to the data in `DATABASE_URL` in `.env` and run

```bash
npx db-migrate up
```

Finally, to run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
