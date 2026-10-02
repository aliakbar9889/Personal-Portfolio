import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Download, ExternalLink, Github, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ali-hero-development.jpg";
import ecommerceImage from "@/assets/project-ecommerce.jpg";
import devistImage from "@/assets/project-devist.jpg";
import banqueeImage from "@/assets/project-banquee.jpg"
import healthyImage from "@/assets/project-healthy.jpg"
import resumeAsset from "@/assets/ali-akbar-resume.pdf.asset.json";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ali Akbar — Full Stack & AI Developer" },
      { name: "description", content: "Karachi-based full stack developer crafting scalable web products with React, Next.js, Laravel, Node.js, and AI." },
      { property: "og:title", content: "Ali Akbar — Full Stack & AI Developer" },
      { property: "og:description", content: "Selected work, capabilities, and experience of full stack developer Ali Akbar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 420, damping: 32 });
  const ringY = useSpring(cursorY, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setCursorActive(Boolean((event.target as HTMLElement).closest("a, button, [data-cursor]")));
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const nav = ["About", "Work", "Skills", "Contact"];
  const projects = [
    { number: "01", title: "E-Commerce Store", type: "Commerce Platform", stack: "Next.js · TypeScript · Stripe · Sanity", description: "A production-ready storefront with dynamic content, product discovery, secure payments, cart, and a seamless checkout journey.", image: ecommerceImage, live: "https://nishatstorepk.vercel.app/", github: "https://github.com/aliakbar9889/Nishatstore" },
    { number: "02", title: "GM Law Associates", type: "Associate Agency Website", stack: "Next.js · Tailwind · Framer Motion", description: "A responsive, SEO-focused business presence with an expressive interface, lead-generation contact flow, and purposeful motion.", image: devistImage, live: "https://gmlawassociates.vercel.app//", github: "https://github.com/aliakbar9889/GM-Law-associates" },
    { number: "03", title: "Healthify", type: "Healthy Meal Plans Website", stack: "Next.js · Tailwind · Framer Motion", description: "A Healthy diet plan website with a mainly focus on user interface,perfomance, accessibility, and responsive design.", image: healthyImage, live: "https://healthify-web2.vercel.app/", github: "https://github.com/aliakbar9889/Healthify."} ,
    { number: "04", title: "Banquee", type: "Banking Website", stack: "Next.js · Tailwind · Framer Motion", description: "A banking website with a mainly focus on performance, accessibility, and modern design, showcasing selected work and capabilities.", image: banqueeImage, live: "https://banquee-sigma.vercel.app/", github: "https://github.com/aliakbar9889/Banquee."},
    
  ];
  const skills = [
    ["Frontend", "React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    ["Backend", "Python","Node.js", "MongoDB", "Express.js", "REST APIs", "PHP",],
    ["Data & Tools", "PostgreSQL", "MySQL", "MongoDB", "Git", "Vercel"],
    ["AI Direction", "Agentic AI", "AI Workflows", "Automation", "Problem Solving", "Robotic AI"],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div aria-hidden className="custom-cursor pointer-events-none fixed left-0 top-0 z-120 h-2 w-2 rounded-full bg-primary" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} animate={{ scale: cursorActive ? 0.45 : 1 }} />
      <motion.div aria-hidden className="custom-cursor pointer-events-none fixed left-0 top-0 z-119 h-9 w-9 rounded-full border border-primary/70" style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }} animate={{ scale: cursorActive ? 1.65 : 1, backgroundColor: cursorActive ? "var(--surface-glow)" : "transparent" }} />
      <motion.div className="fixed inset-x-0 top-0 z-70 h-0.5 origin-left bg-primary" style={{ scaleX }} />
      {loading && (
        <motion.div exit={{ y: "-100%" }} className="fixed inset-0 z-100 grid place-items-center bg-background">
          <div className="w-[min(80vw,420px)]">
            <div className="mb-4 flex items-end justify-between font-mono text-xs uppercase text-muted-foreground"><span>Ali Akbar</span><span>Portfolio</span></div>
            <div className="h-px overflow-hidden bg-border"><div className="h-full bg-primary animate-loader-line" /></div>
          </div>
        </motion.div>
      )}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-20 max-w-360 grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
          <a href="#top" className="font-display text-sm font-bold uppercase tracking-normal">Ali Akbar<span className="text-primary">.</span></a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-primary">{item}</a>)}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-0 z-60 bg-background p-6 md:hidden"><div className="flex justify-end"><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="mt-20 flex flex-col gap-7">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-5xl font-semibold">{item}</a>)}</nav></div>}

      <main id="top">
        <section className="portfolio-grid relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-border">
  <div className="mx-auto w-full max-w-300 px-5 py-16 text-center sm:px-8 lg:px-12 lg:py-20">

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.55 }}
      className="mx-auto flex max-w-5xl flex-col items-center"
    >

      {/* Availability */}
      <p className="mb-6 mt-24 font-mono text-xs uppercase tracking-[0.18em] text-primary">
        OPEN TO WORK · KARACHI, PK
      </p>

      {/* Main Heading */}
      <h1 className="font-display text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.86] tracking-tight">
        FULL STACK
        <br />
        & AI DEVELOPER
      </h1>

      {/* Description + CTA */}
      <div className="mt-8 flex max-w-2xl flex-col items-center gap-7">
        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
         I build high-performance digital products where modern full-stack engineering meets intelligent AI, seamless experiences, and real-world impact
        </p>

        <a
          href="#work"
          aria-label="Explore selected work"
          className="group inline-flex items-center gap-3 border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-wider transition-all hover:border-primary hover:text-primary"
        >
          Explore My Work
          <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
        </a>
      </div>

    </motion.div>

  </div>

  {/* Decorative background text */}
  <div className="pointer-events-none absolute bottom-0 left-0 hidden w-full whitespace-nowrap text-center text-[11vw] font-semibold leading-none text-outline opacity-20 lg:block">
    ALI AKBAR — ALI AKBAR —
  </div>
</section>

        <section id="about" className="border-b border-border px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.42fr_1fr]">
            <div><p className="font-mono text-xs uppercase text-primary">01 / Profile</p></div>
            <div>
              <h2 className="max-w-4xl text-3xl font-medium leading-tight sm:text-5xl lg:text-6xl">A pragmatic builder turning complex ideas into <span className="text-primary">clear, useful products.</span></h2>
              <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-muted-foreground">Full-Stack Developer experienced in Next.js, React, Node.js, MongoDB and other frontend and backend technologies with a focus on REST APIs, MVC architecture, authentication, and well-designed databases.</p>
                <p className="text-sm leading-7 text-muted-foreground">Currently expanding into agentic and robotic AI through GIAIC—bringing curiosity, collaboration, and a clean-code mindset to every build.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex items-end justify-between border-b border-border pb-6"><div><p className="font-mono text-xs uppercase text-primary">02 / Selected Work</p><h2 className="mt-4 text-4xl font-semibold sm:text-6xl">Built to perform.</h2></div><span className="hidden font-mono text-xs text-muted-foreground sm:block"></span></div>
            <div>
              {projects.map((project) => <motion.article key={project.number} initial={{ opacity: 0, y: 56 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.65 }} data-cursor className="group relative grid gap-7 overflow-hidden border-b border-border py-10 lg:min-h-64 lg:grid-cols-[80px_1.08fr_0.92fr_48px] lg:items-start lg:py-14">
                <span className="relative z-10 font-mono text-xs text-primary">{project.number}</span>
                <div className="relative z-10"><p className="font-mono text-[10px] uppercase text-muted-foreground">{project.type}</p><h3 className="mt-3 text-3xl font-medium transition-colors group-hover:text-primary sm:text-5xl">{project.title}</h3><p className="mt-4 font-mono text-[11px] text-muted-foreground">{project.stack}</p><div className="mt-6 flex gap-5 font-mono text-[10px] uppercase"><a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"><ExternalLink className="h-3.5 w-3.5" /> Live site</a><a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"><Github className="h-3.5 w-3.5" /> Source</a></div></div>
                <div className="relative z-10"><p className="max-w-md text-sm leading-7 text-muted-foreground transition-opacity duration-300 lg:group-hover:opacity-0">{project.description}</p><a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} className="mt-7 block overflow-hidden border border-border lg:absolute lg:-inset-x-4 lg:-top-10 lg:mt-0 lg:translate-y-8 lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100"><img src={project.image} alt={`${project.title} website preview`} loading="lazy" width={1408} height={912} className="aspect-20/9 w-full transition-transform duration-700 group-hover:scale-105" /></a></div>
                
                <ArrowUpRight className="relative z-10 hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:block" />
              </motion.article>)}
            </div>
          </div>
        </section>

        <section id="skills" className="border-y border-border bg-card px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">03 / Capabilities</p><div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">{skills.map(([title, ...items], i) => <div key={title} className="border-t border-border py-7 sm:px-7 sm:first:pl-0 lg:border-l lg:border-t-0 lg:first:border-l-0"><span className="font-mono text-[10px] text-primary">0{i + 1}</span><h3 className="mt-5 text-xl font-semibold">{title}</h3><ul className="mt-7 space-y-3">{items.map((item) => <li key={item} className="text-sm text-muted-foreground">{item}</li>)}</ul></div>)}</div></div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-7pxl gap-14 lg:grid-cols-[0.42fr_1fr]"><p className="font-mono text-xs uppercase text-primary">04 / Journey</p><div className="space-y-10"><div className="grid gap-4 border-b border-border pb-10 sm:grid-cols-[1fr_auto]"><div><h3 className="text-2xl font-medium">Full Stack Developer Internship</h3><p className="mt-2 text-muted-foreground">DecodeLabs · Next.js, React, Node.js, Express & MongoDB</p></div><span className="font-mono text-xs text-primary">2026</span></div><div className="grid gap-4 border-b border-border pb-10 sm:grid-cols-[1fr_auto]"><div><h3 className="text-2xl font-medium">Agentic & Robotic AI Program</h3><p className="mt-2 text-muted-foreground">Governor Sindh Initiative for AI and Computing · Quarter 5 ongoing</p></div><span className="font-mono text-xs text-primary">ONGOING</span></div><div className="grid gap-4 sm:grid-cols-[1fr_auto]"><div><h3 className="text-2xl font-medium">Bachelors In Computer Science</h3><p className="mt-2 text-muted-foreground">The Virtual University Of Pakistan</p></div><span className="font-mono text-xs text-primary">2026</span></div></div></div></section>

        <section id="contact" className="relative overflow-hidden border-t border-border px-5 py-24 sm:px-8 lg:px-12 lg:py-36"><div className="portfolio-grid absolute inset-0 opacity-40" /><div className="relative mx-auto max-w-7px"><p className="font-mono text-xs uppercase text-primary">05 / Contact</p><h2 className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[0.88]">LET’S BUILD<br />WHAT’S NEXT.</h2><div className="mt-14 flex flex-wrap gap-3"><Button asChild variant="portfolio" size="lg"><a href="Contact: 0343-2343626"><Phone /> BOOK A CALL</a></Button><Button asChild variant="portfolioOutline" size="lg"><a href="src/assets/Ali Akbar CV.pdf" download="Ali Akbar CV.pdf"><Download /> Resume</a></Button></div><div className="mt-24 grid gap-6 border-t border-border pt-8 font-mono text-[11px] uppercase text-muted-foreground sm:grid-cols-3"><a href="mailto:themraliakbar@gmail.com" className="hover:text-primary">themraliakbar@gmail.com</a><span>Karachi, Pakistan</span><span className="sm:text-right">© 2026 Ali Akbar</span></div></div></section>
      </main>
    </div>
  );
}
