import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-zenko-border py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <span className="font-extrabold tracking-wider">ZENKO</span>
        </div>
        <div className="text-sm text-zenko-muted">
          © {new Date().getFullYear()} ZENKO Labs. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-zenko-muted">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Discord</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
