import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Magazine', path: '/magazine' },
  { label: 'Articles', path: '/articles' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-md border-b border-foreground/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-gold font-serif text-2xl font-bold tracking-tight">AI</span>
          <span className="text-on-dark font-sans text-sm font-medium uppercase tracking-[0.3em]">
            Visionaries
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 ${
                location.pathname === item.path
                  ? 'text-gold'
                  : 'text-muted-on-dark hover:text-on-dark'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-featured"
            className="ml-4 px-5 py-2 bg-gold text-accent-foreground font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90"
          >
            Get Featured
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-on-dark"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface-dark border-t border-foreground/10 px-6 py-6 space-y-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block font-sans text-sm uppercase tracking-widest ${
                location.pathname === item.path
                  ? 'text-gold'
                  : 'text-muted-on-dark'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-featured"
            onClick={() => setMobileOpen(false)}
            className="block px-5 py-2 bg-gold text-accent-foreground font-sans text-xs uppercase tracking-widest font-semibold text-center"
          >
            Get Featured
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
