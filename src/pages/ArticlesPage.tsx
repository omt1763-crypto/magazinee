import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allArticles } from '@/data/magazine';
import coverImage from '@/assets/cover-person.jpg';
import leader1 from '@/assets/leader-1.jpg';
import leader2 from '@/assets/leader-2.jpg';
import leader3 from '@/assets/leader-3.jpg';
import leader4 from '@/assets/leader-4.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const images: Record<string, string> = {
  '/src/assets/cover-person.jpg': coverImage,
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

const ArticlesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-surface-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-6xl text-on-dark mb-4">Articles</h1>
            <p className="font-sans text-muted-on-dark text-lg max-w-xl">
              Explore all featured articles and profiles from AI Visionaries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <Link to={`/article/${article.slug}`} className="block">
                <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                  <img
                    src={getImageUrl(article.image)}
                    alt={article.personName}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-0.5 bg-gold text-accent-foreground font-sans text-[10px] uppercase tracking-widest mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg text-on-dark leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-2">
                  {article.excerpt.slice(0, 120)}...
                </p>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                  {article.personName} · {article.readTime}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlesPage;
