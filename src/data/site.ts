// Everything a visitor reads lives here. Edit this file to update the site.

export const profile = {
  firstName: "Ankhbayar",
  lastName: "Munkhbaatar",
  cyrillic: "Анхбаяр Мөнхбаатар",
  role: "Full-stack developer",
  location: "Mongolia",
  github: "https://github.com/anhaa0219",
  githubHandle: "anhaa0219",
  // Leave null to hide it (contact then falls back to GitHub).
  email: "anhaadiamond2002@gmail.com" as string | null,
  // TODO: drop your portrait into /public (e.g. /public/me.jpg) and set "/me.jpg" here.
  photo: null as string | null,
  // Headline number shown above the contribution graph (includes private contributions).
  contributionsLastYear: 383,
};

export type Shot = { src: string; alt: string; caption: string; title: string };

export const aroma = {
  name: "Aroma Beauty Clinic & Spa",
  live: "https://aroma-beauty-clinic-and-spa.vercel.app",
  code: "https://github.com/anhaa0219/Aroma-beauty-clinic-and-spa",
  year: "2026",
  stack: ["Next.js 16", "React 19", "MongoDB · Mongoose", "QPay v2", "eBarimt 3.0", "Tailwind", "Vercel"],
  summary:
    "An online booking platform for a beauty clinic and spa in Ulaanbaatar. Guests pick treatments for up to five people, choose a time the salon can actually staff, pay by QPay and get a tax receipt. Staff run the day from an admin timetable.",
  shots: [
    {
      src: "/work/aroma-home.webp",
      alt: "Aroma Beauty Clinic & Spa home page with a hot-stone massage photo and a Book Appointment button",
      title: "Front of house",
      caption:
        "Treatments, the clinic, the team and a skin check, in Mongolian and English, all one tap from booking.",
    },
    {
      src: "/work/aroma-services.webp",
      alt: "Treatments page listing spa packages with duration and price in tögrög",
      title: "A menu the scheduler reads",
      caption:
        "Every treatment carries its real duration. The booking engine uses it to block therapist time, rounded up to the half-hour grid.",
    },
    {
      src: "/work/aroma-booking.webp",
      alt: "Booking step one: choosing treatments, with a 0 of 5 people counter",
      title: "Group booking",
      caption:
        "One order can hold up to five people. Each treatment takes its own therapist, so the counter stops where the salon's capacity does.",
    },
  ] satisfies Shot[],
  engineering: [
    {
      title: "Scheduling",
      body: "A 30-minute slot grid from 09:00 to a 19:00 last order, five therapists in parallel, a 60-day booking window, all in Asia/Ulaanbaatar time.",
    },
    {
      title: "Payments",
      body: "Server-side QPay v2 client: invoices, payment checks and a callback. An online booking holds its therapists for 15 minutes while the guest pays.",
    },
    {
      title: "Tax receipts",
      body: "eBarimt 3.0 receipts issued with the invoice, for individuals or for a company looked up by its registration number.",
    },
    {
      title: "Sign-in",
      body: "One-time codes by SMS or email, with rate limits stored in MongoDB and visitor IPs hashed, never saved raw.",
    },
    {
      title: "Loyalty",
      body: "Spend-based membership tiers computed from booking history, shown on the guest's own loyalty card.",
    },
    {
      title: "Admin",
      body: "A day timetable, a capacity chart, a new-booking drawer for walk-ins and phone calls, and customer records.",
    },
  ],
};

export type ArchiveItem = {
  name: string;
  date: string; // YYYY-MM
  description: string;
  stack: string;
  live?: string;
  code: string;
  image?: string;
  imageAlt?: string;
};

export const archive: ArchiveItem[] = [
  {
    name: "AI training",
    date: "2026-11",
    description: "Work in progress: a TypeScript app on Prisma and Supabase Postgres.",
    stack: "Next.js · Prisma · Supabase",
    code: "https://github.com/anhaa0219/ai-training",
  },
  {
    name: "Food delivery",
    date: "2026-09",
    description:
      "Ordering app with its own Express API: JWT sign-in, MongoDB, Cloudinary image uploads, forms validated with Zod.",
    stack: "Next.js · Express · MongoDB",
    live: "https://food-delivery-new-chi.vercel.app",
    code: "https://github.com/anhaa0219/Food-Delivery-New",
  },
  {
    name: "Cash close-out counter",
    date: "2026-09",
    description:
      "End-of-shift tool for a shop's register: count every note from 20,000₮ down to 10₮ in three steps and check the total.",
    stack: "Next.js",
    live: "https://delgerhangai-kass-mongo-tooloh.vercel.app",
    code: "https://github.com/anhaa0219/Cashier-closing-money-counter",
    image: "/work/cashier.webp",
    imageAlt: "Dark cash counter with a row per banknote and plus and minus buttons",
  },
  {
    name: "Movie app",
    date: "2026-08",
    description: "Browse films with light and dark themes and skeleton loading states.",
    stack: "Next.js · next-themes",
    code: "https://github.com/anhaa0219/Movie-app",
  },
  {
    name: "Multi-step sign-up",
    date: "2026-08",
    description: "A three-step registration form that validates each step before letting you continue.",
    stack: "React",
    live: "https://forms-project.vercel.app",
    code: "https://github.com/anhaa0219/Forms-Project",
    image: "/work/forms.webp",
    imageAlt: "Join Us form, step one of three, with first name, last name and username fields",
  },
  {
    name: "Markdown converter",
    date: "2026-07",
    description: "Write Markdown on the left, read the rendered page on the right.",
    stack: "HTML · CSS · JavaScript",
    live: "https://project-3-eight-tan.vercel.app",
    code: "https://github.com/anhaa0219/Project-3",
    image: "/work/p3.webp",
    imageAlt: "Two-pane Markdown editor with an input on the left and a preview on the right",
  },
  {
    name: "Todo list",
    date: "2026-07",
    description: "Add, complete and filter tasks.",
    stack: "JavaScript",
    code: "https://github.com/anhaa0219/Todo-List-Project-New",
  },
  {
    name: "Calculator",
    date: "2026-07",
    description: "A keyboard-friendly calculator in plain JavaScript.",
    stack: "JavaScript",
    code: "https://github.com/anhaa0219/Calculator",
  },
  {
    name: "Product landing rebuild",
    date: "2026-06",
    description: "A study rebuilding a large tech brand's landing page in HTML and CSS.",
    stack: "HTML · CSS",
    live: "https://project-2-apple-new.vercel.app",
    code: "https://github.com/anhaa0219/Project-2-Apple-new",
  },
  {
    name: "45 JavaScript exercises",
    date: "2026-06",
    description: "Where it started: daily drills on arrays, objects, loops and the DOM.",
    stack: "JavaScript",
    code: "https://github.com/anhaa0219/javascript-45-exercise",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React 19", "Next.js 16", "Tailwind CSS", "shadcn / Base UI", "React Hook Form", "Zod"] },
  { group: "Backend", items: ["Node.js", "Express", "MongoDB · Mongoose", "Prisma", "Supabase", "JWT auth"] },
  { group: "Integrations", items: ["QPay", "eBarimt 3.0", "SMS & email OTP", "Cloudinary"] },
  { group: "Shipping", items: ["Git & GitHub", "Vercel"] },
];
