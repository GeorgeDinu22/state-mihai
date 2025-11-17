import Image from "next/image";
import HeroSection from '../localComponents/HeroSection.jsx';
import AboutMe from '../localComponents/AboutMe'
import Stats from '../localComponents/Stats'
import Video from '../localComponents/Video'
import Testimoniale from '../localComponents/Testimoniale'
import BeforeAfter from '../localComponents/BeforeAfter';
import Proces from '../localComponents/Proces';
import Pachete from '../localComponents/Pachete';
import InfiniteCTA from '../localComponents/CTASection';

export default function Home() {
  return (
    <>
    <HeroSection/>
    <AboutMe/>
    <Stats/>
    <Testimoniale/>
    <Video/>
    <BeforeAfter/>
    <Proces/>
    <Pachete/>
    <InfiniteCTA/>
    </>
  );
}
