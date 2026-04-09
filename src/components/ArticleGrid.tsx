import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredArticles } from '@/data/magazine';
import leader1 from '@/assets/leader-1.jpg';
import leader2 from '@/assets/leader-2.jpg';
import leader3 from '@/assets/leader-3.jpg';
import leader4 from '@/assets/leader-4.jpg';

const images: Record<string, string> = {
  '/src/assets/leader-1.jpg': leader1,
  '/src/assets/leader-2.jpg': leader2,
  '/src/assets/leader-3.jpg': leader3,
  '/src/assets/leader-4.jpg': leader4,
};

const ArticleGrid = () => {
  return (
    <section className="bg-surface-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Featured Leaders</h2>
          <span className="flex-1 h-px bg-border" />
          <Link
            to="/magazine"
            className="font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredArticles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/article/${article.slug}`} className="block">
                <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                  <img
                    src={images[article.image]}
                    alt={article.personName}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-surface-dark/80 text-on-dark font-sans text-xs uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-gold-dark transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 font-sans text-xs text-muted-foreground uppercase tracking-wider">
                    <span>{article.personName}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;
