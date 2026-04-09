import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const trendingTopics = [
  'Large Language Models',
  'AI Regulation',
  'Autonomous Systems',
  'AI in Education',
  'Quantum + AI',
  'Responsible AI',
];

const TrendingBar = () => {
  return (
    <section className="bg-primary py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <TrendingUp size={16} className="text-gold" />
          <span className="font-sans text-xs uppercase tracking-widest text-gold font-semibold">
            Trending
          </span>
        </div>
        <motion.div
          className="flex items-center gap-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {trendingTopics.map((topic, i) => (
            <span
              key={topic}
              className="font-sans text-xs text-primary-foreground/70 whitespace-nowrap"
            >
              {topic}
              {i < trendingTopics.length - 1 && (
                <span className="ml-6 text-primary-foreground/30">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingBar;
