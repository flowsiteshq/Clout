import { ArrowLeft, ArrowRight, Crown, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function Login() {
  return <main className="clout-login-page">
    <div className="clout-login-art" role="img" aria-label="Luxury nightlife atmosphere" />
    <div className="clout-login-overlay" />
    <nav className="clout-login-nav"><a href="/" className="clout-login-brand"><Crown size={27} /> CLOUT</a><a href="/"><ArrowLeft size={16}/> Back to Clout</a></nav>
    <section className="clout-login-card" aria-labelledby="clout-login-title">
      <div className="clout-login-emblem"><Crown size={29}/></div>
      <p className="clout-login-eyebrow">MEMBER ACCESS</p>
      <h1 id="clout-login-title">Welcome <em>back.</em></h1>
      <p className="clout-login-subtitle">Your nights. Your connections. Your Clout.</p>
      <form onSubmit={e=>e.preventDefault()}>
        <label htmlFor="clout-email"><Mail size={16}/> Email address</label>
        <input id="clout-email" type="email" autoComplete="email" placeholder="you@example.com" disabled aria-describedby="clout-auth-notice"/>
        <label htmlFor="clout-password"><LockKeyhole size={16}/> Password</label>
        <input id="clout-password" type="password" autoComplete="current-password" placeholder="Enter your password" disabled aria-describedby="clout-auth-notice"/>
        <button type="submit" disabled>Sign in <ArrowRight size={17}/></button>
      </form>
      <div className="clout-login-notice" id="clout-auth-notice" role="status"><ShieldCheck size={19}/><span>Secure member sign-in is being connected. Accounts cannot be accessed on this site yet. Please check back soon.</span></div>
      <p className="clout-login-footer">New to Clout? <a href="/#membership">Explore membership <ArrowRight size={13}/></a></p>
    </section>
    <div className="clout-login-bottom">CLOUT DIGITAL EXPERIENCE · 21+ WHERE REQUIRED</div>
  </main>;
}
