import React, { useState, useEffect } from "react";
import { config } from "../../common/config/config";
import AboutUs from "./AboutUs";
import ImageCarousel from "./Carousel";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";

import { Spinner } from "react-activity";
import { Helmet } from "react-helmet";
import Axios from "axios";
import ScrollToTop from "../../common/utils/ScrollToTop";
import { useCookies } from "react-cookie";
import PopUp from "./PopUp";
import moment from "moment";
import CookieConsent from "react-cookie-consent";

function HomePage() {
  const path = config();
  const [loading, setLoading] = useState(true);
  const [carouselData, setCarouselData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(true);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);

  useEffect(() => {
    Axios.all([
      Axios.get(path + "home/carousel", {})
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setCarouselData(data);
        })
        .catch((e) => {
          console.log(e);
        }),
      Axios.get(path + "home/about", {})
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setAboutUsData(data);
        })
        .catch((e) => {
          console.log(e);
        }),
      Axios.get(path + "home/testimonials", {})
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setLoading(false);
          setTestimonialData(data);
        })
        .catch((e) => {
          console.log(e);
        }),
      Axios.get(
        "https://www.eventbriteapi.com/v3/organizations/464741062423/events/?token=2SWITQPH72SPNCSRK7OW&page_size=55"
      )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          let currentTime = moment().format().slice(0, 10);
          let futureEvents = data.events.filter(
            (event) => event.start.local.slice(0, 10) > currentTime
          );
          setCount(futureEvents.length);
        }),
    ]);
  }, []);

  const onClickButton = () => {
    setOpen(!open);
  };

  return (
    <>
      <Helmet>
        <title>Home | Professional Development Club</title>
      </Helmet>
      {loading ? (
        <div className="loadingState">
          <Spinner color="#727981" size={35} speed={1} animating={true} />
        </div>
      ) : (
        <>
          <CookieConsent
            onAccept={() => {
              setCookieConsentAccepted(true);
            }}
            location="bottom"
            buttonText="I Understand"
            style={{ background: "rgba(0, 0, 0, 0.9)", color: "white" }}
          >
            <span style={{ fontSize: "17px" }}>
              NOTICE:
              <br />
            </span>
            <span style={{ fontSize: "14px" }}>
              This website uses cookies to deliver an enhanced user experience.
            </span>
          </CookieConsent>
          {(cookieConsentAccepted || cookies.CookieConsent) && (count > 0) && open && !cookies.popUpShown ? (
            <>
              <PopUp toggle={onClickButton} />
              {
                setCookie("popUpShown", true, { path: "/", maxAge: 86400 ,httpOnly:1, secure:1 }) //1 day expiry
              }
            </>
          ) : null}
          <ScrollToTop />
          <ImageCarousel carouselData={carouselData} />
          <AboutUs aboutUsData={aboutUsData} />
          <Testimonials testimonialData={testimonialData} />
          <ContactUs />
          
        </>
      )}
    </>
  );
}

export default HomePage;
