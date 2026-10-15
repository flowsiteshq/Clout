import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlay,
  Crown,
  Diamond,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  UsersRound,
  Video,
  X,
  Zap,
} from "lucide-react";

const logo = "/manus-storage/0f3d458e-3e78-4482-b68e-ad76925226a8_58f87301.png";
const media = {
  hero: "/manus-storage/clout-exotic-hero-web_995980bb.jpg",
  show: "/manus-storage/clout-exotic-show-web_4febcf71.jpg",
  vip: "/manus-storage/clout-latina-lounge-web_65ae15de.jpg",
  performers: "/manus-storage/clout-exotic-profile-web_1021dad3.jpg",
  city: "/manus-storage/clout-houston-destination-web_4344a466.jpg",
};

const accessCards = [
  { title: "Live show access", label: "AFTER DARK", copy: "Discover venue experiences, signature shows, and the people defining the night.", image: media.show, action: "Explore tonight's shows" },
  { title: "The VIP signal", label: "CONCIERGE", copy: "Start with your pace, your crew, and the kind of room you want to walk into.", image: media.vip, action: "Build a VIP request" },
  { title: "Talent & hosts", label: "CLOUT PEOPLE", copy: "Explore verified entertainer and host profiles designed for the right kind of connection.", image: media.performers, action: "Meet the people" },
  { title: "City arrival", label: "HOUSTON", copy: "Your Clout profile keeps your plans, preferences, and access close for the next night out.", image: media.city, action: "Plan my night" },
];

const plans = [
  { name: "Social", price: "Free", level: "01", tone: "social", benefits: ["Pre-admission payment", "Event booking & special reservations", "Public club menu access"] },
  { name: "Clout", price: "$99.99", level: "02", tone: "clout", benefits: ["25 communication coins", "VIP table booking access", "Valet reservation access"] },
  { name: "Mega", price: "$299", level: "03", tone: "mega", benefits: ["50 signing bonus communication coins", "Priority VIP table booking", "Priority entertainer reserve"] },
  { name: "Ultra", price: "$499", level: "04", tone: "ultra", benefits: ["100 signing bonus communication coins", "Private event invites", "Priority VIP entry"] },
  { name: "Boss", price: "$1,000", level: "05", tone: "boss", benefits: ["150 signing bonus communication coins", "Private Clout event invites", "Gold Check verification availability"] },
];

function Logo({ small = false }: { small?: boolean }) {
  return <img className={small ? "after-logo after-logo-small" : "after-logo"} src={logo} alt="Clout Digital Experience" />;
}

function RequestModal({ subject, onClose }: { subject: string; onClose: () => void }) {
  return <div className="after-modal-backdrop" role="presentation" onClick={onClose}>
    <section className="after-modal" role="dialog" aria-modal="true" aria-labelledby="request-title" onClick={event => event.stopPropagation()}>
      <button className="after-modal-close" onClick={onClose} aria-label="Close access request"><X size={18} /></button>
      <div className="after-modal-icon"><Sparkles size={21} /></div>
      <p className="after-kicker">CLOUT ACCESS REQUEST</p>
      <h2 id="request-title">Start with<br /><em>the signal.</em></h2>
      <p>You selected <b>{subject}</b>. Continue to My Night to build a request around your date, crew, venue preferences, and member access.</p>
      <div className="after-modal-points"><span><ShieldCheck size={14} /> No public booking costs are shown</span><span><MapPin size={14} /> Availability is confirmed by the venue</span></div>
      <a className="after-gold-cta" href="/night" onClick={onClose}>Continue to My Night <ArrowRight size={15} /></a>
    </section>
  </div>;
}

export default function Home() {
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("Clout");
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState<string | null>(null);
  const toggleSaved = (title: string) => setSaved(items => items.includes(title) ? items.filter(item => item !== title) : [...items, title]);
  const openRequest = (subject: string) => setRequestSubject(subject);

  return (
    <main className="after-site">
      <section className="after-hero" id="top">
        <img className="after-hero-image" src={media.hero} alt="Black and Latina women arriving at an exclusive Houston nightlife experience" />
        <div className="after-hero-shade" />
        <div className="after-hero-grid" />
        <nav className="after-nav container">
          <a href="#top" aria-label="Clout home"><Logo /></a>
          <div className="after-nav-links"><a href="#discover">Discover</a><a href="#shows">Shows</a><a href="#vip">VIP access</a><a href="#membership">Membership</a></div>
          <div className="after-nav-actions"><a href="/night">My night</a><a href="/talent">Talent</a><a className="after-nav-join" href="#membership">Join Clout <ArrowRight size={13} /></a></div>
        </nav>
        <div className="container after-hero-layout">
          <div className="after-hero-copy">
            <p className="after-kicker"><span /> HOUSTON, TX · AFTER DARK</p>
            <h1>The city<br /><em>after dark.</em></h1>
            <p className="after-hero-lede">A new access layer for people, premium nightlife, shows, and adult-entertainment venues.</p>
            <p className="after-hero-description">Find your room. Meet the energy. Keep every part of the night—your crew, your favorites, your access—in one place.</p>
            <div className="after-hero-buttons"><a className="after-gold-cta" href="#discover">Explore tonight <ArrowRight size={15} /></a><button className="after-ghost-cta" onClick={() => openRequest("a curated Clout night")}><CirclePlay size={17} /> How Clout works</button></div>
          </div>
          <aside className="after-hero-card">
            <div className="after-card-top"><span><i /> TONIGHT'S SIGNAL</span><button onClick={() => toggleSaved("Tonight's Signal")} aria-label="Save tonight's signal"><Heart size={16} fill={saved.includes("Tonight's Signal") ? "currentColor" : "none"} /></button></div>
            <img src={media.show} alt="" />
            <div className="after-card-overlay" />
            <div className="after-card-copy"><p>HOUSTON · DOORS 8 PM</p><h2>Violet<br /><em>after hours.</em></h2><span>Show energy, private lounge pacing, and a reason to make the next move.</span><button onClick={() => openRequest("Violet after hours")}>Request access <ArrowUpRight size={15} /></button></div>
          </aside>
        </div>
        <div className="after-hero-rail"><div className="container"><span><Crown size={15} /> Member access</span><span><Video size={15} /> Live moments</span><span><UsersRound size={15} /> People & hosts</span><span><Ticket size={15} /> Venue requests</span><span><Diamond size={15} /> VIP concierge</span></div></div>
      </section>

      <div className="after-ticker" aria-label="Clout experiences"><div><b>GOOD PEOPLE</b><i /> BRIGHT NIGHTS <i /> <b>HOUSTON AFTER DARK</b><i /> VIP ROOMS <i /> SHOWS <i /> CREWS <i /> <b>GOOD PEOPLE</b><i /> BRIGHT NIGHTS <i /> <b>HOUSTON AFTER DARK</b></div></div>

      <section className="after-discover" id="discover">
        <div className="container">
          <div className="after-section-heading"><div><p className="after-kicker"><span /> DISCOVER YOUR NIGHT</p><h2>Not just where<br />you go. <em>How it feels.</em></h2></div><div><p>Clout organizes the moving pieces of premium nightlife—from polished dinner arrivals to adult entertainment, performer discovery, and VIP services—so the night feels like yours.</p><button onClick={() => openRequest("a tailored nightlife request")}>Start with your vibe <ArrowRight size={15} /></button></div></div>
          <div className="after-access-grid" id="shows">{accessCards.map((card, index) => <article className={`after-access-card card-${index + 1}`} key={card.title}><img src={card.image} alt="" /><div className="after-access-shade" /><div className="after-access-number">0{index + 1}</div><button className={saved.includes(card.title) ? "saved" : ""} onClick={() => toggleSaved(card.title)} aria-label={`Save ${card.title}`}><Heart size={16} fill={saved.includes(card.title) ? "currentColor" : "none"} /></button><div className="after-access-copy"><p>{card.label}</p><h3>{card.title}</h3><span>{card.copy}</span><button onClick={() => openRequest(card.title)}>{card.action} <ArrowRight size={14} /></button></div></article>)}</div>
        </div>
      </section>

      <section className="after-showcase" id="vip">
        <div className="container after-showcase-grid">
          <article className="after-showcase-photo"><img src={media.show} alt="Professional Black and Latina performers in a premium stage show" /><div className="after-showcase-photo-shade" /><div className="after-show-tag"><Sparkles size={14} /> FEATURED AFTER DARK</div><div className="after-show-details"><span>SHOW · LOUNGE · EXPERIENCE</span><b>Come for<br />the <em>moment.</em></b><button onClick={() => openRequest("a featured after-dark show")}>Explore show access <ArrowUpRight size={15} /></button></div></article>
          <article className="after-showcase-copy"><p className="after-kicker"><span /> BUILT FOR THE FULL NIGHT</p><h2>See the people.<br /><em>Set the tone.</em></h2><p>Clout is designed for sophisticated nightlife, entertainment, and adult-entertainment venues. Explore exclusive event energy, send a request, and let verified venue teams confirm the right access.</p><div className="after-show-stats"><div><Crown size={17} /><b>VIP pacing</b><span>Your plans, preferences, and invitations in one place.</span></div><div><UsersRound size={17} /><b>People first</b><span>Discover hosts, entertainers, and social connections with intent.</span></div><div><ShieldCheck size={17} /><b>Venue led</b><span>Availability and access rules are set by participating locations.</span></div></div><a className="after-inline-link" href="/night">Open My Night <ArrowRight size={15} /></a></article>
        </div>
      </section>

      <section className="after-person-section">
        <div className="container after-person-grid"><div className="after-person-copy"><p className="after-kicker"><span /> PEOPLE WITH A PRESENCE</p><h2>The right<br /><em>energy finds you.</em></h2><p>Clout profiles give adult entertainers, hosts, creators, and service professionals a polished way to share their availability, partnerships, and requested experiences—on their terms.</p><a className="after-gold-cta" href="/talent">Explore talent access <ArrowRight size={15} /></a><a className="after-secondary-link" href="/join">Create a Clout profile <ChevronRight size={16} /></a></div><div className="after-person-visual"><img src={media.performers} alt="Professional Black and Latina performers backstage at an entertainment venue" /><div className="after-person-card"><span><ShieldCheck size={14} /> VERIFIED PEOPLE</span><b>Profiles with<br />a <em>point of view.</em></b><p>Hosts, creators, performers, and venue teams are made visible through the Clout network.</p><button onClick={() => openRequest("talent and host discovery")}>Discover profiles <ArrowUpRight size={15} /></button></div><div className="after-person-chip"><div><Star size={13} fill="currentColor" /> FEATURED</div><span>Real people.<br />Better nights.</span></div></div></div>
      </section>

      <section className="after-membership" id="membership">
        <div className="container"><div className="after-membership-heading"><div><p className="after-kicker"><span /> YOUR ACCESS, ELEVATED</p><h2>There’s a<br /><em>level for that.</em></h2></div><div><p>Membership keeps the right experiences closer. Every tier is subject to each participating venue’s availability and access rules.</p><span><ShieldCheck size={14} /> Booking requests never show public costs.</span></div></div>
        <div className="after-tier-line">{plans.map(plan => <article className={`after-tier ${plan.tone} ${selectedPlan === plan.name ? "selected" : ""}`} key={plan.name}><div className="after-tier-top"><span>LEVEL {plan.level}</span><Diamond size={15} /></div><h3>{plan.name} <b>{plan.price}<small>{plan.price === "Free" ? "" : " / month"}</small></b></h3><ul>{plan.benefits.map(benefit => <li key={benefit}><Check size={12} /> {benefit}</li>)}</ul><button onClick={() => setSelectedPlan(plan.name)}>{selectedPlan === plan.name ? "Your selection" : "Explore this level"} <ArrowRight size={14} /></button></article>)}</div>
        <div className="after-tier-selection"><span><Zap size={15} /> <b>{selectedPlan}</b> is selected for exploration.</span><button onClick={() => openRequest(`${selectedPlan} membership`)}>Ask about this level <ArrowRight size={14} /></button></div></div>
      </section>

      <section className="after-places" id="locations"><img src={media.city} alt="Houston nightlife destination with luxury vehicles and guests" /><div className="after-places-shade" /><div className="container after-places-content"><p className="after-kicker"><span /> HOUSTON, TEXAS</p><h2>Meet the city<br /><em>where it moves.</em></h2><p>Partner locations arrive in Clout when their experience, access, and availability are confirmed. Until then, start with the signal and keep your night ready.</p><div><button className="after-outline-button" onClick={() => setLocationsOpen(true)}>See the city drop <ArrowRight size={14} /></button><a href="/partner">Partner with Clout <ArrowUpRight size={14} /></a></div></div></section>

      <section className="after-final"><img src={media.vip} alt="Premium lounge moment shared by Black and Latina women" /><div className="after-final-shade" /><div className="container"><p className="after-kicker"><span /> MAKE IT A CLOUT NIGHT</p><h2>Your night<br />starts <em>with access.</em></h2><p>People, places, show energy, and the perfect reason to go out.</p><div><button className="after-gold-cta" onClick={() => openRequest("a Clout night")}>Start my night <ArrowRight size={15} /></button><a className="after-final-link" href="/join">Join the Clout team <ArrowUpRight size={15} /></a></div></div></section>

      {locationsOpen && <div className="after-modal-backdrop" role="presentation" onClick={() => setLocationsOpen(false)}><section className="after-modal after-location-modal" role="dialog" aria-modal="true" aria-labelledby="location-title" onClick={event => event.stopPropagation()}><button className="after-modal-close" onClick={() => setLocationsOpen(false)} aria-label="Close locations notice"><X size={18} /></button><div className="after-modal-icon"><MapPin size={21} /></div><p className="after-kicker">HOUSTON CITY DROP</p><h2 id="location-title">The list is<br /><em>loading in.</em></h2><p>Clout only publishes participating venue locations after the experience and availability are confirmed. Join the membership signal for the first location drops.</p><a className="after-gold-cta" href="#membership" onClick={() => setLocationsOpen(false)}>Explore membership <ArrowRight size={15} /></a></section></div>}
      {requestSubject && <RequestModal subject={requestSubject} onClose={() => setRequestSubject(null)} />}

      <footer className="after-footer"><div className="container"><Logo small /><span>© 2026 Clout Digital Experience · 21+ access where required</span><div><a href="/night">My night</a><a href="/talent">Talent</a><a href="/partner">Partners</a><a href="/ops">Operations</a></div></div></footer>
    </main>
  );
}
