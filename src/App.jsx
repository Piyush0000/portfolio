import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Palette, Zap, ChevronDown, Menu, X, Star, GitBranch, LinkedinIcon, Award, Briefcase, GraduationCap, Sparkles, Rocket, Brain, Heart, Activity, Globe } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

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
    
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observerRef.current?.observe(section);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
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
      title: "💳 Credit Risk Prediction System",
      description: "85% accuracy ML model for predicting credit risk using Extra Trees Classifier. Real-time analysis with Streamlit deployment, revolutionizing financial decision-making.",
      tech: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "ML Algorithms", "Data Analysis"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
      featured: true,
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "🏥 Ved Seva - Rural Healthcare",
      description: "Bridging healthcare gaps in rural India with telemedicine platform. Connects villagers to doctors, provides health resources, and enables remote consultations.",
      tech: ["HTML", "CSS", "JavaScript", "Supabase", "API Integration", "Responsive Design"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&crop=center",
      featured: true,
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "🗣️ Argumate - AI Debate Platform",
      description: "NLP-powered platform enhancing debate skills with real-time feedback, scoring, and structured communication insights. Makes debaters elite through AI analysis.",
      tech: ["Python", "NLP", "TensorFlow", "React", "Node.js", "Machine Learning"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "./argumate.png",
      featured: true,
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "🚗 ReviveWheels - Sustainability Hub",
      description: "Save the planet one vehicle at a time! Platform for vehicle recycling, EV conversion services, spare parts marketplace with integrated UPI payments.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "UPI Integration", "RESTful API"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "./revive.png",
      featured: false,
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "❤️ Heart Disease Predictor",
      description: "Clinical-grade ML model saving lives through accurate heart disease prediction. Features ROC curves, precision-recall analysis, and comprehensive health metrics.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
      featured: false,
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "🏋️ Angle & Bicep Movement Tracker",
      description: "Your personal AI trainer! Real-time computer vision for posture analysis, fitness tracking, and physiotherapy using MediaPipe precision technology.",
      tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Real-time Processing"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      featured: false,
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "🔌 Low Tension Lines Fault Detector",
      description: "Preventing disasters through ML-powered fault detection. MERN Stack meets Machine Learning for infrastructure safety and real-time monitoring.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Python", "ML"],
      github: "https://github.com/Piyush0000",
      demo: "#",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&crop=center",
      featured: false,
      icon: <Zap className="w-6 h-6" />
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
      duration: "August 2024 - October 2025",
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
              Piyush
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
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(-${scrollY * 0.05}px, -${scrollY * 0.08}px)`,
              animation: 'float 10s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
            style={{
              transform: `translate(-50%, -50%) translate(${scrollY * 0.03}px, ${scrollY * 0.06}px)`,
              animation: 'float 12s ease-in-out infinite'
            }}
          />
        </div>

        {/* Enhanced Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                opacity: Math.random() * 0.3 + 0.1,
                animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s, float ${5 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 2}s`,
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <div 
            className={`transform transition-all duration-1500 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ animation: isLoaded ? 'fadeInUp 1s ease-out' : 'none' }}
          >
            <div className="mb-6 animate-bounce-slow">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-full text-sm font-medium mb-4 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  Welcome to my digital universe
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </span>
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
              <span 
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                style={{
                  animation: 'gradient-shift 3s ease-in-out infinite',
                  backgroundSize: '200% 200%'
                }}
              >
                Hi, I'm Piyush
              </span>
              <div className="mt-4 text-3xl md:text-4xl">
                <span 
                  className="inline-block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                  style={{ animation: 'typing 3.5s steps(40, end) infinite' }}
                >
                  Rathore
                </span>
              </div>
            </h1>
            
            <div className="space-y-6 mb-8">
              <p className="text-2xl md:text-4xl text-gray-200 font-light">
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold">
                  AI/ML Engineer
                </span>
                {" + "}
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-semibold">
                  Full Stack Developer
                </span>
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                🤖 Building <span className="text-purple-400 font-semibold">AI solutions that matter</span> • 
                🚀 Making the <span className="text-pink-400 font-semibold">impossible possible</span> • 
                🌟 Changing the world, <span className="text-blue-400 font-semibold">one commit at a time</span>
              </p>
            </div>

            {/* Animated Stats Counter */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="group px-6 py-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  <span className="inline-block group-hover:animate-bounce">20+</span>
                </div>
                <div className="text-xs text-gray-400">Projects Built</div>
              </div>
              <div className="group px-6 py-4 bg-gray-800/50 rounded-2xl border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-pink-400 mb-1">
                  <span className="inline-block group-hover:animate-bounce">TOP 4</span>
                </div>
                <div className="text-xs text-gray-400">Hackathon Rank</div>
              </div>
              <div className="group px-6 py-4 bg-gray-800/50 rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  <span className="inline-block group-hover:animate-bounce">85%</span>
                </div>
                <div className="text-xs text-gray-400">ML Accuracy</div>
              </div>
              <div className="group px-6 py-4 bg-gray-800/50 rounded-2xl border border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  <span className="inline-block group-hover:animate-bounce">∞</span>
                </div>
                <div className="text-xs text-gray-400">Coffee Consumed</div>
              </div>
            </div>

            {/* Enhanced Quick Stats with Animations */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
              {[
                { icon: <Award className="w-4 h-4" />, text: "Hackathon Winner", color: "purple" },
                { icon: <Database className="w-4 h-4" />, text: "Full Stack Intern", color: "pink" },
                { icon: <GitBranch className="w-4 h-4" />, text: "Open Source Contributor", color: "blue" },
                { icon: <Brain className="w-4 h-4" />, text: "AI/ML Specialist", color: "green" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-${item.color}-500/30 hover:border-${item.color}-500/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm group`}
                  style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
                >
                  <span className={`text-${item.color}-400 group-hover:rotate-12 transition-transform`}>{item.icon}</span>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/50 font-semibold text-lg relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="flex items-center justify-center space-x-3 relative z-10">
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>Explore My Work</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="group px-10 py-5 border-2 border-purple-500 rounded-full hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-110 font-semibold text-lg backdrop-blur-sm relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="flex items-center justify-center space-x-2 relative z-10">
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Let's Connect</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="w-10 h-10 text-purple-400 animate-pulse" />
          </div>
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
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div 
            className={`transform transition-all duration-1000 ${
              visibleSections.has('skills') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-4 max-w-2xl mx-auto">
              🛠️ Technologies and tools I use to bring ideas to life
            </p>
            <p className="text-center text-purple-300 mb-16 text-sm">
              ⚡ Arsenal of Destruction ⚡
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category, index) => (
              <div 
                key={category.name}
                className={`group relative transform transition-all duration-700 ${
                  visibleSections.has('skills') 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animation: visibleSections.has('skills') ? `scale-in 0.6s ease-out ${index * 0.15}s both` : 'none'
                }}
              >
                {/* Animated glow effect */}
                <div 
                  className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color.includes('purple') ? '#a855f7' : category.color.includes('green') ? '#10b981' : category.color.includes('blue') ? '#3b82f6' : '#f97316'}, ${category.color.includes('pink') ? '#ec4899' : category.color.includes('teal') ? '#14b8a6' : category.color.includes('cyan') ? '#06b6d4' : '#ef4444'})`
                  }}
                ></div>
                
                <div className="relative bg-gray-800/95 p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 backdrop-blur-sm h-full">
                  {/* Icon with animation */}
                  <div className="flex items-center mb-6">
                    <div 
                      className={`p-4 bg-gradient-to-r ${category.color} rounded-2xl mr-4 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}
                      style={{ animation: 'float 3s ease-in-out infinite' }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.items.map((skill, idx) => (
                      <li 
                        key={skill} 
                        className="text-gray-300 flex items-center group/item transform transition-all duration-300 hover:translate-x-2"
                        style={{ 
                          animation: visibleSections.has('skills') ? `slide-in-left 0.5s ease-out ${index * 0.15 + idx * 0.05}s both` : 'none'
                        }}
                      >
                        <div 
                          className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3 group-hover/item:scale-150 transition-all duration-300`}
                          style={{ boxShadow: '0 0 10px currentColor' }}
                        ></div>
                        <span className="group-hover/item:text-white group-hover/item:font-semibold transition-all duration-300">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Progress bar animation */}
                  <div className="mt-6 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.color} transform origin-left transition-all duration-1000 group-hover:scale-x-100`}
                      style={{ 
                        transform: visibleSections.has('skills') ? 'scaleX(1)' : 'scaleX(0)',
                        transitionDelay: `${index * 0.15 + 0.5}s`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Specialization Highlight with enhanced animations */}
          <div 
            className={`mt-16 text-center transform transition-all duration-1000 ${
              visibleSections.has('skills') ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <div className="inline-block p-10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl border border-purple-500/40 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/60 transition-all duration-500">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-400 animate-spin-slow" />
                  <h3 className="text-3xl font-bold text-purple-300">Specializations</h3>
                  <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow" />
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  <span className="group/spec px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 cursor-default relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/spec:opacity-100 transition-opacity"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Full Stack Web Development
                    </span>
                  </span>
                  <span className="group/spec px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 cursor-default relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/spec:opacity-100 transition-opacity"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Data Science & Machine Learning
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div 
            className={`transform transition-all duration-1000 ${
              visibleSections.has('projects') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-4 max-w-2xl mx-auto">
              🚀 Real-world solutions across healthcare, finance, and sustainability
            </p>
            <p className="text-center text-purple-300 mb-16 text-sm">
              ⚡ Power Level: OVER 9000! ⚡
            </p>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => (
              <div 
                key={project.title}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-700 transform hover:scale-[1.05] hover:-translate-y-2 backdrop-blur-sm ${
                  visibleSections.has('projects') ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-700 rounded-3xl"></div>
                
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  {/* Floating icon */}
                  <div className="absolute top-4 left-4 p-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-2xl backdrop-blur-sm transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    {project.icon}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-full text-xs font-bold backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300 inline-block">
                      ⭐ FEATURED
                    </span>
                  </div>
                </div>

                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-xs border border-purple-500/20 hover:border-purple-500/60 hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 cursor-default"
                        style={{ animation: `fadeInUp 0.5s ease-out ${0.5 + idx * 0.1}s both` }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1.5 bg-gray-700/50 text-gray-400 rounded-lg text-xs border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:scale-110 cursor-default">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group/link transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex-1 justify-center"
                    >
                      <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                      <span className="text-sm font-semibold">Code</span>
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-5 py-2.5 border-2 border-purple-500/50 rounded-xl hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 group/link transform hover:scale-105 flex-1 justify-center"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      <span className="text-sm font-semibold">Live</span>
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
                className={`group bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.03] backdrop-blur-sm ${
                  visibleSections.has('projects') ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${0.6 + index * 0.15}s`,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 p-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-xs">+{project.tech.length - 3}</span>
                    </div>

                    <div className="flex space-x-3">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 bg-purple-600/70 rounded-lg hover:bg-purple-500 transition-all duration-300 text-xs font-semibold transform hover:scale-105"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 border border-purple-500/50 rounded-lg hover:bg-purple-500/20 transition-all duration-300 text-xs font-semibold transform hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
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
              className="group inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/50 font-bold text-lg relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <GitBranch className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">🚀 Explore All Projects on GitHub</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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

          {/* Resume Download */}
          <div className="mb-16 text-center">
            <a 
              href="/final_resume.pdf" 
              download="Piyush_Rathore_Resume.pdf"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 font-bold text-lg relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Download My Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
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
              Piyush
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
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.6);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes rotate-in {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        
        /* Glassmorphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
        
        /* Parallax effect */
        .parallax {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;