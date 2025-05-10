import React from "react";
import "./Programs.css";
import program1 from "../../../assets/program-1.jpg";
import program2 from "../../../assets/program-2.png";
import program3 from "../../../assets/program-3.jpg";
import { CheckCheck, CircleFadingArrowUp, ShieldCheck } from "lucide-react";

const Programs = () => {
  return (
    <div className="container">
      <div className="programs">
        <div className="program">
          <img src={program1} alt="" />
          <div className="caption">
            <CheckCheck className="scale-150 mb-2" />
            <p>Specialized Solutions</p>
          </div>
        </div>
        <div className="program">
          <img src={program2} alt="" />
          <div className="caption">
            <ShieldCheck className="scale-200 mb-4" />
            <p>Core Fire Safety Services</p>
          </div>
        </div>
        <div className="program">
          <img src={program3} alt="" />
          <div className="caption">
            <CircleFadingArrowUp className="scale-150 mb-2" />
            <p>Technology Integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
