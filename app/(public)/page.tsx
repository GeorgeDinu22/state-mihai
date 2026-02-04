import HeroSection from "../../localComponents/HeroSection.jsx";
import AboutMe from "../../localComponents/AboutMe.jsx";
import Testimoniale from "../../localComponents/Testimoniale.jsx";
import BeforeAfter from "../../localComponents/BeforeAfter.jsx";
import Proces from "../../localComponents/Proces.jsx";
import PacheteLoad from "../../localComponents/PacheteLoad.jsx";
import InfiniteCTA from "../../localComponents/CTASection.jsx";
import Header from "@/localComponents/Header.jsx";
import Footer from "@/localComponents/Footer.jsx";

export default function Home() {
  return (
    <>
      <Header/>
      <HeroSection />
      <AboutMe />
      <Testimoniale />
      <BeforeAfter />
      <Proces />
      <PacheteLoad/>
      <InfiniteCTA />
      <Footer/>
    </>
  );
}
