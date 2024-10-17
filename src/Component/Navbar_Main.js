import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";

const nestedMenuItems = [
  {
    title: "About Us",
    link: "/about-us",
  },
  {
    title: "Our Partners",
    link: "/our-partner",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  {
    title: "Our Team",
    link: "/our-team",
  },
  {
    title: "Gallery",
    link: "/gallery",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = nestedMenuItems.map(({ title, link }, key) => (
    <Link href={link} key={key}>
      <MenuItem>{title}</MenuItem>
    </Link>
  ));
  

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-0 pr-4 font-semibold text-gray-900 text-lg"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              About
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden lg:block   relative z ">
          <Menu
            placement="right-start"
            allowHover
            offset={15}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="pt-3 flex items-center justify-between">
              <Link to="/about-us">
                {" "}
                <MenuItem>
                  About Us
                  {/* <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                /> */}
                </MenuItem>
              </Link>
            </MenuHandler>
            {/* <MenuList className="rounded-xl">{renderItems}</MenuList> */}
          </Menu>
          <Link to="/our-partner">
            <MenuItem>Our Partners</MenuItem>
          </Link>
          <Link to="/pricing">
            <MenuItem>Pricing</MenuItem>
          </Link>
          <Link to="/our-team">
            <MenuItem>Our Team</MenuItem>
          </Link>
          <Link to="/gallery">
            <MenuItem>Gallery</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <div className="block relative z-50 lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between ">
              <Link to="/about-us">
                <MenuItem>About Us</MenuItem>
              </Link>
            </MenuHandler>
            {/* <MenuList className="block rounded-xl lg:hidden">
              {renderItems}
            </MenuList> */}
          </Menu>

          <Link to="/our-partner">
            <MenuItem>Our Partners</MenuItem>
          </Link>
          <Link to="/pricing">
            <MenuItem>Pricing</MenuItem>
          </Link>
          <Link to="/our-team">
            <MenuItem>Our Team</MenuItem>
          </Link>
          <Link to="/gallery">
            <MenuItem>Gallery</MenuItem>
          </Link>
        </Collapse>
      </div>
    </React.Fragment>
  );
}
function NavListMenu2() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = nestedMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem>{title}</MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-0 pr-4  text-gray-900 font-bold text-lg"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Contact
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden lg:block pl-12">
          <Menu
            placement="right-start"
            allowHover
            offset={15}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="pt-3 flex items-center justify-between">
              <Link to="/contact">
                <MenuItem>
                  Contact Us
                  {/* <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                /> */}
                </MenuItem>
              </Link>
            </MenuHandler>
            {/* <MenuList className="rounded-xl">{renderItems}</MenuList> */}
          </Menu>
          <Link to="/faq">
            <MenuItem>FAQs</MenuItem>
          </Link>
          <Link to="/privacy-policy">
            <MenuItem>Privacy Policy</MenuItem>
          </Link>
          <Link to="/term-of-use">
            <MenuItem>Terms of Use</MenuItem>
          </Link>
          <Link to="/term-of-services">
            <MenuItem>Term Of Service</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <div className="block relative z-50 lg:hidden">
        {/* <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem>
                Figma
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="block rounded-xl lg:hidden">
              {renderItems}
            </MenuList>
          </Menu>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </Collapse> */}

        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between ">
              <Link to="/contact">
                <MenuItem>Contact Us</MenuItem>
              </Link>
            </MenuHandler>
            {/* <MenuList className="block rounded-xl lg:hidden">
              {renderItems}
            </MenuList> */}
          </Menu>

          <Link to="/faq">
            <MenuItem>FAQs</MenuItem>
          </Link>
          <Link to="/privacy-policy">
            <MenuItem>Privacy Policy</MenuItem>
          </Link>
          <Link to="/term-of-use">
            <MenuItem>Terms of Use</MenuItem>
          </Link>
          <Link to="/term-of-services">
            <MenuItem>Term Of Service</MenuItem>
          </Link>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList({handleData}) {
  const [state , setState] = useState(null)
  const handleCancel = (value) => {
    setState(value);
    if (handleData) {
      handleData(value); // Call the parent function if it exists
      console.log("state ki value agr chla", value);
    }
    console.log("state ki value agr nhi chla", value);
  };
 
  return (
    <List className="mb-0 mt-0 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1 text-gray-900 ">
      <Link to="/">
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg">
            Home
          </ListItem>
        </Typography>
      </Link>

      <NavListMenu />

      <Link to="/how-it-works">
        <Typography
          as="a"
          href="/"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem
            className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg"
            onClick={()=>handleCancel(false)}
          >
            How It Works
          </ListItem>
        </Typography>
      </Link>
      <Link to="/blogs">
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg">
            Blogs
          </ListItem>
        </Typography>
      </Link>

      <NavListMenu2 />
    </List>
  );
}

export function NavbarMain() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleNavCancel = (value) => {
    console.log("parent ki value", value);
    setOpenNav(value);
  };



  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  let token = sessionStorage.getItem("token");
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    // token = null;
    window.location.reload();

    console.log("token ", token);
  };
  return (
    <Navbar className="px-0 sm:px-2 py-4" id="navbar_main_sticky">
      <div className="flex items-center justify-between text-blue-gray-900 relative ">
        {/* <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Material Tailwind
        </Typography> */}
        <Link to="/" onClick={() => setOpenNav(false)}>
          <img
            src={logo}
            alt="logo"
            className="w-[8rem] translate-y-[-1rem] top-0 fixed"
          ></img>
        </Link>

        <div className="hidden lg:block">
          <NavList handleData={handleNavCancel} />
        </div>
        {token ? (
          <div className="hidden gap-2 lg:flex">
            <Button
              variant="outlined"
              size="sm"
              className="w-[8rem] bg-black text-white font-semibold"
              onClick={handleLogout}
            >
              Logout{" "}
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden gap-2 lg:flex">
              <Link to="/signup">
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-[8rem] bg-black text-white font-semibold"
                 
                >
                  Sign Up {" "}
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-[8rem] bg-black text-white font-semibold"
                
                >
                  Log In
                </Button>
              </Link>
            </div>
          </>
        )}
        <IconButton
          variant="text"
          className="lg:hidden w-10 h-10 flex justify-center items-center"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="pt-3">
          <NavList />
        </div>
        {token ? (
          <div className="flex justify-startgap-2 lg:hidden ">
            <Button
              variant="outlined"
              size="sm"
              className="text-gray-900"
              onClick={handleLogout}
            >
              Logout{" "}
            </Button>
          </div>
        ) : (
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden text-gray-900">
          <Link to="/signup">
            {" "}
            <Button
              variant="outlined"
              size="sm"
              fullWidth
              className="text-gray-900"
              onClick={() => setOpenNav(!openNav)}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outlined"
              size="sm"
              fullWidth
              onClick={() => setOpenNav(!openNav)}
            >
              Log In
            </Button>
          </Link>
        </div>)}
      </Collapse>
    </Navbar>
  );
}
