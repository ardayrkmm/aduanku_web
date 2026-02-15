This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Aduanku Admin Dashboard Documentation
Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS

Recharts

MySQL

Prisma ORM

Setup Project

Clone repo

Install dependencies

npm install


Setup environment

DATABASE_URL="mysql://user:password@localhost:3306/aduanku"


Run migration

npx prisma migrate dev


Run dev server

npm run dev

Folder Convention
app/(admin)/dashboard
app/(admin)/complaints
app/api/
lib/

Development Rules

Semua query database melalui service layer (lib/*.service.ts)

Jangan query database langsung dari component

Gunakan server component untuk data fetching

Gunakan client component hanya untuk interaktif UI

Adding New Feature

Buat API route

Buat service method

Buat UI component

Dokumentasikan perubahan

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
