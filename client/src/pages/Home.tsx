import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlay,
  Crown,
  Diamond,
  Eye,
  Gift,
  Heart,
  MapPin,
  MessageCircleHeart,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  UsersRound,
  Video,
  WalletCards,
  X,
} from "lucide-react";

const logo = "/manus-storage/0f3d458e-3e78-4482-b68e-ad76925226a8_58f87301.png";
const media = {
  hero: "/manus-storage/clout-luxury-hero-web_879f5e81.jpg",
  violet: "/manus-storage/clout-violet-saturdays-web_ba0d388b.jpg",
  penthouse: "/manus-storage/clout-penthouse-web_4f9bb0cf.jpg",
  dinner: "/manus-storage/clout-dinner-after-dark-web_3f2ae39a.jpg",
  houston: "/manus-storage/clout-houston-destination-web_4344a466.jpg",
};

const experiences = [
  { title: "Violet Saturdays", eyebrow: "SIGNATURE NIGHT", copy: "Music, movement, and a room that knows how to come alive.", image: media.violet },
  { title: "The Penthouse", eyebrow: "VIP EXPERIENCE", copy: "Private rooms, elevated energy, and space for the night to unfold.", image: media.penthouse },
  { title: "Dinner After Dark", eyebrow: "DINNER & NIGHTLIFE", copy: "Dine, drink, and follow the energy wherever it takes you.", image: media.dinner },
  { title: "Exclusive VIP Events", eyebrow: "MEMBERS-ONLY", copy: "Invitation-only moments designed for the Clout community.", image: media.houston },
];

const plans = [
  {
    name: "Social Clout", price: "Free", accent: "social", benefits: ["Pre-admission payment", "Event booking & special reservations", "Public club menu access"],
  },
  {
    name: "Clout Membership", price: "$99.99", suffix: "/ month", accent: "clout", benefits: ["25 communication coins", "VIP table booking access", "Valet reservation access"],
  },
  {
    name: "Mega Clout", price: "$299", suffix: "/ month", accent: "mega", benefits: ["50 signing bonus communication coins", "Priority VIP table booking", "Priority entertainer reserve"],
  },
  {
    name: "Ultra Clout", price: "$499", suffix: "/ month", accent: "ultra", benefits: ["100 signing bonus communication coins", "Private event invites", "Priority VIP entry"],
  },
  {
    name: "Boss Clout", price: "$1,000", suffix: "/ month", accent: "boss", benefits: ["150 signing bonus communication coins", "Private Clout event invites", "Gold Check verification availability"],
  },
];

function Logo({ footer = false }: { footer?: boolean }) {
  return <img className={footer ? "lux-logo lux-logo-footer" : "lux-logo"} src={logo} alt="Clout Digital Experience" />;
}

function PhonePreview({ type }: { type: "discover" | "live" }) {
  const live = type === "live";
  return (
    <div className={`lux-phone ${live ? "lux-phone-live" : ""}`} aria-label={live ? "Clout live experience preview" : "Clout discovery experience preview"}>
      <span className="lux-phone-island" />
      <div className="lux-phone-top"><img src={logo} alt="" /><span>{live ? "LIVE" : "9:41"}</span></div>
      {live ? <>
        <img className="lux-phone-cover" src={media.dinner} alt="" />
        <div className="lux-live-pill"><i /> LIVE · THE VIOLET ROOM</div>
        <div className="lux-live-comments"><span><b>Renee S.</b> This energy is everything.</span><span><b>J. Taylor</b> Save me a spot.</span></div>
        <div className="lux-phone-reactions"><Heart size={15} fill="currentColor" /><Gift size={15} /><MessageCircleHeart size={15} /></div>
      </> : <>
        <p className="lux-phone-label">DISCOVER</p>
        <div className="lux-phone-search"><Search size={13} /> Search places, events, or people</div>
        <div className="lux-phone-tabs"><span className="active">For you</span><span>Events</span><span>VIP</span></div>
        <img className="lux-phone-cover" src={media.violet} alt="" />
        <div className="lux-phone-event"><span>TONIGHT</span><b>Violet Saturdays</b><small>Houston · Members can request access</small></div>
        <div className="lux-phone-people"><img src={media.dinner} alt="" /><div><b>People you may know</b><small>Connect before the night starts</small></div><ChevronRight size={14} /></div>
      </>}
      <div className="lux-phone-nav"><span className={!live ? "active" : ""}>Home</span><span>Explore</span><span className={live ? "active" : ""}>Live</span><span>Profile</span></div>
    </div>
  );
}

export default function Home() {
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("Clout Membership");
  const [locationsOpen, setLocationsOpen] = useState(false);
  const toggleSaved = (title: string) => setSaved(current => current.includes(title) ? current.filter(item => item !== title) : [...current, title]);

  return (
    <main className="lux-home">
      <section className="lux-hero" id="top">
        <img className="lux-hero-photo" src={media.hero} alt="Stylish guests arriving for a luxury Houston nightlife experience" />
        <div className="lux-hero-shade" />
        <div className="lux-hero-glow" />
        <nav className="lux-nav container">
          <a className="lux-logo-link" href="#top" aria-label="Clout home"><Logo /></a>
          <div className="lux-nav-links"><a href="#experiences">Experiences</a><a href="#events">Events</a><a href="#app">The app</a><a href="#locations">Locations</a><a href="#membership">Membership</a></div>
          <div className="lux-nav-actions"><a href="/night">My night</a><a className="lux-login" href="/talent">Talent portal</a><a className="lux-join" href="#membership">Join Clout <ArrowRight size={13} /></a></div>
        </nav>
        <div className="container lux-hero-copy">
          <p className="lux-eyebrow">HOUSTON, TX <i /> DIGITAL MEETS REAL LIFE</p>
          <h1>Make the<br /><em>night yours.</em></h1>
          <p>Exclusive people. Extraordinary experiences.</p>
          <span>Book tables, connect with entertainers, access members-only events, and experience premium nightlife in person and through the Clout app.</span>
          <div className="lux-hero-buttons"><a className="lux-gold-button" href="#membership">Join Clout <ArrowRight size={15} /></a><a className="lux-watch-button" href="#experiences"><CirclePlay size={17} /> Watch the experience</a></div>
        </div>
        <div className="container lux-hero-features"><span><Crown size={17} /> Exclusive events</span><span><Video size={17} /> Live streams</span><span><CalendarDays size={17} /> Book entertainers</span><span><Diamond size={17} /> VIP access</span></div>
      </section>

      <section className="lux-experience" id="experiences">
        <div className="container"><div className="lux-section-lead"><div><p className="lux-eyebrow">THE EXPERIENCE</p><h2>Your city<br />has <em>a pulse.</em></h2></div><div><p>Clout brings the best of nightlife, entertainment, and digital experiences together. Discover events, book your crew, and find the moments that move you.</p><a className="lux-gold-button small" href="#events">Explore events <ArrowRight size={14} /></a></div></div>
        <div className="lux-experience-grid" id="events">{experiences.map((experience, index) => <article className={`lux-experience-card card-${index + 1}`} key={experience.title}><img src={experience.image} alt="" /><div className="lux-experience-overlay" /><button onClick={() => toggleSaved(experience.title)} className={saved.includes(experience.title) ? "saved" : ""} aria-label={`Save ${experience.title}`}><Heart size={16} fill={saved.includes(experience.title) ? "currentColor" : "none"} /></button><div><p>{experience.eyebrow}</p><h3>{experience.title}</h3><span>{experience.copy}</span><a href="/night">Request access <ArrowRight size={14} /></a></div></article>)}</div></div>
      </section>

      <section className="lux-membership" id="membership">
        <div className="container"><div className="lux-membership-lead"><div><p className="lux-eyebrow">MEMBERSHIP TIERS</p><h2>More access.<br />More <em>experiences.</em></h2></div><p>Choose the level of access that fits how you move. Membership benefits and availability are applied by location and experience.</p></div>
        <div className="lux-plan-grid">{plans.map((plan, index) => <article className={`lux-plan ${plan.accent} ${selectedPlan === plan.name ? "selected" : ""}`} key={plan.name}><div className="lux-plan-icon">{index === 4 ? <Crown size={18} /> : index === 3 ? <Diamond size={18} /> : <Sparkles size={18} />}</div><p>{plan.name}</p><b>{plan.price}<small>{plan.suffix}</small></b><ul>{plan.benefits.map(benefit => <li key={benefit}><Check size={13} /> {benefit}</li>)}</ul><button onClick={() => setSelectedPlan(plan.name)}>{selectedPlan === plan.name ? "Selected" : "Explore tier"} <ArrowRight size={14} /></button></article>)}</div>
        <p className="lux-membership-note"><ShieldCheck size={14} /> You’re exploring <b>{selectedPlan}</b>. Experience access, booking availability, and benefits are confirmed in your member profile.</p></div>
      </section>

      <section className="lux-app-section" id="app"><div className="container lux-app-grid"><div className="lux-app-copy"><p className="lux-eyebrow">THE CLOUT APP</p><h2>Clout<br /><em>on demand.</em></h2><p>Discover people and places, request services, watch live moments, and keep your next night close—wherever you are.</p><a className="lux-gold-button" href="/night">Explore the experience <ArrowRight size={15} /></a></div><div className="lux-phones"><PhonePreview type="discover" /><PhonePreview type="live" /></div><div className="lux-app-features"><span><Eye size={16} /> Model & entertainer profiles</span><span><Video size={16} /> Live streaming</span><span><MessageCircleHeart size={16} /> Coin-based messaging</span><span><CalendarDays size={16} /> Booking services</span><span><Gift size={16} /> In-app gifts</span><span><Ticket size={16} /> Event reservations</span><small>Product experience preview. App-store availability will be announced separately.</small></div></div></section>

      <section className="lux-lifestyle"><img src={media.hero} alt="Stylish nightlife guest in Houston" /><div className="lux-lifestyle-shade" /><div className="container lux-lifestyle-content"><div><p className="lux-eyebrow">WHY CLOUT</p><h2>It’s more than<br />a night out.<br /><em>It’s a lifestyle.</em></h2><p>From exclusive events to unforgettable people, Clout is where nightlife, entertainment, and digital experiences come together.</p><a className="lux-gold-button small" href="#membership">Join the experience <ArrowRight size={14} /></a></div><div className="lux-pillars"><article><UsersRound size={22} /><b>Real people</b><span>Meaningful connections and unforgettable encounters.</span></article><article><MapPin size={22} /><b>Amazing places</b><span>Premium Houston nightlife experiences.</span></article><article><Crown size={22} /><b>Unforgettable nights</b><span>Exclusive digital and in-person entertainment.</span></article></div></div></section>

      <section className="lux-location" id="locations"><img src={media.houston} alt="Luxury Houston nightlife destination" /><div className="lux-location-shade" /><div className="container lux-location-content"><p className="lux-eyebrow">HOUSTON, TX</p><h2>Our home.<br /><em>Your playground.</em></h2><p>Houston is where the Clout story begins. Location listings are published only when a participating business is confirmed.</p><button className="lux-outline-button" onClick={() => setLocationsOpen(true)}>View locations <ArrowRight size={14} /></button><small><MapPin size={13} /> Confirmed partner locations will appear here as they go live.</small></div></section>

      <section className="lux-final"><img src={media.penthouse} alt="Houston skyline and premium nightlife" /><div /><div className="container"><p className="lux-eyebrow">PEOPLE <i /> PLACES <i /> PARTIES <i /> POSSIBILITIES</p><h2>Step into the <em>experience.</em></h2><a className="lux-gold-button" href="#membership">Join Clout <ArrowRight size={15} /></a></div></section>

      {locationsOpen && <div className="lux-location-dialog-backdrop" role="presentation" onClick={() => setLocationsOpen(false)}><section className="lux-location-dialog" role="dialog" aria-modal="true" aria-labelledby="locations-dialog-title" onClick={event => event.stopPropagation()}><button className="lux-dialog-close" onClick={() => setLocationsOpen(false)} aria-label="Close locations notice"><X size={17} /></button><MapPin size={23} /><p className="lux-eyebrow">HOUSTON LOCATIONS</p><h2 id="locations-dialog-title">The list is<br /><em>coming to life.</em></h2><p>We only publish participating locations after their availability is confirmed. Join Clout to receive the first location drops and event invitations.</p><a className="lux-gold-button" href="#membership" onClick={() => setLocationsOpen(false)}>Explore membership <ArrowRight size={14} /></a></section></div>}

      <footer className="lux-footer"><div className="container"><Logo footer /><span>© 2026 Clout Digital Experience</span><div><a href="/talent">Talent & services</a><a href="/partner">Hospitality partners</a><a href="/ops">Operations</a></div></div></footer>
    </main>
  );
}
