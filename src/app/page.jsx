import Feature from "@/component/home/Feature";
import Hero from "@/component/home/Hero";
import Items from "@/component/home/Items";
import Testimonials from "@/component/home/Testimonial";


export default function Home() {
  return (
    <div>
      <Hero />
      <Feature />
      <Testimonials />
      <Items />
    </div>
  );
}
