import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowUpRight,
  ChevronRight,
  CircuitBoard,
  ExternalLink,
  Menu,
  ScanLine,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'focus', 'method', 'milestones', 'people', 'join']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-24% 0px -62% 0px', threshold: [0.05, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ['about', 'About'],
    ['focus', 'Focus'],
    ['method', 'Method'],
    ['milestones', 'Milestones'],
    ['people', 'People'],
  ];

  return (
    <div className="site-shell" data-testid="page-raisc-home">
      <header className="nav-shell" data-testid="navigation-primary">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" onClick={closeMenu} data-testid="link-brand-home">
            <CircuitBoard className="brand-mark" size={22} strokeWidth={1.4} aria-hidden="true" />
            <span className="brand-copy">RAISC</span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <a
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                href={`#${id}`}
                key={id}
                onClick={closeMenu}
                data-testid={`link-nav-${id}`}
              >
                {label}
              </a>
            ))}
            <a className="nav-link" href="#join" onClick={closeMenu} data-testid="link-nav-join">
              Join
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="nav-follow"
              href="https://www.linkedin.com/company/raiscgkciet"
              target="_blank"
              rel="noreferrer"
              data-testid="link-nav-linkedin"
            >
              Follow <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <button
              className="nav-menu"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-toggle-menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" data-testid="section-hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow reveal" data-testid="text-hero-eyebrow">
                GKCIET / Student Robotics Club
              </div>
              <h1 className="reveal reveal-delay-1" data-testid="text-hero-title">
                Make the <em>physical</em> world think.
              </h1>
              <p className="hero-lead reveal reveal-delay-2" data-testid="text-hero-description">
                RAISC is a student-led lab for robotics, artificial intelligence and intelligent
                systems at GKCIET. We learn across disciplines, build in small teams and test ideas
                against the real world.
              </p>
              <div className="hero-actions reveal reveal-delay-3">
                <a className="button button-primary" href="#about" data-testid="link-hero-explore">
                  Explore the club <ChevronRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="button button-ghost"
                  href="https://www.linkedin.com/company/raiscgkciet"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-hero-linkedin"
                >
                  LinkedIn <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-meta reveal reveal-delay-3" aria-label="Club facts">
                <div className="hero-meta-item">
                  <span className="hero-meta-value" data-testid="text-fact-founded">2019 →</span>
                  <span className="hero-meta-label">first competition</span>
                </div>
                <div className="hero-meta-item">
                  <span className="hero-meta-value" data-testid="text-fact-model">Student-run</span>
                  <span className="hero-meta-label">mentor-guided</span>
                </div>
                <div className="hero-meta-item">
                  <span className="hero-meta-value" data-testid="text-fact-disciplines">03 fields</span>
                  <span className="hero-meta-label">one shared bench</span>
                </div>
              </div>
            </div>
            <div className="wordmark-stage reveal reveal-delay-2" aria-label="RAISC wordmark">
              <div className="wordmark-grid" aria-hidden="true" />
              <span className="crosshair crosshair-a" aria-hidden="true" />
              <span className="crosshair crosshair-b" aria-hidden="true" />
              <div className="wordmark" data-testid="text-hero-wordmark">RAISC</div>
              <div className="wordmark-sub">signal / build / repeat</div>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Club signal">
          <div className="wrap signal-inner">
            <span className="signal-label">Current operating principles</span>
            <div className="signal-points">
              <span className="signal-point">Curiosity</span>
              <span className="signal-point">Precision</span>
              <span className="signal-point">Useful outcomes</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about" data-testid="section-about">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">01 / Context</div>
                <h2 className="section-title">A club built across <em>boundaries.</em></h2>
              </div>
              <p className="section-intro">
                Robotics is not one department’s problem. It is mechanical design, electronics,
                computer science, control, sensing and human judgement converging in one machine.
              </p>
            </div>
            <div className="about-body">
              <div className="about-stamp" data-testid="panel-club-origin">
                <strong>RAISC / origin note</strong>
                <span>
                  Established at GKCIET to give students a shared place to study emerging
                  technology, run technical conversations and turn spare hours into working
                  prototypes.
                </span>
              </div>
              <div className="about-copy">
                <p>
                  A robot can enter a dangerous environment, repeat a precise manufacturing action
                  or sense where a person cannot. Modern systems also borrow from nature: movement,
                  perception and adaptation become design prompts rather than distant theory.
                </p>
                <p>
                  At GKCIET, faculty and student members make that interdisciplinary work tangible.
                  <strong> Dr. Habib Masum</strong>, Assistant Professor and Convenor, coordinates
                  the club with students working under mentor guidance. The club operates under the
                  patronage of <strong>Prof. P. R. Alapati</strong>.
                </p>
                <p>
                  Questions, project conversations and collaboration requests can reach the
                  convenor at <a className="email-link" href="mailto:kingmasum@gmail.com" data-testid="link-convenor-email">kingmasum@gmail.com</a>.
                </p>
                <div className="note-line">Student-led / mentor-guided / real-world impact</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="focus" data-testid="section-focus">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">02 / Workbench</div>
                <h2 className="section-title">Three lenses. <em>One system.</em></h2>
              </div>
              <p className="section-intro">
                Members move between hardware and software instead of staying in a silo. Every
                project is an invitation to understand how the pieces behave together.
              </p>
            </div>
            <div className="focus-layout">
              <div className="focus-aside">
                <p>
                  The club’s centre of gravity is the connection: a sensor is only useful when a
                  system can decide what to do with its signal.
                </p>
                <div className="focus-code" aria-label="System stack">
                  <div><span>01</span> / physical layer</div>
                  <div><span>02</span> / perception layer</div>
                  <div><span>03</span> / decision layer</div>
                </div>
              </div>
              <div className="focus-bento">
                <article className="focus-card" data-testid="card-focus-robotics">
                  <div className="card-index">A / 01</div>
                  <h3>Robotics</h3>
                  <p>Mechanical design, embedded systems and control for machines that sense and act in the physical world.</p>
                </article>
                <article className="focus-card" data-testid="card-focus-ai">
                  <div className="card-index">B / 02</div>
                  <h3>Artificial intelligence</h3>
                  <p>Applied machine learning and perception, from data to models that make sense of an environment.</p>
                </article>
                <article className="focus-card" data-testid="card-focus-systems">
                  <div>
                    <div className="card-index">C / 03</div>
                    <h3>Intelligent systems</h3>
                    <p>Sensing, decision-making and automation brought together into systems designed to work end to end.</p>
                  </div>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="method" data-testid="section-method">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">03 / Method</div>
                <h2 className="section-title">Learn by <em>making.</em></h2>
              </div>
              <p className="section-intro">
                RAISC is less about collecting topics and more about building the habit of taking an
                idea from first question to tested object.
              </p>
            </div>
            <div className="process-list">
              {[
                ['01', 'Open the bench', 'Workshops and hands-on sessions cover electronics, embedded programming and ML fundamentals.', '01'],
                ['02', 'Build a small thing', 'Project teams design, prototype and iterate on robots and intelligent-systems projects.', '02'],
                ['03', 'Stress the idea', 'Competitions and hackathons make teams apply what they built under real time pressure.', '03'],
                ['04', 'Read beyond the build', 'Research and reading groups keep the club close to current robotics and AI work.', '04'],
              ].map(([number, title, description, id]) => (
                <div className="process-row" key={id} data-testid={`row-method-${id}`}>
                  <span className="process-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="process-arrow" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="milestones" data-testid="section-milestones">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">04 / Field notes</div>
                <h2 className="section-title">From campus to the <em>convention floor.</em></h2>
              </div>
              <p className="section-intro">
                In 2019, three club teams entered the AICTE–Chhatra Vishwakarma Awards with low-cost
                solutions to the question: how can we enhance the income of a village?
              </p>
            </div>
            <div className="timeline">
              <div className="timeline-intro">
                <ScanLine size={28} strokeWidth={1.2} color="hsl(var(--primary))" aria-hidden="true" />
                <p>Proof that a student-led club can take a practical question seriously, and carry a working answer further than the campus.</p>
              </div>
              <div className="timeline-track">
                <article className="event" data-testid="event-regional-convention">
                  <span className="event-dot" aria-hidden="true" />
                  <span className="event-date">26 Dec 2019<br />Kolkata</span>
                  <div className="event-detail">
                    <h3>Regional Convention</h3>
                    <p>One team reached the Regional Convention at Heritage Institute of Technology, Kolkata, taking the club’s low-cost village-income solution to a wider review.</p>
                  </div>
                </article>
                <article className="event" data-testid="event-national-convention">
                  <span className="event-dot" aria-hidden="true" />
                  <span className="event-date">24 Feb 2020<br />New Delhi</span>
                  <div className="event-detail">
                    <h3>National Convention</h3>
                    <p>Another team competed at the National Convention at AICTE Headquarters, New Delhi — a national stage for a student-built response to a local challenge.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="people" data-testid="section-people">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">05 / People</div>
                <h2 className="section-title">A student engine, with <em>steady hands.</em></h2>
              </div>
              <p className="section-intro">
                Members bring the energy and the questions. Mentors make room for better questions,
                safer experiments and work that can leave the lab.
              </p>
            </div>
            <div className="people-grid">
              <article className="person" data-testid="card-convenor">
                <div className="person-label">Convenor / faculty mentor</div>
                <h3>Dr. Habib Masum</h3>
                <p>Assistant Professor, GKCIET</p>
                <a className="person-link" href="mailto:kingmasum@gmail.com" data-testid="link-person-email">
                  kingmasum@gmail.com <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </article>
              <article className="person" data-testid="card-patron">
                <div className="person-label">Patron / institutional support</div>
                <h3>Prof. P. R. Alapati</h3>
                <p>Director, GKCIET</p>
                <a
                  className="person-link"
                  href="https://www.gkciet.ac.in/facility/rc"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-club-page"
                >
                  GKCIET club page <ExternalLink size={13} aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section join-section" id="join" data-testid="section-join">
          <div className="wrap">
            <div className="join-card">
              <div>
                <div className="eyebrow">Open channel / GKCIET</div>
                <h2>Bring a question to the bench.</h2>
                <p>
                  Follow RAISC for club updates, workshops and project work, or visit the official
                  GKCIET page to find the club in its institutional home.
                </p>
              </div>
              <div className="join-actions">
                <a
                  className="button button-primary"
                  href="https://www.linkedin.com/company/raiscgkciet"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-join-linkedin"
                >
                  Follow on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="button button-ghost"
                  href="https://www.gkciet.ac.in/facility/rc"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-join-college"
                >
                  Club page <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" data-testid="footer-site">
        <div className="wrap footer-row">
          <span className="footer-note">RAISC / Robotics, AI &amp; Intelligent Systems / GKCIET</span>
          <div className="footer-links">
            <a href="https://www.gkciet.ac.in/facility/rc" target="_blank" rel="noreferrer" data-testid="link-footer-college">GKCIET page</a>
            <a href="https://www.linkedin.com/company/raiscgkciet" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
          </div>
          <span className="footer-note">Student-led / mentor-guided</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
