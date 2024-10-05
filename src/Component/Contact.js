import React from "react";
import driverimg from "../Images/driver_profile.png";

const Contact = () => {
  return (
    <div className="contactmain">
      <div className="cu_overlay"></div>
      <div className="cu_parent">
      <div>
        <h1 className="cheading001 text-[#000]">Contact Us</h1>
        <p className="cutext001">
          For any inquiries, suggestions, or booking requests, we are always
          here to assist you. You can reach us through various channels:
        </p>
      </div>
      <div className="cu container">
        <div className="cu01">
          <div className="cu_icon_box">
            <div className="cu_icon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div className="cu_icon_box_text">
              <div className="cu_icon_box_heading">Address</div>
              <div className="cu_icon_box_para">
                <a href="https://www.google.com/maps/place/Heuerweg+7,+5605+Dottikon,+Switzerland/@47.3799924,8.2367955,17z/data=!3m1!4b1!4m6!3m5!1s0x479016a53ee815d1:0x1854f2a463f62d90!8m2!3d47.3799888!4d8.2393704!16s%2Fg%2F11cs5_9hmv?entry=ttu">
                  Heuerweg 7<br /> 5605 Dottikon
                  <br /> Switzerland
                </a>
              </div>
            </div>
          </div>
          <div className="cu_icon_box">
            <div className="cu_icon">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </div>
            <div className="cu_icon_box_text">
              <div className="cu_icon_box_heading">Email</div>
              <div className="cu_icon_box_para">
                Simply drop us an email
                <br /> at
                <a className="cu_link" href="mailto:info@taxiscout24">
                  {" "}
                  info@taxiscout24.com
                </a>
                , and <br />
                we'll promptly attend to your query.
              </div>
            </div>
          </div>
          <div className="cu_icon_box">
            <div className="cu_icon">
              <i class="fa fa-phone" aria-hidden="true"></i>
            </div>
            <div className="cu_icon_box_text">
              <div className="cu_icon_box_heading">Phone</div>
              <div className="cu_icon_box_para">
                You can also reach us by phone
                <br /> at
                <a className="cu_link" href="tel:+ 41 56 544 14 10.">
                  {" "}
                  + 41 56 544 14 10.
                </a>{" "}
                Our friendly
                <br /> customer service team is available
                <br /> Monday through Sunday from 8:00 am to 8:00 pm
              </div>
            </div>
          </div>
        </div>
        <div className="cu02">
          <form className="">
            <div class="form-row flex gap-2">
              <div class="form-group col-md-6">
                <label for="inputEmail4"></label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputText4"></label>
                <input
                  type="text"
                  class="form-control"
                  id="inputText4"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress"></label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Address line 1"
              />
            </div>
            <div class="form-group">
              <label for="inputAddress2">x</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Address line 2"
              />
            </div>
            <div class="form-row flex gap-2">
              <div class="form-group col-md-6">
                <label for="inputCity"></label>
                <input type="text" class="form-control" id="inputCity" placeholder="City" />
              </div>
              <div class="form-group col-md-4">
                <label for="inputState"></label>
                <select id="inputState" class="form-control">
                  <option selected>State...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip"></label>
                <input type="text" class="form-control" id="inputZip" placeholder="Zip" />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress"></label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Write your Enquiry"
              />
            </div>
            <button type="submit" class="btn btn-primary bg-black" id="btn_cu">
              submit
            </button>
          </form>
        </div>
      </div>

      {/* <div>
        <p className="ctext001">Get in touch and let us know how we can help</p>
      </div> */}
      {/* <div className="c-box-main">
        <div className="c-box001">
          <div className="cimage">
            <img className="h-[100px] " src={driverimg}></img>
          </div>
          <div className="ctitle">sales</div>
          <div className="ctext">
            Get in touch and let us know how we can help
          </div>
        </div>
        <div className="c-box001">
          <div className="cimage">
            <img className="h-[100px]" src={driverimg}></img>
          </div>
          <div className="ctitle">sales</div>
          <div className="ctext">
            Get in touch and let us know how we can help
          </div>
        </div>
        <div className="c-box001">
          <div className="cimage">
            <img className="h-[100px] " src={driverimg}></img>
          </div>
          <div className="ctitle">sales</div>
          <div className="ctext">
            Get in touch and let us know how we can help
          </div>
        </div>
      </div>
      <div className="contact-form container flex gap-40 pb-10">
      <form className="w-[25vw]">
        <div class="form-row flex gap-2">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputText4">Full name</label>
            <input
              type="text"
              class="form-control"
              id="inputText4"
              placeholder="Full Name"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div> */}
      {/* <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div> */}
      {/* <div class="form-row flex gap-2">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div> */}
      {/* <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div> */}
      {/* </div> */}
      {/* <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div> */}

      {/* <div class="form-group">
          <label for="inputAddress">Comments</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Write your comments"
          />
        </div>
        <button type="submit" class="btn btn-primary bg-black">
        submit
        </button> */}
      {/* </form>
      <form className="w-[25vw]">
        <div class="form-row flex gap-2">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputText4">Full name</label>
            <input
              type="text"
              class="form-control"
              id="inputText4"
              placeholder="Full Name"
            />
          </div>
        </div> */}
      {/* <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div> */}
      {/* <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div> */}
      {/* <div class="form-row flex gap-2">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div> */}
      {/* <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div> */}
      {/* <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div> */}
      {/* </div> */}
      {/* <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div> */}
      {/* <button type="submit" class="btn btn-primary">
          Sign in
        </button> */}
      {/* <div class="form-group">
          <label for="inputAddress">Enquiry</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Write your Enquiry"
          />
        </div>
        <button type="submit" class="btn btn-primary bg-black">
        submit
        </button>
        
      </form>
      </div> */}
    </div>
    </div>
  );
};

export default Contact;
