import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@aivisionaries.com',
      href: 'mailto:hello@aivisionaries.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-surface-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-on-dark mb-6 leading-tight">Get in Touch</h1>
            <p className="font-sans text-muted-on-dark text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Questions, collaborations, or feedback? We'd love to hear from you. 
              Reach out to our editorial team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl text-foreground mb-12">Contact Information</h2>
            <div className="space-y-8">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-sans text-lg text-foreground hover:text-gold transition-colors flex items-center gap-2"
                        >
                          {item.value}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <p className="font-sans text-lg text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 pt-12 border-t border-border"
            >
              <h3 className="font-serif text-xl text-foreground mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 border border-border text-foreground hover:border-gold hover:text-gold transition-colors font-sans text-sm uppercase tracking-widest"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-gold/5 border border-gold/30 p-8"
              >
                <div className="mb-4 text-4xl">✓</div>
                <p className="font-serif text-2xl text-foreground mb-2">Thank You!</p>
                <p className="font-sans text-muted-foreground">We've received your message and will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border font-sans text-base text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gold text-accent-foreground font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
