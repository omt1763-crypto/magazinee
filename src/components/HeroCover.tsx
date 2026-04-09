import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { coverStory, currentIssue } from '@/data/magazine';
import coverImage from '@/assets/cover-person.jpg';

const HeroCover = () => {
  return (
    <section className="relative min-h-screen bg-surface-dark overflow-hidden flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt={coverStory.personName}
          className="w-full h-full object-cover object-top"
          width={1024}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,6%)]/95 via-[hsl(0,0%,6%)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold font-sans text-xs uppercase tracking-[0.3em] font-semibold">
                {currentIssue.month} {currentIssue.year}
              </span>
              <span className="w-12 h-px bg-gold" />
              <span className="text-gold font-sans text-xs uppercase tracking-[0.3em]">
                Issue #{currentIssue.issueNumber}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="inline-block px-3 py-1 border border-gold text-gold font-sans text-xs uppercase tracking-widest mb-6">
              {coverStory.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-on-dark leading-[1.1] mb-6"
          >
            {coverStory.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-muted-on-dark text-lg md:text-xl leading-relaxed mb-4"
          >
            {coverStory.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-10"
          >
            <p className="font-serif text-gold text-xl italic">
              {coverStory.personName}
            </p>
            <p className="font-sans text-muted-on-dark text-sm">
              {coverStory.personTitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to={`/article/${coverStory.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-accent-foreground font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:gap-5 group"
            >
              Read the Cover Story
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
