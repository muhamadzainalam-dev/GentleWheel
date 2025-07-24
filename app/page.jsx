import Hero from "@/components/custom/Hero";
import NavBar from "@/components/custom/NavBar";
import Main from "@/components/custom/Main";
import About from "@/components/custom/About";
import Contact from "@/components/custom/Conatct";
import Footer from "@/components/custom/Footer";
import FAQs from "@/components/custom/FAQs";
import TestimonialsSection from "@/components/custom/Testiminols";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex-col">
        <section>
          <Hero />
        </section>
        <section id="cars" className="pt-25">
          <Main />
        </section>
        <section id="testimonials" className="pt-25">
          <TestimonialsSection />
        </section>
        <section id="about" className="pt-25">
          <About />
        </section>
        <section id="faqs" className="pt-25">
          <FAQs />
        </section>
        <section id="contact" className="pt-25">
          <Contact />
        </section>
        <div className="pt-25">
          <Footer />
        </div>
      </div>
    </div>
  );
}
