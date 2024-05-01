import React from "react";
import driverimg from "../Images/driver_profile.png";

const Contact = () => {
  return (
    <div className="contactmain ">
      <div>
        <h1 className="cheading001 text-[#000]">Contact Us</h1>
      </div>
      <div>
        <p className="ctext001">Get in touch and let us know how we can help</p>
      </div>
      <div className="c-box-main">
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
        </div>
        {/* <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div> */}
        <div class="form-row flex gap-2">
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
          </div>
          {/* <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div> */}
        </div>
        {/* <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div> */}
        
        <div class="form-group">
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
        </button>
      </form>
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
        </div>
        {/* <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div> */}
        <div class="form-row flex gap-2">
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
          </div>
          {/* <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div> */}
        </div>
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
        <div class="form-group">
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
      </div>
    </div>
  );
};

export default Contact;
