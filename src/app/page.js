import HeroSection from "@/components/hero-section";
import MyWorkSection from "@/components/my-work-section";
import ContactSection from "@/components/contact-section";
export default function Home() {
  return (
   <>
   <div id="Home" className="overflow-hidden">
  <HeroSection/>
   </div>
   
   <div id="Work" className="overflow-hidden">
   <MyWorkSection/>
   </div>
   
   <div id="Contact" className="overflow-hidden">
   <ContactSection/>
   </div>
   </>
  );
}
