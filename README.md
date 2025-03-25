# Ace Tutors Global

Ace Tutors Global is a web application built using Next.js, designed to provide an online platform for tutoring services. The project leverages modern web technologies to deliver a seamless user experience.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

## Environment Setup

1. Create a `.env.local` file in the root directory (if not exists)
2. Add the following environment variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com      # Gmail address for sending emails
EMAIL_PASS=your-app-specific-password # Gmail app-specific password
OWNER_EMAIL=your-email@domain.com    # Email where notifications will be sent
OWNER_WA_NUMBER=+1234567890         # WhatsApp number with country code

# Social Media Links
TWITTER_URL=https://twitter.com/yourhandle
FACEBOOK_URL=https://facebook.com/yourpage
INSTAGRAM_URL=https://instagram.com/yourprofile
LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

3. For Gmail setup:
   - Enable 2-Step Verification in your Google Account
   - Generate an App Password: Google Account > Security > App Passwords
   - Use the generated 16-character password as EMAIL_PASS

Note: Never commit the `.env.local` file to version control.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
