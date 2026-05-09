import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pillars from "../components/Pillars";
import Tokenomics from "../components/Tokenomics";
import Roadmap from "../components/Roadmap";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Presale from "../components/Presale";

export default function Home() {
  return (
    <main className="min-h-screen bg-zenko-bg text-zenko-text">
      <Header />
      <Hero />
      <Features />
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
