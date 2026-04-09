import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-dark border-t border-foreground/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold font-serif text-2xl font-bold">AI</span>
              <span className="text-on-dark font-sans text-sm font-medium uppercase tracking-[0.3em]">
                Visionaries
              </span>
            </div>
            <p className="font-sans text-muted-on-dark text-sm leading-relaxed max-w-sm">
              The premier digital magazine celebrating the minds shaping the future of artificial intelligence. 
              Published monthly since 2024.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-on-dark text-xs uppercase tracking-widest font-semibold mb-4">
              Magazine
            </h4>
            <div className="space-y-3">
              <Link to="/magazine" className="block font-sans text-muted-on-dark text-sm hover:text-on-dark transition-colors">
                Current Issue
              </Link>
              <Link to="/magazine" className="block font-sans text-muted-on-dark text-sm hover:text-on-dark transition-colors">
                Archive
              </Link>
              <Link to="/get-featured" className="block font-sans text-muted-on-dark text-sm hover:text-on-dark transition-colors">
                Get Featured
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-on-dark text-xs uppercase tracking-widest font-semibold mb-4">
              Company
            </h4>
            <div className="space-y-3">
              <Link to="/about" className="block font-sans text-muted-on-dark text-sm hover:text-on-dark transition-colors">
                About
              </Link>
              <Link to="/contact" className="block font-sans text-muted-on-dark text-sm hover:text-on-dark transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-muted-on-dark text-xs">
            © 2026 AI Visionaries Magazine. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-muted-on-dark text-xs hover:text-on-dark transition-colors">
              Privacy
            </a>
            <a href="#" className="font-sans text-muted-on-dark text-xs hover:text-on-dark transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
