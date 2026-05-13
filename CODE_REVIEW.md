# Agro-Shop Code Review — Comprehensive Analysis

**Project:** Agro-Shop (Agricultural E-Commerce Platform)  
**Review Date:** April 9, 2026  
**Reviewer Assessment:** Thorough

---

## 1. Architecture Overview

### Project Type & Core Stack

- **Framework:** Next.js 16 (App Router) with TypeScript 5
- **Database:** PostgreSQL with Prisma ORM (v7.3.0)
- **Authentication:** NextAuth.js v5.0.0-beta.30 with JWT strategy
- **State Management:** Zustand v5.0.11 with persistence middleware
- **UI Framework:** Tailwind CSS v4.1.18 with custom components
- **Validation:** Zod v4.3.6 for schema validation
- **Form Handling:** React Hook Form v7.71.2

### Key Architecture Decisions ✓

1. **Server-side rendering with streaming:** Uses Suspense boundaries for progressive loading (see products/page.tsx)
2. **Server Actions:** All data mutations (`'use server'` directives) in dedicated action files
3. **Type-safe database:** Generated Prisma types, custom type exports
4. **Middleware-based auth:** NextAuth callbacks handle role-based authorization
5. **Client state only for ephemeral data:** Zustand for cart management (persisted to localStorage)
6. **Component isolation:** UI components are mostly presentational wrappers around shadcn patterns

---

## 2. Notable Files Analysis

### 2.1 Configuration Files

#### [package.json](package.json)

**Good practices:**

- Correct build script includes `prisma generate` before Next.js build
- All dependencies are pinned to specific versions
- Development dependencies properly separated
- PostgreSQL adapter properly included (`@prisma/adapter-pg`)

**Minor issue:**

- No `engines` field specifying Node.js version requirements
- No `prisma` script for migrations beyond `db:migrate`

#### [next.config.ts](next.config.ts)

**Simple but adequate:**

- Uses Turbopack for faster builds (Next.js 16)
- Minimal configuration (good default choices)

**Potential improvements:**

- No image optimization settings (no Image.next domain configuration if using external CDN)
- Missing SWR caching headers configuration
- No security headers defined

#### [tsconfig.json](tsconfig.json)

**Excellent TypeScript configuration:**

- `strict: true` enabled (full type checking)
- Path aliases configured (`@/*` → `./app/*`)
- Proper JSX handling with React 19
- `isolatedModules: true` ensures better build compatibility

---

### 2.2 Database Schema ([prisma/schema.prisma](prisma/schema.prisma))

#### Design & Structure ✓

```
User → Orders (1:many)
User → Favorites (1:many)
Product → Categories (many:1)
Product → OrderItems (1:many)
Product → Favorites (1:many)
Order → OrderItems (1:many)
Category → Products (1:many)
```

#### Schema Quality Analysis

**Strengths:**

1. **Proper cascading deletes:** `OrderItem` has `onDelete: Cascade` on order relationship
2. **Unique constraints:** Proper compound unique on `Favorite[userId, productId]` prevents duplicates
3. **Enums for state:** `OrderStatus`, `DeliveryMethod`, `Role` are properly enumerated
4. **Decimal precision:** Prices use `@db.Decimal(10, 2)` for financial correctness
5. **Default values:** Sensible defaults (timestamps, role assignments, status)

**Issues & Gaps:**

⚠️ **CRITICAL: Missing Indexes**

- No index on `Order.userId` (frequent filtering queries)
- No index on `Product.categoryId` (heavy usage in filters)
- No index on `OrderItem.productId` (order detail queries)
- No index on `Favorite.userId` (favorites listing)
- Consider: `@@index([userId])` on Order, `@@index([categoryId])` on Product

⚠️ **Type Safety Gap**

- `Order.address` is optional but **should be required** when `deliveryMethod = 'DELIVERY'`
  - Currently enforced only in validation schema, not in database
  - Solution: Add `?` to Optional or conditional requiredness in schema

⚠️ **Missing Audit Fields**

- No `updatedAt` timestamps on User, Product
- Recommendation: Add `updatedAt DateTime @updatedAt` to Product for tracking modifications
- Product stock changes not auditable (no history tracking)

⚠️ **Soft Deletes Not Implemented**

- Products/Categories are hard-deleted
- Risk: Orphaned references in order history if product is deleted
- Consider adding `deletedAt DateTime?` for soft deletes on Product

⚠️ **Missing Constraints**

- No check constraint on `price > 0` or `stock >= 0`
- `password` field has no length validation (could accept very long strings)
- No uniqueness on `Category.slug` helps but slug generation not shown

---

### 2.3 Authentication System

#### [auth.ts](app/shared/lib/auth.ts) & [auth.config.ts](app/shared/lib/auth.config.ts)

**Architecture: NextAuth v5 (JWT + Credentials + Google OAuth)**

**Strengths:**

1. ✓ Proper credential validation with bcrypt hashing
2. ✓ JWT session strategy (stateless, scalable)
3. ✓ Google OAuth integration with user upsert
4. ✓ Role-based access control (ADMIN check in middleware)
5. ✓ Protected routes via `authorized` callback
6. ✓ Proper token enrichment with user data

**Security Concerns:**

⚠️ **HIGH PRIORITY: Bcrypt Configuration**

```typescript
// Current code line 57 in actions/auth.ts and 40 in actions/password.ts
await bcrypt.hash(password, 10)
```

- Salt rounds = 10 is acceptable but modern standard is 12+
- **Recommendation:** Increase to 12 for better security
- Example: `await bcrypt.hash(password, 12)`

⚠️ **Password Storage in Google Intent**

```typescript
// auth.ts line 59-65: Google OAuth user creation
create: {
  email: user.email!,
  name: user.name,
  password: '', // ← PROBLEM
}
```

- Google-authenticated users get empty password string
- Could theoretically log in with any password if credentials provider is used
- **Fix:** Use a random UUID or hash that never matches:

```typescript
password: bcrypt.hashSync(crypto.randomUUID(), 12)
```

⚠️ **Missing CSRF Protection**

- NextAuth v5 requires explicit CSRF token configuration in beta
- Check that `trustHost: true` is set for production

⚠️ **No Rate Limiting**

- Login/register endpoints have no rate limiting
- Vulnerable to brute force attacks
- **Recommendation:** Add rate limiting middleware on auth routes

⚠️ **JWT Expiration Not Shown**

- Session duration not configured (uses NextAuth defaults ~ 30 days)
- No refresh token strategy visible
- Should configure explicit `maxAge` for security

---

### 2.4 Server Actions & Data Validation

#### Pattern Examples: [createOrderAction](app/shared/actions/order.ts), [createProductAction](app/shared/actions/admin/products.ts)

**Validation Pattern (Good):**

```typescript
const parsed = checkoutSchema.safeParse(data)
if (!parsed.success) {
	return { error: 'Неверные данные' }
}
```

- Uses Zod `safeParse` (no try-catch needed)
- Returns typed error responses
- Never throws unhandled exceptions in actions

**Authentication Pattern (Good):**

```typescript
const session = await auth()
if (!session?.user?.id) {
	return { error: 'Необходимо войти в аккаунт' }
}
```

- All protected actions check session first
- Clear error messaging for unauthenticated users

**Authorization Pattern (Good but Duplicated):**

```typescript
// admin/products.ts
async function checkAdmin() {
	const session = await auth()
	if (session?.user?.role !== 'ADMIN') {
		throw new Error('Нет доступа')
	}
}
```

- **Issue:** Throws error instead of returning error object (inconsistent pattern)
- **Issue:** Function is repeated logic—should be extracted to `shared/lib/auth-helpers.ts`

#### [Validation Schemas](app/shared/lib/validations/)

**Strengths:**

1. ✓ Centralized schema definitions (auth.ts, order.ts, profile.ts, password.ts)
2. ✓ Multilingual error messages (Russian)
3. ✓ Sophisticated validations: regex for phone, cross-field refinements

**Issues:**

⚠️ **Password Validation Inconsistency**

- `registerSchema` requires 8+ characters
- `changePasswordSchema` also requires 8+ characters
- But `loginSchema` password field just requires non-empty
- **Recommendation:** Normalize to same rules

⚠️ **Phone Validation Issue**

```typescript
// order.ts
phone: z
  .string()
  .min(10, 'Введите корректный номер телефона')
  .max(15, 'Введите корректный номер телефона')
  .regex(/^\+?[0-9\s\-()]+$/, 'Введите корректный номер телефона'),
```

- Regex is too permissive (allows `123-456-7890` which isn't valid)
- For Kazakhstan: Should validate format more strictly
- Current allows: spaces, dashes, parentheses arbitrarily
- **Better pattern:** `/^\+?7\d{10}$/` or `/^\+77\d{9}$/` for Kazakhstani numbers

⚠️ **Address Not Required When Needed**

```typescript
address: z.string().optional(),
// Then refinement:
if (data.deliveryMethod === 'DELIVERY' && !data.address) {
  return false
}
```

- Good validation, but address should be conditionally typed
- **Improvement:** Use `.optional()` only when appropriate

---

### 2.5 State Management ([cartStore.ts](app/shared/store/cartStore.ts))

**Zustand Implementation Analysis**

✓ **Strengths:**

1. Proper persistence middleware configuration
2. Clean action interface with immutable updates
3. Type-safe store definition
4. Separate `AddItemPayload` type for clarity

⚠️ **Potential Issues:**

1. **Missing Cart Validation**
   - No check for invalid quantity values (negative numbers possible)
   - No max quantity limit per item
   - **Fix:** Add validation in `updateQuantity` and `addItem`

   ```typescript
   updateQuantity: (id, quantity) =>
     set(state => ({
       items: state.items.map(i =>
         i.id === id
           ? { ...i, quantity: Math.max(1, Math.min(quantity, 999)) }
           : i
       ),
     })),
   ```

2. **Race Condition on Stock**
   - Cart can have items > current stock
   - Stock check only happens at checkout (order.ts)
   - User could add item, stock runs out, then reach checkout with no warning
   - **Fix:** Implement cart validation action before checkout

3. **Currency Not Specified**
   - Price is just a number
   - **Improvement:** Add currency field to CartItemProps

---

## 3. Code Quality Assessment

### 3.1 TypeScript Usage & Type Safety

**Excellent Features:**

- ✓ Full `strict: true` configuration
- ✓ Custom types exported from generated Prisma (types/index.ts)
- ✓ `SerializedProduct` interface for API responses
- ✓ Proper generic constraints in Zustand (StateCreator)
- ✓ Zod for runtime validation + TypeScript inference
- ✓ Async searchParams handling in Layout (proper typed Promises)

**Type Gaps:**

⚠️ **Loose Session Type**

```typescript
// auth.config.ts
session.user.id = token.id as string
session.user.role = token.role as string
```

- Uses `as string` type assertion (type coercion)
- Better: `??` operator with defaults or proper typing

⚠️ **Any Types in Callbacks**

```typescript
// auth.ts line 49
async authorize(credentials) { // ← No type annotation
```

- Should be: `authorize(credentials: Record<string, unknown>)`

⚠️ **FormData Type Assumption**

```typescript
// admin/products.ts line 16
formData: FormData
```

- Good that it's explicit, but no validation
- Could add safe parsing of FormData entries

---

### 3.2 Component Structure & Patterns

**Observed Pattern:**

- Clean separation between page layouts and business logic
- Components import from `@/widgets` and `@/shared`
- Server components used for data fetching
- Suspense boundaries for streaming

**Example: [products/page.tsx](<app/(public)/products/page.tsx>)**

```typescript
<Suspense key={queryString} fallback={<SkeletonLoader />}>
  <ProductList category={category} sort={sort} search={query} />
</Suspense>
```

✓ Proper async component + streaming
✓ Skeleton fallback for UX
✓ Re-renders only when queryString changes

**Component Issues Found:**

⚠️ **No Error Boundaries**

- No try-catch in async components
- No error.tsx files in sensitive routes
- If ProductList throws, whole page fails
- **Recommendation:** Add error.tsx at (public) and relevant sub-routes

⚠️ **No Loading State in Actions**

- Forms don't show loading state during mutation
- User doesn't know if submission is processing
- Need `useTransition()` or `useActionState()` in form components

---

### 3.3 API Design

**Route Structure:**

```
app/api/auth/[...nextauth]/ ← NextAuth handlers
```

**Observations:**

- RESTful endpoints not visible (all data via Server Actions)
- This is appropriate for Next.js App Router with Server Actions

**Missing API Endpoints (if needed):**

- No `GET /api/products` for external integrations
- No `GET /api/categories` for mobile/third-party clients
- If this is intentional (SPA only), acceptable

---

### 3.4 Error Handling Patterns

**Good Patterns Found:**

1. ✓ Server actions return `{ error: string } | { success: true }`
2. ✓ No unhandled promise rejections in visible code
3. ✓ Validation errors mapped to user-friendly messages

**Gaps:**

⚠️ **No Global Error Handling**

- No centralized error logger
- No Sentry/monitoring integration visible
- Database errors will surface raw to user

⚠️ **Incomplete Error Responses**

```typescript
if (!parsed.success) {
	return { error: parsed.error.issues[0].message } // Only first error
}
```

- Only returns first validation error
- Should return `{ errors: Record<string, string> }`

⚠️ **No Try-Catch in Admin Actions**

```typescript
// admin/products.ts line 33
export async function createProductAction(...) {
  await checkAdmin() // Throws, not caught
  // ...
}
```

- If `checkAdmin()` throws, entire action fails
- Should return error object instead

⚠️ **Missing Database Error Handling**

```typescript
// order.ts line 35
const products = await prisma.product.findMany(...)
// What if DB connection fails? No try-catch
```

---

## 4. Security Analysis

### 4.1 Authentication & Authorization ✓

**Strengths:**

- ✓ Proper role-based middleware: `if (isAdmin && !auth?.user?.role)`
- ✓ Protected routes redirected to login
- ✓ Session enriched with user role and ID

**Vulnerabilities:**

🔴 **CRITICAL: SQL Injection Risk (Unlikely but Check)**

```typescript
// Appears NOT vulnerable because using Prisma ORM
await prisma.user.findUnique({ where: { email: credentials.email } })
```

- ✓ Parametrized queries via Prisma
- ✓ Safe from SQL injection

🔴 **HIGH: Implicit Trust in Email from Google OAuth**

```typescript
where: { email: user.email! }, // ← Non-null assertion
```

- If Google provider sends null email, this crashes
- Better: `user.email || 'unknown-' + user.id`

🟡 **MEDIUM: No Admin Registration Prevention**

- No field restricts User.role = ADMIN during registration
- Any user could manually craft `role: 'ADMIN'` if validation is bypassed
- Database should have constraint `role IN ('USER', 'ADMIN')`
- Or better: Use enum enforcement in Prisma (already done ✓)

🟡 **MEDIUM: No Session Invalidation on Logout**

- NextAuth v5 might not blacklist tokens
- User could reuse old token if captured
- Requires Redis for token blacklisting (not implemented)

---

### 4.2 Input Validation

✓ **Strengths:**

- All mutations validated with Zod
- Phone number regex validation
- Password complexity rules (8+ chars)
- Address conditional validation

⚠️ **XSS Prevention:**

- React escapes JSX by default ✓
- User input displayed in orders/profile not shown to risk level

⚠️ **Missing Validation:**

- Product name max length: validate to prevent oversized DB entries
- `isFeatured` boolean could be string injection risk in formData parsing

---

### 4.3 Database Security

⚠️ **Exposure Risks:**

- Prisma client generated to `/generated/prisma/` (should be in .gitignore)
- Check: Is `/generated/` in `.gitignore`?

⚠️ **Password Complexity:**

- Minimum 8 characters (moderate security)
- No uppercase/lowercase/number requirements
- Consider: More complex password policy for admin accounts

---

## 5. Performance Observations

### 5.1 Database Query Patterns

**Good:**

- ✓ Uses Prisma transactions: `prisma.$transaction()`
- ✓ Selects specific fields when possible

**Issues:**

⚠️ **Missing Database Indexes** (see Schema section above)

- Product filtering by category will be slow at scale
- Order queries by userId will be slow
- Recommend: Add `@@index` block for foreign keys

⚠️ **N+1 Query Potential**

```typescript
// order.ts - line 35-36
const products = await prisma.product.findMany({
	where: { id: { in: productIds } },
})
```

- ✓ Correctly batches queries (good!)
- But later loops through items and products:

```typescript
items.map(item => {
	const product = products.find(p => p.id === item.id) // Linear search
})
```

- Better: Convert products to Map for O(1) lookup

⚠️ **Cart Syncing with Stock**

- Real-time stock updates not implemented
- Cart persists stale stock numbers in localStorage

### 5.2 Frontend Performance

✓ **Good:**

- Suspense boundaries for streaming
- Skeleton loaders for perceived performance
- use-debounce for search optimization (implied)

⚠️ **Issues:**

- No mentioned image optimization (Next.js Image component)
- No code splitting visible
- Cart operations are instant (good Zustand choice)

---

## 6. Missing Features & Potential Improvements

### Functional Gaps

⚠️ **Unfulfilled Requirements:**

1. **Product Reviews/Ratings** — not in schema
2. **Search Analytics** — popular products not truly tracked
3. **Inventory Management** — no low stock alerts for admins
4. **Email Notifications** — no order confirmation emails
5. **Payment Integration** — payment methods are just placeholders (no actual processing)
6. **Discount/Promo Codes** — not in schema or actions
7. **Admin Dashboard** — metrics/charts not shown in review

### Code Organization Gaps

⚠️ **Separation of Concerns:**

1. No `lib/auth-helpers.ts` for `checkAdmin()` utility function
2. No `lib/api-helpers.ts` for common API response patterns
3. Error handling not centralized
4. Validation schemas could be in `lib/validations/index.ts` barrel export

### Testing

⚠️ **No visible test files**

- No Jest/Vitest configuration
- No unit tests for validation schemas
- No integration tests for auth flows
- **Recommendation:** Add test suite (vitest + @testing-library)

---

## Summary Table: Issues by Severity

| Severity    | Count | Examples                                                       |
| ----------- | ----- | -------------------------------------------------------------- |
| 🔴 Critical | 2     | Missing database indexes, Google oauth password bypass         |
| 🟡 High     | 5     | No rate limiting, no error boundaries, password hashing config |
| 🟠 Medium   | 8     | Missing soft deletes, N+1 queries potential, no audit fields   |
| 🟢 Low      | 12+   | Code organization, validation inconsistencies, docs            |

---

## Recommendations Priority List

### Immediately Address (Week 1)

1. Add database indexes to Product.categoryId, Order.userId, OrderItem.productId, Favorite.userId
2. Increase bcrypt rounds from 10 to 12
3. Fix Google OAuth password field to use hashed random UUID
4. Implement rate limiting on auth endpoints
5. Add try-catch error handling in all server actions

### Address Soon (Week 2-3)

6. Implement proper error boundaries (error.tsx files)
7. Add loading state to form components (useActionState)
8. Extract `checkAdmin()` to shared utility
9. Normalize validation rules across schemas
10. Add soft deletes to Product schema

### Address Later (Week 4+)

11. Implement test suite
12. Add API routes for external integrations
13. Implement email notifications
14. Add admin dashboard with analytics
15. Implement actual payment processing
16. Add product review system

---

## Code Quality Score

| Category       | Score    | Notes                                                               |
| -------------- | -------- | ------------------------------------------------------------------- |
| Architecture   | 8.5/10   | Clean, follows Next.js patterns well                                |
| Type Safety    | 8/10     | Full strict mode, but some loose assertions                         |
| Error Handling | 6/10     | Works but not comprehensive                                         |
| Security       | 7/10     | Good fundamentals, missing some hardening                           |
| Performance    | 7.5/10   | Good patterns, missing indexes                                      |
| Testing        | 3/10     | No tests found                                                      |
| Documentation  | 5/10     | README exists but code docs sparse                                  |
| **Overall**    | **7/10** | **Solid early-stage project, PRODUCTION-READY with critical fixes** |

---

## File-by-File Checklist

- [x] package.json — OK (add Node.js version requirement)
- [x] next.config.ts — OK (minimal but acceptable)
- [x] tsconfig.json — Excellent
- [x] prisma/schema.prisma — Good (needs indexes + soft deletes)
- [x] app/shared/lib/auth.ts — Good (security hardening needed)
- [x] app/shared/lib/auth.config.ts — Good
- [x] app/shared/actions/ — Good (error handling improvements)
- [x] app/shared/ui/ — Good (clean shadcn wrappers)
- [x] app/shared/store/cartStore.ts — Good (add validation)
- [ ] Error boundaries — Missing
- [ ] Environment config docs — Missing
- [ ] Test files — Missing

---

**Review Complete** ✓
