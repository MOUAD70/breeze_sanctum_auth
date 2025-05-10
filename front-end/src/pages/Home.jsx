import React from "react";
import Header from "../components/landingPage/Header/Header";
import About from "../components/landingPage/About/About";
import Testimonials from "../components/landingPage/Testimonials/Testimonials";
import Contact from "../components/landingPage/Contact/Contact";
import Title from "../components/landingPage/Title/Title";
import Programs from "../components/landingPage/Programs/Programs";
import Footer from "../components/landingPage/Footer/Footer";

const Home = () => {
  return (
    <>
      <section id="home">
        <Header />
      </section>
      <section id="services">
        <Title SubTitle="Our Services" Title="What We Offer" />
        <Programs />
      </section>
      <section id="about">
        <Title SubTitle="About us" Title="Everything You Need" />
        <About />
      </section>
      <section id="testimonials">
        <Title SubTitle="Testimonials" Title="What People Says" />
        <Testimonials />
      </section>
      <section id="contact">
        <Title SubTitle="Contact Us" Title="Get In Touch" />
        <Contact />
      </section>
      <Footer />
    </>
  );
};

export default Home;
