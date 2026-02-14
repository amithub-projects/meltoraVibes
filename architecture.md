# Chocolate Website Design & Architecture

## 1. Executive Summary
**Project Name:** Meltora-vibes (Provisional)
**Goal:** Create a premium, eye-catching e-commerce platform for selling luxury chocolates.
**Key Features:** Visual-first scrolling product display, Dark/Light mode support, Seamless payment integration.

## 2. Visual Identity & Design System

### 2.1. Core Aesthetic
The design will focus on **sensory appeal**, utilizing rich textures, smooth animations, and a premium color palette to evoke the taste and feel of high-quality chocolate.

### 2.2. Color Palette
The site will support both Light and Dark modes, ensuring the "premium" feel translates across both.

**Base Colors:**
- **Cocoa Deep (Primary Dark):** `#2A1B15` (Rich dark chocolate)
- **Cream Vanilla (Primary Light):** `#FDF6E3` (Warm, creamy white)
- **Gold Foil (Accent):** `#D4AF37` (Luxury accent for buttons/highlights)

**Theme Strategies:**
- **Light Mode:**
    - Background: Cream Vanilla
    - Text: Cocoa Deep
    - Cards: White with soft, warm shadows
    - *Vibe:*  Airy, fresh, milk-chocolate aesthetic.
- **Dark Mode:**
    - Background: Cocoa Deep
    - Text: Cream Vanilla
    - Cards: Slightly lighter brown (`#3E2C24`) with Gold borders.
    - *Vibe:*  Intimate, luxurious, dark-chocolate aesthetic.

### 2.3. Typography
- **Headings:** *Playfair Display* (Serif) - To convey elegance and tradition.
- **Body:** *Inter* or *Lato* (Sans-serif) - For clean, readable product descriptions and prices.

### 2.4. Imagery
- **Hero Section:** High-resolution, macro-photography of melting chocolate or breaking chocolate bars.
- **Product Cards:** Floating chocolate visuals with transparent backgrounds to blend seamlessly into themes.

---

## 3. User Experience (UX) & Interface

### 3.1. Landing Page Structure
1.  **Hero Section (The "Hook"):**
    -   Full-screen immersive background video or cinemagraph of pouring chocolate.
    -   Headline: "Indulgence Redefined."
    -   CTA Button: "Shop the Collection" (Gold gradient).
2.  **Featured Collection (The "Scroll"):**
    -   **Horizontal Scrolling Carousel:** Users scroll horizontally to see top-rated chocolates.
    -   **Parallax E ffects:** Floating cocoa beans or texture layers that move at different speeds.

### 3.2. Product Display (The "Shop")
-   **Layout:** Masonry Grid or Infinite Vertical Scroll.
-   **Card Design:**
    -   Image dominates 70% of the card.
    -   Price prominently displayed in Gold.
    -   "Quick Add" button visible on hover.
    -   *Interaction:* Hovering over a box reveals the chocolates inside.

### 3.3. Payment & Checkout flow
-   **Cart Drawer:** Slides in from the right, allowing users to edit orders without leaving the shop.
-   **Checkout:** Minimalist, step-by-step process.
    -   Guest checkout option (mandatory for speed).
    -   Payment Icons prominent (Apple Pay, Google Pay, Visa, Mastercard).

---

## 4. Technical Architecture

### 4.1. Frontend Information
-   **Framework:** Next.js (React) - For SEO optimization and fast page loads.
-   **Styling:** Tailwind CSS - For rapid styling and easy Dark/Light mode implementation (`dark:` class).
-   **State Management:** React Context or Zustand (for Cart state).
-   **Animations:** Framer Motion - For the smooth "scrolling mode" and entry animations.

### 4.2. Backend & Data
-   **CMS (Content Management):** Sanity.io or Contentful (Headless) to manage chocolate inventory, images, and pricing easily.
-   **E-commerce Logic:** Shopify Buy SDK or Stripe Checkout.

### 4.3. Payment Gateway Integration
-   **Primary:** Stripe
    -   Supports direct credit card processing.
    -   Secure 3D Secure handling.
-   **Secondary:** PayPal / Apple Pay (via Stripe).

---

## 5. Security & Accessibility
-   **SSL Certificate:** Essential for payments.
-   **GDPR Compliance:** Cookie consent banner (styled to match theme).
-   **Accessibility (a11y):** High contrast ratios for text (Gold on Brown needs careful balancing), Alt text for all chocolate images.

## 6. Implementation Roadmap (Next Steps)
1.  **Setup:** Initialize Next.js project with Tailwind.
2.  **Assets:** Gather high-res chocolate assets.
3.  **Components:** Build "ProductCard" and "ThemeToggle".
4.  **Pages:** Construct Landing Page with Hero and Infinite Scroll.
5.  **Integration:** Connect Stripe for payments.
