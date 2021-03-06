import React from "react";
import styles from "./LoginStyles.module.css";
function IntroContainer() {
  //component responsible for Carousel in login page
  return (
    <div className={["col-lg-6", styles.introContainer].join(" ")}>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide loginIntroCarousel"
        data-bs-ride="carousel"
        data-bs-interval="4560"
      >
        <div className="carousel-inner">
          <div className="carousel-item active container-fluid">
            <i className="fas fa-hands-helping fa-10x"></i>
            <h5 style={{marginTop:"5vw"}} className="CarouselHeading gap">Reach out.</h5>
            <p>Stay in your comfort zone.</p>
          </div>
          <div className="carousel-item container-fluid">
            <i className="fas fa-user-shield fa-10x"></i>
            <h5 style={{marginTop:"5vw"}} className="CarouselHeading gap">Stay anonymous.</h5>
            <p>We value your privacy.</p>
          </div>
          <div className="carousel-item container-fluid">
            <i className="fas fa-heartbeat fa-10x"></i>
            <h5 style={{marginTop:"5vw"}} className="CarouselHeading gap"> You have the power to fix it.</h5>
            <p>Mental illness is one of the most un-treated problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroContainer;
