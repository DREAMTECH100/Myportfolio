import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   ROUWEB PORTFOLIO  —  Premium Redesign
   Aesthetic: Cinematic dark / editorial luxury tech
   Font: Syne (display) + DM Sans (body)
───────────────────────────────────────────────────────────── */

const BANNERS = [
  "20% OFF ALL ECOMMERCE PROJECTS — ENDS MAY 5",
  "ROUWEB — PREMIUM WEB ENGINEERING",
  "LIMITED CLIENT SLOTS AVAILABLE THIS QUARTER",
];

const PROJECTS = [
  {
    title: "Fragrance Solution",
    category: "E-commerce Platform",
    link: "https://fragrancesolution.com",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    tag: "RETAIL",
  },
  {
    title: "YSG Courier",
    category: "Logistics Platform",
    link: "https://ysgcourier.com",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    tag: "LOGISTICS",
  },
  {
    title: "M-P Infrastructure",
    category: "Corporate Website",
    link: "https://www.mpiafrica.com",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    tag: "CORPORATE",
  },
  {
    title: "PIEI Associates",
    category: "Corporate Website",
    link: "https://pieiassociatesltd.com",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
    tag: "CORPORATE",
  },
  {
    title: "Velocity Bank",
    category: "Fintech Platform",
    link: "https://velocity-bank.com",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
    tag: "FINTECH",
  },
  {
    title: "Awka Millennium City",
    category: "Corporate Website",
    link: "https://www.awkamillenniumcity.com",
    image: "https://images.unsplash.com/photo-1512403754473-27835f7b9984?w=800&q=80",
    tag: "REAL ESTATE",
  },
 {
    title: "E-SUPERMARKET TEMPLATE",
    category: "E-Commerce Platform",
    link: "https://buymore-pearl.vercel.app/",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    tag: "WHOLESALE",
  },

  {
    title: "Deus Cautela",
    category: "Corporate Website",
    link: "https://deuscautela.com",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    tag: "CORPORATE",
  },
];

const SERVICES = [
  { name: "Ecommerce Platforms", icon: "🛒", desc: "High-conversion stores built to scale" },
  { name: "SaaS Applications", icon: "⚡", desc: "Scalable software products" },
  { name: "Fintech Systems", icon: "💳", desc: "Secure financial infrastructure" },
  { name: "Corporate Websites", icon: "🏢", desc: "Brand-defining digital presence" },
  { name: "Web Applications", icon: "🌐", desc: "Full-stack custom solutions" },
  { name: "Dashboards", icon: "📊", desc: "Data-driven analytics tools" },
  { name: "API Integrations", icon: "🔗", desc: "Seamless system connections" },
  { name: "Automation Systems", icon: "🤖", desc: "Workflow & process automation" },
];

/* ── Typewriter hook ── */
function useTypewriter(words, speed = 90, pause = 2200) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ── Animated counter hook ── */
function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

/* ── Stat Card ── */
function StatCard({ value, label, suffix = "", prefix = "", isStatic = false }) {
  const [count, ref] = useCounter(isStatic ? 0 : value);
  return (
    <div ref={ref} style={S.statCard}>
      <div style={S.statNumber}>
        {prefix}{isStatic ? value : count}{suffix}
      </div>
      <div style={S.statLabel}>{label}</div>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...S.projectCard, ...(hovered ? S.projectCardHover : {}) }}>
        <div style={S.projectImgWrap}>
          <img
            src={project.image}
            alt={project.title}
            style={{ ...S.projectImg, ...(hovered ? { transform: "scale(1.07)" } : {}) }}
          />
          <div style={{ ...S.projectOverlay, ...(hovered ? { opacity: 1 } : {}) }}>
            <span style={S.overlayBtn}>View Live ↗</span>
          </div>
          <span style={S.projectTag}>{project.tag}</span>
        </div>
        <div style={S.projectInfo}>
          <h3 style={S.projectTitle}>{project.title}</h3>
          <p style={S.projectCat}>{project.category}</p>
        </div>
      </div>
    </a>
  );
}

/* ── Main Component ── */
export default function EcommercePortfolio() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroWords = useTypewriter(["Convert.", "Perform.", "Scale.", "Impress.", "Dominate."]);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal on scroll */
  const revealRefs = useRef([]);
  const addRef = useCallback((el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("rw-reveal-active", e.isIntersecting)),
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={S.page}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
        <div style={S.navInner}>
          <a href="#" style={S.brandWrap}>
            <img
              src="/rouweb-logo.png"
              alt="ROUWEB"
              style={S.logo}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <span style={{ ...S.brandFallback, display: "none" }}>ROUWEB</span>
          </a>

          <div style={S.navLinks} className="rw-navlinks-desktop">
            {["work", "services", "contact"].map((item) => (
              <a key={item} href={`#${item}`} style={S.navLink} className="rw-navlink">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <a href="#contact" style={S.ctaBtn} className="rw-cta">
              Start a Project
            </a>
          </div>

          <button style={S.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="rw-hamburger">
            <span style={{ ...S.bar, ...(menuOpen ? S.barTopOpen : {}) }} />
            <span style={{ ...S.bar, ...(menuOpen ? S.barMidOpen : {}) }} />
            <span style={{ ...S.bar, ...(menuOpen ? S.barBotOpen : {}) }} />
          </button>
        </div>

        {menuOpen && (
          <div style={S.mobileMenu}>
            {["work", "services", "contact"].map((item) => (
              <a key={item} href={`#${item}`} style={S.mobileLink} onClick={() => setMenuOpen(false)}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── TICKER BANNER ── */}
      <div style={S.banner}>
        <span style={S.bannerDot} />
        {BANNERS[bannerIdx]}
        <span style={S.bannerDot} />
      </div>

      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.heroGrid} className="rw-heroGrid">
          <div style={S.heroNoise} />
          <div style={S.heroBg} />

          <div style={S.heroContent} ref={addRef} className="rw-reveal">
            <div style={S.heroBadge}>
              <span style={S.heroBadgeDot} />
              Available for new projects
            </div>

            <h1 style={S.heroH1}>
              Digital Products
              <br />
              Built to{" "}
              <span style={S.heroAccent}>
                {heroWords}
                <span style={S.cursor}>|</span>
              </span>
            </h1>

            <p style={S.heroSub}>
              Ecommerce, SaaS & Fintech platforms engineered for performance,
              scalability and serious revenue growth.
            </p>

            <div style={S.heroBtns}>
              <a href="#work" style={S.heroPrimary} className="rw-heroPrimary">
                View Our Work
              </a>
              <a href="#contact" style={S.heroSecondary} className="rw-heroSecondary">
                Let's Talk →
              </a>
            </div>
          </div>

          <div style={S.heroRight} ref={addRef} className="rw-reveal rw-delay1 rw-heroRight">
            <div style={S.heroCard}>
              <div style={S.hcLine}>
                <span style={S.hcDot} />
                <span style={S.hcLabel}>Live Project</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                alt="featured"
                style={S.hcImg}
              />
              <div style={S.hcFooter}>
                <div>
                  <div style={S.hcTitle}>Fragrance Solution</div>
                  <div style={S.hcSub}>E-commerce Platform</div>
                </div>
                <a href="https://fragrancesolution.com" target="_blank" rel="noopener noreferrer" style={S.hcLink}>↗</a>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling marquee strip */}
        <div style={S.marqueeWrap}>
          <div style={S.marqueeTrack} className="rw-marquee">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} style={S.marqueeItem}>
                {s.name} <span style={S.marqueeSep}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={S.statsSection}>
        <div style={S.statsGrid}>
          <StatCard value={2021} label="Founded" isStatic />
          <StatCard value={25} label="NDA Projects" />
          <StatCard value={30} label="Websites Managed" suffix="+" />
          <StatCard value={8} label="Years Experience" suffix="+" />
          <StatCard value={30} label="Clients Served" suffix="+" />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={S.section}>
        <div style={S.sectionHead} ref={addRef} className="rw-reveal">
          <span style={S.sectionLabel}>What We Do</span>
          <h2 style={S.sectionH2}>Services</h2>
          <p style={S.sectionSub}>From concept to launch — every layer, every detail.</p>
        </div>

        <div style={S.servicesGrid}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={addRef}
              className="rw-reveal rw-serviceCard"
              style={{ ...S.serviceCard, animationDelay: `${i * 60}ms` }}
            >
              <div style={S.serviceIcon}>{s.icon}</div>
              <div style={S.serviceName}>{s.name}</div>
              <div style={S.serviceDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" style={{ ...S.section, background: "#070a12" }}>
        <div style={S.sectionHead} ref={addRef} className="rw-reveal">
          <span style={S.sectionLabel}>Portfolio</span>
          <h2 style={S.sectionH2}>Selected Work</h2>
          <p style={S.sectionSub}>Live projects across industries and continents.</p>
        </div>

        <div style={S.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <div key={i} ref={addRef} className="rw-reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={S.section}>
        <div style={S.sectionHead} ref={addRef} className="rw-reveal">
          <span style={S.sectionLabel}>How We Work</span>
          <h2 style={S.sectionH2}>Our Process</h2>
        </div>
        <div style={S.processGrid}>
          {[
            { step: "01", title: "Discovery", desc: "Deep-dive into your goals, audience, and competitive landscape." },
            { step: "02", title: "Design", desc: "Wireframes and high-fidelity UI that reflects your brand at its peak." },
            { step: "03", title: "Engineering", desc: "Clean, scalable code built for speed, SEO, and conversions." },
            { step: "04", title: "Launch & Grow", desc: "Deployment, testing, and ongoing support as you scale." },
          ].map((p, i) => (
            <div key={i} ref={addRef} className="rw-reveal rw-processCard" style={{ transitionDelay: `${i * 100}ms` }}>
              <div style={S.processStep}>{p.step}</div>
              <h3 style={S.processTitle}>{p.title}</h3>
              <p style={S.processDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={S.ctaSection}>
        <div style={S.ctaBg} />
        <div style={S.ctaContent} ref={addRef} className="rw-reveal">
          <span style={S.sectionLabel}>Get Started</span>
          <h2 style={S.ctaH2}>Ready to build something exceptional?</h2>
          <p style={S.ctaSub}>
            Limited slots available. Let's talk about your project before they're gone.
          </p>
          <div style={S.ctaBtns}>
            <a href="mailto:onoskelvin100@gmail.com" style={S.heroPrimary} className="rw-heroPrimary">
              Email Us
            </a>
            <a
              href="https://wa.me/2347065446743"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...S.heroSecondary, borderColor: "rgba(37,211,102,0.5)", color: "#25d366" }}
              className="rw-heroSecondary"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={S.footer}>
        <div style={S.footerTop}>
          <div>
            <img
              src="/rouweb-logo.png"
              alt="ROUWEB"
              style={S.footerLogo}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <span style={{ ...S.brandFallback, fontSize: "22px", display: "none" }}>ROUWEB</span>
            <p style={S.footerTagline}>Premium Web Engineering for Scaling Brands</p>
          </div>
          <div style={S.footerNav}>
            {["work", "services", "contact"].map((l) => (
              <a key={l} href={`#${l}`} style={S.footerLink}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            ))}
          </div>
        </div>
        <div style={S.footerBottom}>
          <span>© {new Date().getFullYear()} ROUWEB. All rights reserved.</span>
          <span style={{ opacity: 0.4 }}>Lagos, Nigeria 🇳🇬</span>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */

const S = {
  /* ── THE FIX: page div must NOT own scrolling.
     No overflow-y, no overflow: hidden on the wrapper.
     Let html/body be the scroll container (handled in CSS below). ── */
  page: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: "#050810",
    color: "#f0f0f0",
    position: "relative",
    width: "100%",
  },

  /* NAV */
  nav: {
    position: "sticky",          /* sticky not fixed — doesn't break body scroll */
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    transition: "background 0.4s ease, box-shadow 0.4s ease",
  },
  navScrolled: {
    background: "rgba(5,8,16,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 1px 0 rgba(0,102,255,0.15)",
  },
  navInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 7%",
    maxWidth: "1440px",
    margin: "0 auto",
  },
  brandWrap: { textDecoration: "none" },
  logo: { height: "48px", width: "auto", filter: "drop-shadow(0 0 10px rgba(0,102,255,0.5))" },
  brandFallback: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: "800",
    fontSize: "20px",
    letterSpacing: "4px",
    color: "#fff",
    textDecoration: "none",
  },
  navLinks: { display: "flex", alignItems: "center", gap: "8px" },
  navLink: {
    padding: "8px 16px",
    fontSize: "13px",
    letterSpacing: "0.5px",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    borderRadius: "999px",
    transition: "color 0.2s",
  },
  ctaBtn: {
    marginLeft: "8px",
    padding: "10px 22px",
    fontSize: "13px",
    letterSpacing: "0.3px",
    background: "linear-gradient(135deg, #0055dd, #0088ff)",
    color: "#fff",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "500",
    boxShadow: "0 0 20px rgba(0,102,255,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "2px",
    background: "#fff",
    borderRadius: "2px",
    transition: "transform 0.3s, opacity 0.3s",
  },
  barTopOpen: { transform: "translateY(7px) rotate(45deg)" },
  barMidOpen: { opacity: 0 },
  barBotOpen: { transform: "translateY(-7px) rotate(-45deg)" },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(5,8,16,0.98)",
    borderTop: "1px solid rgba(0,102,255,0.15)",
    padding: "20px 7%",
    gap: "4px",
  },
  mobileLink: {
    padding: "14px 0",
    fontSize: "18px",
    fontWeight: "500",
    color: "#fff",
    textDecoration: "none",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    letterSpacing: "0.5px",
  },

  /* BANNER */
  banner: {
    textAlign: "center",
    padding: "11px 20px",
    fontSize: "11px",
    letterSpacing: "2.5px",
    fontWeight: "500",
    background: "linear-gradient(90deg, #001240, #0044cc, #001240)",
    color: "rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    textTransform: "uppercase",
  },
  bannerDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#4da3ff",
    flexShrink: 0,
  },

  /* HERO */
  hero: {
    position: "relative",
    /* NO overflow:hidden here — that was blocking touch scroll */
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
    padding: "60px 7% 80px",
    maxWidth: "1440px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  heroBg: {
    position: "absolute",
    top: "-200px",
    right: "-200px",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(0,68,204,0.18) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroNoise: {
    position: "absolute",
    inset: 0,
    opacity: 0.025,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
    backgroundSize: "200px",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroContent: { position: "relative", zIndex: 1 },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 16px",
    background: "rgba(0,102,255,0.1)",
    border: "1px solid rgba(0,102,255,0.25)",
    borderRadius: "999px",
    fontSize: "12px",
    letterSpacing: "0.5px",
    color: "#4da3ff",
    marginBottom: "28px",
  },
  heroBadgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#4da3ff",
    boxShadow: "0 0 8px #4da3ff",
    flexShrink: 0,
  },
  heroH1: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(42px, 5vw, 72px)",
    fontWeight: "800",
    lineHeight: "1.05",
    letterSpacing: "-1px",
    margin: "0 0 24px",
    color: "#fff",
  },
  heroAccent: {
    color: "#4da3ff",
    display: "inline-block",
    minWidth: "180px",
  },
  cursor: {
    display: "inline-block",
    animation: "rw-blink 0.9s step-end infinite",
    color: "#4da3ff",
  },
  heroSub: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.55)",
    margin: "0 0 40px",
    maxWidth: "500px",
  },
  heroBtns: { display: "flex", gap: "14px", flexWrap: "wrap" },
  heroPrimary: {
    display: "inline-block",
    padding: "14px 32px",
    background: "linear-gradient(135deg, #0055dd, #0088ff)",
    color: "#fff",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "15px",
    textDecoration: "none",
    boxShadow: "0 8px 30px rgba(0,102,255,0.35)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  heroSecondary: {
    display: "inline-block",
    padding: "14px 32px",
    background: "transparent",
    color: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px",
    fontWeight: "500",
    fontSize: "15px",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s",
  },

  /* Hero card */
  heroRight: { position: "relative", zIndex: 1 },
  heroCard: {
    background: "linear-gradient(145deg, #0d1226, #080b18)",
    border: "1px solid rgba(0,102,255,0.2)",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,102,255,0.1)",
  },
  hcLine: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 20px",
  },
  hcDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 8px #22c55e",
  },
  hcLabel: { fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" },
  hcImg: { width: "100%", height: "220px", objectFit: "cover", display: "block" },
  hcFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
  },
  hcTitle: { fontSize: "16px", fontWeight: "600", color: "#fff" },
  hcSub: { fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "3px" },
  hcLink: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(0,102,255,0.15)",
    border: "1px solid rgba(0,102,255,0.3)",
    color: "#4da3ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    textDecoration: "none",
    flexShrink: 0,
  },

  /* Marquee */
  marqueeWrap: {
    overflowX: "hidden",
    borderTop: "1px solid rgba(0,102,255,0.1)",
    borderBottom: "1px solid rgba(0,102,255,0.1)",
    padding: "18px 0",
    background: "rgba(0,20,70,0.3)",
  },
  marqueeTrack: {
    display: "flex",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  marqueeItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "18px",
    padding: "0 20px",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
  },
  marqueeSep: { color: "#0066ff", fontSize: "8px" },

  /* STATS */
  statsSection: {
    padding: "60px 7%",
    borderBottom: "1px solid rgba(0,102,255,0.08)",
    background: "#060912",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  statCard: {
    padding: "32px 24px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, #0a0f20, #060912)",
    border: "1px solid rgba(0,102,255,0.15)",
    textAlign: "center",
    transition: "border-color 0.3s, transform 0.3s",
  },
  statNumber: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "38px",
    fontWeight: "800",
    color: "#4da3ff",
    letterSpacing: "-1px",
    lineHeight: 1,
  },
  statLabel: {
    marginTop: "8px",
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
  },

  /* SECTION COMMON */
  section: {
    padding: "110px 7%",
    boxSizing: "border-box",
  },
  sectionHead: {
    textAlign: "center",
    marginBottom: "64px",
  },
  sectionLabel: {
    display: "inline-block",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#4da3ff",
    fontWeight: "600",
    marginBottom: "16px",
  },
  sectionH2: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
  },
  sectionSub: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.45)",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  /* SERVICES */
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  serviceCard: {
    padding: "32px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, #0a0f20, #060912)",
    border: "1px solid rgba(0,102,255,0.12)",
    transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
    cursor: "default",
  },
  serviceIcon: { fontSize: "28px", marginBottom: "16px" },
  serviceName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "17px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
  },
  serviceDesc: { fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" },

  /* PROJECTS */
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  projectCard: {
    borderRadius: "20px",
    overflow: "hidden",
    background: "#0a0f20",
    border: "1px solid rgba(0,102,255,0.12)",
    transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, box-shadow 0.4s",
    cursor: "pointer",
  },
  projectCardHover: {
    transform: "translateY(-8px)",
    borderColor: "rgba(0,102,255,0.4)",
    boxShadow: "0 24px 60px rgba(0,60,180,0.25)",
  },
  projectImgWrap: { position: "relative", overflow: "hidden" },
  projectImg: {
    width: "100%",
    height: "210px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.6s ease",
  },
  projectOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,30,100,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  overlayBtn: {
    padding: "12px 28px",
    background: "#fff",
    color: "#000",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  projectTag: {
    position: "absolute",
    top: "14px",
    left: "14px",
    padding: "4px 12px",
    background: "rgba(0,102,255,0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "999px",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "uppercase",
  },
  projectInfo: { padding: "22px" },
  projectTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 6px",
  },
  projectCat: { fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 },

  /* PROCESS */
  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  processStep: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "48px",
    fontWeight: "800",
    color: "rgba(0,102,255,0.15)",
    lineHeight: 1,
    marginBottom: "16px",
    letterSpacing: "-2px",
  },
  processTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 12px",
  },
  processDesc: { fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7", margin: 0 },

  /* CTA */
  ctaSection: {
    position: "relative",
    padding: "130px 7%",
    textAlign: "center",
    boxSizing: "border-box",
  },
  ctaBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, rgba(0,60,200,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaContent: { position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" },
  ctaH2: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(32px, 4vw, 56px)",
    fontWeight: "800",
    color: "#fff",
    margin: "16px 0 20px",
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
  },
  ctaSub: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "48px",
    lineHeight: "1.7",
  },
  ctaBtns: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },

  /* FOOTER */
  footer: {
    padding: "70px 7% 40px",
    borderTop: "1px solid rgba(0,102,255,0.12)",
    background: "#03050d",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "50px",
  },
  footerLogo: { height: "48px", width: "auto", marginBottom: "12px" },
  footerTagline: { fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 },
  footerNav: { display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" },
  footerLink: {
    fontSize: "13px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
  },
};

/* ─────────────────────────────────────────────────────────────
   CSS INJECTED STYLES
───────────────────────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  /* ── ANDROID + iOS SCROLL FIX ── */
  html, body {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    overscroll-behavior-y: none;
  }

  #root {
    min-height: 100vh;
    overflow: visible;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Android needs pan-y on layout containers — NOT on * (breaks Android) */
  div, section, nav, footer, header, main {
    touch-action: pan-y pinch-zoom;
  }

  /* Fast taps on interactive elements */
  a, button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  @keyframes rw-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes rw-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .rw-marquee {
    animation: rw-marquee 28s linear infinite;
    pointer-events: none;
  }

  .rw-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .rw-delay1 { transition-delay: 0.18s; }
  .rw-delay2 { transition-delay: 0.3s; }

  .rw-reveal-active {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .rw-navlink:hover {
    color: #fff !important;
    background: rgba(255,255,255,0.05);
  }

  .rw-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0,102,255,0.45) !important;
  }

  .rw-heroPrimary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(0,102,255,0.45) !important;
  }

  .rw-heroSecondary:hover {
    border-color: rgba(255,255,255,0.4) !important;
    color: #fff !important;
  }

  .rw-serviceCard:hover {
    transform: translateY(-6px) !important;
    border-color: rgba(0,102,255,0.35) !important;
    box-shadow: 0 16px 40px rgba(0,30,120,0.3) !important;
  }

  .rw-processCard {
    padding: 36px;
    border-radius: 20px;
    background: linear-gradient(145deg, #0a0f20, #060912);
    border: 1px solid rgba(0,102,255,0.12);
    transition: border-color 0.3s, transform 0.3s;
  }

  .rw-processCard:hover {
    border-color: rgba(0,102,255,0.3);
    transform: translateY(-4px);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .rw-heroGrid {
      grid-template-columns: 1fr !important;
      padding: 80px 6% 60px !important;
      gap: 40px !important;
    }
    .rw-heroRight {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .rw-navlinks-desktop { display: none !important; }
    .rw-hamburger { display: flex !important; }

    .rw-heroGrid {
      grid-template-columns: 1fr !important;
      padding: 60px 5% 40px !important;
      gap: 32px !important;
    }
  }

  @media (max-width: 600px) {
    .rw-heroGrid {
      padding: 50px 5% 32px !important;
    }
  }

  a { -webkit-tap-highlight-color: transparent; }
  button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
`;
