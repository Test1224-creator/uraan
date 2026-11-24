import CallToAction from "./components/CallToAction";
import FeaturedHuts from "./components/FeaturedHuts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ResortSlider from "./components/ResortSlider";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <FeaturedHuts />

      <Stats />

      <Services />

      <ResortSlider />

      <Testimonials />

      <CallToAction />

      <Footer />
    </>
  );
}
