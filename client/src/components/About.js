import React, {Component} from "react";
import "../css/about.css";

class About extends Component {
    render() {
        return (
            <div className="container">
                <ol className="miss">
                    <li className="ms">
                        <span className="v-title">Our Mission</span>
                        <p className="blurb">OneList is about gathering the power of all your
                            favorite music streaming services in one, easy, intuitive spot.</p>
                    </li>
                    <li className="ms">
                        <span className="v-title">Our Future</span>
                        <p className="blurb">From humble beginnings, we hope to become something people love.
                            We don't want to reinvent the wheel. Each of the respective services
                            does an amazing job. We feel centralizing and keeping everything together will
                            allow users to have better experiences</p>
                    </li>
                    <li className="ms">
                        <span className="v-title">Our Costs</span>
                        <p className="blurb">We have no intention of implementing any sort of fees now, or in the future.
                            You already pay your streaming services monthly, you don't need to pay us.</p>
                    </li>
                </ol>
            </div>
        )
    }
}

export default About;