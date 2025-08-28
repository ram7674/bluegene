import React, { useState } from "react";
import "./app.css";

// ------------------------------
// Use public path directly (no import needed)
const LOGO = "/assets/logo.png";
const FooterLogo = "/assets/Footer-Logo.png";

function BrandLogo({ className = "h-8" }) {
  return <img src={LOGO} alt="BlueGene Logo" className="logo" />;
}

// ------------------------------
// REUSABLE DROPDOWN WITH RECURSION (supports sub and sub-sub menus)
function Dropdown({ label, items }) {
  return (
    <details className="relative group">
      <summary className="list-none cursor-pointer px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-700 flex items-center gap-1 select-none">
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className="opacity-70 group-open:rotate-180 transition-transform"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </summary>
      <div className="absolute z-30 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl p-2">
        <MenuList items={items} depth={0} />
      </div>
    </details>
  );
}

function MenuList({ items, depth }) {
  return (
    <div className={depth === 0 ? "space-y-1" : "ml-3 mt-1 space-y-1"}>
      {items.map((node, i) =>
        node.children ? (
          <details key={`${depth}-${i}`} className="group">
            <summary className="flex items-center justify-between cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              {node.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                className="opacity-60 group-open:rotate-180 transition-transform"
              >
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </summary>
            <MenuList items={node.children} depth={depth + 1} />
          </details>
        ) : (
          <a
            key={`${depth}-${i}`}
            href={node.href}
            className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {node.label}
          </a>
        )
      )}
    </div>
  );
}

// ------------------------------
// LAYOUT HELPERS
function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
    >
      {children}
    </a>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24" aria-label={title}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-slate-600 max-w-3xl">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

function ProfileCard({ name, role }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-slate-200 grid place-items-center text-xs text-slate-500">
          Photo
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-slate-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------
// MENU DATA
const HEALTHCARE_ITEMS = [
  { label: "Prasad Infertility Solutions", href: "#infertility" },
  { label: "Prasad Skin Solutions", href: "#skin" },
  { label: "Cosmetology", href: "#cosmetology" },
];

const TECH_ITEMS = [
  {
    label: "Cryo Preservation",
    href: "#cryo",
    children: [
      { label: "Fertility Cryo Preservation", href: "#fertilitycryo" },
      { label: "Stem Cell Banking", href: "#stemcell" },
    ],
  },
  {
    label: "Products & Services",
    href: "#products",
    children: [
      { label: "Cell Culture Media and Processing", href: "#cellculture" },
      { label: "Buffers", href: "#buffers" },
      { label: "Custom Media Services", href: "#custommedia" },
      {
        label: "Medical Media and ART",
        href: "#medicalmedia",
        children: [
          { label: "Sperm Wash Media", href: "#spermwash" },
          { label: "Multi Purpose Handling Media", href: "#multipurpose" },
        ],
      },
    ],
  },
];

const EXPERTS_ITEMS = [
  { label: "Doctors", href: "#doctors" },
  { label: "Lab & Quality Team", href: "#labquality" },
];

// ------------------------------
export default function BlueGeneWebsite() {
  return (
    <div className="text-slate-900 bg-slate-50">
      {/* Header reverted to simple logo + nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <BrandLogo />
          </a>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <Dropdown label="Healthcare Services" items={HEALTHCARE_ITEMS} />
            <Dropdown label="Technology Solutions" items={TECH_ITEMS} />
            <Dropdown label="Our Experts" items={EXPERTS_ITEMS} />
            <NavLink href="#contact">Contact Us</NavLink>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-slate-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="home-card1">
            <h1 className="text-3xl md:text-5xl font-extrabold home-title">
              Personalized Healthcare Meets Advanced Technology
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl">
              From fertility care to dermatology and cosmetology, and from
              cryopreservation to lab automation, we offer clear guidance and
              safe, evidence-based care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-sky-600 px-5 py-3 text-white font-medium shadow hover:bg-sky-700"
              >
                Book Appointment
              </a>
              <a
                href="#about"
                className="rounded-xl border bg-white border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-white"
              >
                Meet Our Experts
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl border border-slate-200 bg-white shadow-inner grid place-items-center">
              <div className="text-center text-slate-500">
                <div className="mb-2 text-sm">Image / Illustration</div>
                <div className="text-xs">(Replace with clinic/lab photo)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="about-tl-card">
          <h4>About Us</h4>
          <p>
            BlueGene combines medical expertise with advanced technology to
            deliver safe, ethical, and future-ready healthcare.
          </p>
        </div>

        <div className="about-panel">
          <div className="panel-item">
            <div className="panel-icon">🎯</div>
            <div>
              <h3>Mission</h3>
              <p>
                Personalized healthcare grounded in ethics, empathy, and
                measurable outcomes.
              </p>
            </div>
          </div>
          <div className="panel-divider" />
          <div className="panel-item">
            <div className="panel-icon">⚙️</div>
            <div>
              <h3>What We Do</h3>
              <p>
                Infertility & skin clinics, cosmetology, cryopreservation, lab
                services and knowledge products.
              </p>
            </div>
          </div>
          <div className="panel-divider" />
          <div className="panel-item">
            <div className="panel-icon">💡</div>
            <div>
              <h3>Why Choose Us</h3>
              <p>
                Experienced doctors, robust lab practices, and transparent
                communication.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* HEALTHCARE SERVICES */}
      <Section id="services">
        <div className="about-tl-card">
          <h4>Healthcare Services</h4>
        </div>

        <div className="services-grid">
          <div className="service-card" id="infertility">
            <div className="service-icon infertility"></div>
            <h3>Prasad Infertility Solutions</h3>
            <p>
              Comprehensive fertility care: diagnostics, IUI, IVF, counseling,
              and cryo options with clear consent and quality controls.
            </p>
          </div>

          <div className="service-card" id="skin">
            <div className="service-icon skin"></div>
            <h3>Prasad Skin Solutions</h3>
            <p>
              Dermatology for psoriasis, acne, eczema and pigmentation with
              clinician-led plans and careful follow-up.
            </p>
          </div>

          <div className="service-card" id="cosmetology">
            <div className="service-icon cosmetology"></div>
            <h3>Cosmetology</h3>
            <p>
              Medically supervised aesthetics: lasers, peels, hair restoration,
              injectables and anti-ageing care.
            </p>
          </div>
        </div>
      </Section>

      {/* TECHNOLOGY SOLUTIONS */}
      {/* <Section id="tech" title="Technology Solutions">
        <div id="cryo" className="mb-8">
          <h3 className="text-xl font-semibold">Cryo Preservation</h3>
          <p className="mt-2 text-slate-600 max-w-3xl">Long-term secure storage of cells and tissues using validated protocols and traceability.</p>
        </div>
        <div id="products" className="mb-4">
          <h3 className="text-xl font-semibold">Products & Services</h3>
          <p className="mt-2 text-slate-600 max-w-3xl">Consumables and custom solutions to support labs and ART clinics.</p>
        </div>
      </Section> */}
      <Section id="tech">
        <div className="about-tl-card">
          <h4>Technology Solutions</h4>
        </div>

        <div className="tech-grid">
          <div className="tech-card" id="cryo">
            <div className="tech-icon cryo"></div>
            <h3>Cryo Preservation</h3>
            <p>
              Long-term secure storage of cells and tissues using validated
              protocols and traceability.
            </p>
          </div>

          <div className="tech-card" id="products">
            <div className="tech-icon products"></div>
            <h3>Products & Services</h3>
            <p>
              Consumables and custom solutions to support labs and ART clinics.
            </p>
          </div>
        </div>
      </Section>

      {/* DOCTORS */}
      <Section id="doctors">
        
        <div className="about-tl-card">
          <h4>Doctors</h4>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileCard
            name="Dr. Suma Kantipudi, M.D., D.G.O"
            role="IVF Specialist, Regenerative Medicine"
          />
          <ProfileCard
            name="Dr. S. Raghavender, MD (General Medicine)"
            role="Senior Physician & Diabetologist"
          />
          <ProfileCard
            name="Dr. Basaveshwar Gujar, MS (General Surgery)"
            role="Senior Consultant Surgeon"
          />
          <ProfileCard
            name="Dr. Uday Shekar Reddy, MS Ortho, Mch Ortho"
            role="Orthopedics & Joint Replacement"
          />
          <ProfileCard
            name="Dr. Laxmi Prasanna Inugurthi, MBBS, D.C.H"
            role="Senior Pediatrician"
          />
          <ProfileCard
            name="Dr. Laxmi Rao, PhD"
            role="Senior Principal Scientist, CCMB"
          />
          <ProfileCard
            name="Dr. Tripura Chaturvedula, PhD"
            role="Scientist, CCMB"
          />
          <ProfileCard
            name="Dr. Reelina Basu, PhD"
            role="SERB National Post-Doctoral Fellow"
          />
          <ProfileCard
            name="Dr. Amina, MD Pathology"
            role="Hematologist, Apollo Hospitals"
          />
        </div>
      </Section>

      {/* LAB & QUALITY TEAM */}
      <Section id="labquality">

        <div className="about-tl-card">
          <h4>Lab & Quality Team</h4>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileCard
            name="Dr. B. Sandeeptha, PhD Biochemistry"
            role="Research Associate"
          />
          <ProfileCard
            name="Mr. Surendra Tattikota, M.Sc Biomedical Genetics"
            role="In-charge Stem Cell Lab"
          />
          <ProfileCard
            name="Mr. G. Vikram Kumar Reddy, M.Phil, ISO 9001"
            role="Manager, QA & QC"
          />
          <ProfileCard
            name="Ms. Sri Vidya, Pharm-D"
            role="Clinical Research Coordinator"
          />
          <ProfileCard
            name="Dr. M. Mounika, B.V.Sc."
            role="Pre-clinical Studies In-charge"
          />
          <ProfileCard name="Mr. Dhana Lakshmi, DMLT" role="Lab Assistant" />
        </div>
      </Section>

      {/* CONTACT */}
      {/* <Section id="contact" title="Contact & Location">
        <p className="text-slate-600 mb-4">MIG - 303, KPHB Road, No 4, Remedy Hospital Lane, K P H B Phase 1, Kukatpally, Hyderabad, Telangana 500072</p>
        <p className="text-slate-600">📞 809 6000 600 | ✉️ hello@bluegene.health</p>
        <p className="text-slate-600 mt-2">Working Hours: Mon–Sat, 9:00 AM – 7:00 PM</p>
      </Section> */}
      <Section id="contact">

        <div className="about-tl-card">
          <h4>Contact & Location</h4>
        </div>

        <div className="contact-wrapper">
          <div className="contact-card">
            <div className="contact-item">
              <div className="contact-icon location"></div>
              <p>
                MIG - 303, KPHB Road, No 4, Remedy Hospital Lane,
                <br />K P H B Phase 1, Kukatpally, Hyderabad, Telangana 500072
              </p>
            </div>

            <div className="contact-item">
              <div className="contact-icon phone"></div>
              <p>
                <strong>📞 809 6000 600</strong>
                <br />
                ✉️ hello@bluegene.health
              </p>
            </div>

            <div className="contact-item">
              <div className="contact-icon clock"></div>
              <p>
                Working Hours: <strong>Mon–Sat, 9:00 AM – 7:00 PM</strong>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer with helpline */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src={FooterLogo} alt="BlueGene Logo" className="footer-logo" />
          </div>
          <div className="footer-right">
            <div className="footer-helpline">Helpline</div>
            <div className="footer-phone">809 6000 600</div>
            <div className="footer-copy">
              © {new Date().getFullYear()} BlueGene Solutions | Privacy Policy |
              Terms
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
