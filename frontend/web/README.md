# CertMatch Frontend

This is the frontend application for CertMatch, built with Next.js 14+ and TypeScript.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Zustand
- **UI Framework**: Tailwind CSS / Material-UI
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Data Fetching**: React Query
- **Styling**: Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # App Router structure
│   ├── api/             # API clients and services
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities, validations, stores
│   ├── providers/       # Context providers
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
└── ...
```

## Features

- Responsive design for mobile and desktop
- Tab-based navigation
- Banner carousel
- Job listings with filtering
- Expert matching
- Education course listings
- News and announcements

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!