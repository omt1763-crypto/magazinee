import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Share2, Clock, Calendar } from 'lucide-react';
import { allArticles } from '@/data/magazine';
import { PDFViewer } from '@/components/PDFViewer';
import coverImage from '@/assets/cover-person.jpg';
import leader1 from '@/assets/leader-1.jpg';
import leader2 from '@/assets/leader-2.jpg';
import leader3 from '@/assets/leader-3.jpg';
import leader4 from '@/assets/leader-4.jpg';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const images: Record<string, string> = {
  '/src/assets/cover-person.jpg': coverImage,
  '/src/assets/leader-1.jpg': leader1,
  '/src/assets/leader-2.jpg': leader2,
  '/src/assets/leader-3.jpg': leader3,
  '/src/assets/leader-4.jpg': leader4,
  '/Confident professional headshot portrait.png': '/Confident professional headshot portrait.png',
  '/Diverse professional headshots collection.png': '/Diverse professional headshots collection.png',
  '/Diverse professional headshots collection 2.png': '/Diverse professional headshots collection 2.png',
  '/Diverse professional headshots collection3.png': '/Diverse professional headshots collection3.png',
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

const ArticlePage = () => {
  const { slug } = useParams();
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
          <Link to="/magazine" className="text-gold font-sans text-sm uppercase tracking-widest">
            Back to Magazine
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] bg-surface-dark flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(article.image)}
            alt={article.personName}
            className="w-full h-full object-cover object-top"
            width={1024}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)] via-[hsl(0,0%,6%)]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/magazine" className="inline-flex items-center gap-2 text-muted-on-dark font-sans text-sm mb-8 hover:text-on-dark transition-colors">
              <ArrowLeft size={14} /> Back to Magazine
            </Link>

            <span className="inline-block px-3 py-1 border border-gold text-gold font-sans text-xs uppercase tracking-widest mb-6">
              {article.category}
            </span>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-dark leading-[1.1] mb-4">
              {article.title}
            </h1>

            <p className="font-sans text-muted-on-dark text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-muted-on-dark font-sans text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> {article.readTime}
              </span>
              <span>By {article.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      {article.stats && (
        <section className="bg-primary py-8 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {article.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-gold mb-1">{stat.value}</p>
                <p className="font-sans text-xs text-primary-foreground/60 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Person info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-12 pb-8 border-b border-border"
        >
          <img
            src={images[article.image]}
            alt={article.personName}
            className="w-16 h-16 rounded-full object-cover"
            loading="lazy"
            width={64}
            height={64}
          />
          <div className="flex-1">
            <p className="font-serif text-lg text-foreground">{article.personName}</p>
            <p className="font-sans text-sm text-muted-foreground">{article.personTitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {article.personLinkedIn && (
              <a
                href={article.personLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} />
              </a>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Share article"
            >
              <Share2 size={16} />
            </button>
          </div>
        </motion.div>

        {/* Article body or PDF viewer */}
        {article.pdfUrl ? (
          <div className="my-12">
            <PDFViewer pdfUrl={article.pdfUrl} title={article.title} />
          </div>
        ) : (
          <div className="space-y-8">
            {article.content.map((section, i) => {
              switch (section.type) {
                case 'paragraph':
                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="font-sans text-foreground/85 text-lg leading-[1.85]"
                    >
                      {section.content}
                    </motion.p>
                  );
                case 'heading':
                  return (
                    <motion.h2
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="font-serif text-2xl md:text-3xl text-foreground mt-12 mb-4"
                    >
                      {section.content}
                    </motion.h2>
                  );
                case 'quote':
                  return (
                    <motion.blockquote
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="border-l-4 border-gold pl-8 py-4 my-12"
                    >
                      <p className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed">
                        "{section.content}"
                      </p>
                    </motion.blockquote>
                  );
                case 'highlight':
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-secondary p-8 border-l-4 border-gold my-12"
                    >
                      <p className="font-sans text-foreground text-base leading-relaxed font-medium">
                        {section.content}
                      </p>
                    </motion.div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}

        {/* Pull quotes */}
        {article.pullQuotes && article.pullQuotes.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Key Quotes
            </h3>
            <div className="space-y-8">
              {article.pullQuotes.map((quote, i) => (
                <blockquote key={i} className="font-serif text-xl text-foreground/80 italic leading-relaxed pl-6 border-l-2 border-gold/40">
                  "{quote}"
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </article>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ArticlePage;
