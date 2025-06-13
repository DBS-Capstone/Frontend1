import React from "react";
import { motion } from "framer-motion";
import birdVM from "../assets/pexelsBird2.jpg";
import backgroundImage from "../assets/pexelsBird.jpg";
import { teamMembers } from "../data/teamData";

const TeamMemberCard = ({ name, role, img, large }) => (
  <motion.div 
    className={`relative overflow-hidden bg-ui-surface rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer ${large ? "row-span-2" : ""}`}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="aspect-square overflow-hidden">
      <img 
        src={img} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
      />
    </div>
    
    {/* Overlay that slides up on hover */}
    <motion.div 
      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/70 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      initial={{ y: "100%" }}
      whileHover={{ y: 0 }}
    >
      <h3 className="text-xl font-montserrat font-bold mb-1">{name}</h3>
      <p className="text-brand-lime-accent font-medium">{role}</p>
    </motion.div>
    
    {/* Default state - name at bottom */}
    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white group-hover:opacity-0 transition-opacity duration-300">
      <h3 className="font-montserrat font-semibold">{name}</h3>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function AboutSection() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section with Parallax */}
        <section className="relative bg-cover bg-center h-96 md:h-[500px] overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-forest/80 via-brand-forest/60 to-brand-sage/80" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <h2 className="text-white font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  Kicau
                  <span className="block text-brand-lime-accent">Finder</span>
                </h2>
                <p className="text-white/90 text-xl md:text-2xl max-w-2xl">
                  Where technology meets nature's symphony
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-lime-accent/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </section>

        <main className="flex-grow bg-ui-bg">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Team Introduction */}
            <motion.section 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-8 leading-tight">
                Meet the team
                <br />
                <span className="text-brand-sage">behind the chirps!</span>
              </h1>
              <p className="text-text-secondary font-roboto text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                Our team consists of individuals who are passionate about technology development.
                Together, we built Kicau Finder to help anyone recognise birds by their song.
              </p>
              <motion.button 
                className="bg-brand-sage text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-brand-forest hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-envelope mr-2" />
                Contact Our Team
              </motion.button>
            </motion.section>

            {/* Team Grid */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20"
            >
              {teamMembers.map((member) => (
                <motion.div key={member.name} variants={itemVariants}>
                  <TeamMemberCard {...member} />
                </motion.div>
              ))}
            </motion.section>

            {/* Vision & Mission */}
            <motion.section 
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="lg:col-span-2 space-y-12">
                <motion.div
                  className="bg-ui-surface p-8 rounded-3xl shadow-lg border border-ui-border"
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-brand-sage/20 rounded-2xl flex items-center justify-center mr-4">
                      <i className="fas fa-eye text-2xl text-brand-sage" />
                    </div>
                    <h2 className="text-3xl font-montserrat font-bold text-brand-forest">
                      Vision
                    </h2>
                  </div>
                  <p className="text-text-secondary font-roboto text-lg leading-relaxed">
                    To be the leading platform for bird education and identification, connecting people from all over the world
                    with the rich sounds of nature through smart, accurate and accessible technology.
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-ui-surface p-8 rounded-3xl shadow-lg border border-ui-border"
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-brand-sage/20 rounded-2xl flex items-center justify-center mr-4">
                      <i className="fas fa-bullseye text-2xl text-brand-sage" />
                    </div>
                    <h2 className="text-3xl font-montserrat font-bold text-brand-forest">
                      Mission
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {[
                      "Presenting Machine Learning-based technology to accurately identify bird songs, bridging learning and science.",
                      "Encourage a love for nature and bird conservation through a better understanding of their sounds and species."
                    ].map((mission, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start space-x-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-sage text-white flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-text-secondary font-roboto text-lg leading-relaxed">
                          {mission}
                        </p> 
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                className="lg:sticky lg:top-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={birdVM} 
                    alt="Bird Vision" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/30 to-transparent" />
                </div>
              </motion.div>
            </motion.section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-brand-forest text-white py-16">
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
    </>    
  );
}