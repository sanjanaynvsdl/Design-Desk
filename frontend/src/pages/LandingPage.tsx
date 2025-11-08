import { NavBar } from "../components/landingpage/nav-bar";
// import { Hero } from "../components/landingpage/hero"; // Original hero - uncomment to use
import { HeroV2 } from "../components/landingpage/hero-v2";
import { KeyFeatures } from "../components/landingpage/key-features";
import { Steps } from "../components/landingpage/steps";
// import { Testimonials } from "../components/landingpage/testimonials"; // Commented out
import { Footer } from "../components/landingpage/footer";

export const LandingPage = ()=>{
    return(
        <div className="w-full min-h-screen bg-white">
            <NavBar />
            {/* Original Hero - Uncomment to use instead of HeroV2 */}
            {/* <Hero /> */}
            {/* New Two-Column Hero */}
            <HeroV2 />
            <Steps />
            <KeyFeatures />
            {/* <Testimonials /> */}
            <Footer />
        </div>
    )
}