import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const values = [
    {
      title: 'Storytelling',
      description: 'We believe great technology begins with great people. Every profile is a story of vision, perseverance, and innovation.',
    },
    {
      title: 'Authenticity',
      description: 'No hype, no shortcuts. We conduct in-depth interviews and research to bring you genuine, meaningful insights.',
    },
    {
      title: 'Curation',
      description: 'We carefully select leaders and innovators who are actively shaping the future of AI, not just talking about it.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-surface-dark">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-on-dark mb-8 leading-tight">About AI Visionaries</h1>
            <p className="font-sans text-muted-on-dark text-xl md:text-2xl leading-relaxed max-w-3xl font-light">
              The premier digital magazine dedicated to profiling the leaders, innovators, and thinkers shaping 
              the future of artificial intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="border-l-4 border-gold pl-8">
              <h2 className="font-serif text-4xl text-foreground mb-6">Our Mission</h2>
              <p className="font-sans text-foreground/80 text-lg leading-relaxed mb-4">
                We believe the stories behind AI's greatest breakthroughs are as important as the breakthroughs themselves. 
              </p>
              <p className="font-sans text-foreground/80 text-lg leading-relaxed">
                Every month, we spotlight the people who are not just building technology — they're building the future. 
                Our editorial team conducts in-depth interviews and research to bring you the most compelling profiles 
                in the AI industry.
              </p>
            </div>
          </motion.div>

          {/* What We Cover */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="border-l-4 border-gold pl-8">
              <h2 className="font-serif text-4xl text-foreground mb-6">What We Cover</h2>
              <p className="font-sans text-foreground/80 text-lg leading-relaxed mb-4">
                From enterprise AI and healthcare innovation to ethics, sustainability, and creative technology — 
                we cover the full spectrum of artificial intelligence through the lens of the people driving it forward.
              </p>
              <p className="font-sans text-foreground/80 text-lg leading-relaxed">
                Each issue features one cover story alongside multiple supporting profiles, providing deep dives into 
                the minds and work of those at the forefront of the AI revolution.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-foreground mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-secondary border border-border/50 hover:border-gold transition-colors duration-300"
                >
                  <h3 className="font-serif text-2xl text-foreground mb-4">{value.title}</h3>
                  <p className="font-sans text-foreground/70 text-base leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/30 p-12 rounded-lg"
          >
            <h3 className="font-serif text-3xl text-foreground mb-4">Ready to Nominate?</h3>
            <p className="font-sans text-foreground/70 text-lg mb-6">
              Know someone who deserves to be featured? We're always looking for extraordinary professionals making 
              an impact in AI.
            </p>
            <a
              href="/get-featured"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-accent-foreground font-sans text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
            >
              Nominate Now
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
