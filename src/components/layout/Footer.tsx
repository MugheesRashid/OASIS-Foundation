import { footerLinks, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-ink-line bg-ink px-6 pt-20 pb-10 md:px-10">
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <a href="#" className="font-display text-2xl text-paper">
              OASIS<span className="text-ember">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
              A volunteer-driven student movement empowering Pakistan&apos;s
              next generation — free, forever.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-paper-dim">
              Founded {site.founded}
            </p>
          </div>

          <FooterColumn title="Programs" links={footerLinks.programs} />
          <FooterColumn title="Community" links={footerLinks.community} />
          <FooterColumn title="Connect" links={footerLinks.connect} external />
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-ink-line pt-8 text-xs text-paper-dim md:flex-row">
          <p>© {new Date().getFullYear()} OASIS Foundation. Built by students, for students.</p>
          <p>Zero fees. Ever.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
