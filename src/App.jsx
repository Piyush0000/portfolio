import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Palette, Zap, ChevronDown, Menu, X, Star, GitBranch, LinkedinIcon, Award, Briefcase, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Argumate - AI Debate Platform",
      description: "AI-powered platform enhancing debate skills with NLP-based feedback, real-time scoring, and structured communication insights for better arguments.",
      tech: ["Python", "NLP", "TensorFlow", "React", "Node.js", "Machine Learning"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "../public/argumate.png",
      featured: true
    },
    {
      title: "ReviveWheels - Vehicle Hub",
      description: "Comprehensive platform for vehicle repurposing, recycling, and reselling with EV conversion services, spare parts marketplace, and integrated UPI payments.",
      tech: ["MongoDB", "Express.js", "Node.js", "JavaScript", "UPI Integration", "RESTful API"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "../public/revive.png",
      featured: true
    },
    {
      title: "Heart Disease Prediction Model",
      description: "Advanced ML model predicting heart disease risk using multiple algorithms. Features comprehensive evaluation with ROC curves, precision-recall analysis.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
      featured: true
    },
    {
      title: "Angle & Bicep Movement Tracker",
      description: "Real-time computer vision application for posture analysis and fitness tracking using MediaPipe for precise arm angle detection.",
      tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Real-time Processing"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
    },
    {
      title: "Smart Urban Planning System",
      description: "Data-driven solution analyzing urban traffic and pollution patterns with interactive visualizations and real-time insights dashboard.",
      tech: ["Python", "Pandas", "Matplotlib", "HTML", "CSS", "JavaScript", "Data Analytics"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&crop=center"
    }
  ];

  const skills = [
    { 
      name: "Programming", 
      icon: <Code className="w-6 h-6" />, 
      items: ["Python", "JavaScript", "C", "HTML/CSS", "SQL"],
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "AI/ML & Data", 
      icon: <Database className="w-6 h-6" />, 
      items: ["TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "OpenCV"],
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Backend & Database", 
      icon: <Zap className="w-6 h-6" />, 
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "Django","Flask" ],
      color: "from-green-500 to-teal-500"
    },
    
    { 
      name: "Tools & Visualization", 
      icon: <Palette className="w-6 h-6" />, 
      items: ["Matplotlib", "Seaborn", "Git", "VS Code", "Jupyter"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const experiences = [
   {
      title: "Full Stack Web Developer Intern",
      company: "Thebookshelves",
      duration: "August 2025 - Present",
      description: [
        "Developed and maintained responsive web applications using React.js, Node.js, Express, and MongoDB, improving user experience and application performance. ",
        "Collaborated with cross-functional teams to design and implement RESTful APIs, ensuring seamless integration between frontend and backend services.",
        "Optimized database queries and application workflows, reducing load times and enhancing scalability for real-world project use cases."
      ],
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      title: "Database Developer Intern",
      company: "Analyzing.in",
      duration: "May 2025 - Aug 2025",
      description: [
        "Designed and optimized database structures for enhanced application performance",
        "Developed complex queries, stored procedures, and triggers for efficient data processing",
        "Implemented database normalization and indexing strategies for improved scalability"
      ],
      icon: <Briefcase className="w-5 h-5" />
    },
    
    {
      title: "Hackathon Achievements",
      company: "Multiple National Events",
      duration: "2024 - 2025",
      description: [
        "Secured Top 10 position in national-level hackathon",
        "Achieved Top 4 position demonstrating rapid prototyping skills",
        "Developed innovative solutions across healthcare, legal tech, and sustainability"
      ],
      icon: <Award className="w-5 h-5" />
    }
  ];

  const achievements = [
    "🏆 Top 10 position in National Hackathon",
    "🥉 Top 4 position in College-level Competition",
    "👨‍💻 Member of Tech Department, Startup Sphere Society",
    "🌟 Open Source Contributor - Social Winter of Code",
    "🚀 Open Source Contributor - IWOC Season 3",
    "🤝 Active Member of National Service Scheme"
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      {/* Enhanced Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200 ease-out"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          transform: `scale(${isLoaded ? 1 : 0})`,
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-lg z-40 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              Piyush.dev
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 relative ${
                    activeSection === item ? 'text-purple-400' : ''
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-lg border-t border-purple-500/20">
            {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-6 py-4 capitalize hover:bg-purple-500/10 transition-colors border-b border-gray-700/50"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <div className={`transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium mb-4">
                Welcome to my digital space ✨
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Hi, I'm Piyush
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-2xl md:text-3xl text-gray-300 font-light">
                AI/ML Specialist & Full Stack Developer
              </p>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Computer Science undergraduate at MAIT specializing in AI & ML. 
                Building innovative solutions for healthcare, legal tech, and sustainability.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-purple-500/20">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Hackathon Winner</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-purple-500/20">
                <Database className="w-4 h-4 text-purple-400" />
                <span>DB Developer Intern</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-purple-500/20">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Open Source Contributor</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 font-medium"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Explore My Work</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Passionate about creating technology that makes a difference
          </p>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Visual */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl relative overflow-hidden backdrop-blur-sm border border-purple-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
                  <div className="absolute inset-8 bg-gray-800/80 rounded-2xl flex flex-col items-center justify-center space-y-6 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-purple-300 mb-2">CS Student</h3>
                      <p className="text-gray-400 text-sm">MAIT, Delhi</p>
                      <p className="text-purple-400 text-sm mt-1">AI/ML Specialization</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-400">2028</p>
                      <p className="text-gray-400 text-sm">Expected Graduation</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full backdrop-blur-sm border border-pink-500/30 flex items-center justify-center">
                  <Database className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a driven Computer Science undergraduate at <span className="text-purple-400 font-semibold">Maharaja Agrasen Institute of Technology</span>, 
                  specializing in Artificial Intelligence and Machine Learning. Currently working as a 
                  <span className="text-pink-400 font-semibold"> Database Developer Intern</span>, gaining hands-on experience in database optimization and system design.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  My passion lies in solving real-world problems through technology. I've participated in multiple 
                  national hackathons, securing <span className="text-purple-400 font-semibold">Top 10</span> and 
                  <span className="text-pink-400 font-semibold"> Top 4</span> positions, developing innovative solutions 
                  across healthcare, legal assistance, and sustainability domains.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  As an active open-source contributor and member of various tech societies, I believe in 
                  collaborative learning and giving back to the developer community.
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                    <p className="text-sm text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>

              {/* Contact Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/Piyush0000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-purple-500/10 transition-colors border border-gray-700 hover:border-purple-500/30"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/piyussshhh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-blue-500/10 transition-colors border border-gray-700 hover:border-blue-500/30"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience & Achievements
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            My professional journey and notable accomplishments
          </p>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800/80 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                      {exp.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-purple-300 mb-1">{exp.title}</h3>
                          <p className="text-gray-400 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-sm text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20 mt-2 md:mt-0 w-fit">
                          {exp.duration}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start space-x-2">
                            <Star className="w-3 h-3 text-purple-400 mt-1.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Achievements */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-purple-300">Leadership & Extracurricular</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.slice(2).map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-800/60 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                  <p className="text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category, index) => (
              <div 
                key={category.name}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})` }}>
                </div>
                <div className="relative bg-gray-800/90 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${category.color} rounded-xl mr-4 shadow-lg`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.items.map((skill) => (
                      <li key={skill} className="text-gray-300 flex items-center group/item">
                        <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3 group-hover/item:scale-125 transition-transform`}></div>
                        <span className="group-hover/item:text-white transition-colors">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Specialization Highlight */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-purple-300 mb-4">Specializations</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium">
                  Full Stack Web Development
                </span>
                <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium">
                  Data Science & Machine Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Real-world solutions across healthcare, sustainability, and technology
          </p>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => (
              <div 
                key={project.title}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/80 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-full text-xs font-semibold backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-xs border border-gray-600/20">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div 
                key={project.title}
                className="group bg-gray-800/80 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="text-lg font-bold mb-3 text-purple-300">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span className="text-xs">Code</span>
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="text-xs">Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <a 
              href="https://github.com/Piyush0000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 font-medium"
            >
              <GitBranch className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Explore All Projects</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Ready to collaborate on your next project?
          </p>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, innovative projects, 
            or just chat about the latest in AI and technology.
          </p>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <a 
              href="mailto:rathorepiyush0000@gmail.com"
              className="group p-8 bg-gray-800/80 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-300">Email Me</h3>
              <p className="text-gray-400 mb-2">Drop me a line</p>
              <p className="text-sm text-gray-300 break-all">rathorepiyush0000@gmail.com</p>
            </a>

            <a 
              href="https://github.com/Piyush0000"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gray-800/80 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-300">GitHub</h3>
              <p className="text-gray-400 mb-2">Check out my code</p>
              <p className="text-sm text-gray-300">@Piyush0000</p>
            </a>

            <a 
              href="tel:+919717704058"
              className="group p-8 bg-gray-800/80 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-300">Call Me</h3>
              <p className="text-gray-400 mb-2">Let's talk directly</p>
              <p className="text-sm text-gray-300">+91 9717704058</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/80 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-8 text-purple-300">Send Me a Message</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder=" "
                    className="peer w-full p-4 bg-gray-700/50 border border-purple-500/20 rounded-xl focus:border-purple-500/60 focus:outline-none transition-colors placeholder-transparent"
                  />
                  <label className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-purple-300 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-purple-300 peer-focus:bg-gray-800">
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder=" "
                    className="peer w-full p-4 bg-gray-700/50 border border-purple-500/20 rounded-xl focus:border-purple-500/60 focus:outline-none transition-colors placeholder-transparent"
                  />
                  <label className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-purple-300 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-purple-300 peer-focus:bg-gray-800">
                    Your Email
                  </label>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder=" "
                  className="peer w-full p-4 bg-gray-700/50 border border-purple-500/20 rounded-xl focus:border-purple-500/60 focus:outline-none transition-colors placeholder-transparent"
                />
                <label className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-purple-300 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-purple-300 peer-focus:bg-gray-800">
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea 
                  rows="6" 
                  placeholder=" "
                  className="peer w-full p-4 bg-gray-700/50 border border-purple-500/20 rounded-xl focus:border-purple-500/60 focus:outline-none transition-colors resize-none placeholder-transparent"
                ></textarea>
                <label className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-purple-300 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-purple-300 peer-focus:bg-gray-800">
                  Your Message
                </label>
              </div>
              <button 
                onClick={() => window.open('mailto:rathorepiyush0000@gmail.com?subject=Portfolio Contact')}
                className="group w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 font-medium"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-12 flex justify-center space-x-8">
            <a 
              href="https://www.linkedin.com/in/piyussshhh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/Piyush0000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 border-t border-purple-500/20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Piyush.dev
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              Crafting innovative solutions with AI, ML, and modern web technologies. 
              Always excited to collaborate on meaningful projects.
            </p>
          </div>
          
          <div className="border-t border-purple-500/10 pt-8 text-center">
            <p className="text-gray-400 mb-4">
              © 2025 Piyush Rathore. Built with React, Vite & Tailwind CSS.
            </p>
            <p className="text-sm text-gray-500">
              Maharaja Agrasen Institute of Technology • Computer Science with AI/ML • Class of 2028
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
};

export default Portfolio;