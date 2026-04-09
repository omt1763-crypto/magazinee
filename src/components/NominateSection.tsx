import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NominateSection = () => {
  return (
    <section className="bg-surface-dark py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="mx-auto mb-6 text-gold" size={32} />
          <h2 className="font-serif text-3xl md:text-5xl text-on-dark mb-6">
            Know an AI Visionary?
          </h2>
          <p className="font-sans text-muted-on-dark text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            We're always looking for the next wave of leaders shaping the future of artificial intelligence. 
            Nominate someone — or yourself — to be featured in an upcoming issue.
          </p>
          <Link
            to="/get-featured"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold text-gold font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-gold hover:text-accent-foreground group"
          >
            Nominate Someone
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NominateSection;
