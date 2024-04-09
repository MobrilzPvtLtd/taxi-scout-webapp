import React, { useState } from "react";
import accImg from "../Images/driver_profile.png"

const Faq = () => {
  const [visible, setVisible] = useState(false);
  const accord = () => {
    if (visible == false) {
      setVisible(true);
      setVisible2(false);
      setVisible3(false);
    } else {
      setVisible(false);
    }
  };

  const [visible2, setVisible2] = useState(false);
  const accord2 = () => {
    if (visible2 == false) {
      setVisible(false);
      setVisible2(true);
      setVisible3(false);
    } else {
      setVisible2(false);
    }
  };

  const [visible3, setVisible3] = useState(false);
  const accord3 = () => {
    if (visible3 == false) {
      setVisible(false);
      setVisible2(false);
      setVisible3(true);
      setVisible4(false);
      setVisible5(false);
      setVisible6(false);
    } else {
      setVisible3(false);
    }
  };
  const [visible4, setVisible4] = useState(false);
  const accord4 = () => {
    if (visible4 == false) {
      setVisible(false);
      setVisible2(false);
      setVisible3(false);
      setVisible4(true);
      setVisible5(false);
      setVisible6(false);
    } else {
      setVisible4(false);
    }
  };
  const [visible5, setVisible5] = useState(false);
  const accord5 = () => {
    if (visible5 == false) {
      setVisible(false);
      setVisible2(false);
      setVisible3(false);
      setVisible4(false);
      setVisible5(true);
      setVisible6(false);
    } else {
      setVisible5(false);
    }
  };
  const [visible6, setVisible6] = useState(false);
  const accord6 = () => {
    if (visible6 == false) {
      setVisible(false);
      setVisible2(false);
      setVisible3(false);
      setVisible4(false);
      setVisible5(false);
      setVisible6(true);
    } else {
      setVisible6(false);
    }
  };
  return (
    <div>
      <div className="faq-main">
        <div className="faq-head">Do You Have Question?</div>
        <div className="faq-title">We have answer(well, most of times!)</div>
        <div className="faq-text">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </div>
        <div className="faq-img">
          <img src={accImg}></img>
        </div>
      </div>
      <div className="f-line">
        <div className="faq-line"></div>
      </div>
      <div className="accord-main container ">
        <div className="accord-1 container">
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 1</div>
              <button onClick={accord} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible == true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 2</div>
              <button onClick={accord2} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible2 == true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 3</div>
              <button onClick={accord3} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible3 == true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
        </div>

        <div className="accord-2 container">
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 4</div>
              <button onClick={accord4} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible4== true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 5</div>
              <button onClick={accord5} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible5 == true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
          <div className="accord">
            <div className="accord-001">
              <div className="accord-head">accordion 6</div>
              <button onClick={accord6} id="accord-btn">
                {" "}
                &#129174;{" "}
              </button>
            </div>
            {visible6 == true ? (
              <div className="accord-text">
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
