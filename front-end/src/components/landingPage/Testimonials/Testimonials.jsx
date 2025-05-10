import React, { useRef } from "react";
import "./Testimonials.css";
import nextIcon from "../../../assets/next-icon.png";
import backIcon from "../../../assets/back-icon.png";
import user1 from "../../../assets/user-1.png";
import user2 from "../../../assets/user-2.png";
import user3 from "../../../assets/user-3.png";
import user4 from "../../../assets/user-4.png";

const Testimonials = () => {
  const slider = useRef();
  let tX = 0;

  const slideForward = () => {
    if (tX > -50) {
      tX -= 25;
    }
    slider.current.style.transform = `translateX(${tX}%)`;
  };

  const slideBackward = () => {
    if (tX < 0) {
      tX += 25;
    }
    slider.current.style.transform = `translateX(${tX}%)`;
  };

  return (
    <div className="container">
      <div className="testimonials">
        <img
          src={nextIcon}
          alt=""
          className="next-btn"
          onClick={slideForward}
        />
        <img
          src={backIcon}
          alt=""
          className="back-btn"
          onClick={slideBackward}
        />
        <div className="slider">
          <ul ref={slider}>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user1} alt="" />
                  <div>
                    <h3>Emily Williams</h3>
                    <span>USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore natus aut vitae quos, neque et explicabo debitis illum
                  modi magni eaque aliquam temporibus aspernatur veniam beatae
                  veritatis praesentium maiores voluptates?
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user2} alt="" />
                  <div>
                    <h3>William Jackson</h3>
                    <span>Morocco</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore natus aut vitae quos, neque et explicabo debitis illum
                  modi magni eaque aliquam temporibus aspernatur veniam beatae
                  veritatis praesentium maiores voluptates?
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user3} alt="" />
                  <div>
                    <h3>Emily Williams</h3>
                    <span>Germany</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore natus aut vitae quos, neque et explicabo debitis illum
                  modi magni eaque aliquam temporibus aspernatur veniam beatae
                  veritatis praesentium maiores voluptates?
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user4} alt="" />
                  <div>
                    <h3>William Jackson</h3>
                    <span>USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore natus aut vitae quos, neque et explicabo debitis illum
                  modi magni eaque aliquam temporibus aspernatur veniam beatae
                  veritatis praesentium maiores voluptates?
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
