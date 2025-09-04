
import { Header } from "@/components/header";
import HeroSection from "@/components/hero-section";
import MyWorkSection from "@/components/my-work-section";
import ContactSection from "@/components/contact-section";
import FloatingButtons from "@/components/floating-buttons";

export default function Home() {
  return (
   <>
   <Header/>
   <HeroSection/>
   <MyWorkSection/>
   <ContactSection/>
   <FloatingButtons/>
   </>
  );
}
