// Importing React and necessary modules
import React from "react";
import classes from "./Footer.module.css"; // Importing styles for the footer
import { SlSocialFacebook } from "react-icons/sl"; // Social media icon
import { FaInstagram } from "react-icons/fa"; // Instagram icon
import { FiYoutube } from "react-icons/fi"; // YouTube icon
import { Link } from "react-router-dom"; // Link for navigation

function Footer() {
  return (
    <div className={classes.outer_container}>
      <div className={classes.container}>
        <div>
          {/* Logo Section */}
          <div>
            <Link to="/home">
              <img
                src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
                alt="evangadi logo"
              />
            </Link>
          </div>
          {/* Social Media Icons */}
          <div className={classes.icons}>
            <Link to="#">
              <SlSocialFacebook color="white" size={38} />
            </Link>
            <Link to="#">
              <FaInstagram color="white" size={38} />
            </Link>
            <Link to="#">
              <FiYoutube color="white" size={38} />
            </Link>
          </div>
        </div>
        <div>
          {/* Useful Links Section */}
          <h2>Useful Links</h2>
          <Link to="#">
            <p>How it works</p>
          </Link>
          <Link to="#">
            <p>Terms of service</p>
          </Link>
          <Link to="#">
            <p>Privacy policy</p>
          </Link>
        </div>
        <div>
          {/* Contact Info Section */}
          <h2>Contact Info</h2>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+202-111-111-1111</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
