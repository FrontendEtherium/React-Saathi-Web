import React from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import './carousel.css';

const options = {
   margin: 20,
   responsiveClass: true,
   nav: true,
   dots: false,
   autoplay: false,
   smartSpeed: 1000,
   loop: true,
   responsive: {
       0: {
           items: 1,
       },
       600: {
           items: 2,
       },
       700: {
           items: 3,
       },
       1000: {
           items: 4,
       }
   },
};

export default function Carousel1() {
    return (
        <div className="tab-content category" id="choose-category" style={{ maxWidth: "1200px", width: "100%", zIndex: 0 }}>
            <OwlCarousel className="owl-theme" {...options}>
                <div className="item plan-card gold-plan">
                    {/* <h3 className="plan-title">Comprehensive Care</h3> */}
                    <div className="plan-badge gold">Basic</div>
                    <p className="price">$30 <span>per month</span></p><hr></hr>
                    <ul className="features">
                    <li>Weekly phone Updates</li><hr></hr>

                    <li>Phone call</li><hr></hr>
                    <li>One Home Visit</li><hr></hr>

                        <li>Weekly social calls</li><hr></hr>
                        <li>Monthly check-in visit</li>
                        
                    </ul>
                </div>
                <div className="item plan-card platinum-plan">
                    {/* <h3 className="plan-title">Comprehensive Care</h3> */}
                    <div className="plan-badge platinum">Bronze</div>
                    <p className="price">$ 40 <span>per month</span></p><hr></hr>
                    <ul className="features">
                    <li>Two Home Visit</li><hr></hr>

                        <li>Weekly social calls</li><hr></hr>
                        <li>Bi-weekly check-ins</li>
                        
                    </ul>
                </div>
                <div className="item plan-card companion-plan">
                    {/* <h3 className="plan-title">Companion Care</h3> */}
                    <div className="plan-badge companion">Silver</div>
                    <p className="price">$ 60 <span>per month</span></p><hr></hr>
                    <ul className="features">
                    <li>Two visit on the health</li><hr></hr>

                        <li>Bi-weekly check-ins</li><hr></hr>
                        <li>Errands</li><hr></hr>
                        <li>Transportation assistance</li><hr></hr>
                        
                    </ul>
                </div>
                <div className="item plan-card bronze-plan">
                    {/* <h3 className="plan-title">Comprehensive Care</h3> */}
                    <div className="plan-badge bronze">Gold</div>
                    <p className="price">$80 <span>per month</span></p><hr></hr>
                    <ul className="features">
                        <li>Gold	Weekly check-ins</li><hr></hr>
                        <li>daily calls</li><hr></hr>
                        <li>full companion support</li><hr></hr>
                     
                    </ul>
                </div>
            </OwlCarousel>
        </div>
    );
}
