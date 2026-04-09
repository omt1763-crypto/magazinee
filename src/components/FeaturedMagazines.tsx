import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { magazines, categories } from '@/data/magazine';
import { useState } from 'react';
import { PDFViewer } from '@/components/PDFViewer';
import { X } from 'lucide-react';

const getImageUrl = (imagePath: string): string => {
  if (imagePath.includes('cover-ai') || imagePath.includes('tech-cover')) {
    return imagePath;
  }
  return imagePath;
};

const FeaturedMagazines = () => {
  const [selectedMagazine, setSelectedMagazine] = useState<typeof magazines[0] | null>(null);
  
  // Get the 3 most recent magazines (featured)
  const featuredMags = magazines.slice(0, 3);

  return (
    <>
      {/* Categories Section */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Article Categories</h2>
            <p className="font-sans text-muted-foreground">Explore content across different topics and industries</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/articles?category=${encodeURIComponent(category)}`}
                  className="block p-4 bg-background rounded-lg border border-border hover:border-gold hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <span className="font-sans text-sm font-medium text-foreground group-hover:text-gold transition-colors duration-300">
                    {category}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-on-dark">Latest Magazines</h2>
            <span className="flex-1 h-px bg-border/30" />
            <Link
              to="/magazine"
              className="font-sans text-xs uppercase tracking-widest text-muted-on-dark hover:text-on-dark transition-colors flex items-center gap-2"
            >
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMags.map((magazine, i) => (
              <motion.div
                key={magazine.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  onClick={() => setSelectedMagazine(magazine)}
                  className="relative overflow-hidden aspect-[3/4] rounded-lg shadow-2xl mb-6"
                >
                  <img
                    src={getImageUrl(magazine.coverImage)}
                    alt={magazine.title}
                    loading="lazy"
                    width={400}
                    height={550}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-3 bg-gold text-accent-foreground font-sans font-medium rounded-lg hover:bg-gold/90 transition-colors">
                      Open & Read
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-on-dark leading-tight">
                      {magazine.monthYear}
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-on-dark uppercase tracking-widest mb-2">
                    Issue {magazine.issueNumber}
                  </p>
                  <h3 className="font-serif text-lg text-on-dark mb-3 group-hover:text-gold transition-colors duration-300">
                    {magazine.title}
                  </h3>
                  <button
                    onClick={() => setSelectedMagazine(magazine)}
                    className="font-sans text-xs uppercase tracking-widest text-gold hover:text-gold-dark transition-colors flex items-center gap-2"
                  >
                    Read Magazine <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Modal */}
      {selectedMagazine && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface-dark">
              <h2 className="font-serif text-2xl text-on-dark">{selectedMagazine.title}</h2>
              <button
                onClick={() => setSelectedMagazine(null)}
                className="p-2 hover:bg-surface-dark/80 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-on-dark" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <PDFViewer pdfUrl={selectedMagazine.pdfUrl} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FeaturedMagazines;
