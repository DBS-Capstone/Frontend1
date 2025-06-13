import React from "react";
import { motion } from "framer-motion";
import birdImage from "../assets/bird.png";

const HomeSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235B8266' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Image Column - Smaller with overlap effect */}
          <motion.div 
            className="col-span-12 md:col-span-5 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-sage/20 to-brand-forest/20 rounded-3xl blur-xl" />
              
              {/* Main image container with overlap */}
              <motion.div 
                className="relative bg-gradient-to-br from-brand-sage/10 to-brand-forest/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 transform md:translate-x-8"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  alt="A colorful bird with blue and orange feathers perched on a branch"
                  className="rounded-xl shadow-2xl w-full max-w-sm"
                  src={birdImage}
                />
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -top-3 -right-3 w-6 h-6 bg-brand-lime-accent rounded-full shadow-glow-lime"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Column - Larger */}
          <motion.div 
            className="col-span-12 md:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-brand-forest leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Find
                <span className="block text-brand-sage">
                  Me
                </span>
              </motion.h1>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-brand-lime-accent to-brand-sage rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </div>

            <motion.p 
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-roboto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Temukan berbagai jenis burung hanya dari suara kicauannya. Kicau
              Finder membantu mengidentifikasi burung secara cepat dan akurat. Cukup
              unggah atau rekam suara burung, dan biarkan teknologi kami
              mencocokkannya dengan database suara burung dari berbagai spesies.
            </motion.p>

            <motion.p 
              className="text-text-secondary leading-relaxed max-w-2xl font-roboto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Cocok untuk pengamat burung, peneliti, atau siapa saja yang penasaran
              dengan suara kicauan di sekitar mereka. Rasakan pengalaman mengenali
              burung dengan cara yang seru dan interaktif, langsung dari genggaman
              tanganmu.
            </motion.p>

            {/* Feature highlights */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { icon: "🎵", text: "AI Recognition" },
                { icon: "⚡", text: "Instant Results" },
                { icon: "🌿", text: "Nature Database" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-ui-border"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="text-sm font-medium text-brand-forest">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;