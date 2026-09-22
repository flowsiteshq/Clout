import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  Crown,
  Heart,
  Home as HomeIcon,
  MapPin,
  Menu,
  MessageCircleHeart,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Ticket,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";

const media = {
  hero: "/manus-storage/clout-crowd-hero_bf7b39f6.jpg",
  party: "/manus-storage/clout-hero_2a83a157.jpg",
  rooftop: "/manus-storage/clout-rooftop_bf42d500.jpg",
  friends: "/manus-storage/clout-social_1244bf99.jpg",
};

type Venue = { id: string; name: string; location: string; energy: number; guests: number; image: string; price: number };
const venues: Venue[] = [
  { id: "noir-social-houston", name: "Noir Social House", location: "Nightlife · Houston, TX", energy: 91, guests: 312, image: media.party, price: 250 },
  { id: "violet-room", name: "The Violet Room", location: "Rooftop Lounge · 0.8 mi", energy: 88, guests: 147, image: media.rooftop, price: 420 },
  { id: "afterglow", name: "Afterglow", location: "Downtown · 1.2 mi", energy: 86, guests: 94, image: media.friends, price: 220 },
];
const plans = [
  { name: "Social", price: "$0", note: "Explore the city", perks: ["Explore the city", "Save your favorites", "Basic access"] },
  { name: "Clout", price: "$99", note: "The move, on lock", perks: ["Priority guest lists", "Members-only events", "Monthly credits", "Clout+ badge"] },
  { name: "Mega Clout", price: "$299", note: "For the unforgettable", perks: ["VIP experiences", "Personal concierge", "Exclusive events", "All Clout+ benefits"] },
];

function Mark() { return <span className="mark">C</span>; }
function Logo() { return <div className="reference-logo"><Mark /><span>CLOUT</span></div>; }
function Avatar({ letter, color = "violet" }: { letter: string; color?: string }) { return <span className={`person-avatar ${color}`}>{letter}</span>; }
function AvatarRow() { return <div className="avatar-row"><Avatar letter="J" color="pink" /><Avatar letter="A" color="blue" /><Avatar letter="M" color="gold" /><Avatar letter="S" color="violet" /><span className="more-avatar">+3</span></div>; }

function PhoneNav({ active }: { active: "Tonight" | "Explore" | "Plans" | "Clout" | "Profile" }) {
  const items = [["Tonight", HomeIcon], ["Explore", Search], ["Plans", CalendarDays], ["Clout", UsersRound], ["Profile", CircleUserRound]] as const;
  return <div className="phone-nav">{items.map(([name, Icon]) => <div key={name} className={active === name ? "active" : ""}><Icon size={14} /><span>{name}</span></div>)}</div>;
}

function TonightPhone({ onBook }: { onBook: () => void }) {
  return <div className="phone-frame phone-home"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><div className="phone-head"><Mark /><Bell size={16} /></div><h3>Tonight in<br /><em>Houston</em></h3><p className="tiny-date">Saturday, Sep 20 · 9:41 PM</p><div className="stat-row"><div><UsersRound size={16} /><b>23</b><small>Places Active</small></div><div><UsersRound size={16} /><b>8</b><small>Friends Out</small></div><div><Sparkles size={16} /><b>3</b><small>For Your Vibe</small></div></div><div className="hot-title"><span>🔥 HOT RIGHT NOW</span><button onClick={() => toast.info("The live list is about to open.")}>See all <ChevronRight size={11} /></button></div><div className="mini-event"><img src={media.party} alt="Purple club lights" /><div className="mini-shade" /><Heart className="event-heart" size={16} /><div className="mini-event-copy"><h4>Violet Saturdays</h4><p>Noir Social House</p><div><span>🔥 91% energy</span><span><MapPin size={10} /> 1.2 mi</span></div><AvatarRow /><button onClick={onBook}>Join the Plan</button></div></div><PhoneNav active="Tonight" /></div>;
}

function ExplorePhone({ onBook }: { onBook: () => void }) {
  return <div className="phone-frame phone-explore"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><h3>Explore</h3><div className="phone-search"><Search size={13} /><span>Search venues, events or cuisine</span></div><div className="filter-row"><span className="selected">All</span><span>Nightlife</span><span>Lounges</span><span>Rooftops</span></div><div className="map-surface"><i className="road road-one" /><i className="road road-two" /><i className="road road-three" /><span className="map-pulse" /><span className="map-person pin-one"><Avatar letter="A" color="pink" /></span><span className="map-person pin-two"><Avatar letter="M" color="blue" /></span><span className="map-person pin-three"><Avatar letter="J" color="gold" /></span><span className="map-person pin-four"><Avatar letter="S" /></span></div><div className="map-listing"><img src={media.rooftop} alt="Rooftop club" /><div><h4>The Violet Room</h4><p>Rooftop Lounge · 0.8 mi</p></div><Ticket size={15} /></div><PhoneNav active="Explore" /></div>;
}

function VenuePhone({ onBook }: { onBook: () => void }) {
  return <div className="phone-frame phone-venue"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><div className="venue-image"><img src={media.party} alt="Noir Social House nightlife" /><div className="venue-image-shade" /><button><ChevronRight size={17} /></button><div><h3>Noir Social House</h3><p>Nightlife · Houston, TX</p></div></div><div className="energy-grid"><div><span>🔥</span><b>91%</b><small>Energy</small></div><div><b>312</b><small>People Here</small></div><div><b>$$</b><small>Upscale</small></div></div><p className="venue-blurb">Upscale vibes. Great music. Unforgettable nights.</p><div className="venue-thumbs"><img src={media.party} alt="Party moment" /><img src={media.rooftop} alt="Venue atmosphere" /><img src={media.friends} alt="Friends enjoying the night" /></div><Button onClick={onBook}>Join Guest List</Button><button className="outline-action" onClick={onBook}><CalendarDays size={15} /> Reserve a Table</button><div className="venue-tabs"><span>About</span><span>Events</span><span>Photos</span><span>Reviews</span></div></div>;
}

function CrewPhone({ onBook }: { onBook: () => void }) {
  return <div className="phone-frame phone-crew"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><div className="crew-head"><h3>Your Crew</h3><button onClick={() => toast.info("Crew creation is ready for signed-in members.")}>Create <Plus size={11} /></button></div><AvatarRow /><div className="crew-section-title"><b>Tonight's Plans</b><button>See all <ChevronRight size={11} /></button></div><div className="crew-plan"><img src={media.party} alt="Violet Saturdays" /><div><h4>Violet Saturdays</h4><p>Noir Social House</p><AvatarRow /></div><ChevronRight size={15} /></div><div className="crew-plan"><img src={media.rooftop} alt="Afterglow" /><div><h4>Afterglow</h4><p>The Violet Room</p><AvatarRow /></div><ChevronRight size={15} /></div><div className="crew-section-title"><b>People You May Know</b><button>See all <ChevronRight size={11} /></button></div><div className="connect-row"><div><Avatar letter="R" color="pink" /><b>Renee</b><button onClick={() => toast.success("Connection request sent.")}>Connect</button></div><div><Avatar letter="T" color="blue" /><b>Taylor</b><button onClick={() => toast.success("Connection request sent.")}>Connect</button></div></div><PhoneNav active="Clout" /></div>;
}

function ProfilePhone() {
  return <div className="phone-frame phone-profile"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><Settings className="profile-settings" size={17} /><div className="profile-orb"><span>J</span></div><button className="edit-profile">Edit Profile</button><div className="profile-stats"><div><b>12</b><small>Nights Out</small></div><div><b>48</b><small>Connections</small></div><div><b>28</b><small>Events</small></div><div><b>6</b><small>Tags</small></div></div><div className="profile-list"><div><CalendarDays size={16} /><span>My Plans</span><small>3 upcoming</small><ChevronRight size={14} /></div><div><ShieldCheck size={16} /><span>Saved Places</span><small>18 venues</small><ChevronRight size={14} /></div><div><ClockIcon /><span>Past Nights</span><small>Your story</small><ChevronRight size={14} /></div><div><Settings size={16} /><span>Preferences</span><small>Music, vibe, cuisine</small><ChevronRight size={14} /></div></div><div className="clout-plus"><Crown size={20} fill="currentColor" /><div><b>CLOUT+</b><small>Priority entry. Better nights.</small></div><ChevronRight size={16} /></div><PhoneNav active="Profile" /></div>;
}
function ClockIcon() { return <span className="clock-icon">◷</span>; }

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue>(venues[0]);
  const [party, setParty] = useState(2);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const reservation = trpc.reservation.create.useMutation({ onSuccess: data => setConfirmation(data.confirmationCode), onError: () => toast.error("Something interrupted the plan. Try again.") });

  const openBooking = (venue = venues[0]) => { setSelectedVenue(venue); setConfirmation(null); setBookingOpen(true); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return <main className="reference-app">
    <section className="reference-hero" id="home">
      <img className="hero-photo" src={media.hero} alt="Friends enjoying an upscale violet and blue club night" />
      <div className="hero-darken" /><div className="hero-vignette" />
      <nav className="reference-nav container"><button className="brand-button" onClick={() => scrollTo("home")}><Logo /></button><div className="reference-links"><button onClick={() => scrollTo("people")}>People</button><button onClick={() => scrollTo("places")}>Places</button><button onClick={() => scrollTo("plans")}>Plans</button></div><div className="reference-nav-line" /><button className="nav-list-button" onClick={() => openBooking()}>Get on the list <ArrowRight size={14} /></button><button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button></nav>
      {mobileOpen && <div className="reference-mobile-nav"><button onClick={() => scrollTo("people")}>People</button><button onClick={() => scrollTo("places")}>Places</button><button onClick={() => scrollTo("plans")}>Plans</button><Button onClick={() => openBooking()}>Get on the list <ArrowRight size={14} /></Button></div>}
      <div className="container reference-hero-copy"><h1>Make the<br /><em>night yours.</em></h1><p>Find the people, places and moments<br />worth showing up for.</p><div className="hero-pillars"><span><UsersRound /> Real People</span><span><MapPin /> Amazing Places</span><span><CalendarDays /> Effortless Plans</span></div></div><p className="hero-script">Good<br />People<br />Brighter<br />Nights</p>
    </section>

    <section className="app-story" id="places"><div className="container"><div className="story-intro"><p className="section-kicker"><Sparkles size={13} /> One app. The whole night.</p><h2>From the group chat<br />to <em>the moment.</em></h2><p>Clout turns spontaneous plans into a city that feels like it already knows your name.</p></div><div className="phone-gallery"><div className="phone-column"><TonightPhone onBook={() => openBooking(venues[0])} /><div className="phone-caption"><b>Tonight</b><p>See what’s happening now.</p></div></div><div className="phone-column"><ExplorePhone onBook={() => openBooking(venues[1])} /><div className="phone-caption"><b>Explore</b><p>Discover the best places near you.</p></div></div><div className="phone-column feature-phone"><VenuePhone onBook={() => openBooking(venues[0])} /><div className="phone-caption"><b>Venue details</b><p>Know the energy before you go.</p></div></div><div className="phone-column"><CrewPhone onBook={() => openBooking(venues[0])} /><div className="phone-caption"><b>Clout</b><p>See who’s going out. Go together.</p></div></div><div className="phone-column"><ProfilePhone /><div className="phone-caption"><b>Profile</b><p>Your nights. Your story.</p></div></div></div></div></section>

    <section className="people-section" id="people"><div className="container people-inner"><div><p className="section-kicker"><MessageCircleHeart size={13} /> Made for your people</p><h2>Same energy.<br /><em>Better stories.</em></h2><p>Connection stays intentional: see the crew, build a plan, and find the room that feels right—without making the night complicated.</p></div><div className="people-visual"><img src={media.friends} alt="Friends posing together at a club" /><div className="people-overlay" /><div className="people-note"><AvatarRow /><span>18 friends are out tonight</span><button onClick={() => openBooking()}>Tap in <ArrowRight size={13} /></button></div></div></div></section>

    <section className="membership-reference" id="plans"><div className="container membership-reference-grid"><div className="membership-copy"><p className="section-kicker"><Crown size={13} /> Memberships</p><h2>A little more<br /><em>Clout goes far.</em></h2><p>More access. More nights. More you.</p></div><div className="reference-plan-grid">{plans.map((plan, index) => <article key={plan.name} className={index === 1 ? "featured" : ""}>{index === 1 && <span className="popular">Most popular</span>}<h3>{plan.name}</h3><b>{plan.price}<small>/mo</small></b><ul>{plan.perks.map(perk => <li key={perk}><Check size={13} /> {perk}</li>)}</ul><Button variant={index === 1 ? "default" : "outline"} onClick={() => openBooking()}>{index === 0 ? "Get Started" : `Choose ${plan.name}`} <ArrowRight size={14} /></Button></article>)}</div><div className="download-card"><Logo /><p>Same energy.<br />Different city.</p><div className="store-pills"><button onClick={() => toast.info("Mobile apps are next on the Clout roadmap.")}>● <span>Download on the<br /><b>App Store</b></span></button><button onClick={() => toast.info("Mobile apps are next on the Clout roadmap.")}>▶ <span>Get it on<br /><b>Google Play</b></span></button></div><small>HOUSTON · NEW YORK · MIAMI · ATLANTA<br />AND BEYOND.</small></div></div></section>

    <footer className="reference-footer"><div className="container"><Logo /><span>Clout is where the plan becomes the story.</span><button onClick={() => openBooking()}>Make a plan <ArrowRight size={14} /></button></div></footer>

    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}><DialogContent className="reference-booking" aria-describedby={undefined}>{confirmation ? <div className="reference-success"><div><Check size={28} /></div><p className="section-kicker">You’re on the list</p><h2>See you<br /><em>tonight.</em></h2><p>Your place at <b>{selectedVenue.name}</b> is confirmed. The night is officially in motion.</p><span className="confirmation">{confirmation}</span><Button onClick={() => setBookingOpen(false)}>Back to Clout <ArrowRight size={15} /></Button></div> : <form onSubmit={event => { event.preventDefault(); const form = new FormData(event.currentTarget); reservation.mutate({ venueId: selectedVenue.id, venueName: selectedVenue.name, customerName: String(form.get("name")), email: String(form.get("email")), phone: String(form.get("phone") || ""), reservationDate: String(form.get("date")), reservationTime: "21:30", partySize: party, serviceName: "Guest List", membershipTier: "Clout", addOns: [], subtotalCents: selectedVenue.price * 100, benefitCents: 2500, totalCents: Math.max(selectedVenue.price - 25, 0) * 100, referralCode: "" }); }}><div className="booking-visual"><img src={selectedVenue.image} alt="" /><div /><span>Tonight in Houston</span><h3>{selectedVenue.name}</h3><p>{selectedVenue.location}</p></div><div className="booking-form"><p className="section-kicker">Make a plan</p><h2>Get on the<br /><em>list.</em></h2><div className="venue-select">{venues.map(venue => <button type="button" onClick={() => setSelectedVenue(venue)} className={venue.id === selectedVenue.id ? "selected" : ""} key={venue.id}><img src={venue.image} alt="" /><span><b>{venue.name}</b><small>{venue.location}</small></span><Check size={13} /></button>)}</div><div className="booking-fields"><div><Label htmlFor="guest-name">Your name</Label><Input id="guest-name" name="name" placeholder="Jordan Taylor" required /></div><div><Label htmlFor="guest-email">Email</Label><Input id="guest-email" name="email" type="email" placeholder="jordan@example.com" required /></div><div><Label htmlFor="guest-date">Date</Label><Input id="guest-date" name="date" type="date" defaultValue="2026-09-26" required /></div><div><Label>Guests</Label><div className="guest-counter"><button type="button" onClick={() => setParty(Math.max(1, party - 1))}>−</button><b>{party}</b><button type="button" onClick={() => setParty(Math.min(20, party + 1))}>+</button></div></div><div className="span-two"><Label htmlFor="guest-phone">Phone <small>(optional)</small></Label><Input id="guest-phone" name="phone" placeholder="(713) 555-0123" /></div></div><div className="booking-total"><span>Clout credit applied</span><b>{`$${Math.max(selectedVenue.price - 25, 0)}`}</b></div><Button type="submit" disabled={reservation.isPending}>{reservation.isPending ? "Locking it in…" : "Join Guest List"} <ArrowRight size={15} /></Button><small className="booking-disclaimer"><ShieldCheck size={12} /> Demo reservation only. No payment is processed.</small></div></form>}</DialogContent></Dialog>
  </main>;
}
