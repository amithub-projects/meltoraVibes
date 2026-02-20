import { CreateHero } from "@/components/CreateHero";
import { ProductScroll } from "@/components/ProductScroll";
import { CategorySections } from "@/components/CategorySections";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream transition-colors duration-300 pt-16">
      <div className="mb-4">
        <AnnouncementBar type="landing" />
      </div>
      <CreateHero />

      <div id="shop" className="scroll-mt-16">
        <AnnouncementBar type="shop" />
        <ProductScroll />
      </div>

      <div id="collections" className="scroll-mt-16">
        <AnnouncementBar type="collection" />
        <CategorySections />
      </div>

      <div id="about" className="scroll-mt-16">
        <AboutSection />
      </div>

      <div id="contact" className="scroll-mt-16">
        <ContactSection />
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
