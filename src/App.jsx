import React, { useEffect, useRef, useState } from "react";

export default function EcommercePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef([]);

  // Scroll Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const projects = [
    {
      title: "Valocity Bank – Fintech Platform",
      link: "https://valocity-bank.com",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
    },
    {
      title: "YSG Courier – Logistics Platform",
      link: "https://ysgcourier.com",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
    },
    {
      title: "PIEI Associates – Corporate Website",
      link: "https://pieiassociatesltd.com",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    },
    {
      title: "Deus Cautela – Corporate Brand",
      link: "https://deuscautela.com",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    }
  ];

  const stacks = [
    {
      title: "Frontend Engineering",
      items: "React.js, Angular, JavaScript (ES6+), TypeScript, HTML5, CSS3"
    },
    {
      title: "Backend Engineering",
      items: "Node.js, Express.js, REST APIs, JWT Authentication"
    },
    {
      title: "Database Architecture",
      items: "MongoDB, Mongoose ODM, Aggregation Pipelines, Data Modeling"
    },
    {
      title: "Deployment & DevOps",
      items: "Vercel, VPS Hosting, CI/CD, Git"
    }
  ];

  return (
    <div style={styles.page}>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Onos Favour Israel</div>

        <div style={styles.navLinks}>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </div>

        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* HERO */}
      <section style={styles.hero}>
        <h1>High-Performance Ecommerce, Business & Fintech Engineering</h1>
        <p>
          I design and build scalable MERN & MEAN stack platforms engineered
          for performance, security, and business growth.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="work" style={styles.section}>
        <h2>Selected Projects</h2>

        <div style={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="reveal"
              style={styles.card}
            >
              <img
                src={project.image}
                alt={project.title}
                style={styles.projectImage}
              />

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
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" style={styles.sectionAlt}>
        <h2>Technology Stack</h2>

        <div style={styles.grid}>
          {stacks.map((stack, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="reveal"
              style={styles.stackCard}
            >
              <h3>{stack.title}</h3>
              <p>{stack.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <h2>Let’s Work Together</h2>

        <div style={styles.buttonGroup}>
          <a href="mailto:your@email.com" style={styles.primaryBtn}>
            Email Me
          </a>

          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryBtn}
          >
            WhatsApp Me
          </a>
        </div>
      </section>

      {/* CSS ANIMATION */}
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

        .reveal.active:nth-child(even) {
          transform: translateY(0);
        }

        a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

const styles = {

  page: {
    fontFamily: "Inter, sans-serif",
    background: "#ffffff",
    color: "#111"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 8%",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 1000
  },

  logo: { fontWeight: "700" },

  navLinks: { display: "flex", gap: "30px" },

  hamburger: { display: "none", cursor: "pointer" },

  mobileMenu: {
    position: "fixed",
    right: 0,
    top: "60px",
    background: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  hero: {
    padding: "140px 8%",
    textAlign: "center",
    maxWidth: "900px",
    margin: "auto"
  },

  section: {
    padding: "100px 8%"
  },

  sectionAlt: {
    padding: "100px 8%",
    background: "#f9f9f9"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    marginTop: "40px"
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
  },

  projectImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  },

  stackCard: {
    padding: "30px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
  },

  projectBtn: {
    display: "inline-block",
    margin: "20px",
    padding: "10px 20px",
    background: "#111",
    color: "#fff",
    borderRadius: "30px",
    textDecoration: "none"
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px"
  },

  primaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#111",
    color: "#fff",
    textDecoration: "none"
  },

  secondaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#25D366",
    color: "#fff",
    textDecoration: "none"
  }
};