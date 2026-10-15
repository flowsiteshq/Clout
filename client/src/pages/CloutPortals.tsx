import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Crown,
  Gem,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UsersRound,
  WalletCards,
  WandSparkles,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const media = {
  hero: "/manus-storage/clout-ai-night-black-led_c80b9c40.jpg",
  creator: "/manus-storage/clout-ai-creator_b2618bde.jpg",
  venue: "/manus-storage/clout-ai-venue_f12b8d67.jpg",
};

const spendData = [
  { day: "Mon", value: 52 }, { day: "Tue", value: 71 }, { day: "Wed", value: 48 }, { day: "Thu", value: 94 }, { day: "Fri", value: 186 }, { day: "Sat", value: 248 }, { day: "Sun", value: 131 },
];
const performanceData = [
  { day: "Mon", value: 29 }, { day: "Tue", value: 34 }, { day: "Wed", value: 32 }, { day: "Thu", value: 46 }, { day: "Fri", value: 58 }, { day: "Sat", value: 71 }, { day: "Sun", value: 64 },
];

function Mark() { return <span className="clout-mark portal-mark">C</span>; }
function Logo() { return <span className="clout-logo"><Mark /><b>CLOUT</b></span>; }

function Chart({ data, color = "#a55eff" }: { data: typeof spendData; color?: string }) {
  return <ResponsiveContainer width="100%" height={150}><AreaChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}><defs><linearGradient id={`fill-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={.52} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9d91bb", fontSize: 10 }} /><Tooltip cursor={{ stroke: "rgba(184,137,255,.22)" }} contentStyle={{ background: "#161124", border: "1px solid #574070", borderRadius: 0, color: "#f5f0ff", fontSize: 11 }} /><Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#fill-${color.replace("#", "")})`} /></AreaChart></ResponsiveContainer>;
}

function PortalNav({ active }: { active: "night" | "talent" | "partner" | "ops" }) {
  const items = [
    { label: "My Night", path: "/night", icon: Sparkles, key: "night" },
    { label: "Talent", path: "/talent", icon: Crown, key: "talent" },
    { label: "Partners", path: "/partner", icon: Store, key: "partner" },
    { label: "Operations", path: "/ops", icon: LayoutDashboard, key: "ops" },
  ] as const;
  return <nav className="portal-nav"><a href="/"><Logo /></a><div>{items.map(item => { const Icon = item.icon; return <a key={item.key} href={item.path} className={active === item.key ? "active" : ""}><Icon size={16} />{item.label}</a>; })}</div><span className="portal-nav-rule" /><a className="portal-nav-return" href="/"><ArrowRight size={14} /> Back to Clout</a></nav>;
}

function PageTop({ eyebrow, title, copy, action }: { eyebrow: string; title: React.ReactNode; copy: string; action?: React.ReactNode }) {
  return <header className="portal-page-top"><div><p className="eyebrow"><Sparkles size={13} /> {eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>{action}</header>;
}

function Stat({ icon: Icon, label, value, trend, tone = "violet" }: { icon: typeof Sparkles; label: string; value: string; trend: string; tone?: "violet" | "blue" | "pink" }) {
  return <article className={`portal-stat ${tone}`}><span><Icon size={17} /></span><small>{label}</small><b>{value}</b><em>{trend}</em></article>;
}

export function NightDashboard() {
  const [saved, setSaved] = useState(true);
  return <main className="portal-shell"><PortalNav active="night" /><section className="portal-main"><PageTop eyebrow="CONSUMER DASHBOARD" title={<>Your night,<br /><em>already in motion.</em></>} copy="A clear view of your plans, your crew, and the moments you want to make next." action={<button className="portal-profile"><span>JT</span><div><b>Jordan Taylor</b><small>Houston, TX</small></div><ChevronRight size={15} /></button>} /><div className="night-dashboard-grid"><section className="night-plan-card"><div className="night-card-image"><img src={media.hero} alt="Friends out for the night" /><div /><span><WandSparkles size={14} /> Clout AI plan</span></div><div className="night-plan-body"><div className="plan-title"><div><p>FRIDAY · OCT 13</p><h2>Tonight in <em>Houston.</em></h2></div><button onClick={() => setSaved(!saved)} className={saved ? "saved" : ""}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button></div><div className="night-timeline"><div><i>8:15</i><span><b>Dinner at Mila Social</b><small>Table request pending · 2 friends joined</small></span><BadgeCheck size={17} /></div><div><i>9:45</i><span><b>Meet your crew</b><small>Renee, Taylor, and 2 more · shared location on</small></span><UsersRound size={17} /></div><div><i>10:30</i><span><b>Violet Saturdays</b><small>Noir Social House · guest list requested</small></span><Sparkles size={17} /></div></div><button className="wide-portal-button">Edit my night <ArrowRight size={15} /></button></div></section><aside className="ai-assistant-card"><div className="ai-orb"><WandSparkles size={19} /></div><p className="eyebrow">CLOUT AI</p><h3>“Your crew has been saving rooftop spots. Start earlier, then let the night move.”</h3><div className="ai-suggestions"><span><MapPin size={14} /> Add Afterglow to the plan</span><span><MessageCircle size={14} /> Invite 3 friends who are nearby</span></div><button>Refresh my night <ArrowRight size={14} /></button></aside></div><div className="portal-section-head"><div><p className="eyebrow"><WalletCards size={13} /> NIGHT SPEND</p><h2>Keep the night<br /><em>on your terms.</em></h2></div><a href="#spend">View spending details <ArrowRight size={14} /></a></div><div className="spend-grid" id="spend"><section className="chart-card"><div><span><ReceiptText size={16} /> THIS WEEK</span><b>$830<small> total tracked</small></b></div><Chart data={spendData} /><p><i /> You are $42 below your typical weekend pace.</p></section><section className="spend-breakdown"><div><span>DINING</span><b>$284</b><i style={{ width: "69%" }} /></div><div><span>EXPERIENCES</span><b>$216</b><i style={{ width: "53%" }} /></div><div><span>RIDES</span><b>$118</b><i style={{ width: "31%" }} /></div><div><span>OTHER</span><b>$212</b><i style={{ width: "51%" }} /></div><small>Only confirmed purchases are tracked. Booking requests never show a public price.</small></section></div></section></main>;
}

export function TalentPortal() {
  const [tab, setTab] = useState("requests");
  const requests = [
    ["Noir Social House", "Saturday hosting · Review request", "New"],
    ["Mila Social", "Dinner content partnership · Conversation open", "Open"],
    ["Afterglow Rooftop", "Creator night · Team reviewing", "Review"],
  ];
  return <main className="portal-shell"><PortalNav active="talent" /><section className="portal-main"><PageTop eyebrow="TALENT & SERVICES" title={<>Your profile is<br /><em>your front door.</em></>} copy="Manage partnerships, booking requests, availability, and the subscription tools that help the right rooms find you." action={<a href="#profile" className="violet-button">Edit profile <ArrowRight size={15} /></a>} /><div className="talent-profile-card" id="profile"><img src={media.creator} alt="Talent creator profile" /><div className="talent-profile-overlay" /><div className="talent-profile-content"><span className="verified"><BadgeCheck size={14} /> VERIFIED TALENT</span><h2>Ari Monroe</h2><p>Creator · Host · Houston</p><div><span><b>28</b> partnerships</span><span><b>4.9</b> experience score</span><span><b>71%</b> request conversion</span></div></div><button>Preview public profile <ArrowRight size={14} /></button></div><div className="portal-stat-grid"><Stat icon={CalendarDays} label="Booking requests" value="14" trend="+5 this week" /><Stat icon={BadgeCheck} label="Confirmed" value="9" trend="64% accepted" tone="blue" /><Stat icon={MessageCircle} label="Avg. reply time" value="18m" trend="Top 12%" tone="pink" /><Stat icon={UsersRound} label="Repeat partners" value="12" trend="+3 this month" /></div><div className="portal-two-col"><section className="request-panel"><div className="panel-head"><div><p className="eyebrow"><CalendarDays size={13} /> MY WORK</p><h2>Requests &amp;<br /><em>partnerships.</em></h2></div><div className="panel-tabs"><button className={tab === "requests" ? "active" : ""} onClick={() => setTab("requests")}>Requests</button><button className={tab === "partners" ? "active" : ""} onClick={() => setTab("partners")}>Partners</button></div></div><div className="request-list">{requests.map(([place, note, state]) => <article key={place}><span className={`request-state ${state.toLowerCase()}`}>{state}</span><div><b>{place}</b><small>{tab === "requests" ? note : "Active partnership · concierge support available"}</small></div><button>Open <ChevronRight size={15} /></button></article>)}</div></section><aside className="subscription-panel"><Gem size={20} /><p className="eyebrow">CLOUT CREATOR</p><h3>Membership that works when you do.</h3><ul><li><BadgeCheck size={14} /> Priority review for selected requests</li><li><BadgeCheck size={14} /> Partnership performance insights</li><li><BadgeCheck size={14} /> Calendar, message, and profile tools</li></ul><button>Manage subscription <ArrowRight size={14} /></button></aside></div></section></main>;
}

export function PartnerPortal() {
  return <main className="portal-shell"><PortalNav active="partner" /><section className="portal-main"><PageTop eyebrow="HOSPITALITY & VENDORS" title={<>Run the room.<br /><em>See the signal.</em></>} copy="One place for guest demand, talent requests, service staffing, and the subscription tools that keep your experience sharp." action={<button className="portal-profile"><span>NS</span><div><b>Noir Social House</b><small>Houston, TX</small></div><ChevronRight size={15} /></button>} /><div className="partner-hero"><img src={media.venue} alt="Hospitality team welcoming guests" /><div /><div><span><Store size={15} /> PARTNER COMMAND CENTER</span><h2>Saturday service<br /><em>is 86% ready.</em></h2><p>Guest interest is rising, two tables are pending, and your staffing plan has one open coverage need.</p><button>Open service board <ArrowRight size={15} /></button></div></div><div className="portal-stat-grid"><Stat icon={UsersRound} label="Guest demand" value="312" trend="+18% vs. last Saturday" /><Stat icon={CalendarDays} label="Booking requests" value="46" trend="9 awaiting response" tone="blue" /><Stat icon={Crown} label="Talent partners" value="19" trend="4 active this weekend" tone="pink" /><Stat icon={ClipboardCheck} label="Staffing coverage" value="86%" trend="1 role needs attention" /></div><div className="portal-two-col"><section className="staffing-panel"><div className="panel-head"><div><p className="eyebrow"><UsersRound size={13} /> TONIGHT’S STAFFING</p><h2>Right people.<br /><em>Right room.</em></h2></div><a href="/ops">Open operations <ArrowRight size={14} /></a></div><div className="staffing-list"><article><span className="staff-avatar host">KM</span><div><b>Kay Monroe</b><small>Lead host · checked in 6:02 PM</small></div><em>98% show rate</em></article><article><span className="staff-avatar creator">AM</span><div><b>Ari Monroe</b><small>Creator partner · content arrival 9:30 PM</small></div><em>4.9 score</em></article><article><span className="staff-avatar open">+</span><div><b>Floor support</b><small>Coverage request is open</small></div><button>Fill role <ArrowRight size={13} /></button></article></div></section><aside className="subscription-panel partner-sub"><Gem size={20} /><p className="eyebrow">CLOUT PARTNER PLUS</p><h3>Your venue is covered.</h3><ul><li><BadgeCheck size={14} /> Guest &amp; demand intelligence</li><li><BadgeCheck size={14} /> Talent and staffing performance</li><li><BadgeCheck size={14} /> Partner subscription controls</li></ul><button>Subscription details <ArrowRight size={14} /></button></aside></div></section></main>;
}

export function OpsPortal() {
  return <main className="portal-shell"><PortalNav active="ops" /><section className="portal-main"><PageTop eyebrow="CLOUT OPERATIONS" title={<>The city, in<br /><em>one clear view.</em></>} copy="Track bookings, normal spend patterns, staffing performance, and the moments that need a human move." action={<button className="ops-live"><i /> LIVE · HOUSTON</button>} /><div className="ops-alert"><ShieldCheck size={18} /><div><b>Saturday readiness check</b><span>Three venues are fully staffed. Noir Social House needs one floor-support confirmation before 8:30 PM.</span></div><button>Review now <ArrowRight size={14} /></button></div><div className="portal-stat-grid ops-stats"><Stat icon={CircleDollarSign} label="Guest spend tracked" value="$12.4k" trend="+22% vs. last weekend" /><Stat icon={CalendarDays} label="Confirmed bookings" value="87" trend="+14 since 4 PM" tone="blue" /><Stat icon={UsersRound} label="Booked staff & talent" value="47" trend="89% coverage" tone="pink" /><Stat icon={BarChart3} label="Request conversion" value="38%" trend="+6 pts week over week" /></div><div className="ops-grid"><section className="ops-chart-card"><div className="panel-head"><div><p className="eyebrow"><ReceiptText size={13} /> CONSUMER SPEND TRACKING</p><h2>Spend, without<br /><em>the guesswork.</em></h2></div><span className="chart-note">Last 7 days</span></div><Chart data={spendData} color="#6e7dff" /><div className="chart-footer"><span><i /> Dining &amp; experiences 61%</span><span><i /> Rides &amp; support 14%</span><span><i /> Other 25%</span></div></section><section className="ops-chart-card"><div className="panel-head"><div><p className="eyebrow"><UsersRound size={13} /> STAFFING PERFORMANCE</p><h2>Who gets<br /><em>booked again.</em></h2></div><span className="chart-note">Last 7 days</span></div><Chart data={performanceData} color="#cf62e6" /><div className="chart-footer"><span><i /> Shift fulfillment 94%</span><span><i /> Avg. guest score 4.8</span></div></section></div><section className="performance-table"><div className="panel-head"><div><p className="eyebrow"><ClipboardCheck size={13} /> STAFFING &amp; TALENT PULSE</p><h2>Performance that<br /><em>drives the night.</em></h2></div><button>Export report <ArrowRight size={14} /></button></div><div className="performance-head"><span>Team member</span><span>Role</span><span>Booked</span><span>Show rate</span><span>Guest score</span></div>{[["Kay Monroe", "Lead host", "16", "98%", "4.9"], ["Ari Monroe", "Creator", "11", "100%", "4.8"], ["J. Rivera", "Bottle service", "14", "93%", "4.7"], ["L. Chen", "Door team", "9", "100%", "4.9"]].map(row => <div className="performance-row" key={row[0]}><span><i>{row[0].split(" ").map(part => part[0]).join("")}</i><b>{row[0]}</b></span><span>{row[1]}</span><span>{row[2]} shifts</span><span>{row[3]}</span><span><Star size={13} fill="currentColor" /> {row[4]}</span></div>)}</section></section></main>;
}
