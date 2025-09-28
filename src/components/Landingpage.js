import React from "react";
import "./Navbar.css";

class LandingPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="landing">

                    <div className="Wrapper">
                        <div className="content">
                            <h2 >Welcome to Ak Fireworks</h2>
                            <h1>Happy Diwali 🪔</h1>
                            
                        </div>
                        <div className="para">
                                <p>
                                    Celebrate the festival of lights with joy, prosperity, and happiness.
                                    May this Diwali bring warmth and brightness to your life!
                                </p>
                            </div>
                    </div>
                </div>
            </React.Fragment>


        );
    }
}
export default LandingPage;