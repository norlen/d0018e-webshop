# Shop

## Tech stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)

For local development

- [Docker](https://www.docker.com/)

## Getting Started

Initial setup

```bash
npm install                                     # Install node dependencies
docker-compose -f docker-compose.yml up -d      # Start db locally.
```

So sync the db run

```bash
npx prisma db push
```

Finally, to run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Managing database

They want us to manually do these steps, so use pgadmin to create/update tables and create migrations.

## Resources

Other visual libraries used are:

- [Heroicons](https://github.com/tailwindlabs/heroicons)
- [Headless UI](https://headlessui.dev/)
- [Tailwind CSS aspect ratio plugin](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

Component libraries, where we can get inspiration and code samples:
- [TailwindKit](https://www.tailwind-kit.com/).
- Free resources from [Tailwind UI](https://tailwindui.com/).


- Other resources
https://lofiui.co/
https://merakiui.com/
https://treact.owaiskhan.me/
