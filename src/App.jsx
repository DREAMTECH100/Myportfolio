import React, { useEffect, useRef, useState } from "react";

export default function EcommercePortfolio() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const revealRefs = useRef([]);

  const banners = [
    "20% OFF ALL ECOMMERCE PROJECTS — ENDS MAY 5",
    "ROUWEB — PREMIUM WEB ENGINEERING",
    "LIMITED CLIENT SLOTS AVAILABLE"
  ];

  const projects = [
    {
      title: "FRAGRANCE SOLUTION – E-commerce Platform",
      link: "https://fragrancesolution.com",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    },
    {
      title: "YSG Courier – Logistics Platform",
      link: "https://ysgcourier.com",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
    },
    {
      title: "Velocity Bank – Fintech Platform",
      link: "https://velocity-bank.com",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
    },
    {
      title: "PIEI Associates – Corporate Website",
      link: "https://pieiassociatesltd.com",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    },
    {
      title: "Deus Cautela – Corporate Website",
      link: "https://deuscautela.com",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
    }
  ];

  const services = [
    "Ecommerce Platforms",
    "SaaS Applications",
    "Fintech Systems",
    "Corporate Websites",
    "Web Apps",
    "Dashboards",
    "API Integrations",
    "Automation Systems"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  /* ✅ STAT COMPONENT */
 const StatCard = ({ value, label, suffix = "", isStatic = false }) => {
  const [count, setCount] = useState(isStatic ? value : 0);
  const ref = useRef();

  useEffect(() => {
    if (isStatic) return; // 🔥 do nothing for static values like 2021

    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const stepTime = Math.max(30, Math.floor(duration / value));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);

            if (start >= value) {
              clearInterval(timer);

              // 🔥 pause before re-trigger is allowed again
              setTimeout(() => {
                start = 0;
              }, 3000);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value, isStatic]);

  return (
    <div ref={ref} style={styles.statCard}>
      <h2 style={styles.statNumber}>
        {count}
        {suffix}
      </h2>
      <p style={styles.statLabel}>{label}</p>
    </div>
  );
};
  return (
    <div style={styles.page}>
      
      {/* NAV */}
      <nav style={styles.nav}>
        <img
           src={`/rouweb-logo.png?v=${Date.now()}`}
  alt="ROUWEB"
  style={styles.logo}
          onError={(e) => (e.target.style.display = "none")}
        />

       <div style={styles.navLinks}>
  <a href="#work" style={styles.navLinkBtn} className="navBtn">Work</a>
  <a href="#services" style={styles.navLinkBtn} className="navBtn">Services</a>
  <a href="#contact" style={styles.navLinkBtn} className="navBtn">Contact</a>
</div>
      </nav>

      {/* BANNER */}
      <div style={styles.banner}>
        {banners[bannerIndex]}
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1>
          Elite Digital Products <span style={styles.blue}>That Convert</span>
        </h1>
        <p>
          Ecommerce, SaaS & Fintech platforms engineered for performance,
          scalability and revenue growth.
        </p>
      </section>

      {/* ✅ STATS (ADDED HERE) */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
         <StatCard label="Founded" value={2021} isStatic={true} />
          <StatCard label="NDA Projects" value={25} />
          <StatCard label="Websites Managed" value={30} />
          <StatCard label="Years Experience" value={8} suffix="+" />
          <StatCard label="Clients Served" value={30} suffix="+" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.sectionAlt}>
        <h2>Services</h2>

        <div style={styles.servicesGrid}>
          {services.map((item, i) => (
            <div
              key={i}
              ref={addToRefs}
              className="reveal"
              style={styles.serviceCard}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" style={styles.section}>
        <h2>Selected Work</h2>

        <div style={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="reveal"
              style={styles.card}
            >
              <img src={project.image} style={styles.projectImage} />

              <div style={{ padding: "20px" }}>
                <h3>{project.title}</h3>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.projectBtn}
                >
                  View Live →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <h2>Start Your Project</h2>

        <div style={styles.buttonGroup}>
          <a href="mailto:onoskelvin100@gmail.com" style={styles.primaryBtn}>
            Email Us
          </a>

          <a
            href="https://wa.me/2347065446743"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryBtn}
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <img src="/rouweb-logo.png" style={styles.footerLogo} />
            <p style={{ opacity: 0.7 }}>
              Premium Web Engineering for Scaling Brands
            </p>
          </div>

          <div style={styles.footerLinks}>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} ROUWEB. All rights reserved.
        </div>
      </footer>

      {/* CSS */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 102, 255, 0.2);
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        a:hover {
          color: #4da3ff;
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background: "#05070d",
    color: "#fff"
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 8%",
    background: "rgba(5,7,13,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(0,102,255,0.2)"
  },

  logo: {
    height: "92px",
    width: "72px",
    filter: "drop-shadow(0 0 8px rgba(0,102,255,0.4))"
  },

navLinks: {
  display: "flex",
  gap: "5px",
  textTransform: "uppercase",
  fontSize: "11px",
  letterSpacing: "1.2px",
  alignItems: "center",
   marginLeft: "30px" 
},

navLinkBtn: {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid rgba(77,163,255,0.35)",
  background: "linear-gradient(145deg, #0a0f1f, #05070d)",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 0 0 rgba(0,0,0,0)",
  fontWeight: "500"
},

  banner: {
    textAlign: "center",
    padding: "10px",
    fontSize: "13px",
    letterSpacing: "2px",
    background: "linear-gradient(90deg, #001f4d, #0033cc)",
    color: "#fff"
  },

  hero: {
    padding: "160px 8%",
    textAlign: "center",
    maxWidth: "900px",
    margin: "auto"
  },

  statsSection: {
    padding: "60px 8%",
    borderTop: "1px solid rgba(0,102,255,0.1)",
    borderBottom: "1px solid rgba(0,102,255,0.1)"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "30px",
    textAlign: "center"
  },

  statCard: {
    padding: "30px",
    borderRadius: "16px",
    background: "linear-gradient(145deg, #0a0f1f, #05070d)",
    border: "1px solid rgba(0,102,255,0.2)"
  },

  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#4da3ff"
  },

  statLabel: {
    fontSize: "13px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    opacity: 0.7
  },

  blue: {
    color: "#4da3ff"
  },

  section: {
    padding: "100px 8%",
    textAlign: "center"
  },

  sectionAlt: {
    padding: "100px 8%",
    background: "#080b14",
    textAlign: "center"
  },

  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "40px"
  },

  serviceCard: {
    padding: "30px",
    borderRadius: "16px",
    background: "linear-gradient(145deg, #0a0f1f, #05070d)",
    border: "1px solid rgba(0,102,255,0.2)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    marginTop: "40px"
  },

  card: {
    borderRadius: "20px",
    overflow: "hidden",
    background: "#0a0f1f",
    border: "1px solid rgba(0,102,255,0.15)"
  },

  projectImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },

  projectBtn: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    background: "#0066ff",
    color: "#fff",
    borderRadius: "30px"
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px"
  },

  primaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#0066ff",
    color: "#fff"
  },

  secondaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#111",
    border: "1px solid #0066ff",
    color: "#fff"
  },

  footer: {
    marginTop: "80px",
    padding: "60px 8% 30px",
    background: "#03050a",
    borderTop: "1px solid rgba(0,102,255,0.2)"
  },

  footerInner: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px"
  },

  footerLogo: {
    height: "40px",
    marginBottom: "10px"
  },

  footerLinks: {
    display: "flex",
    gap: "30px",
    textTransform: "uppercase",
    fontSize: "13px",
    letterSpacing: "1px"
  },

  footerBottom: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "12px",
    opacity: 0.6
  }
};