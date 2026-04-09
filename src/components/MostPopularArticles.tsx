import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { allArticles } from '@/data/magazine';
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

const getImageUrl = (imagePath: string): string => {
  if (images[imagePath]) {
    return images[imagePath];
  }
  return imagePath;
};

const MostPopularArticles = () => {
  // Get top featured and some archive articles as "most popular"
  const popularArticles = allArticles.slice(0, 6).map((article, index) => ({
    ...article,
    views: 2500 + (index * 300), // Mock view counts
  }));

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Most Popular</h2>
          <span className="flex-1 h-px bg-border" />
          <Link
            to="/articles"
            className="font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Desktop Layout: Featured Left + Most Popular Right */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12 mb-12">
          {/* Featured Article - Left Side (Larger) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link to={`/article/${popularArticles[0].slug}`} className="block group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6 shadow-xl">
                <img
                  src={getImageUrl(popularArticles[0].image)}
                  alt={popularArticles[0].title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-gold text-accent-foreground font-sans text-xs uppercase tracking-widest rounded mb-3 font-medium">
                    {popularArticles[0].category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-on-dark leading-tight mb-3">
                    {popularArticles[0].title}
                  </h3>
                  <div className="flex items-center gap-4 text-muted-on-dark text-sm">
                    <span>{popularArticles[0].personName}</span>
                    <span>•</span>
                    <span>{popularArticles[0].date}</span>
                  </div>
                </div>
              </div>
              <p className="font-sans text-muted-foreground mb-4 line-clamp-2">
                {popularArticles[0].excerpt}
              </p>
              <div className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors">
                <span className="font-sans text-sm font-semibold uppercase tracking-widest">Read Article</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>

          {/* Most Popular Sidebar - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-xl text-foreground mb-6 pb-4 border-b border-border">
              Popular Now
            </h3>
            {popularArticles.slice(1, 6).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/article/${article.slug}`} className="block group">
                  <div className="flex gap-3 hover:bg-surface-cream p-3 rounded-lg transition-colors duration-300">
                    <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-semibold text-sm text-foreground group-hover:text-gold transition-colors line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {article.views?.toLocaleString()}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-gold uppercase tracking-widest font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet Layout: Stacked */}
        <div className="lg:hidden space-y-12">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/article/${popularArticles[0].slug}`} className="block group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 shadow-lg">
                <img
                  src={getImageUrl(popularArticles[0].image)}
                  alt={popularArticles[0].title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-gold text-accent-foreground font-sans text-xs uppercase tracking-widest rounded mb-2 font-medium">
                    {popularArticles[0].category}
                  </span>
                  <h3 className="font-serif text-xl text-on-dark leading-tight">
                    {popularArticles[0].title}
                  </h3>
                </div>
              </div>
              <p className="font-sans text-muted-foreground text-sm mb-3">
                {popularArticles[0].excerpt}
              </p>
              <div className="flex items-center gap-2 text-gold">
                <span className="font-sans text-xs font-semibold uppercase">Read</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>

          {/* Popular Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-2xl text-foreground mb-6 pb-4 border-b border-border">
              Popular Now
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.slice(1, 6).map((article, index) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="block group hover:bg-surface-cream p-3 rounded-lg transition-colors"
                >
                  <div className="flex gap-3 h-full">
                    <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-semibold text-sm text-foreground group-hover:text-gold line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground mb-2">
                        {article.date}
                      </p>
                      <span className="font-sans text-xs text-gold uppercase tracking-wider font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MostPopularArticles;
