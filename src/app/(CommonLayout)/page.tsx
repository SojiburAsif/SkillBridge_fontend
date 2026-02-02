import HeroSection from "@/components/layout/Hero";
import CategorySection from "@/components/layout/Services";
import AboutSection from "@/components/layout/Session";
import TutoreHomeLayout from "@/components/layout/TutoreHomeLayout";
import TutorCard from "@/components/modules/Tutor/TutoreCard";



export default async function Home() {



  return (
    <div className="">
      <HeroSection></HeroSection>
      <TutoreHomeLayout></TutoreHomeLayout>
      <CategorySection></CategorySection>
      <AboutSection></AboutSection>

    </div>
  );
}
