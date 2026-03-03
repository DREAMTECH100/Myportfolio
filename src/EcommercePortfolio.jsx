import React, { useState } from "react";

export default function EcommercePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    { title: "Valocity Bank – Fintech Platform", link: "https://valocity-bank.com" },
    { title: "YSG Courier – Logistics Platform", link: "https://ysgcourier.com" },
    { title: "PIEI Associates – Corporate Website", link: "https://pieiassociatesltd.com" },
    { title: "Deus Cautela – Corporate Brand Website", link: "https://deuscautela.com" }
  ];

  const stacks = [
    { title: "Frontend Engineering", items: "React.js, Angular, JavaScript (ES6+), TypeScript, HTML5, CSS3" },
    { title: "Backend Engineering", items: "Node.js, Express.js, REST APIs, JWT Authentication, Payment Integration" },
    { title: "Database Architecture", items: "MongoDB, Mongoose ODM, Data Modeling, Aggregation Pipelines" },
    { title: "Deployment & DevOps", items: "Vercel, VPS Hosting, CI/CD Pipelines, Git Version Control" }
  ];

  return (
    <div style={styles.page}>

      {/* Animated Blobs */}
      <div style={styles.blobOne}></div>
      <div style={styles.blobTwo}></div>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Onos Favour Israel</div>

        <div style={styles.navLinksDesktop}>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </div>

        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
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
        <h1 style={styles.heroTitle}>
          High-Performance Ecommerce & Fintech Engineering
        </h1>
        <p style={styles.heroText}>
          I architect scalable MERN & MEAN stack systems designed for
          performance, security, and revenue growth.
        </p>

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

      {/* PROJECTS */}
      <section id="work" style={styles.section}>
        <h2 style={styles.sectionTitle}>Selected Projects</h2>

        <div style={styles.grid}>
          {projects.map((project, index) => (
            <div key={index} style={styles.card}>
              <h3>{project.title}</h3>
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={styles.projectBtn}>
                View Live →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Technology Stack & Architecture</h2>

        <div style={styles.grid}>
          {stacks.map((stack, index) => (
            <div key={index} style={styles.stackCard}>
              <h3>{stack.title}</h3>
              <p>{stack.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>Let’s Build Something Exceptional</h2>

        <div style={styles.buttonGroup}>
          <a href="mailto:onoskelvin100@gmail.com" style={styles.primaryBtn}>
            Send Email
          </a>

          <a
            href="https://wa.me/07065446743"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryBtn}
          >
            Start WhatsApp Chat
          </a>
        </div>
      </section>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stackCard {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>

    </div>
  );
}

const styles = {

  page: {
    fontFamily: "Inter, sans-serif",
    background: "#ffffff",
    color: "#111",
    overflowX: "hidden",
    position: "relative"
  },

  blobOne: {
    position: "absolute",
    top: "-100px",
    left: "-100px",
    width: "300px",
    height: "300px",
    background: "rgba(108,92,231,0.15)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "float 6s infinite"
  },

  blobTwo: {
    position: "absolute",
    bottom: "-100px",
    right: "-100px",
    width: "300px",
    height: "300px",
    background: "rgba(0,200,255,0.15)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "float 8s infinite"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "25px 8%",
    borderBottom: "1px solid #eee",
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: { fontWeight: "700" },

  navLinksDesktop: { display: "flex", gap: "30px" },

  hamburger: { display: "none" },

  mobileMenu: {
    position: "fixed",
    top: "70px",
    right: 0,
    background: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  hero: { padding: "140px 8%", textAlign: "center" },

  heroTitle: { fontSize: "3rem", fontWeight: "700" },

  heroText: { marginTop: "20px", color: "#555", maxWidth: "700px", marginInline: "auto" },

  buttonGroup: { marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" },

  primaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#111",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s"
  },

  secondaryBtn: {
    padding: "14px 35px",
    borderRadius: "40px",
    background: "#25D366",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s"
  },

  section: { padding: "100px 8%" },

  sectionAlt: { padding: "100px 8%", background: "#f9f9f9" },

  sectionTitle: { fontSize: "2rem", marginBottom: "40px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px"
  },

  card: {
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #eee",
    transition: "0.3s",
    background: "#fff"
  },

  projectBtn: {
    marginTop: "15px",
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "30px",
    background: "#111",
    color: "#fff",
    textDecoration: "none"
  },

  stackCard: {
    padding: "30px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "0.3s"
  }
};