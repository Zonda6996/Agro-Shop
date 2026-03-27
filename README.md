# Agrivia — Agricultural E-Commerce Platform

A full-featured online store for agricultural products built with Next.js 16, Prisma, and PostgreSQL. Targeted at the Kazakhstani agricultural market.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 + Google OAuth
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS + tw-animate-css
- **UI Components:** shadcn + custom components
- **Icons:** Lucide React + custom SVG icons

---

## Features

- **Product catalog** — filtering by category, sorting by price, full-text search with debounce
- **Product page** — stock display, add to cart
- **Shopping cart** — slide-over sheet with Zustand persist, quantity controls, clear cart
- **Checkout** — contact form, delivery method (pickup / delivery), payment method (cash / Kaspi / invoice), Zod validation
- **Orders** — order creation with stock check, order history, order detail page
- **Favorites** — toggle favorites with optimistic UI, favorites list in account
- **Authentication** — email/password registration & login, Google OAuth, JWT session
- **Account** — profile editing, password change (hidden for Google users), order history, favorites
- **Landing page** — Hero section, category grid, about section, partners section
- **Responsive design** — mobile menu, adaptive layouts

---

## Project Structure

```
app/
├── (public)/               # Public routes with Header/Footer layout
│   ├── page.tsx            # Landing page
│   ├── products/           # Catalog, product detail
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout
│   ├── orders/[id]/        # Order detail
│   ├── account/            # Profile, orders, favorites
│   ├── login/              # Login page
│   └── register/           # Registration page
├── api/auth/               # NextAuth route handler
├── shared/
│   ├── actions/            # Server Actions (auth, order, favorites, profile, password)
│   ├── lib/                # Prisma client, auth config, routes, utils, validations
│   ├── store/              # Zustand cart store + selectors
│   ├── types/              # Shared types, Prisma re-exports
│   ├── ui/                 # Reusable UI components
│   └── assets/icons/       # Custom SVG icons (React components)
└── widgets/                # Layout widgets: Header, Footer, Hero, Category, Cart sheet, etc.
```

---

## Database Schema

| Model       | Key fields                                                       |
|-------------|------------------------------------------------------------------|
| `User`      | id, email, password, name                                        |
| `Product`   | id, name, description, price, stock, isFeatured, categoryId      |
| `Category`  | id, name, slug                                                   |
| `Order`     | id, userId, total, status, name, phone, address, paymentMethod, deliveryMethod |
| `OrderItem` | id, orderId, productId, quantity, price                          |
| `Favorite`  | id, userId, productId (unique composite)                         |

**Order statuses:** `PENDING` → `PAID` → `SHIPPED` → `DELIVERED` / `CANCELLED`  
**Delivery methods:** `PICKUP`, `DELIVERY`  
**Payment methods:** `CASH`, `KASPI`, `INVOICE`

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

```bash
git clone https://github.com/your-username/agrivia.git
cd agrivia
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/agrivia"
AUTH_SECRET="your-auth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Seed the database with categories, products, and a test user
npx tsx prisma/seed.ts
```

**Test account after seeding:**
```
Email:    test@test.com
Password: 123456
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Available Scripts

| Script           | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start development server                 |
| `npm run build`  | Generate Prisma client + build Next.js   |
| `npm start`      | Start production server                  |
| `npm run lint`   | Run ESLint                               |
| `npm run db:migrate` | Run Prisma migrations                |

---

---
---
