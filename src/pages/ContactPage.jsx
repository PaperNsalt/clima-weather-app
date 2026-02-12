import { FacebookIcon, GithubIcon2, InstagramIcon2, LinkedInIcon } from "../components/IconComponent";
import SocialSection from "../components/ContactComponent";



function ContactPage(){
  return(
    <>
    <section className="mt-6 md:mt-10 px-4 md:px-10 max-w-5xl mx-auto mb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <SocialSection
      icon={FacebookIcon} 
        name="Facebook" 
        color="bg-blue-400/30" // The color of the glow behind the card
        href="https://facebook.com"
      />

      <SocialSection
      icon={InstagramIcon2} 
        name="Instagram" 
        color="bg-orange-400/30" // The color of the glow behind the card
        href="https://facebook.com"
      />

      <SocialSection
      icon={GithubIcon2} 
        name="Github" 
        color="bg-[#a70cfa]/20" // The color of the glow behind the card
        href="https://facebook.com"
      />

      <SocialSection
      icon={LinkedInIcon} 
        name="Github" 
        color="bg-[#0a66c2]/30" // The color of the glow behind the card
        href="https://facebook.com"
      />
    </div>
    </section>
    </>
  );
}

export default ContactPage;