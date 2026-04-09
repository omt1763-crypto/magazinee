import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-background py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Stay Informed
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed mb-8">
            Get the latest issue delivered to your inbox. No spam, just the stories that matter in AI.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-gold font-medium"
            >
              Thank you! You'll hear from us soon.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-3 bg-secondary border border-border font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2"
              >
                Subscribe <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
