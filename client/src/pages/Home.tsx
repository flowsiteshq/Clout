import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Crown,
  Disc3,
  Flame,
  Heart,
  MapPin,
  Menu,
  Minus,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";

const visuals = {
  hero: "/manus-storage/clout-hero_2a83a157.jpg",
  rooftop: "/manus-storage/clout-rooftop_bf42d500.jpg",
  social: "/manus-storage/clout-social_1244bf99.jpg",
};

type Scene = {
  id: string;
  name: string;
  neighborhood: string;
  energy: string;
  time: string;
  image: string;
  gradient: string;
  services: { name: string; detail: string; price: number }[];
};

const scenes: Scene[] = [
  {
    id: "noir-social-houston",
    name: "Noir Social House",
    neighborhood: "Montrose · Houston",
    energy: "The main character energy",
    time: "Doors 9 PM",
    image: visuals.hero,
    gradient: "linear-gradient(135deg, #11061f, #260f67 48%, #1554e8)",
    services: [
      { name: "The Velvet Table", detail: "Priority entry · dedicated host", price: 250 },
      { name: "The Spotlight", detail: "Up to 4 · bottle presentation", price: 475 },
      { name: "The Main Floor", detail: "Up to 8 · premium placement", price: 850 },
    ],
  },
  {
    id: "violet-room",
    name: "The Violet Room",
    neighborhood: "River Oaks · Houston",
    energy: "Late dinner, louder after",
    time: "Dinner 8 PM",
    image: visuals.rooftop,
    gradient: "linear-gradient(135deg, #0d0925, #641fcf 55%, #f06fe7)",
    services: [
      { name: "The Dinner Edit", detail: "Chef counter · priority seating", price: 160 },
      { name: "Violet Booth", detail: "Up to 6 · tasting menu", price: 420 },
      { name: "The Private Room", detail: "Up to 12 · host service", price: 900 },
    ],
  },
  {
    id: "skyline-social",
    name: "Afterglow Rooftop",
    neighborhood: "Downtown · Houston",
    energy: "The city looks better from here",
    time: "Sunset 7 PM",
    image: visuals.social,
    gradient: "linear-gradient(135deg, #070b21, #123e9a 50%, #8e2acb)",
    services: [
      { name: "The Sunset Booth", detail: "Up to 4 · skyline view", price: 220 },
      { name: "Sky Table", detail: "Up to 6 · arrival escort", price: 560 },
      { name: "The Horizon", detail: "Up to 10 · private service", price: 1100 },
    ],
  },
];

const addOns = [
  { id: "valet", label: "Valet arrival", detail: "Curbside, no pause", price: 35, icon: Ticket },
  { id: "friends", label: "Bring the group", detail: "Fast lane for your crew", price: 25, icon: UsersRound },
  { id: "celebrate", label: "Make it a moment", detail: "Host note + celebration cue", price: 40, icon: Sparkles },
];

const membershipPlans = [
  { name: "Social", price: "$0", credit: 0, detail: "Explore the city on your terms." },
  { name: "Clout", price: "$99", credit: 25, detail: "Skip the friction. Catch the energy." },
  { name: "Mega Clout", price: "$299", credit: 75, detail: "Your night, handled before it starts." },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function CloutMark() {
  return <span className="clout-mark">C</span>;
}

function Wordmark() {
  return <div className="wordmark-night"><CloutMark /><span>CLOUT</span></div>;
}

function Poster({ scene, className = "" }: { scene: Scene; className?: string }) {
  return <div className={`night-poster ${className}`} style={{ background: scene.gradient }}><img src={scene.image} alt="" /><div className="poster-shade" /><div className="poster-glow" /></div>;
}

function AvatarStack() {
  return <div className="avatar-stack" aria-label="Friends going out"><span>J</span><span>M</span><span>A</span><span>+</span></div>;
}

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene>(scenes[0]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [membership, setMembership] = useState("Clout");
  const [extras, setExtras] = useState<string[]>(["valet"]);
  const [partySize, setPartySize] = useState(2);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const owner = trpc.owner.snapshot.useQuery(undefined, { retry: false });

  const service = selectedScene.services[selectedServiceIndex] ?? selectedScene.services[0];
  const selectedExtras = addOns.filter(addOn => extras.includes(addOn.id));
  const extrasTotal = selectedExtras.reduce((total, addOn) => total + addOn.price, 0);
  const credit = membershipPlans.find(plan => plan.name === membership)?.credit ?? 0;
  const subtotal = service.price + extrasTotal;
  const total = Math.max(0, subtotal - credit);

  const createReservation = trpc.reservation.create.useMutation({
    onSuccess: data => {
      setConfirmation(data.confirmationCode);
      owner.refetch();
    },
    onError: () => toast.error("We couldn’t lock in that reservation. Try it again."),
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  function openBooking(scene = selectedScene) {
    setSelectedScene(scene);
    setSelectedServiceIndex(0);
    setConfirmation(null);
    setBookingOpen(true);
  }

  function chooseScene(scene: Scene) {
    setSelectedScene(scene);
    setSelectedServiceIndex(0);
  }

  function toggleExtra(id: string) {
    setExtras(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  return (
    <main className="night-app">
      <section className="night-hero" id="home">
        <nav className="night-nav container" aria-label="Main navigation">
          <button className="brand-button" onClick={() => scrollTo("home")}><Wordmark /></button>
          <div className="night-nav-links"><button onClick={() => scrollTo("tonight")}>Tonight</button><button onClick={() => scrollTo("social")}>Social</button><button onClick={() => scrollTo("membership")}>Membership</button><button onClick={() => scrollTo("operators")}>For venues</button></div>
          <div className="night-nav-actions"><button onClick={() => toast.info("Sign-in is ready for your Clout account.")}>Sign in</button><Button onClick={() => openBooking()}><span>Get on the list</span><ArrowRight size={15} /></Button></div>
          <button className="night-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </nav>
        {mobileOpen && <div className="night-mobile-nav"><button onClick={() => scrollTo("tonight")}>Tonight</button><button onClick={() => scrollTo("social")}>Social</button><button onClick={() => scrollTo("membership")}>Membership</button><button onClick={() => scrollTo("operators")}>For venues</button><Button onClick={() => openBooking()}>Get on the list <ArrowRight size={15} /></Button></div>}

        <div className="container night-hero-grid">
          <div className="night-hero-copy">
            <div className="electric-label"><span className="live-dot" /> Houston is glowing tonight</div>
            <h1>Make the<br /><em>night yours.</em></h1>
            <p>Find the people, places and little moments worth dressing up for. Clout gets you from “what’s the move?” to right where you belong.</p>
            <div className="hero-actions"><Button size="lg" onClick={() => openBooking()}><Zap size={16} fill="currentColor" /> Claim your spot <ArrowRight size={16} /></Button><button onClick={() => scrollTo("tonight")}>See the pulse <ChevronRight size={17} /></button></div>
            <div className="hero-social-proof"><AvatarStack /><span><b>1,240+ people</b><small>already making plans</small></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-aura aura-one" /><div className="hero-aura aura-two" /><div className="hero-grid-lines" />
            <div className="hero-image-frame"><img src={visuals.hero} alt="Friends enjoying a refined nightlife experience" /><div className="hero-image-overlay" /></div>
            <div className="floating-pass"><div><CloutMark /><span>ONE NIGHT ONLY</span></div><b>Violet<br />Saturdays</b><small>NOIR SOCIAL · 9 PM</small><i><Ticket size={14} /> Reserved</i></div>
            <div className="floating-status"><span className="status-light" /><div><b>18 friends going</b><small>Tap in before 10:30</small></div></div>
            <div className="floating-reaction"><Heart size={15} fill="currentColor" /><span>2.4K</span></div>
          </div>
        </div>
        <div className="night-marquee"><span>NO LONG LINES</span><i>✦</i><span>THE RIGHT PEOPLE</span><i>✦</i><span>YOUR NIGHT, ONE TAP AWAY</span><i>✦</i><span>NO LONG LINES</span><i>✦</i><span>THE RIGHT PEOPLE</span></div>
      </section>

      <section className="tonight-section" id="tonight">
        <div className="container section-topline"><div><p className="electric-label"><Disc3 size={13} /> What’s moving</p><h2>The city has<br /><em>plans for you.</em></h2></div><button className="filter-button" onClick={() => toast.info("Your personalized city filter is coming next.")}>Houston, TX <ChevronRight size={14} /></button></div>
        <div className="container scene-grid">
          {scenes.map((scene, index) => <article key={scene.id} className={`scene-card ${index === 0 ? "scene-card-main" : ""}`}><Poster scene={scene} /><div className="scene-card-body"><div className="scene-meta"><span>{scene.time}</span><span className="scene-live"><i /> Live energy</span></div><h3>{scene.name}</h3><p>{scene.energy}</p><div className="scene-footer"><span><MapPin size={13} /> {scene.neighborhood}</span><button onClick={() => openBooking(scene)}>Reserve <ArrowUpRight size={16} /></button></div></div></article>)}
        </div>
      </section>

      <section className="social-section" id="social">
        <div className="container social-layout">
          <div className="social-image-wrap"><img src={visuals.social} alt="Friends enjoying a club night" /><div className="social-image-gradient" /><div className="social-tag"><Heart size={14} fill="currentColor" /> Loved by the group chat</div></div>
          <div className="social-copy"><p className="electric-label"><UsersRound size={13} /> The social layer</p><h2>Good nights<br />find <em>good people.</em></h2><p>Your Clout profile puts your favorite places, friends, benefits and plans in one beautiful little orbit. Less scrolling. More stories.</p><div className="social-feature-list"><div><span><CircleUserRound size={16} /></span><p><b>Your people, in the know</b><small>See who is going before you decide.</small></p></div><div><span><Crown size={16} /></span><p><b>Your status, seen</b><small>Benefits that feel like a friend at the door.</small></p></div><div><span><WalletCards size={16} /></span><p><b>Your wallet, ready</b><small>Tables, tips and arrivals without the scramble.</small></p></div></div><Button variant="outline" onClick={() => openBooking()}>Start your night <ArrowRight size={16} /></Button></div>
        </div>
      </section>

      <section className="pulse-section container">
        <div className="pulse-heading"><div><p className="electric-label"><Flame size={13} fill="currentColor" /> Social pulse</p><h2>People are <em>talking.</em></h2></div><button onClick={() => toast.info("The Social Feed is ready to connect to authenticated member profiles.")}>Open social feed <ArrowRight size={15} /></button></div>
        <div className="pulse-grid"><article className="pulse-card pulse-card-video"><img src={visuals.rooftop} alt="Rooftop club atmosphere" /><div className="pulse-overlay" /><span className="pulse-poster"><CloutMark /> VIOLET ROOM</span><div><p>“The room was unreal.”</p><small>Posted 18 min ago · <Heart size={12} fill="currentColor" /> 486</small></div></article><article className="pulse-card pulse-card-plan"><div className="plan-card-top"><span>FRI · SEP 26</span><b>9:30 PM</b></div><h3>Violet<br /><em>Saturdays</em></h3><p>at Noir Social House</p><div className="plan-friends"><AvatarStack /><span>+ 18 friends tapped in</span></div><button onClick={() => openBooking(scenes[0])}>Join the plan <ArrowRight size={15} /></button></article><article className="pulse-card pulse-card-connect"><div className="connect-orbit"><span className="orbit-avatar avatar-a">J</span><span className="orbit-avatar avatar-b">A</span><span className="orbit-avatar avatar-c">M</span><span className="orbit-core"><CloutMark /></span></div><h3>Match the<br />energy.</h3><p>See your people. Find your room. Make a move.</p><button onClick={() => toast.info("Connection requests are a protected, member-only feature in the next release.")}>Find your scene <ArrowRight size={15} /></button></article></div>
      </section>

      <section className="membership-night" id="membership"><div className="membership-noise" /><div className="container membership-night-layout"><div><p className="electric-label"><Crown size={13} fill="currentColor" /> Choose your access</p><h2>A little more<br /><em>Clout goes far.</em></h2><p>Join free or pick the level of access that lets the night meet you halfway.</p></div><div className="night-membership-grid">{membershipPlans.map((plan, index) => <article key={plan.name} className={`night-membership-card ${index === 1 ? "night-membership-featured" : ""}`}><div><span>{index === 0 ? "01" : index === 1 ? "02" : "03"}</span>{index === 1 && <i>Most popular</i>}</div><h3>{plan.name}</h3><p>{plan.detail}</p><b>{plan.price}<small>/mo</small></b><ul><li><Check size={14} /> {plan.credit ? `${money(plan.credit)} booking credit` : "Explore all locations"}</li><li><Check size={14} /> {index === 0 ? "Public event access" : "Priority arrival"}</li><li><Check size={14} /> {index === 2 ? "Personal concierge" : "Clout rewards"}</li></ul><Button onClick={() => { setMembership(plan.name); openBooking(); }}>{index === 0 ? "Get started" : `Choose ${plan.name}`} <ArrowRight size={15} /></Button></article>)}</div></div></section>

      <section className="venue-section" id="operators"><div className="container venue-layout"><div><p className="electric-label"><ShieldCheck size={13} /> For the people running the room</p><h2>Keep your<br /><em>scene in sync.</em></h2><p>Clout gives venues a sharper read on guests, bookings, staff attribution, membership revenue and the energy behind every arrival.</p><Button onClick={() => toast.info("Venue onboarding is available by invitation.")}>Bring Clout to your venue <ArrowRight size={16} /></Button></div><div className="venue-console"><div className="console-top"><div><span>NOIR SOCIAL HOUSE</span><b>Tonight’s pulse</b></div><i><span /> Live</i></div><div className="console-stats"><div><span>On the list</span><b>{(owner.data?.reservations ?? 0) + 86}</b><small>+28% from last Friday</small></div><div><span>Guest spend</span><b>${Math.round((owner.data?.revenueCents ?? 0) / 100 + 12840).toLocaleString()}</b><small>Bookings + wallet</small></div></div><div className="console-feed"><span className="console-feed-title">Just happened</span>{owner.data?.recentReservations?.length ? owner.data.recentReservations.slice(0, 3).map(reservation => <div key={reservation.confirmationCode}><span className="console-avatar">{reservation.customerName.slice(0, 1)}</span><p><b>{reservation.customerName}</b><small>{reservation.venueName}</small></p><i>Confirmed</i></div>) : <><div><span className="console-avatar">J</span><p><b>Jordan Taylor</b><small>Mega Clout · Table 12</small></p><i>Confirmed</i></div><div><span className="console-avatar console-avatar-blue">M</span><p><b>Mia Richardson</b><small>Violet Room · 4 guests</small></p><i>Arrived</i></div></>}</div></div></div></section>

      <section className="night-cta container"><div><p className="electric-label"><Sparkles size={13} /> The city is calling</p><h2>Don’t just go out.<br /><em>Go with Clout.</em></h2></div><Button size="lg" onClick={() => openBooking()}><Zap size={16} fill="currentColor" /> Get on the list <ArrowRight size={17} /></Button></section>

      <footer className="night-footer"><div className="container"><Wordmark /><p>Good energy, right on time.</p><div><button onClick={() => scrollTo("tonight")}>Tonight</button><button onClick={() => scrollTo("social")}>Social</button><button onClick={() => scrollTo("membership")}>Membership</button><button onClick={() => scrollTo("operators")}>For venues</button></div><small>© 2026 Clout Experience</small></div></footer>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}><DialogContent className="night-booking-dialog" aria-describedby={undefined}>{confirmation ? <div className="night-booking-success"><div className="success-orbit"><Check size={29} /></div><p className="electric-label">YOU’RE ON THE LIST</p><h2>Let’s make<br /><em>it a night.</em></h2><p>Your place at <b>{selectedScene.name}</b> is set. We’ll have the energy waiting.</p><div className="success-code"><span>YOUR CLOUT CODE</span><b>{confirmation}</b></div><Button onClick={() => setBookingOpen(false)}>Back to Clout <ArrowRight size={16} /></Button></div> : <form onSubmit={event => { event.preventDefault(); const form = new FormData(event.currentTarget); createReservation.mutate({ venueId: selectedScene.id, venueName: selectedScene.name, customerName: String(form.get("name")), email: String(form.get("email")), phone: String(form.get("phone") || ""), reservationDate: String(form.get("date")), reservationTime: String(form.get("time")), partySize, serviceName: service.name, membershipTier: membership, addOns: selectedExtras.map(item => item.label), subtotalCents: subtotal * 100, benefitCents: credit * 100, totalCents: total * 100, referralCode: String(form.get("referral") || "") }); }}><div className="night-booking-heading"><div><p className="electric-label">PICK YOUR SCENE</p><h2>Tonight is<br /><em>already yours.</em></h2></div><div><span>Due today</span><b>{money(total)}</b></div></div><div className="night-booking-layout"><div className="night-booking-controls"><section><Label>Where are we going?</Label><div className="booking-scene-grid">{scenes.map(scene => <button type="button" key={scene.id} className={selectedScene.id === scene.id ? "selected" : ""} onClick={() => chooseScene(scene)}><Poster scene={scene} /><span><b>{scene.name}</b><small>{scene.neighborhood}</small></span><i><Check size={13} /></i></button>)}</div></section><section><Label>Pick your spot</Label><div className="night-service-list">{selectedScene.services.map((item, index) => <button type="button" key={item.name} className={index === selectedServiceIndex ? "selected" : ""} onClick={() => setSelectedServiceIndex(index)}><span><b>{item.name}</b><small>{item.detail}</small></span><strong>{money(item.price)}</strong></button>)}</div></section><div className="night-booking-row"><div><Label htmlFor="night-date">Date</Label><div className="night-input-wrap"><CalendarDays size={15} /><Input id="night-date" name="date" type="date" defaultValue="2026-09-26" required /></div></div><div><Label htmlFor="night-time">Arrival</Label><div className="night-input-wrap"><Clock3 size={15} /><Input id="night-time" name="time" type="time" defaultValue="21:30" required /></div></div><div><Label>Guests</Label><div className="night-stepper"><button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))}><Minus size={14} /></button><span>{partySize}</span><button type="button" onClick={() => setPartySize(Math.min(20, partySize + 1))}><Plus size={14} /></button></div></div></div><section><Label>How are you pulling up?</Label><div className="night-membership-select">{membershipPlans.map(plan => <button type="button" key={plan.name} className={membership === plan.name ? "selected" : ""} onClick={() => setMembership(plan.name)}><span><b>{plan.name}</b><small>{plan.detail}</small></span><strong>{plan.price}</strong></button>)}</div></section><section><Label>Set the tone</Label><div className="night-addon-list">{addOns.map(addOn => { const Icon = addOn.icon; const selected = extras.includes(addOn.id); return <button type="button" key={addOn.id} className={selected ? "selected" : ""} onClick={() => toggleExtra(addOn.id)}><span className="addon-symbol"><Icon size={15} /></span><span><b>{addOn.label}</b><small>{addOn.detail}</small></span><strong>+{money(addOn.price)}</strong><i>{selected && <Check size={12} />}</i></button> })}</div></section><section className="night-guest-inputs"><div><Label htmlFor="night-name">Your name</Label><Input id="night-name" name="name" placeholder="Jordan Taylor" required /></div><div><Label htmlFor="night-email">Email</Label><Input id="night-email" name="email" type="email" placeholder="jordan@example.com" required /></div><div><Label htmlFor="night-phone">Phone <small>(optional)</small></Label><Input id="night-phone" name="phone" placeholder="(713) 555-0123" /></div><div><Label htmlFor="night-referral">Referral <small>(optional)</small></Label><Input id="night-referral" name="referral" placeholder="Who put you on?" /></div></section></div><aside className="night-booking-summary"><Poster scene={selectedScene} /><div className="summary-title"><span>{selectedScene.time}</span><b>{selectedScene.name}</b><small>{selectedScene.neighborhood}</small></div><div className="summary-row"><span>{service.name}</span><b>{money(service.price)}</b></div>{selectedExtras.map(addOn => <div className="summary-row muted" key={addOn.id}><span>{addOn.label}</span><b>{money(addOn.price)}</b></div>)}{credit > 0 && <div className="summary-row credit"><span><Sparkles size={13} /> {membership} credit</span><b>−{money(credit)}</b></div>}<div className="night-summary-total"><span>Due today</span><b>{money(total)}</b></div><p><ShieldCheck size={13} /> This demo creates your reservation and wallet ledger entry. No payment is processed.</p><Button type="submit" size="lg" disabled={createReservation.isPending}>{createReservation.isPending ? "Locking in your night…" : "Get on the list"} <ArrowRight size={16} /></Button><small><Send size={12} /> Confirmation in one tap</small></aside></div></form>}</DialogContent></Dialog>
    </main>
  );
}
