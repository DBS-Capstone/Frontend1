import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-brand-forest text-white py-12 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-montserrat font-bold mb-6">Contact Us</h2>
          <p className="font-roboto text-lg leading-relaxed mb-8">
            We'd love to hear from you. For questions, feedback, or support,<br />
            please contact us at{' '}
            <motion.a 
              href="mailto:support@kicaufinder.com" 
              className="text-brand-lime-accent font-semibold hover:underline transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              support@kicaufinder.com
            </motion.a>.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { icon: "fab fa-twitter", href: "#" },
              { icon: "fab fa-instagram", href: "#" },
              { icon: "fab fa-linkedin", href: "#" },
              { icon: "fab fa-github", href: "#" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-lime-accent hover:text-brand-forest transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={social.icon} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;