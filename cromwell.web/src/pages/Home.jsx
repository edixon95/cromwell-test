import "../assets/css/home.css";
import Card from "../components/shared/Card";

const Home = () => {
    return (
        <div id="homeContainer">
            <Card height="80%">
                <div className="informationDiv">
                    <div className="textContainer">
                        <div className="textContent">
                            <h2>Meet the Swiss Army Hammer</h2>
                            <p>The ultimate multi-hammer that's almost too versatile.</p>

                            <ul className="features">
                                <li>Need to drive a nail? There's a hammer for that</li>
                                <li>... That's about all it does but think of all the choice!</li>
                            </ul>

                            <div className="disclaimer">
                                <span>
                                    While the Swiss Army Hammer boasts a dazzling array of interchangeable heads, grips, handles, and an utterly unnecessary Bluetooth syncing feature, we feel it is our ethical responsibility to inform users that - despite the grandeur of its name and the sleek anodized titanium accents - the Swiss Army Hammer is, at its core, a hammer.
                                </span>

                                <span>
                                    It does not saw. It does not screw. It cannot open bottles, remove splinters, purify water, or charge your phone (anymore). It does not contain a flashlight, toothpick, corkscrew, compass, nor does it include any functionality that might traditionally be expected from a multitool, Swiss-made or otherwise.
                                </span>

                                <span>
                                    In fact, of the 37 possible configurations, 36 are objectively less ergonomic than a standard hammer. But they do look cool - in a sort of "this was designed by a committee that had never built anything" way. We recognize that customers may experience a brief sense of buyer's remorse upon realizing that the only real function - and we emphasize only - is hammering.
                                </span>

                                <span>
                                    That said, if you're looking for a hammer, this is one. It is, inarguably, a hammer. And what it lacks in utility, it more than makes up for in over-engineering, mystique, and the smug satisfaction of owning a hammer with a fold-out side panel labeled "Settings."
                                </span>

                                <span>
                                    Nail not included.
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="imageContainer">
                        <div className="hammerImage radiusRight" />
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default Home;