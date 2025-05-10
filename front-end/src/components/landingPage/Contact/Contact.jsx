import React from "react";
import "./Contact.css";
import msgIcon from "../../../assets/msg-icon.png";
import mailIcon from "../../../assets/mail-icon.png";
import phoneIcon from "../../../assets/phone-icon.png";
import locationIcon from "../../../assets/location-icon.png";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8ffdac75-e48e-463c-8ec0-89fe72dccb57");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="container">
      <div className="contact">
        <div className="contact-col">
          <h3>
            Send us a message <img src={msgIcon} alt="" />
          </h3>
          <p>
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptional service to our
            university community.
          </p>
          <ul>
            <li>
              <img src={mailIcon} alt="" />
              Contact@example.com
            </li>
            <li>
              <img src={phoneIcon} alt="" />
              +1 123-456-7890
            </li>
            <li>
              <img src={locationIcon} alt="" />
              77 Massachusetts Ave, Cambridge MA 02139, United States
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label>Your phone number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              required
            />
            <label>Write your message here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 font-semibold py-3.5 px-6 text-[16px] rounded-4xl cursor-pointer  border-0 outline-0 inline-flex justify-center align-center"
            >
              Submit now
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
