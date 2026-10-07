import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  Camera,
  ChefHat,
  Crown,
  MapPin,
  MicVocal,
  Sparkles,
  Star,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const media = {
  hero: "/manus-storage/clout-gold-hero_236c24f3.jpg",
  table: "/manus-storage/clout-gold-table_68e6f0e6.jpg",
  creator: "/manus-storage/clout-creator-card_7ec33220.jpg",
};

const filters = ["All", "Hosting", "Influencer", "Entertainment", "Creator", "Hospitality"];
const gigs = [
  { type: "Hosting", title: "Club Host", venue: "Velvet Room · Houston", pay: "$500+", icon: Crown, image: media.table },
  { type: "Influencer", title: "Restaurant Influencer", venue: "Mila Social · Houston", pay: "$250+", icon: Sparkles, image: media.creator },
  { type: "Hosting", title: "Birthday Party Host", venue: "Private Event · Houston", pay: "$400+", icon: CalendarDays, image: media.table },
  { type: "Creator", title: "Content Creator", venue: "Brand Campaign · Houston", pay: "$350+", icon: Camera, image: media.creator },
  { type: "Entertainment", title: "Live Entertainment", venue: "Rooftop Session · Houston", pay: "$500+", icon: MicVocal, image: media.table },
  { type: "Hospitality", title: "Cook / Chef", venue: "Partner Venue · Houston", pay: "$300+", icon: ChefHat, image: media.creator },
];

function Mark() {
  return <span className="gold-mark"><Crown size={19} fill="currentColor" /><b>C</b></span>;
}

function Logo() {
  return <span className="gold-logo"><Mark /><b>CLOUT</b></span>;
}

function PhoneMock() {
  return (
    <div className="talent-phone" aria-label="Clout mobile application preview">
      <div className="phone-island" />
      <div className="talent-phone-head"><Logo /><span>9:37</span></div>
      <p className="talent-phone-label">AVAILABLE GIGS NEAR YOU</p>
      {gigs.slice(0, 4).map((gig) => (
        <div className="phone-gig" key={gig.title}>
          <img src={gig.image} alt="" />
          <div><b>{gig.title}</b><small>{gig.venue}</small><strong>{gig.pay}</strong></div>
          <span>APPLY</span>
        </div>
      ))}
      <div className="phone-nav"><span className="active">Home</span><span>Bookings</span><span>Messages</span><span>Wallet</span></div>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleGigs = useMemo(() => activeFilter === "All" ? gigs : gigs.filter(gig => gig.type === activeFilter), [activeFilter]);

  return (
    <main className="talent-app">
      <section className="gold-hero" id="top">
        <img className="gold-hero-image" src={media.hero} alt="Clout talent and creators arriving at a luxury nightlife venue" />
        <div className="gold-hero-shade" />
        <div className="gold-spark gold-spark-one" /><div className="gold-spark gold-spark-two" />
        <nav className="gold-nav container">
          <a className="gold-logo-link" href="#top" aria-label="Clout home"><Logo /></a>
          <div className="gold-links"><a href="#opportunities">Opportunities</a><a href="#how-it-works">How it works</a><a href="#bookings">For venues</a></div>
          <a className="gold-nav-cta" href="/join">Join the talent <ArrowRight size={15} /></a>
        </nav>
        <div className="container gold-hero-copy">
          <p className="gold-eyebrow">TALENT <span /> INFLUENCERS <span /> ENTERTAINERS <span /> MODELS</p>
          <h1>Turn your influence<br /><em>into dollars.</em></h1>
          <p className="gold-lede">Get discovered for the city’s best nightlife, hospitality, creator, and entertainment opportunities.</p>
          <div className="gold-hero-actions"><a href="#opportunities" className="gold-button">Explore paid gigs <ArrowRight size={17} /></a><a href="/join" className="gold-text-button">Build your profile <ArrowRight size={15} /></a></div>
          <div className="gold-proof"><span><BadgeDollarSign /> Paid opportunities</span><span><MapPin /> Local bookings</span><span><UsersRound /> Premium venues</span></div>
        </div>
        <p className="hero-side-script">Get booked.<br />Get paid.<br />Grow your brand.</p>
      </section>

      <section className="talent-marquee"><div><span>Nightlife bookings</span><i /> <span>Restaurant visits</span><i /> <span>Club hosting</span><i /> <span>Birthday parties</span><i /> <span>Brand deals</span><i /> <span>Venue bookings</span></div></section>

      <section className="talent-opportunities" id="opportunities">
        <div className="container opportunity-grid">
          <div className="opportunity-intro"><p className="gold-section-kicker"><Sparkles size={14} /> YOUR NEXT MOVE</p><h2>Book work that<br /><em>fits your clout.</em></h2><p>One place to find the rooms, brands, and experiences that are ready to pay for your energy and audience.</p><div className="opportunity-metrics"><div><b>350+</b><span>weekly openings</span></div><div><b>4.9</b><span>talent rating</span></div><div><b>24h</b><span>average review</span></div></div></div>
          <div className="opportunity-photo"><img src={media.table} alt="A VIP nightlife table celebration" /><div className="opportunity-photo-shade" /><div className="opportunity-floating"><Crown size={18} fill="currentColor" /><div><b>Clout Select</b><small>Vetted bookings. Better rooms.</small></div></div></div>
        </div>
      </section>

      <section className="gig-section" id="bookings">
        <div className="container"><div className="gig-heading"><div><p className="gold-section-kicker"><WalletCards size={14} /> LIVE OPPORTUNITIES</p><h2>Available gigs<br /><em>near you.</em></h2></div><a href="/join" className="gold-outline-link">Create your talent profile <ArrowRight size={15} /></a></div><div className="gig-filter-row">{filters.map(filter => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="gig-card-grid">{visibleGigs.map(gig => { const Icon = gig.icon; return <article className="gig-card" key={gig.title}><div className="gig-image"><img src={gig.image} alt="" /><span><Icon size={15} /></span><p>{gig.type}</p></div><div className="gig-card-body"><div><h3>{gig.title}</h3><p><MapPin size={13} /> {gig.venue}</p></div><strong>{gig.pay}</strong></div><a href={`/join?role=${encodeURIComponent(gig.type)}`} className="gig-apply">Apply now <ArrowRight size={15} /></a></article>})}</div></div>
      </section>

      <section className="talent-app-showcase"><div className="container showcase-grid"><div className="showcase-phone-wrap"><div className="gold-ring" /><PhoneMock /></div><div className="showcase-copy"><p className="gold-section-kicker"><Crown size={14} fill="currentColor" /> THE CLOUT APP</p><h2>It’s more than<br /><em>a night out.</em></h2><p>Open one app to discover paid opportunities, manage applications, message venues, and keep your earnings in view.</p><div className="showcase-list"><span><BadgeDollarSign size={18} /><b>New revenue for talent</b><small>Make money from your influence and creativity.</small></span><span><CalendarDays size={18} /><b>Bookings in one place</b><small>Apply, confirm, and show up prepared.</small></span><span><Star size={18} /><b>Grow with every gig</b><small>Build a stronger local reputation.</small></span></div><a href="/join" className="gold-button">Join Clout today <ArrowRight size={17} /></a></div></div></section>

      <section className="steps-section" id="how-it-works"><div className="container"><p className="gold-section-kicker centered"><Sparkles size={14} /> EASY STEPS TO START MAKING MONEY</p><h2>Four moves.<br /><em>Your next opportunity.</em></h2><div className="step-grid"><article><b>01</b><Crown size={21} /><h3>Join Clout</h3><p>Create a profile that puts your personality, availability, and talents in the right rooms.</p></article><article><b>02</b><UsersRound size={21} /><h3>Choose your lane</h3><p>Host, create, influence, entertain, cook, or work the door—your talent belongs here.</p></article><article><b>03</b><CalendarDays size={21} /><h3>Apply to gigs</h3><p>Find the opportunity, make your move, and get in front of verified venue teams.</p></article><article><b>04</b><BadgeDollarSign size={21} /><h3>Get booked &amp; paid</h3><p>Build momentum locally, turn up professionally, and grow your own brand.</p></article></div></div></section>

      <section className="gold-cta"><img src={media.hero} alt="" /><div /><div className="container"><p className="gold-section-kicker"><Crown size={14} fill="currentColor" /> YOUR CITY IS CALLING</p><h2>Real bookings.<br /><em>Real income.</em></h2><p>Same night. Bigger opportunities.</p><a href="/join" className="gold-button">Download Clout app today <ArrowRight size={18} /></a></div></section>

      <footer className="gold-footer"><div className="container"><Logo /><span>© 2026 Clout. Make influence work harder.</span><a href="/join">Join the talent <ArrowRight size={14} /></a></div></footer>
    </main>
  );
}
