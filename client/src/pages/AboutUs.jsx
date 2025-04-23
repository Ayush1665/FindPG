import React, { useEffect } from 'react';
import { FaHome, FaUsers, FaShieldAlt, FaHandshake, FaChartLine, FaHeadset, FaChevronDown } from 'react-icons/fa';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom animated components
const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");

  return (
    <div className={`${className} overflow-hidden`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          viewport={{ once: true, amount: 0.5 }}
          className="inline-block mr-2"
        >
          {word + " "}
        </motion.span>
      ))}
    </div>
  );
};

const TeamMember = ({ member, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.15
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="relative group bg-white rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-500"
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-indigo-200 mb-3 font-medium">{member.role}</p>
        <p className="text-gray-200">{member.bio}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const StatCard = ({ stat, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: index * 0.1
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileHover={{ y: -5 }}
      className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 shadow-lg"
    >
      <motion.p 
        animate={{
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 3, delay: index * 0.5 }
        }}
        className="text-5xl font-bold mb-2 text-white"
      >
        {stat.value}
      </motion.p>
      <p className="text-indigo-100 font-medium">{stat.label}</p>
    </motion.div>
  );
};

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const teamMembers = [
    {
      name: 'Divyam Goel',
      role: 'Founder & CEO',
      bio: 'Real estate expert with 10+ years experience in property management',
      image: 'https://i.pinimg.com/236x/34/5c/6d/345c6d52234bbc72407ea25d49ad945e.jpg'
    },
    {
      name: 'Ayush Singla',
      role: 'CTO',
      bio: 'Tech enthusiast specializing in scalable web platforms',
      image: 'https://i.pinimg.com/236x/d2/7a/62/d27a626a6b0f3f78eff872925f766a93.jpg'
    },
    {
      name: 'Ayush Aggarwal',
      role: 'Head of Operations',
      bio: 'Customer service specialist focused on seamless PG experiences',
      image: 'https://i.pinimg.com/474x/52/33/20/5233204aae9643a84ce2ca4407299c2a.jpg'
    },
    {
      name: 'Keshav Singla',
      role: 'Marketing Head',
      bio: 'Digital marketing expert with focus on growth strategies',
      image: 'https://i.pinimg.com/236x/48/65/f6/4865f65986c705dd83291e47f2c31ae0.jpg'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Tenants' },
    { value: '2,500+', label: 'Verified PGs' },
    { value: '50+', label: 'Cities Covered' },
    { value: '24/7', label: 'Customer Support' }
  ];

  const benefitItems = [
    { icon: <FaShieldAlt className="text-2xl" />, title: 'Verified Listings', text: 'Every PG goes through strict verification before listing' },
    { icon: <FaHandshake className="text-2xl" />, title: 'Hassle-Free Process', text: 'From search to booking - all in one platform' },
    { icon: <FaChartLine className="text-2xl" />, title: 'Transparent Pricing', text: 'No hidden charges, exact rent and deposit amounts' },
    { icon: <FaHeadset className="text-2xl" />, title: '24/7 Support', text: 'Dedicated team to resolve any issues' }
  ];

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-indigo-50 font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
        </motion.div>
        
        {/* Floating circles */}
        <motion.div 
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            transition: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"
        />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedText 
            text="About PG Finder" 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
          />
          <AnimatedText 
            text="Revolutionizing the way people find and manage paying guest accommodations across India" 
            className="text-xl md:text-2xl text-indigo-200 max-w-4xl mx-auto mb-12"
          />
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Explore Our Story
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              Watch Video
            </motion.button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-white/80 mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaChevronDown className="text-white/60 text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Our Story */}
      <section className="relative py-28 bg-white">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-900 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journey</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed"
                >
                  Founded in 2020, PG Finder began as a simple idea to solve the pain points of finding quality PG accommodations. 
                  Our founder, Divyam Goel, struggled to find a decent PG when he first moved to Bangalore for work. 
                  This frustrating experience inspired him to create a platform that makes PG hunting simple, transparent, and stress-free.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed"
                >
                  What started as a small directory has now grown into India's most trusted PG rental platform, serving thousands of 
                  tenants and property owners across major cities. We're proud to have helped over 10,000 people find their perfect 
                  PG accommodation without the usual hassles.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="PG Finder office" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Our First Office</h3>
                  <p className="text-indigo-200">Where the magic began</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
              >
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Purpose</span>
              </motion.h2>
              
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Mission</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To empower tenants with transparent information and seamless booking experiences while helping 
                    PG owners efficiently manage their properties through our innovative platform.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Vision</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To become India's most trusted PG rental ecosystem, setting new standards for convenience, 
                    safety, and reliability in shared accommodations.
                  </p>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative bg-gradient-to-br from-indigo-700 to-purple-700 p-10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-10 relative z-10">Why Choose PG Finder?</h3>
              
              <div className="space-y-6 relative z-10">
                {benefitItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-start bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-500"
                  >
                    <div className="bg-white/20 p-4 rounded-xl mr-6">
                      {React.cloneElement(item.icon, { className: "text-white text-2xl" })}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-indigo-100">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-28 bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
          >
            PG Finder <span className="text-indigo-200">in Numbers</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}

      {/* Team Section - Premium Redesign */}
<section className="relative py-32 bg-[#fafbff] overflow-hidden">
  {/* Floating gradient bubbles */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_#6366f1_0%,_transparent_70%)] opacity-10 blur-3xl -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(ellipse_at_center,_#8b5cf6_0%,_transparent_70%)] opacity-10 blur-3xl translate-y-1/2"></div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-24"
    >
      <div className="inline-flex items-center justify-center px-6 py-2 bg-indigo-100 rounded-full mb-6">
        <span className="text-sm font-medium text-indigo-600 tracking-wider">OUR DREAM TEAM</span>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        <span className="relative inline-block">
          <span className="relative z-10">The Minds</span>
          <span className="absolute bottom-2 left-0 w-full h-4 bg-indigo-200/40 z-0"></span>
        </span>{" "}
        Behind the Magic
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Meet the brilliant team revolutionizing PG accommodations through technology and innovation.
      </p>
    </motion.div>

    {/* Team Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60, rotateY: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ 
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative group perspective-1000"
        >
          {/* 3D Card Container */}
          <div className="relative h-full transition-all duration-700 group-hover:translate-y-[-10px] group-hover:shadow-2xl">
            {/* Card Background */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-lg border border-gray-100/70 overflow-hidden transition-all duration-500 group-hover:border-indigo-200/80"></div>
            
            {/* Card Content */}
            <div className="relative h-full flex flex-col">
              {/* Image with parallax effect */}
              <div className="relative h-80 overflow-hidden rounded-t-3xl">
                <motion.img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                
                {/* Floating badge */}
                
              </div>
              
              {/* Text Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-500">
                    {member.name}
                  </h3>
                  <p className="text-indigo-500 font-medium">{member.role}</p>
                </div>
                
                <p className="text-gray-600 mb-6 flex-1">{member.bio}</p>
                
                {/* Social Links - Animated */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-3"
                >
                  {['twitter', 'linkedin', 'dribbble'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                      aria-label={`${member.name}'s ${social}`}
                    >
                      <span className="sr-only">{social}</span>
                      {/* Icon would go here */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
            
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 rounded-3xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 [box-shadow:0_20px_50px_-10px_rgba(99,102,241,0.25)]"></div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA with animated gradient border */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
      className="text-center mt-24"
    >
      <div className="inline-block p-[2px] bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 rounded-full shadow-lg">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white px-8 py-4 rounded-full font-semibold text-gray-900 relative overflow-hidden"
        >
          <span className="relative z-10">Join Our Growing Team</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
      </div>
    </motion.div>
  </div>
</section>

      {/* How It Works */}
      <section className="py-28 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PG Finder</span> Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaHome className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">For Tenants</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</span>
                  <span className="text-lg text-gray-700">Search PGs by location, budget & facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</span>
                  <span className="text-lg text-gray-700">View verified listings with photos & details</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</span>
                  <span className="text-lg text-gray-700">Book online and connect with the owner</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</span>
                  <span className="text-lg text-gray-700">Move in and enjoy your new home!</span>
                </li>
              </ol>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaUsers className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">For Owners</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</span>
                  <span className="text-lg text-gray-700">Create your account and verify identity</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</span>
                  <span className="text-lg text-gray-700">List your PG with all details and photos</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</span>
                  <span className="text-lg text-gray-700">Get approved tenants through our platform</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</span>
                  <span className="text-lg text-gray-700">Manage bookings and payments easily</span>
                </li>
              </ol>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaShieldAlt className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Promise</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">100% verified PG listings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">Secure online payments</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">Transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">Dedicated support</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Find Your <span className="text-indigo-200">Perfect PG</span>?
            </h2>
            <p className="text-xl md:text-2xl text-indigo-200 mb-12 max-w-3xl mx-auto">
              Join thousands of happy tenants and owners who trust PG Finder for their accommodation needs
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white text-indigo-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Search PGs
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 shadow-xl"
              >
                List Your PG
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            transition: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"
        />
      </section>
    </div>
  );
};

export default AboutUs;