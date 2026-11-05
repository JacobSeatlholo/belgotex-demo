import { Navbar } from "@/components/belgotex/navbar";
import { Hero } from "@/components/belgotex/hero";
import { Marquee } from "@/components/belgotex/marquee";
import { Products } from "@/components/belgotex/products";
import { NewArrivals } from "@/components/belgotex/new-arrivals";
import { Story } from "@/components/belgotex/story";
import { Why } from "@/components/belgotex/why";
import { B2B } from "@/components/belgotex/b2b";
import { Contact } from "@/components/belgotex/contact";
import { Footer } from "@/components/belgotex/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ece8e5]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Products />
        <NewArrivals />
        <Story />
        <Why />
        <B2B />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
