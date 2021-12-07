# Shop

An imaginary e-commerce website that sells ecological fruits, vegetables and meats. Demo available at [Sebbes ekologiska](https://sebbes-ekologiska.vercel.app/).

## Tech stack

- Frontend framework: [Next.js](https://nextjs.org/)
- Database: [postgresql](https://www.postgresql.org/)
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

## Self-hosting

To self host the server we run

```bash
npm i                               # Install dependencies
npm i sharp                         # For image conversion
npm run build                       # Build optimized production build
npx db-migrate up                   # Run database migrations
psql -d shop -a -f ./db-data.sql    # Add sample data to database.

# Start the server using pm2.
NODE_ENV=production pm2 start "npm run start" --name "web server" --cron-restart="0 3 * * *" --max-memory-restart 2048M
```
