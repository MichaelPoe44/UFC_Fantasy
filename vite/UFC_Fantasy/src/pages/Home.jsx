import {Link} from "react-router"
import "../pages_css/Home.css"
import { getStateContext } from "../StateProvider"


export default function Home(){
    const {state, dispatch} = getStateContext();

    return(
        <div className="home">
            <section className="hero">
                <h1>Welcome to UFC Fantasy</h1>
                <p>Build you team. Earn points. Dominate the leaderboard.</p>
                <Link to={state.user ? "/login" : "/league-menu"}>
                    <button className="get_started_button">Get Started</button>
                </Link>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Draft</h3>
                        <p>Pick fighters from each weightclass.</p>
                    </div>
                    <div className="step">
                        <h3>2. Fight</h3>
                        <p>Place your team against your friends team.</p>
                    </div>
                    <div className="step">
                        <h3>3. Win</h3>
                        <p>Win based on real fight stats to get points.</p>
                    </div>
                </div>
            </section>

            <section className="events">
                <h2>Upcoming UFC Events</h2>
                <ul>
                    <li>UFC 305 -- Adesanya vs. Du Plessis -- July 20, 2025</li>
                    <li>Fight Night -- Holm vs. Peña -- August 3, 2025</li>
                    <li>UFC 306 -- Volkanovski vs. Topuria -- August 17, 2025</li>
                </ul>
            </section>

            <footer>
                <p>&copy; 2025 UFC Fantasy. Not affiliated with UFC.</p>
            </footer>
        </div>
    )
}