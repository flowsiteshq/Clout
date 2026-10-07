import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Crown, FileText, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";

const heroImage = "/manus-storage/clout-crowd-hero_bf7b39f6.jpg";
const ndaVersion = "CLOUT-NDA-2026-10-06";
const roles = ["Host / Guest Experience", "Promoter / Clout Representative", "Server / Bottle Service", "Cook / Chef", "Security / Door Team", "Venue Operations", "Creator / Content Team"];
const venues = ["Noir Social House · Houston", "The Violet Room · Houston", "Afterglow Rooftop · Houston", "Open to the Clout network"];

function Mark() {
  return <span className="join-mark">C</span>;
}

function NdaTerms() {
  return (
    <details className="nda-terms" open>
      <summary><span><FileText size={16} /> Candidate Confidentiality &amp; Non-Disclosure Agreement</span><small>Review before signing</small></summary>
      <article className="nda-copy">
        <p className="nda-intro"><b>Agreement.</b> This Candidate Confidentiality &amp; Non-Disclosure Agreement (the “Agreement”) is between <b>Clout</b> (the “Company”) and the applicant signing below (“Candidate”). It is effective on the date of the Candidate’s electronic signature.</p>
        <section><b>1. Purpose and Confidential Information.</b><p>While evaluating or discussing a possible working relationship, Candidate may receive non-public information about the Company, its venues, members, guests, personnel, creators, suppliers, events, technology, business plans, pricing, operations, analytics, marketing, and financial information (“Confidential Information”).</p></section>
        <section><b>2. Candidate’s Obligations.</b><p>Candidate will use Confidential Information only to evaluate or perform an authorized relationship with the Company, protect it with reasonable care, and not disclose it to any person or business without the Company’s prior written consent.</p></section>
        <section><b>3. Exclusions.</b><p>Confidential Information does not include information Candidate can document was publicly available without breach of this Agreement, lawfully known before disclosure, independently developed without use of Confidential Information, or lawfully received from a third party without a duty of confidentiality.</p></section>
        <section><b>4. Return, Deletion, and Ownership.</b><p>On request, Candidate will promptly return or permanently delete Confidential Information. All Confidential Information remains the Company’s property; this Agreement grants no ownership or license.</p></section>
        <section><b>5. Required Disclosures and Remedies.</b><p>If disclosure is required by law, Candidate will give prompt written notice where legally permitted and disclose only what is required. Candidate acknowledges that unauthorized disclosure may cause irreparable harm and that the Company may seek equitable relief in addition to other available remedies.</p></section>
        <section><b>6. No Employment Promise.</b><p>This Agreement does not create an offer of employment, contractor relationship, exclusivity, or any obligation for either party to enter into a future relationship.</p></section>
        <section><b>7. Governing Law and Electronic Signature.</b><p>Texas law governs this Agreement, without regard to conflict-of-law rules. Candidate agrees that checking the consent box and typing a full legal name below is an electronic signature and record with the same intent and effect as a handwritten signature, to the extent permitted by applicable law.</p></section>
        <p className="nda-version">Agreement version {ndaVersion}</p>
      </article>
    </details>
  );
}

export default function JoinClout() {
  const [roleInterest, setRoleInterest] = useState(roles[0]);
  const [preferredVenue, setPreferredVenue] = useState(venues[0]);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [ndaSignature, setNdaSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const application = trpc.employeeApplication.create.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Your application could not be sent. Please try again."),
  });

  if (submitted) {
    return (
      <main className="join-page">
        <img className="join-bg" src={heroImage} alt="" />
        <div className="join-shade" />
        <section className="join-success-card">
          <div className="join-success-icon"><Check size={29} /></div>
          <p className="join-kicker">APPLICATION &amp; NDA RECEIVED</p>
          <h1>You’re on<br /><em>our radar.</em></h1>
          <p>Thanks for introducing yourself to Clout. Your Candidate NDA and application have been recorded. Our people team will reach out if there’s a match.</p>
          <div className="join-success-info"><Clock3 size={15} /> Typical response time: 2–3 business days</div>
          <Button onClick={() => { window.location.href = "/"; }}>Back to Clout <ArrowRight size={15} /></Button>
        </section>
      </main>
    );
  }

  return (
    <main className="join-page">
      <img className="join-bg" src={heroImage} alt="" />
      <div className="join-shade" />
      <nav className="join-nav"><a href="/" aria-label="Back to Clout"><Mark /><span>CLOUT</span></a><a className="join-back" href="/"><ArrowLeft size={14} /> Back to the night</a></nav>
      <section className="join-layout">
        <div className="join-copy">
          <p className="join-kicker"><Sparkles size={13} /> JOIN THE TEAM</p>
          <h1>Help create<br /><em>brighter nights.</em></h1>
          <p>Clout is building the social layer for hospitality. We’re looking for people who know how to make every guest feel like they belong in the room.</p>
          <div className="join-value-list"><div><UsersRound size={18} /><span><b>Build the culture</b><small>Bring your energy to hospitality that remembers people.</small></span></div><div><Crown size={18} /><span><b>Grow with the network</b><small>Opportunities across venues, events and markets.</small></span></div><div><ShieldCheck size={18} /><span><b>Start with a conversation</b><small>Apply first. We match the right people to the right role.</small></span></div></div>
          <div className="join-qr-callout"><div className="join-qr-image"><img src="/manus-storage/join-clout-qr_04134b26.png" alt="QR code that opens the Join Clout employee application" /></div><div><p className="join-kicker">MOBILE APPLICATION</p><b>Scan to join from your phone.</b><small>Point your camera at the code to open the Clout team application instantly.</small><code>clouthospl-pbvuouvk.manus.space/join</code></div></div>
        </div>
        <form className="join-form" onSubmit={event => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const fullName = String(form.get("fullName")).trim();
          if (!ndaAccepted) { toast.error("Please review and accept the Candidate NDA before submitting."); return; }
          if (!ndaSignature.trim() || ndaSignature.trim().toLocaleLowerCase() !== fullName.toLocaleLowerCase()) { toast.error("Your typed NDA signature must match your full name."); return; }
          application.mutate({
            fullName,
            email: String(form.get("email")),
            phone: String(form.get("phone")),
            roleInterest,
            preferredVenue,
            socialHandle: String(form.get("socialHandle") || ""),
            availability: String(form.get("availability")),
            note: String(form.get("note") || ""),
            ndaAccepted: true,
            ndaSignatureName: ndaSignature.trim(),
            ndaVersion,
          });
        }}>
          <div className="join-form-heading"><p className="join-kicker">YOUR INTRO</p><h2>Tell us where<br /><em>you shine.</em></h2></div>
          <div className="join-field-grid"><div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" placeholder="Jordan Taylor" required /></div><div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="jordan@example.com" required /></div><div className="span-two"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" placeholder="(713) 555-0123" required /></div></div>
          <fieldset className="join-fieldset"><legend>How would you like to contribute?</legend><div className="join-choice-grid">{roles.map(role => <button type="button" key={role} onClick={() => setRoleInterest(role)} className={role === roleInterest ? "selected" : ""}><span>{role}</span>{role === roleInterest && <Check size={13} />}</button>)}</div></fieldset>
          <fieldset className="join-fieldset"><legend>Where would you like to work?</legend><div className="join-venue-grid">{venues.map(venue => <button type="button" key={venue} onClick={() => setPreferredVenue(venue)} className={venue === preferredVenue ? "selected" : ""}><span>{venue}</span>{venue === preferredVenue && <Check size={13} />}</button>)}</div></fieldset>
          <div className="join-field-grid"><div className="span-two"><Label htmlFor="availability">Availability</Label><Input id="availability" name="availability" placeholder="Example: Thursday–Saturday after 7 PM" required /></div><div><Label htmlFor="socialHandle">Instagram / social <small>(optional)</small></Label><Input id="socialHandle" name="socialHandle" placeholder="@yourhandle" /></div><div><Label htmlFor="note">Anything else <small>(optional)</small></Label><Textarea id="note" name="note" placeholder="What should we know about you?" /></div></div>
          <div className="nda-signature-section"><div className="nda-heading"><FileText size={16} /><div><b>Candidate NDA required</b><small>Review and sign before sending your application.</small></div></div><NdaTerms /><label className="nda-consent"><input type="checkbox" checked={ndaAccepted} onChange={event => setNdaAccepted(event.target.checked)} /><span>I have read and agree to the Candidate Confidentiality &amp; Non-Disclosure Agreement, including consent to use an electronic signature.</span></label><div className="nda-signature-input"><Label htmlFor="nda-signature">Typed legal signature</Label><Input id="nda-signature" value={ndaSignature} onChange={event => setNdaSignature(event.target.value)} placeholder="Type your full legal name" required /><small>Your typed name must match the full name above.</small></div></div>
          <Button type="submit" size="lg" disabled={application.isPending}>{application.isPending ? "Sending your intro…" : "Sign NDA & submit application"} <ArrowRight size={16} /></Button><p className="join-disclaimer"><ShieldCheck size={12} /> Your information and e-signature are kept within Clout for recruiting and onboarding.</p>
        </form>
      </section>
    </main>
  );
}
