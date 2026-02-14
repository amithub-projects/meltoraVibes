import { CreateHero } from "@/components/CreateHero";
import { ProductScroll } from "@/components/ProductScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream dark:bg-cocoa transition-colors duration-300">
      <CreateHero />
      <div id="shop">
        <ProductScroll />
      </div>

      <footer className="py-10 border-t border-cocoa/10 dark:border-cream/10 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-cocoa/60 dark:text-cream/60 font-sans">
            &copy; {new Date().getFullYear()} Meltora Vibes. Crafted with passion.
          </p>
        </div>
      </footer>
    </main>
  );
}
