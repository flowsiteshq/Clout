import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Crown,
  Heart,
  MapPin,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Stars,
  UsersRound,
  WandSparkles,
} from "lucide-react";

const media = {
  hero: "/manus-storage/clout-ai-night_4a3107ad.jpg",
  creator: "/manus-storage/clout-ai-creator_b2618bde.jpg",
  venue: "/manus-storage/clout-ai-venue_f12b8d67.jpg",
};

const nights = [
  { title: "Violet Saturdays", venue: "Noir Social House", time: "Tonight · 10:30 PM", tag: "High energy", image: media.hero },
  { title: "Dinner after dark", venue: "Mila Social", time: "Tonight · 8:15 PM", tag: "Tables moving", image: media.venue },
  { title: "The penthouse hour", venue: "Afterglow Rooftop", time: "Tonight · 11:00 PM", tag: "Your kind of crowd", image: media.creator },
];

const moments = [
  { title: "Book a table", copy: "Reserve the moment without the group-text spiral.", icon: CalendarDays, action: "Start a plan" },
  { title: "Request a host", copy: "Add the right energy to the room, the night, or the launch.", icon: Crown, action: "Find a host" },
  { title: "Bring your crew", copy: "Share the plan, collect the yeses, and arrive together.", icon: UsersRound, action: "Create a crew" },
];

function Mark() {
  return <span className="clout-mark">C</span>;
}

function Logo() {
  return <span className="clout-logo"><Mark /><b>CLOUT</b></span>;
}

export default function Home() {
  const [saved, setSaved] = useState<string[]>([]);
  const toggleSave = (name: string) => setSaved(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);

  return (
    <main className="clout-site">
      <section className="consumer-hero" id="top">
        <img className="consumer-hero-image" src={media.hero} alt="Friends enjoying a colorful upscale night out" />
        <div className="consumer-hero-shade" />
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <nav className="consumer-nav container">
          <a href="#top" aria-label="Clout home"><Logo /></a>
          <div className="consumer-links"><a href="#tonight">Tonight</a><a href="#create">Create your night</a><a href="#ecosystem">For partners</a></div>
          <div className="consumer-nav-actions"><a href="/night" className="nav-text-link">My night</a><a href="/join" className="nav-pill">Join Clout <ArrowRight size={14} /></a></div>
        </nav>
        <div className="container consumer-hero-copy">
          <p className="eyebrow"><Sparkles size={13} /> CL OUT AI · HOUSTON AFTER DARK</p>
          <h1>Make the<br /><em>night yours.</em></h1>
          <p className="hero-copy">The people, places, and plans worth showing up for—organized around your energy, your crew, and your city.</p>
          <div className="hero-actions"><a href="#tonight" className="violet-button">See tonight <ArrowRight size={16} /></a><a href="#create" className="ghost-link">Create a plan <ArrowRight size={15} /></a></div>
          <div className="hero-trust"><span><UsersRound size={17} /> Your people, in the loop</span><span><MapPin size={17} /> The right place, right now</span><span><CalendarDays size={17} /> Plans that actually happen</span></div>
        </div>
        <div className="hero-ai-card"><span><WandSparkles size={15} /> CLOUT AI PICK</span><b>“Start at Mila, then move to Noir around 10:30.”</b><small>Built around your saved places, crew, and tonight’s energy.</small></div>
      </section>

      <section className="night-strip"><div><span>REAL PEOPLE</span><i /> <span>AMAZING PLACES</span><i /> <span>EFFORTLESS PLANS</span><i /> <span>BRIGHTER NIGHTS</span></div></section>

      <section className="tonight-section" id="tonight"><div className="container"><div className="section-heading"><div><p className="eyebrow"><Stars size={13} /> TONIGHT, CURATED</p><h2>Your city has<br /><em>a pulse.</em></h2></div><p>Clout shows the rooms where the music is right, your people are moving, and the night is becoming a story.</p></div><div className="night-card-grid">{nights.map((night, index) => <article className={`night-card card-${index + 1}`} key={night.title}><img src={night.image} alt="" /><div className="night-card-shade" /><button className={saved.includes(night.title) ? "saved" : ""} onClick={() => toggleSave(night.title)} aria-label={`Save ${night.title}`}><Heart size={17} fill={saved.includes(night.title) ? "currentColor" : "none"} /></button><div className="night-card-copy"><p>{night.tag}</p><h3>{night.title}</h3><span>{night.venue} <i /> {night.time}</span><a href="/night">See the details <ArrowRight size={14} /></a></div></article>)}</div></div></section>

      <section className="create-section" id="create"><div className="container create-layout"><div className="create-copy"><p className="eyebrow"><WandSparkles size={13} /> A NIGHT, MADE FOR YOU</p><h2>Less planning.<br /><em>More living.</em></h2><p>Tell Clout what kind of night you want. It puts the place, people, and moments into one smooth plan—so the group chat finally has a destination.</p><a href="/night" className="violet-button">Build my night <ArrowRight size={16} /></a></div><div className="plan-console"><div className="console-head"><div><span>Tonight’s plan</span><b>Friday in Houston</b></div><button><Sparkles size={14} /> Refresh</button></div><div className="console-vibe"><span>VIBE</span><div><button className="active">Elevated</button><button>Social</button><button>Unplanned</button></div></div><div className="plan-steps"><div><i>01</i><span><b>Dinner</b><small>Mila Social · 8:15 PM</small></span><ChevronRight size={15} /></div><div><i>02</i><span><b>Meet the crew</b><small>4 friends confirmed · 9:45 PM</small></span><ChevronRight size={15} /></div><div><i>03</i><span><b>Nightcap</b><small>Noir Social House · 10:30 PM</small></span><ChevronRight size={15} /></div></div><a href="/night">Open my night <ArrowRight size={15} /></a></div></div></section>

      <section className="moments-section"><div className="container"><div className="section-heading compact"><div><p className="eyebrow"><Crown size={13} /> MAKE IT A MOMENT</p><h2>It’s not about<br /><em>the price.</em></h2></div><p>Every booking starts with the experience you want. Details, availability, and the final cost are handled directly in the profile conversation.</p></div><div className="moment-grid">{moments.map(moment => { const Icon = moment.icon; return <article key={moment.title}><Icon size={22} /><h3>{moment.title}</h3><p>{moment.copy}</p><a href="/night">{moment.action} <ArrowRight size={14} /></a></article>})}</div></div></section>

      <section className="ai-story"><div className="container ai-story-layout"><div className="ai-image"><img src={media.creator} alt="Clout creator in a nightlife setting" /><div className="ai-image-glow" /><span><WandSparkles size={15} /> Clout AI signals</span></div><div className="ai-copy"><p className="eyebrow"><WandSparkles size={13} /> THE SOCIAL LAYER</p><h2>The night gets<br /><em>more personal.</em></h2><p>Clout AI learns the energy you return to, the rooms your crew loves, and the experiences you save—then makes discovery feel more like instinct.</p><div className="ai-notes"><span><Sparkles size={15} /> Picks based on your saved energy</span><span><MessageCircleHeart size={15} /> Crew-aware plans, not generic lists</span><span><ShieldCheck size={15} /> Thoughtful suggestions, on your terms</span></div></div></div></section>

      <section className="ecosystem-section" id="ecosystem"><div className="container"><div className="ecosystem-heading"><p className="eyebrow"><UsersRound size={13} /> ONE CITY, THREE EXPERIENCES</p><h2>Clout works because<br /><em>everybody belongs.</em></h2></div><div className="ecosystem-grid"><article className="ecosystem-card consumer"><span>01 · CONSUMERS</span><h3>Create your night.</h3><p>Discover places, build plans, request bookings, and keep the night moving.</p><a href="/night">Open my night <ArrowRight size={14} /></a></article><article className="ecosystem-card talent"><span>02 · TALENT &amp; SERVICES</span><h3>Build your profile.</h3><p>Creators, hosts, service professionals, and entertainers manage partnerships and requests.</p><a href="/talent">Explore talent portal <ArrowRight size={14} /></a></article><article className="ecosystem-card partner"><span>03 · HOSPITALITY &amp; VENDORS</span><h3>Run a better room.</h3><p>Venues and partners manage staffing, subscription access, demand, and the guest experience.</p><a href="/partner">Open partner portal <ArrowRight size={14} /></a></article></div><a className="ops-entry" href="/ops"><span><ShieldCheck size={16} /> CLOUT OPERATIONS</span><b>See staffing performance, guest spend, bookings, and tonight’s operating pulse.</b><ArrowRight size={17} /></a></div></section>

      <footer className="clout-footer"><div className="container"><Logo /><span>Good people. Brighter nights.</span><div><a href="/talent">Talent</a><a href="/partner">Partners</a><a href="/ops">Operations</a></div></div></footer>
    </main>
  );
}
