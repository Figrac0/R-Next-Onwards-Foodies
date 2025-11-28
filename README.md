# NextLevel Foodies – Next.js App Router Project

NextLevel Foodies is a full Next.js 15 application built with the App Router architecture.  
The project demonstrates modern patterns of server-side data management, client-side interactivity, file uploads, image processing, dynamic routing, and persistent storage using `better-sqlite3`.

This repository focuses on three core ideas:

- Practical use of Next.js App Router with server and client components  
- Full CRUD-style flow for recipes using Server Actions, Form Actions, React hooks, and route revalidation  
- Local data persistence implemented via `better-sqlite3` (embedded SQLite database)

---

<div align="center">

<h3>🎯 Quick Access - Click Below to Visit</h3>

<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin: 30px 0;">

<a href="https://r-next-onwards-foodies.vercel.app/" target="_blank" style="text-decoration: none;">
  <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px 30px; border-radius: 12px; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease; border: 2px solid white;">
    🎬 Project Overview
  </div>
</a>

</div>



## Project Preview

<h3 align="center">Screenshots</h3>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Onwards-Foodies/main/screenshots/1.png" width="450"/><br/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Onwards-Foodies/main/screenshots/2.png" width="450"/><br/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Onwards-Foodies/main/screenshots/3.png" width="450"/><br/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Onwards-Foodies/main/screenshots/4.png" width="450"/><br/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Onwards-Foodies/main/screenshots/5.png" width="450"/><br/>
</p>
---
</div>


## Project Overview

The application is a recipe-sharing platform where users can:

- Browse meals  
- View detailed instructions  
- Upload their own recipes  
- Upload images (stored in `/public/images`)  
- Persist all data in a SQLite database (`meals.db`)

The project uses Next.js 15, React 19, `better-sqlite3`, `slugify`, and `xss` for sanitization.

---

## Core Technologies Used

### Next.js 15 – App Router

The project is built entirely with the App Router, using:

- `app/` directory with nested routing  
- Server Components by default  
- Client Components where interactivity is required  
- `generateMetadata` for dynamic SEO  
- `notFound()` for 404 handling  
- Streaming UI with `<Suspense>`  
- Route-level revalidation via `revalidatePath()`  
- Server Actions (`"use server"`) as the main mutation API

### Server Components

Most pages (`/meals`, `/meals/[slug]`, `/community`, `/`) are implemented as Server Components.  
They perform:

- Direct synchronous DB queries via `better-sqlite3`  
- Data fetching without API routes  
- Dynamic metadata generation  
- SEO output per meal page  

Server Components allow queries to run inside the server runtime with no client bundle overhead.

### Client Components

Client Components are used where user interaction is required.

`usePathname()`  
Used in `NavLink` to highlight the current active navigation link.

`useState()` + `useRef()`  
Used in `ImagePicker` to manage file previews and trigger system dialogs.

`useActionState()`  
Used in the Share Meal form to bind a Server Action to form submission and track the pending state.

`useFormStatus()`  
Used in `MealsFormSubmit` to show UI feedback when the form is being submitted.

These hooks demonstrate practical separation between server-only logic and reactive UI behavior.

---

## Data Storage – better-sqlite3

The project uses `better-sqlite3` as the primary storage layer.

Key properties:

- Fast, synchronous SQLite driver  
- Zero async overhead  
- Runs inside Server Components and Server Actions  
- Suitable for small to medium projects  
- Database file: `meals.db`

The database stores information about each meal, including `slug`, `title`, `image`, `summary`, `instructions`, `creator`, and `creator_email`.

---

## File Uploads & Data Sanitization

When a user submits a meal with an image:

1. A Next.js Server Action receives the form data.  
2. The image is written to `public/images/...` through Node.js `fs.createWriteStream`.  
3. A slug is generated from the title using `slugify`.  
4. Instructions are sanitized against XSS attacks using the `xss` library.  
5. A new row is inserted into SQLite using `better-sqlite3` synchronously.  
6. The `/meals` route is revalidated with `revalidatePath()` to update the cache.  
7. The user is redirected back to the meals list via `redirect()`.

This demonstrates a complete end-to-end flow implemented entirely inside the App Router, without separate API route handlers.

---

## Server Actions

The project actively uses the `"use server"` directive.

The main action is `shareMeal`, which:

- Validates input fields  
- Sanitizes instructions  
- Saves the uploaded image to disk  
- Inserts a new row into the SQLite database  
- Revalidates the meals list  
- Redirects using `redirect()`  

This showcases the modern mutation flow in the Next.js App Router.

---

## Security Features

### Input validation

Ensures:

- No empty text fields  
- Valid email format  
- Image is present and non-empty  

### XSS protection

All instructions are sanitized using the `xss` library before being stored and rendered.

### Controlled file writes

Images are stored only inside `/public/images/`, with filenames derived from a slugified version of the title.

---

## UI Components

The UI is composed of reusable, isolated components:

- `MainHeader`  
- `MainHeaderBackground`  
- `NavLink`  
- `ImagePicker`  
- `MealItem`  
- `MealsGrid`  
- `MealsFormSubmit`  
- Error / NotFound pages  
- Slideshow component on the homepage  

Each component follows Next.js conventions for separating Server and Client behavior and keeps presentation logic independent from data access.

---



## Summary

This project is a complete demonstration of:

- Next.js App Router  
- Server and Client Components  
- Server Actions  
- File uploads  
- Local SQLite storage via `better-sqlite3`  
- XSS sanitization  
- Dynamic routing  
- React 19 client-side hooks  
- Full-stack architecture without custom API routes  

It serves as a practical template for small to medium production-ready Next.js applications. 
