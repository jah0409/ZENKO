import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DeviceShowcase from "../components/DeviceShowcase";
import Pillars from "../components/Pillars";
import Tokenomics from "../components/Tokenomics";
import Presale from "../components/Presale";
import Roadmap from "../components/Roadmap";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zenko-bg text-zenko-text overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <DeviceShowcase />
      <Pillars />
      <Tokenomics />
      <Presale />
      <Roadmap />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
