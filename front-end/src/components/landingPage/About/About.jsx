import React from "react";
import "./About.css";
import aboutImg from "../../../assets/about.png";

const About = () => {
  return (
    <div className="container">
      <div className="about">
        <div className="about-left">
          <img src={aboutImg} alt="" className="about-img" />
        </div>
        <div className="about-right">
          <h2>About Us</h2>
          <p>
            At SSIAP, we are dedicated to providing high-quality fire safety
            services to ensure the well-being of individuals, communities, and
            businesses.
          </p>
          <p>
            With years of experience in the field, our team of trained
            professionals is committed to offering the best solutions to prevent
            and respond to emergencies. Our mission is to promote safety through
            prevention, training, and rapid intervention.
          </p>
          <p>
            We specialize in fire protection, emergency medical assistance, and
            ensuring that all buildings comply with safety regulations. Whether
            it’s through regular training, safety audits, or immediate
            intervention, our team is here to provide peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
