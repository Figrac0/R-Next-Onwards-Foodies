# React RSC, Server Actions & More

A focused playground project demonstrating how to combine modern **React 19** and **Next.js 15 App Router** features in one compact, educational example.  
The goal is not to create a production app, but to make each advanced feature easy to inspect and understand — both individually and in combination.

This project showcases **React Server Components**, **client components**, **Suspense with promises**, **the use() hook**, **Server Actions**, custom **error boundaries**, and a lightweight file-based data layer that simulates a database.

---

## 📸 Project Preview

<h3 align="center">Screenshots</h3>

<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Proj/Next-RSC/screenshots/1.png" width="450"/><br/>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Proj/Next-RSC/screenshots/2.png" width="450"/><br/>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Figrac0/R-Next-Proj/Next-RSC/screenshots/3.png" width="450"/><br/>
</p>

---

## 🧠 Key Concepts Demonstrated

- **React Server Components (RSC)** rendered entirely on the server  
- **Client components with hooks** (`useState`, handlers, re-renders)  
- **Suspense** boundaries with promises  
- The new **React `use()` hook**, consuming a server-generated promise on the client  
- **Server Actions** executed directly from forms  
- **File-based data layer** simulating a database (`fs/promises` + JSON file)  
- **Error boundaries** wrapping asynchronous operations  
- **Composition** of server and client components in any direction  
- **Global styling** using gradients, CSS variables, neon glows, blur (glassmorphism), and animated backgrounds

---

## 🧰 Tech Stack

- **Next.js 15** with the App Router  
- **React 19**  
- **Server Actions** (`"use server"`)  
- **Suspense + use()**  
- **Node fs/promises** for file I/O  
- **Custom error boundary** (class component)  
- **globals.css** with animated, layered visual effects  

---

## 🏛 High-Level Architecture

The project follows the App Router structure:

- **RootLayout**  
  - Defines HTML structure  
  - Declares global metadata  
  - Imports global CSS  
  - Keeps layout minimal for clarity

- **Home (Server Component)**  
  - Orchestrates the entire demo  
  - Creates a promise for delayed data fetching  
  - Reads **dummy-db.json** using fs/promises  
  - Wraps `UsePromiseDemo` in:
    - **Suspense** (loading state)
    - **ErrorBoundary** (failure state)  
  - Renders:
    - ServerActionsDemo  
    - DataFetchingDemo  
    - RSCDemo  
    - ClientDemo  
    - ClientDemo wrapping RSCDemo  

Each subcomponent demonstrates one specific modern React pattern.

---

## 🧩 Features by Component

### **RootLayout**
- Defines `<html>` and `<body>` wrappers  
- Registers metadata for the entire app  
- Injects global styling  
- Keeps structural noise to a minimum  

---

### **Home (Server Component)**
- Central coordinator of demos  
- Creates a delayed promise (via `setTimeout`)  
- Reads `dummy-db.json` to simulate a DB  
- Provides the promise to `UsePromiseDemo`  
- Wraps it in:
  - **Suspense** for pending state  
  - **ErrorBoundary** for rejected state  

Also renders independent demos:

- ServerActionsDemo  
- DataFetchingDemo  
- RSCDemo  
- ClientDemo  
- ClientDemo + RSCDemo composition model  

---

### **RSCDemo (React Server Component)**
- Runs *only* on the server  
- Never executes in the browser  
- Logs rendering on the server console  
- Demonstrates pure server-rendered UI  
- Zero client-side JavaScript or hydration cost  
- Can be used inside a client component to show mixed composition  

---

### **DataFetchingDemo**
- Async **server component**  
- Reads JSON directly from the filesystem  
- Renders a user list on the server  
- Minimal SSR example with pure async/await  
- Baseline pattern for server-side data fetching  

---

### **UsePromiseDemo (Client Component)**
- Marked with `"use client"`  
- Receives a **server-created promise** via props  
- Uses **React `use()`** to:
  - Suspend while awaiting the promise  
  - Access resolved data once ready  
- Includes local UI state via `useState`  
- Renders users after promise resolves  

This component demonstrates:

- Data loaded on the server  
- Suspense handled by the framework  
- Client interactivity maintained  

---

### **ClientDemo (Client Component)**
- Standard React client component  
- Uses `useState`  
- Logs each render  
- Supports children  
- Demonstrates composition: client → server → client  

---

### **ServerActionsDemo**
- Server component containing a form  
- Form submits directly to a **Server Action**  
- No REST, no API route required  
- Shows how mutations are now handled:

  - Run code on the server  
  - Update data  
  - Re-render affected regions  

New pattern replacing old API/REST endpoints for simple mutations.

---

### **ErrorBoundary (Client Component)**
- Classic React class-based error boundary  
- Catches async + render-time errors  
- Provides fallback UI  
- Used around the Suspense subtree  
- Handles the full lifecycle:
  - Loading (Suspense fallback)  
  - Success (UsePromiseDemo)  
  - Failure (ErrorBoundary fallback UI)  

---

## 🎨 Styling & UI Design

The `globals.css` file is a full visual playground:

### **Theme & Background**
- Dark theme with CSS variables  
- Multi-layer radial gradients  
- Procedural noise texture via data URI  
- Animated background elements  
- Slow orbiting glow effects via keyframes

### **Glassmorphism Cards**
- Semi-transparent surfaces  
- Heavy blur via `backdrop-filter`  
- Subtle grid overlays  
- Neon glows via gradient pseudo-elements

### **Per-Component Color Identity**
- RSC components: cyan/blue neon  
- Client components: magenta/orange  
- Errors: warm red/orange gradients  

### **Interactions**
- Hover scale + lift  
- Neon shadows  
- Animated gradient buttons  
- Glowing input fields  

### **Responsive**
- Reduced spacing on small screens  
- Adaptive typography  
- Stable layout without shifting  

### **Accessibility**
- Respects `prefers-reduced-motion`  
- High contrast for readability  

This styling layer showcases how to build a full, striking UI without any UI library.

---

## 🗂 Data Layer

There is **no real database**. Instead:

- `dummy-db.json` acts as the data source  
- Server components read the file with `fs/promises`  
- JSON is parsed into user objects  

Both `DataFetchingDemo` and `UsePromiseDemo` rely on this approach to demonstrate realistic server-side patterns without external dependencies.

---

## 🔗 How Everything Fits Together

- **RootLayout** sets up global environment  
- **Home** orchestrates:
  - Promise creation  
  - Suspense boundaries  
  - Error handling  
  - Rendering all demos  
- **RSCDemo** + **DataFetchingDemo** show server-only rendering  
- **UsePromiseDemo** demonstrates mixing:
  - Server-side promise creation  
  - Client-side consumption via use()  
  - Suspense + ErrorBoundary control flow  
- **ClientDemo** illustrates browser-only interactivity  
- **ServerActionsDemo** shows modern mutation workflows  
- **ErrorBoundary** ensures async code doesn’t break the UI  

---

## 🎯 Summary

This repository is a compact, hands-on reference for experimenting with the newest React & Next.js concepts, including:

- React Server Components  
- Server Actions  
- Suspense and `use()`  
- Mixed client/server composition  
- File-based data loading  
- Error boundaries  
- High-end CSS styling techniques  

A perfect sandbox for understanding the future direction of React and Next.js.
