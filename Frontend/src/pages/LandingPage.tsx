import { useState, useEffect } from 'react';
import { PenTool, Cloud, Search, Smartphone, ArrowRight, Check, Menu, X, Sparkles, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
export default function NotesLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingElement = ({
    delay,
    children,
    className,
  }: {
    delay: number;
    children: ReactNode;
    className?: string;
  }) => (
    <div 
      className={`absolute animate-bounce ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-100 relative overflow-hidden">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-32 w-36 h-36 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${Math.sin(Date.now() / 1000) * 0.5 + 1})`
        }}
      ></div>

      <nav className="fixed w-full top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <PenTool className="h-8 w-8 text-transparent bg-clip-text" style={{color: 'transparent', background: 'linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981)', backgroundClip: 'text'}} />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="font-black text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">NotesApp</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105">Features</a>
              <a href="#about" className="text-slate-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105">About</a>
              <a href="#contact" className="text-slate-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105">Contact</a>
              <button 
              onClick={() => navigate("/signup")}
              className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span 
                onClick={() => navigate("/signup")}
                className="relative flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign Up
                </span>
              </button>
            </div>

            <button 
              className="md:hidden bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-purple-600" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20">
            <div className="px-4 py-6 space-y-6">
              <a href="#features" className="block text-slate-700 hover:text-purple-600 font-medium">Features</a>
              <a href="#about" className="block text-slate-700 hover:text-purple-600 font-medium">About</a>
              <a href="#contact" className="block text-slate-700 hover:text-purple-600 font-medium">Contact</a>
              <button 
              onClick={() => navigate("/signup")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold shadow-xl">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block text-slate-800">Capture</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Everything
              </span>
              <span className="block text-slate-800">That Matters</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your scattered thoughts into organized brilliance. Our intelligent notes app adapts to your workflow, 
              <span className="text-purple-600 font-semibold"> beautifully.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-110 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span 
                onClick={() => navigate("/signup")}
                className="relative flex items-center justify-center">
                  <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Get Started
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm text-slate-700 px-12 py-5 rounded-3xl text-xl font-bold border-2 border-white/50 hover:border-purple-300 hover:shadow-2xl transition-all duration-500 hover:bg-white">
                <span className="flex items-center justify-center">
                  <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                  Explore Features
                </span>
              </button>
            </div>
            </div>

          <div className={`mt-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative max-w-5xl mx-auto">
              <FloatingElement delay={0} className="top-10 left-10">
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-2xl shadow-xl">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
              </FloatingElement>
              
              <FloatingElement delay={1} className="top-20 right-16">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-3 rounded-xl shadow-xl">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
              </FloatingElement>
              
              <FloatingElement delay={2} className="bottom-16 left-20">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-xl shadow-xl">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </FloatingElement>

              <div className="relative">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/50">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 min-h-96 relative overflow-hidden">
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex space-x-3">
                        <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm">
                        My Workspace ✨
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-slate-800">💡 Brilliant Ideas</div>
                          <div className="w-3 h-3 bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></div>
                        </div>
                        <div className="text-sm text-slate-600 mb-3">Revolutionary app concepts that will change everything...</div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">#innovation</span>
                          <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">#startup</span>
                        </div>
                      </div>
                      
                      <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-slate-800">📱 Project Roadmap</div>
                          <div className="w-3 h-3 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></div>
                        </div>
                        <div className="text-sm text-slate-600 mb-3">Q4 milestones and feature planning...</div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">#planning</span>
                          <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">#goals</span>
                        </div>
                      </div>
                      
                      <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-slate-800">🎯 Daily Goals</div>
                          <div className="w-3 h-3 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
                        </div>
                        <div className="text-sm text-slate-600 mb-3">Today's priorities and achievements...</div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">#productivity</span>
                        </div>
                      </div>
                      
                      <div className="group bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-slate-800">✈️ Travel Dreams</div>
                          <div className="w-3 h-3 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"></div>
                        </div>
                        <div className="text-sm text-slate-600 mb-3">Places to visit and experiences to have...</div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">#travel</span>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">#dreams</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-r from-white to-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-full mb-6">
              <span className="text-sm font-bold text-purple-700">🚀 POWERFUL FEATURES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-6">
              Built for the way
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
                you think
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Every feature is crafted to enhance your creativity and boost your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Cloud,
                title: "Instant Sync",
                description: "Your thoughts, everywhere you go. Lightning-fast sync across all devices.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: Search,
                title: "Get your Notes Fast",
                description: "Find anything instantly with intelligent search that understands context.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Ready on the go for mobiile users. Capture ideas and share with ease.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                icon: PenTool,
                title: "Rich Editor",
                description: "Express yourself with rich formatting, media, and markdown support.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-black text-slate-800 mb-4 text-xl">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-spin" style={{animationDuration: '3s'}} />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
            Ready to transform
            <span className="block">your productivity?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of creators, entrepreneurs, and thinkers who have revolutionized their workflow with NotesApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-white text-purple-600 px-12 py-5 rounded-3xl text-xl font-black hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-white/20">
              <span 
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center">
                <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Get Started Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/90">
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 mr-3 text-green-300" />
              <span className="font-semibold">Free forever</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 mr-3 text-green-300" />
              <span className="font-semibold">No setup required</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 mr-3 text-green-300" />
              <span className="font-semibold">Start in seconds</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}