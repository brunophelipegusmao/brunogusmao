import clsx from "clsx";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Blog", href: "/Blog" },
  { label: "Contato", href: "/Contact" },
];

const linkNavStyle = clsx(
  "w-24 px-4 py-2",
  "bg-primary hover:bg-sidebar-primary rounded",
  "font-bold text-center text-card shadow-sm shadow-foreground",
  "",
  "cursor-pointer",
);

export default function Header() {
  return (
    <header
      className={clsx(
        "flex items-center justify-between",
        "px-5 py-7",
        "bg-transparent",
      )}
    >
      <div className={""}>
        <h1 className="font-sans text-2xl tracking-tighter">
          <span className="font-black text-chart-5 uppercase">Bruno</span>
          <span className="font-extralight text-accent-foreground italic">
            Gusmão
          </span>
        </h1>
      </div>
      <div>
        <nav
          className={clsx(
            "flex items-center justify-between",
            "px-5 py-7",
            "gap-5",
          )}
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={linkNavStyle}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
