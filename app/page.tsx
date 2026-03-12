import Menu from "./Menu";
import Link from "next/link";
import "./home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <Menu />
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Unlimited</span> Movies,
            <br />TV Shows & More
          </h1>
          <p className="hero-subtitle">
            Watch anywhere. Cancel anytime.
          </p>
          <Link href="/movies" className="cta-button">
            Browse Movies
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className="hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </div>
    </div>
  );
}
