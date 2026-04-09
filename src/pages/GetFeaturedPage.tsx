import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Award, Zap, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GetFeaturedPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const benefits = [
    {
      icon: Eye,
      title: 'Unmatched Reach',
      description: 'Gain exposure to thousands of AI professionals, investors, and industry leaders monthly.',
    },
    {
      icon: Zap,
      title: 'Industry Recognition',
      description: 'Be recognized as a leader in AI innovation. Featured profiles often lead to new opportunities.',
    },
    {
      icon: Award,
      title: 'Lasting Impact',
      description: 'Your story becomes a permanent part of the AI Visionaries archive, referenced for years to come.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6 bg-surface-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Award className="mx-auto mb-6 text-gold" size={48} />
            <h1 className="font-serif text-5xl md:text-7xl text-on-dark mb-6 leading-tight">Get Featured</h1>
            <p className="font-sans text-muted-on-dark text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Being featured in AI Visionaries is more than recognition — it's a statement that you're 
              shaping the future. Nominate yourself or someone you admire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-surface-dark/30">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl text-center text-foreground mb-16"
          >
            Why Get Featured?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-secondary border border-border/50 hover:border-gold transition-all duration-300 group"
                >
                  <div className="p-3 w-fit bg-gold/10 group-hover:bg-gold/20 transition-colors mb-4">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">{benefit.title}</h3>
                  <p className="font-sans text-foreground/70 text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nomination Form */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-gradient-to-r from-gold/10 to-transparent border border-gold/30 p-12"
            >
              <Award className="mx-auto mb-6 text-gold" size={56} />
              <h2 className="font-serif text-4xl text-foreground mb-4">Nomination Received!</h2>
              <p className="font-sans text-foreground/70 text-lg leading-relaxed mb-6">
                Thank you for submitting this nomination. Our editorial team will review it carefully.
              </p>
              <p className="font-sans text-foreground/60 text-base">
                If the nominee is selected, we'll reach out within 2–3 weeks to start the interview process.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl text-foreground mb-2">Submit Your Nomination</h2>
              <p className="font-sans text-foreground/60 text-base mb-12">
                Tell us who deserves to be featured in AI Visionaries.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                      Nominee's Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="First Last"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                      Title / Role
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="CEO, Co-founder, Researcher, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                    Why should they be featured?
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about their impact in AI, notable achievements, breakthroughs, and why they deserve to be featured in AI Visionaries..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gold text-accent-foreground font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 group"
                >
                  Submit Nomination
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetFeaturedPage;
