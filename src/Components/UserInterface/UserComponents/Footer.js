import React from "react";
import { useStyles } from "./FooterCss";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function HomeFooter() {

  const classes = useStyles();

  return (
    <div className={classes.footerContainer}>
      <div style={{ width: '100%',height:'20%' }}>
        <div className={classes.linkContainer}>
          <div className={classes.links}>
            <h3>COMPANY</h3>
            <a href='#' className={classes.aStyles}>About Us</a>
            <a href='#' className={classes.aStyles}>Term and Condition</a>
            <a href='#' className={classes.aStyles}>Collaboration</a>
            <a href='#' className={classes.aStyles}>Privacy Policy</a>
            <a href='#' className={classes.aStyles}>Shipping Policy</a>
            <a href='#' className={classes.aStyles}>Media</a>
          </div>
          <div className={classes.links}>
            <h3>NEED HELP</h3>
            <a href='#' className={classes.aStyles}>FAQs</a>
            <a href='#' className={classes.aStyles}>Email Us</a>
            <a href='#' className={classes.aStyles}>Return, Refund and Cancellation Policy</a>
            <a href='#' className={classes.aStyles}>Track Order</a>
            <a href='#' className={classes.aStyles}>Carrer</a>
            <a href='#' className={classes.aStyles}>Site Map</a>
          </div>
          <div className={classes.links}>
            <h3>LOCATION</h3>
            13, behind Jhawar Estate Gulabchand Ki<br /> Bagichi, Nehru Colony, Mayur Nagar,<br /> Thatipur, Gwalior, Madhya Pradesh<br /> 474011<br />
            <div> <a href="#" className={classes.aStyles}>arunsharma3882@gmail.com</a></div>
          </div>
          <div className={classes.links}>
            <h3>LETS BE FRIENDS</h3>
            <div className={classes.links2}>
              <a href='#' className={classes.iconStyles}> <FacebookIcon fontSize="large" /></a>
              <a href='#' className={classes.iconStyles}><InstagramIcon fontSize="large" /></a>
              <a href='#' className={classes.iconStyles}> <WhatsAppIcon fontSize="large" /></a>
              <a href='#' className={classes.iconStyles}> <LinkedInIcon fontSize="large" /></a>
            </div>
          </div>
        </div>
        {/* <h5 className={classes.bottom}>Anywhere Fitness, a TT44 Company</h5> */}
      </div>
    </div>
  );
}

