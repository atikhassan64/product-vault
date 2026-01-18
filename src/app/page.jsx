import Feature from "@/component/home/Feature";
import Hero from "@/component/home/Hero";
import Items from "@/component/home/Items";
import Testimonials from "@/component/home/Testimonial";
import Statistics from "@/component/home/Statistics";
import Pricing from "@/component/home/Pricing";
import FAQ from "@/component/home/FAQ";
import Newsletter from "@/component/home/Newsletter";

export default function Home() {
  return (
    <div>
      <Hero />
      <Feature />
      <Testimonials />
      <Items />
      <Statistics />
      <Pricing />
      <FAQ />
      <Newsletter />
    </div>
  );
}
