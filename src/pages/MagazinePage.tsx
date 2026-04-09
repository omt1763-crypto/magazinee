import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { magazines, featuredArticles } from '@/data/magazine';
import { PDFViewer } from '@/components/PDFViewer';
import coverImage from '@/assets/cover-person.jpg';
import leader1 from '@/assets/leader-1.jpg';
import leader2 from '@/assets/leader-2.jpg';
import leader3 from '@/assets/leader-3.jpg';
import leader4 from '@/assets/leader-4.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';

const images: Record<string, string> = {
  '/src/assets/cover-person.jpg': coverImage,
  '/src/assets/leader-1.jpg': leader1,
  '/src/assets/leader-2.jpg': leader2,
  '/src/assets/leader-3.jpg': leader3,
  '/src/assets/leader-4.jpg': leader4,
  '/Diverse professional headshots collection.png': '/Diverse professional headshots collection.png',
  '/Diverse professional headshots collection 2.png': '/Diverse professional headshots collection 2.png',
  '/Diverse professional headshots collection3.png': '/Diverse professional headshots collection3.png',
  '/Confident professional headshot portrait.png': '/Confident professional headshot portrait.png',
  '/rEU9KEjyEw-3277.jpeg': '/rEU9KEjyEw-3277.jpeg',
  '/Confident smile in navy attire.png': '/Confident smile in navy attire.png',
  '/Smiling man in casual attire.png': '/Smiling man in casual attire.png',
  '/Cathy-Li-3.png': '/Cathy-Li-3.png',
  '/Friendly headshot with bright smile.png': '/Friendly headshot with bright smile.png',
  '/professional-headshot-paul-graham.png': '/professional-headshot-paul-graham.png',
  '/images (8).jpg': '/images (8).jpg',
  '/download (6).jpg': '/download (6).jpg',
  '/images (9).jpg': '/images (9).jpg',
  '/GettyImages-2151909132-17fc5847200f4f108dd54d0877d22467.jpg': '/GettyImages-2151909132-17fc5847200f4f108dd54d0877d22467.jpg',
};

const getImageUrl = (imagePath: string): string => {
  if (images[imagePath]) {
    return images[imagePath];
  }
  return imagePath;
};



const MagazinePage = () => {
  const [selectedMagazine, setSelectedMagazine] = useState<typeof magazines[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-surface-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-6xl text-on-dark mb-4">Magazines & Articles</h1>
            <p className="font-sans text-muted-on-dark text-lg max-w-xl">
              Explore our complete magazine issues and featured articles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl text-foreground mb-2">Featured Articles</h2>
          <p className="font-sans text-muted-foreground mb-12">Read in-depth stories from industry leaders</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/article/${article.slug}`} className="block h-full">
                  <div className="relative overflow-hidden mb-4 aspect-[3/4] rounded-lg shadow-lg">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      loading="lazy"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 bg-gold text-accent-foreground font-sans text-xs uppercase tracking-widest mb-2 rounded">
                        {article.category}
                      </span>
                      <h3 className="font-serif text-lg text-on-dark leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                      {article.personName}
                    </p>
                    <span className="font-sans text-xs text-gold font-semibold">Read story →</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Magazines Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magazines.map((magazine, i) => (
            <motion.div
              key={magazine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer"
              onClick={() => setSelectedMagazine(magazine)}
            >
              <div className="relative overflow-hidden mb-4 aspect-[3/4] rounded-lg shadow-lg">
                <img
                  src={getImageUrl(magazine.coverImage)}
                  alt={magazine.title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)]/90 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <button className="px-6 py-3 bg-gold text-accent-foreground font-sans font-medium rounded-lg hover:bg-gold/90 transition-colors">
                    Open & Read
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-on-dark leading-tight tracking-tight">
                    {magazine.monthYear}
                  </h3>
                </div>
              </div>
              <p className="font-sans text-base font-semibold text-foreground mt-2">
                {magazine.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Magazine Fullscreen Modal */}
      {selectedMagazine && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setSelectedMagazine(null)}
            className="absolute top-6 left-6 p-2 text-on-dark hover:text-gold transition-colors"
            aria-label="Back to magazines"
          >
            <span className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </span>
          </button>
          <button
            onClick={() => setSelectedMagazine(null)}
            className="absolute top-6 right-6 p-2 text-on-dark hover:text-gold transition-colors"
            aria-label="Close magazine"
          >
            <X size={32} />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <PDFViewer pdfUrl={selectedMagazine.pdfUrl} title={selectedMagazine.title} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MagazinePage;
