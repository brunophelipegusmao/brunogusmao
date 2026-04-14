import clsx from "clsx";
import Link from "next/link";

const menuLink = clsx("")

export function Header() {
  return (
    <header className="flex justify-between items-center max-w-screen p-6 ">
      <div className="flex flex-col justify-center items-center ">
        <span className="text-3xl font-goldman">Bruno Gusmão</span>
        <p className="text-xs">Desenvolvedor Full Satck</p>
      </div>
      <div className="w-3/5">
        <nav className="w-full">
          <ul className="flex justify-between items-center">
            <li className="px-8 bg-">
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">Sobre</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfólio</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contato</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
