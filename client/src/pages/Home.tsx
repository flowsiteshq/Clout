import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Crown,
  Gift,
  Heart,
  MapPin,
  Menu,
  Minus,
  ParkingCircle,
  Plus,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrendingUp,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";

type Venue = {
  id: string;
  name: string;
  eyebrow: string;
  category: string;
  neighborhood: string;
  imageClass: string;
  availability: string;
  services: { name: string; detail: string; price: number }[];
};

const venues: Venue[] = [
  {
    id: "noir-social-houston",
    name: "Noir Social House",
    eyebrow: "Signature Nightlife",
    category: "Social club",
    neighborhood: "Montrose · Houston",
    imageClass: "venue-noir",
    availability: "Tables available tonight",
    services: [
      { name: "The Velvet Table", detail: "Priority entry · dedicated host", price: 250 },
      { name: "Noir Lounge", detail: "Up to 4 guests · bottle presentation", price: 475 },
      { name: "The Gallery", detail: "Up to 8 guests · premium placement", price: 850 },
    ],
  },
  {
    id: "aurelia-house",
    name: "Aurelia House",
    eyebrow: "Dinner & After Dark",
    category: "Restaurant lounge",
    neighborhood: "River Oaks · Houston",
    imageClass: "venue-aurelia",
    availability: "Dining reservations open",
    services: [
      { name: "Dinner for Two", detail: "Chef counter · priority seating", price: 160 },
      { name: "Private Supper Club", detail: "Up to 6 guests · tasting menu", price: 420 },
      { name: "The Conservatory", detail: "Up to 12 guests · host service", price: 900 },
    ],
  },
  {
    id: "marea-rooftop",
    name: "Marea Rooftop",
    eyebrow: "Skyline Experiences",
    category: "Rooftop lounge",
    neighborhood: "Downtown · Houston",
    imageClass: "venue-marea",
    availability: "Golden hour bookings open",
    services: [
      { name: "Sunset Booth", detail: "Up to 4 guests · skyline view", price: 220 },
      { name: "Sky Table", detail: "Up to 6 guests · arrival escort", price: 560 },
      { name: "The Horizon", detail: "Up to 10 guests · private service", price: 1100 },
    ],
  },
];

const membershipPlans = [
  { name: "Social", price: "$0", detail: "Explore locations and pay as you go.", benefit: "Member access" },
  { name: "Clout", price: "$99", detail: "Priority access and $25 booking credit.", benefit: "$25 applied" },
  { name: "Mega Clout", price: "$299", detail: "Concierge handling and $75 booking credit.", benefit: "$75 applied" },
];

const addOns = [
  { id: "valet", label: "Valet arrival", detail: "Reserved curbside welcome", price: 35, icon: ParkingCircle },
  { id: "concierge", label: "Concierge note", detail: "Celebrate it your way", price: 25, icon: Sparkles },
  { id: "arrival", label: "Priority arrival", detail: "Fast-lane guest check-in", price: 40, icon: ShieldCheck },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`wordmark ${dark ? "wordmark-dark" : ""}`} aria-label="Clout">
      <span className="wordmark-mark">C</span>
      <span className="wordmark-type">CLOUT</span>
    </div>
  );
}

function VenueVisual({ venue, compact = false }: { venue: Venue; compact?: boolean }) {
  return (
    <div className={`venue-visual ${venue.imageClass} ${compact ? "venue-visual-compact" : ""}`}>
      <div className="venue-lights" />
      <div className="venue-glow" />
      <div className="venue-architecture">
        <span /><span /><span /><span /><span />
      </div>
      {!compact && <div className="venue-corner-mark">C</div>}
    </div>
  );
}

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue>(venues[0]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [membership, setMembership] = useState("Clout");
  const [extras, setExtras] = useState<string[]>(["valet"]);
  const [partySize, setPartySize] = useState(2);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const owner = trpc.owner.snapshot.useQuery(undefined, { retry: false });

  const service = selectedVenue.services[selectedServiceIndex] ?? selectedVenue.services[0];
  const selectedExtras = addOns.filter(addOn => extras.includes(addOn.id));
  const extrasTotal = selectedExtras.reduce((total, addOn) => total + addOn.price, 0);
  const membershipCredit = membership === "Mega Clout" ? 75 : membership === "Clout" ? 25 : 0;
  const subtotal = service.price + extrasTotal;
  const total = Math.max(subtotal - membershipCredit, 0);

  const createReservation = trpc.reservation.create.useMutation({
    onSuccess: data => {
      setConfirmation(data.confirmationCode);
      owner.refetch();
    },
    onError: () => toast.error("We couldn’t secure that reservation. Please try again."),
  });

  function openBooking(venue = selectedVenue) {
    setSelectedVenue(venue);
    setSelectedServiceIndex(0);
    setConfirmation(null);
    setBookingOpen(true);
  }

  function changeVenue(venue: Venue) {
    setSelectedVenue(venue);
    setSelectedServiceIndex(0);
  }

  function toggleExtra(id: string) {
    setExtras(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  const dashboardRevenue = useMemo(() => (owner.data?.revenueCents ?? 0) / 100, [owner.data?.revenueCents]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f2eb] text-[#17130e]">
      <section className="hero-section" id="home">
        <nav className="container hero-nav" aria-label="Main navigation">
          <button className="brand-button" onClick={() => scrollTo("home")}><Wordmark /></button>
          <div className="desktop-nav">
            <button onClick={() => scrollTo("discover")}>Discover</button>
            <button onClick={() => scrollTo("memberships")}>Memberships</button>
            <button onClick={() => scrollTo("owner")}>For operators</button>
          </div>
          <div className="nav-actions">
            <button className="nav-login" onClick={() => toast.info("Guest sign-in is ready for your Clout account.")}>Sign in</button>
            <Button className="nav-join" onClick={() => openBooking()}>
              Plan tonight <ArrowRight size={15} />
            </Button>
          </div>
          <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="mobile-nav container">
            <button onClick={() => scrollTo("discover")}>Discover</button>
            <button onClick={() => scrollTo("memberships")}>Memberships</button>
            <button onClick={() => scrollTo("owner")}>For operators</button>
            <Button onClick={() => openBooking()}>Plan tonight <ArrowRight size={15} /></Button>
          </div>
        )}

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> The hospitality layer for your night</div>
            <h1>Your night,<br /><em>recognized.</em></h1>
            <p className="hero-subtitle">Clout turns every reservation, arrival and upgrade into a more personal experience—before you ever walk through the door.</p>
            <div className="hero-ctas">
              <Button size="lg" className="hero-primary" onClick={() => openBooking()}>
                Reserve an experience <ArrowRight size={17} />
              </Button>
              <button className="hero-text-button" onClick={() => scrollTo("discover")}>
                Explore locations <ArrowDownRight size={17} />
              </button>
            </div>
            <div className="hero-proof">
              <div className="proof-stack"><span>J</span><span>R</span><span>M</span><span>+</span></div>
              <p><b>Guest-first hospitality.</b><br />One profile across every touchpoint.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="A premium Clout experience preview">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-orbit orbit-three" />
            <div className="hero-sphere" />
            <div className="hero-spotlight" />
            <div className="hero-card hero-reservation-card">
              <div className="card-header-row"><span className="mini-logo">C</span><span className="card-kicker">TONIGHT AT 9:30</span><Badge>Confirmed</Badge></div>
              <h3>Welcome back,<br />Jordan.</h3>
              <div className="reservation-line"><MapPin size={15} /><span>Noir Social House</span></div>
              <div className="card-divider" />
              <div className="reservation-meta"><span>4 guests</span><span>Valet included</span></div>
            </div>
            <div className="hero-card hero-benefit-card"><Crown size={16} /><span><b>Mega Clout</b><small>Your benefits are ready</small></span></div>
            <div className="hero-card hero-rating-card"><div className="rating-orb">4.9</div><span>Every detail,<br /><b>anticipated.</b></span></div>
            <div className="hero-date-stamp"><span>SEP</span><strong>26</strong><small>FRI</small></div>
          </div>
        </div>
        <div className="container hero-strip">
          <span>One profile. Any location.</span><i /><span>Reservations, VIP, valet & wallet.</span><i /><span>Built for the way you go out.</span>
        </div>
      </section>

      <section className="intro-section container">
        <div className="section-number">01</div>
        <div className="intro-headline"><p className="eyebrow">THE CLOUT DIFFERENCE</p><h2>Beyond a reservation.<br /><em>A relationship in motion.</em></h2></div>
        <p className="intro-body">Your preferences, benefits and plans should not restart at every door. Clout gives exceptional hospitality a shared memory—so every arrival can feel considered.</p>
      </section>

      <section className="experience-section" id="discover">
        <div className="container section-heading-row">
          <div><p className="eyebrow">CURATED FOR YOU</p><h2>Pick your <em>place.</em></h2></div>
          <button className="text-link" onClick={() => toast.info("More locations are coming to your Clout network.")}>View all locations <ArrowRight size={16} /></button>
        </div>
        <div className="container venue-grid">
          {venues.map((venue, index) => (
            <article className={`venue-card ${index === 0 ? "venue-card-featured" : ""}`} key={venue.id}>
              <VenueVisual venue={venue} />
              <div className="venue-content">
                <div className="venue-topline"><span>{venue.eyebrow}</span><span className="availability-dot" /> <small>{venue.availability}</small></div>
                <h3>{venue.name}</h3>
                <p>{venue.neighborhood}</p>
                <div className="venue-footer"><span>{venue.category}</span><button onClick={() => openBooking(venue)} aria-label={`Reserve ${venue.name}`}><ArrowUpRightIcon /></button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-section">
        <div className="container journey-grid">
          <div className="journey-copy"><p className="eyebrow">ONE EFFORTLESS FLOW</p><h2>Plan less.<br /><em>Feel more.</em></h2><p>From your first tap to your final toast, Clout handles the details that make going out feel effortless.</p><Button variant="outline" onClick={() => openBooking()}>Build your night <ArrowRight size={16} /></Button></div>
          <div className="journey-steps">
            {[
              ["01", "Discover", "A tailored world of places, events and offers."],
              ["02", "Reserve", "Secure tables, parking and the details that matter."],
              ["03", "Arrive", "Your status and preferences arrive before you do."],
              ["04", "Return", "Rewards and memories make the next night better."],
            ].map(([number, title, detail]) => <div className="journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p><ChevronRight size={18} /></div>)}
          </div>
        </div>
      </section>

      <section className="membership-section container" id="memberships">
        <div className="membership-header"><div><p className="eyebrow">MEMBERSHIP, PERSONALIZED</p><h2>More ways to<br /><em>be expected.</em></h2></div><p>Choose the access that matches the way you go out. Your benefits are recognized at every Clout location.</p></div>
        <div className="membership-grid">
          {membershipPlans.map((plan, index) => (
            <article className={`membership-card ${index === 1 ? "membership-card-highlight" : ""}`} key={plan.name}>
              {index === 1 && <div className="popular-ribbon">Most chosen</div>}
              <div className="membership-symbol">{index === 0 ? <Heart size={20} /> : index === 1 ? <BadgeCheck size={20} /> : <Crown size={20} />}</div>
              <div><h3>{plan.name}</h3><p>{plan.detail}</p></div>
              <div className="membership-price"><b>{plan.price}</b><span>/ month</span></div>
              <div className="membership-perk"><Check size={15} /> <span>{plan.benefit}</span></div>
              <Button variant={index === 1 ? "default" : "outline"} onClick={() => { setMembership(plan.name); openBooking(); }}>Choose {plan.name} <ArrowRight size={15} /></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="operator-section" id="owner">
        <div className="container operator-wrap">
          <div className="operator-copy"><p className="eyebrow eyebrow-light">FOR HOSPITALITY OPERATORS</p><h2>Your culture.<br /><em>Your operating system.</em></h2><p>Clout brings customer history, memberships, service, wallets and staff attribution into one configurable platform—without changing what makes your location yours.</p><div className="operator-chips"><span><Check size={14} /> Configurable by location</span><span><Check size={14} /> Staff attribution built in</span></div><Button className="operator-button" onClick={() => toast.info("Operator onboarding is available by invitation.")}>Talk to Clout <ArrowRight size={16} /></Button></div>
          <div className="operator-dashboard">
            <div className="dash-top"><div><span className="dash-overline">LIVE LOCATION PULSE</span><h3>Noir Social House</h3></div><span className="dash-live"><i /> Live</span></div>
            <div className="dash-metrics">
              <div><span>Tonight's bookings</span><b>{(owner.data?.reservations ?? 0) + 18}</b><small><TrendingUp size={13} /> +24% vs last Fri</small></div>
              <div><span>Guest value captured</span><b>{money(dashboardRevenue + 12840)}</b><small><CircleDollarSign size={13} /> Wallet + booking</small></div>
            </div>
            <div className="dash-ledger"><div className="dash-ledger-heading"><span>Reservation ledger</span><span>Arrival status</span></div>{owner.data?.recentReservations?.length ? owner.data.recentReservations.map(item => <div className="dash-ledger-row" key={item.confirmationCode}><span><b>{item.customerName}</b><small>{item.venueName}</small></span><span className="dash-confirmed">Confirmed</span></div>) : <><div className="dash-ledger-row"><span><b>Avery Matthews</b><small>VIP host attribution</small></span><span className="dash-confirmed">Arrived</span></div><div className="dash-ledger-row"><span><b>Jules R.</b><small>Mega Clout member</small></span><span className="dash-pending">9:30 PM</span></div><div className="dash-ledger-row"><span><b>Marcus H.</b><small>Valet prepay</small></span><span className="dash-confirmed">Confirmed</span></div></>}</div>
          </div>
        </div>
      </section>

      <section className="cta-section container">
        <div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>The night is<br /><em>waiting for you.</em></h2></div>
        <Button size="lg" onClick={() => openBooking()}>Start with a reservation <ArrowRight size={17} /></Button>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid"><div><Wordmark dark /><p>Hospitality, remembered.</p></div><div className="footer-links"><button onClick={() => scrollTo("discover")}>Discover</button><button onClick={() => scrollTo("memberships")}>Membership</button><button onClick={() => scrollTo("owner")}>For operators</button></div><div className="footer-meta">© 2026 Clout Experience<br />Designed for modern hospitality.</div></div>
      </footer>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="booking-dialog" aria-describedby={undefined}>
          {confirmation ? (
            <div className="booking-success">
              <div className="success-seal"><Check size={32} /></div>
              <p className="eyebrow">YOUR EXPERIENCE IS SET</p>
              <h2>Consider it<br /><em>handled.</em></h2>
              <p>Your place at <b>{selectedVenue.name}</b> is confirmed. Your host will have the details before you arrive.</p>
              <div className="confirmation-code"><span>CONFIRMATION</span><b>{confirmation}</b></div>
              <Button onClick={() => setBookingOpen(false)}>Back to Clout <ArrowRight size={16} /></Button>
            </div>
          ) : (
            <form onSubmit={event => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              createReservation.mutate({
                venueId: selectedVenue.id,
                venueName: selectedVenue.name,
                customerName: String(form.get("name")),
                email: String(form.get("email")),
                phone: String(form.get("phone") || ""),
                reservationDate: String(form.get("date")),
                reservationTime: String(form.get("time")),
                partySize,
                serviceName: service.name,
                membershipTier: membership,
                addOns: selectedExtras.map(item => item.label),
                subtotalCents: subtotal * 100,
                benefitCents: membershipCredit * 100,
                totalCents: total * 100,
                referralCode: String(form.get("referral") || ""),
              });
            }}>
              <div className="booking-title"><div><p className="eyebrow">PLAN YOUR EXPERIENCE</p><h2>A night with<br /><em>your name on it.</em></h2></div><div className="booking-total"><span>Due today</span><b>{money(total)}</b></div></div>
              <div className="booking-layout">
                <div className="booking-controls">
                  <div className="field-group"><Label>Choose a location</Label><div className="choice-grid venue-choice-grid">{venues.map(venue => <button type="button" onClick={() => changeVenue(venue)} className={`choice-card ${selectedVenue.id === venue.id ? "selected" : ""}`} key={venue.id}><VenueVisual venue={venue} compact /><span><b>{venue.name}</b><small>{venue.neighborhood}</small></span><Check size={15} /></button>)}</div></div>
                  <div className="field-group"><Label>Choose your experience</Label><div className="service-list">{selectedVenue.services.map((item, index) => <button type="button" className={`service-choice ${selectedServiceIndex === index ? "selected" : ""}`} onClick={() => setSelectedServiceIndex(index)} key={item.name}><span><b>{item.name}</b><small>{item.detail}</small></span><strong>{money(item.price)}</strong></button>)}</div></div>
                  <div className="booking-input-row"><div><Label htmlFor="booking-date">Date</Label><div className="input-wrap"><CalendarDays size={15} /><Input id="booking-date" name="date" type="date" defaultValue="2026-09-26" required /></div></div><div><Label htmlFor="booking-time">Arrival</Label><div className="input-wrap"><Clock3 size={15} /><Input id="booking-time" name="time" type="time" defaultValue="21:30" required /></div></div><div><Label>Guests</Label><div className="stepper"><button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))}><Minus size={14} /></button><span>{partySize}</span><button type="button" onClick={() => setPartySize(Math.min(20, partySize + 1))}><Plus size={14} /></button></div></div></div>
                  <div className="field-group"><Label>Membership</Label><div className="membership-select-grid">{membershipPlans.map(plan => <button type="button" key={plan.name} className={`membership-select ${membership === plan.name ? "selected" : ""}`} onClick={() => setMembership(plan.name)}><span><b>{plan.name}</b><small>{plan.detail}</small></span><strong>{plan.price}</strong></button>)}</div></div>
                  <div className="field-group"><Label>Add to your arrival</Label><div className="addon-list">{addOns.map(addOn => { const Icon = addOn.icon; const chosen = extras.includes(addOn.id); return <button type="button" key={addOn.id} onClick={() => toggleExtra(addOn.id)} className={`addon-choice ${chosen ? "selected" : ""}`}><span className="addon-icon"><Icon size={16} /></span><span><b>{addOn.label}</b><small>{addOn.detail}</small></span><strong>+{money(addOn.price)}</strong><i>{chosen && <Check size={13} />}</i></button>; })}</div></div>
                  <div className="guest-fields"><div><Label htmlFor="guest-name">Your name</Label><Input id="guest-name" name="name" placeholder="Jordan Taylor" required /></div><div><Label htmlFor="guest-email">Email</Label><Input id="guest-email" name="email" type="email" placeholder="jordan@example.com" required /></div><div><Label htmlFor="guest-phone">Phone <span>(optional)</span></Label><Input id="guest-phone" name="phone" placeholder="(713) 555-0123" /></div><div><Label htmlFor="referral">Referral <span>(optional)</span></Label><Input id="referral" name="referral" placeholder="Staff or partner code" /></div></div>
                </div>
                <aside className="booking-summary"><div className="summary-venue"><VenueVisual venue={selectedVenue} compact /><div><span>{selectedVenue.eyebrow}</span><b>{selectedVenue.name}</b><small>{selectedVenue.neighborhood}</small></div></div><div className="summary-detail"><span>{service.name}</span><b>{money(service.price)}</b></div>{selectedExtras.map(addOn => <div className="summary-detail muted" key={addOn.id}><span>{addOn.label}</span><b>{money(addOn.price)}</b></div>)}<div className="summary-divider" />{membershipCredit > 0 && <div className="summary-detail benefit"><span><Gift size={14} /> {membership} credit</span><b>−{money(membershipCredit)}</b></div>}<div className="summary-total"><span>Due today</span><b>{money(total)}</b></div><p className="summary-note"><ShieldCheck size={14} /> No payment will be processed in this demo. Your confirmed reservation is recorded in the Clout ledger.</p><Button type="submit" size="lg" disabled={createReservation.isPending}>{createReservation.isPending ? "Securing your night…" : "Confirm reservation"} <ArrowRight size={16} /></Button><span className="summary-secure"><ReceiptText size={13} /> Receipt & confirmation included</span></aside>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}
