"use client";

import { useState, useEffect } from "react";

const platforms = [
  { name: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", color: "bg-pink-500" },
  { name: "X", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", color: "bg-black" },
  { name: "Facebook", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", color: "bg-blue-600" },
  { name: "TikTok", icon: "https://cdn-icons-png.flaticon.com/512/3046/3046126.png", color: "bg-black" },
  { name: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", color: "bg-green-500" },
  { name: "YouTube", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", color: "bg-red-600" }
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Case",
    description: "Fill out our secure form with your account details. Our team reviews every submission personally.",
    icon: "📝"
  },
  {
    step: "02",
    title: "We Get to Work",
    description: "Using our internal contacts and platform relationships, we work directly with each social network.",
    icon: "⚡"
  },
  {
    step: "03",
    title: "Account Recovered",
    description: "We notify you immediately once your account is restored. Get back to your digital life!",
    icon: "✅"
  }
];

const services = [
  {
    title: "Disabled Account",
    price: "$300 - $1000",
    features: ["Fast Recovery", "Direct Platform Contact", "1-2hr Average", "Money-back Guarantee"],
    description: "Get your disabled Instagram, Facebook, TikTok or X account back.",
    id: "disabled",
    popular: false
  },
  {
    title: "Hacked Account",
    price: "$300 - $1000",
    features: ["Account Retrieval", "Username Recovery", "Full Access Restore", "Priority Support"],
    description: "Recover your hacked account even if username or email was changed.",
    id: "hacked",
    popular: true
  }
];

const stats = [
  { value: "500+", label: "Accounts Recovered" },
  { value: "98%", label: "Success Rate" },
  { value: "1-2hr", label: "Avg. Recovery Time" },
  { value: "4.9/5", label: "Client Rating" }
];

const testimonials = [
  {
    name: "Sarah M.",
    platform: "Instagram",
    text: "My account was disabled for 3 months. They got it back in 2 days!",
    stars: "⭐⭐⭐⭐⭐"
  },
  {
    name: "James K.",
    platform: "TikTok",
    text: "Hacker changed my username but they still recovered it. Amazing service!",
    stars: "⭐⭐⭐⭐⭐"
  }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    platforms: [] as string[],
    hackDate: "",
    username: "",
    followers: "",
    hackDetails: "",
    screenshot: null as File | null,
    previousHelp: "",
    agreement: false
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleOpenModal = (serviceId?: string) => {
    if (serviceId === "disabled") {
      setFormData(prev => ({ ...prev, accountType: "disabled" }));
    } else if (serviceId === "hacked") {
      setFormData(prev => ({ ...prev, accountType: "hacked" }));
    }
    setIsModalOpen(true);
    setFormStep(1);
    setSubmitSuccess(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePlatformChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "platforms") {
            formDataToSend.append(key, JSON.stringify(value));
          } else if (value instanceof File) {
            formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      } else {
        alert("Error: " + (result.error || result.message));
      }
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = formData.accountType && formData.firstName && formData.lastName && formData.email;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">⚡</span>
            <span>SocialFix Pro <span className="text-cyan-400">Recovery</span></span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#process" className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">How it Works</a>
            <a href="#services" className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Services</a>
            <a href="#reviews" className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Reviews</a>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">98% Success Rate • Trusted by 500+ Clients</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Recover Your <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Social Accounts</span> Fast
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Disabled or hacked? We help recover Instagram, Facebook, TikTok, X, YouTube & WhatsApp accounts. 
            Quick, secure, and guaranteed results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => handleOpenModal()}
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105"
            >
              Start Recovery — $300+
            </button>
            <a 
              href="#process"
              className="border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/30 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-500 mb-8">We support all major platforms</p>
          
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col items-center gap-3 group">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 ${platform.name === 'X' ? 'bg-white' : ''}`}>
                  <img 
                    src={platform.icon} 
                    alt={platform.name} 
                    className={`h-8 w-8 md:h-10 md:w-10 object-contain ${platform.name === 'X' ? '' : 'invert'}`} 
                  />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">Simple 3-Step Process</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="text-5xl mb-6">{step.icon}</div>
                  <span className="text-6xl font-bold text-white/5 absolute top-4 right-6">{step.step}</span>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-cyan-400/50">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">Recovery Services</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Transparent pricing. No hidden fees.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className={`relative bg-gradient-to-b from-white/5 to-black border rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2 ${service.popular ? 'border-cyan-400/50 ring-2 ring-cyan-400/20' : 'border-white/10'}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-4">{service.price}</div>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <span className="w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 text-xs">✓</span> 
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleOpenModal(service.id)}
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${service.popular ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-xl hover:shadow-cyan-400/25' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Reviews</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-4">{testimonial.stars}</div>
                <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.platform}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Recover Your Account?</h2>
          <p className="text-xl text-gray-400 mb-10">Don&apos;t let a hacked or disabled account ruin your digital presence. Get started today.</p>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-10 py-5 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105"
          >
            Start Recovery — $300+
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <a href="/" className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">⚡</span>
                <span>SocialFix Pro <span className="text-cyan-400">Recovery</span></span>
              </a>
              <p className="text-gray-500 mt-4 text-sm">Helping people recover their social media accounts since 2024.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#process" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:recoveryexpert16@outlook.com" className="hover:text-white transition-colors">recoveryexpert16@outlook.com</a></li>
                <li><button onClick={() => handleOpenModal()} className="hover:text-white transition-colors">Book a Call</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/5">
            <p>© 2026 SocialFix Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {submitSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Submission Received!</h2>
                <p className="text-gray-400 mb-6">We&apos;ll contact you within 24 hours.</p>
                <button onClick={handleCloseModal} className="text-cyan-400 hover:underline">Close</button>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">Start Recovery</h2>
                    <p className="text-gray-400 text-sm mt-1">Step {formStep} of 2</p>
                  </div>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">×</button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: formStep === 1 ? '50%' : '100%' }}
                  ></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStep === 1 && (
                    <>
                      {/* Account Type */}
                      <div>
                        <label className="block text-sm font-medium mb-3">What type of issue? *</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.accountType === 'hacked' ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 hover:border-white/30'}`}>
                            <input 
                              type="radio" 
                              name="accountType" 
                              value="hacked"
                              checked={formData.accountType === "hacked"}
                              onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                              className="hidden"
                            />
                            <span className="text-2xl">🔓</span>
                            <div>
                              <div className="font-semibold">Hacked</div>
                              <div className="text-xs text-gray-500">Account taken over</div>
                            </div>
                          </label>
                          <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.accountType === 'disabled' ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 hover:border-white/30'}`}>
                            <input 
                              type="radio" 
                              name="accountType" 
                              value="disabled"
                              checked={formData.accountType === "disabled"}
                              onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                              className="hidden"
                            />
                            <span className="text-2xl">🚫</span>
                            <div>
                              <div className="font-semibold">Disabled</div>
                              <div className="text-xs text-gray-500">Account suspended</div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input 
                            type="text" 
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input 
                            type="text" 
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input 
                          type="email" 
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone (WhatsApp preferred)</label>
                        <input 
                          type="tel" 
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                        />
                      </div>

                      <button 
                        type="button"
                        onClick={() => canProceedToStep2 && setFormStep(2)}
                        disabled={!canProceedToStep2}
                        className={`w-full py-4 rounded-full text-lg font-semibold transition-all duration-300 ${canProceedToStep2 ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-xl hover:shadow-cyan-400/25' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}
                      >
                        Continue →
                      </button>
                    </>
                  )}

                  {formStep === 2 && (
                    <>
                      {/* Platforms */}
                      <div>
                        <label className="block text-sm font-medium mb-3">Affected Platforms *</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Instagram", "Facebook", "TikTok", "X (Twitter)", "YouTube", "WhatsApp"].map((platform) => (
                            <label key={platform} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.platforms.includes(platform) ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 hover:border-white/30'}`}>
                              <input 
                                type="checkbox"
                                checked={formData.platforms.includes(platform)}
                                onChange={() => handlePlatformChange(platform)}
                                className="hidden"
                              />
                              <span className={`w-4 h-4 rounded border flex items-center justify-center ${formData.platforms.includes(platform) ? 'bg-cyan-400 border-cyan-400' : 'border-gray-500'}`}>
                                {formData.platforms.includes(platform) && <span className="text-black text-xs">✓</span>}
                              </span>
                              {platform}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Account Username/Link *</label>
                        <input 
                          type="text" 
                          placeholder="@username or profile link"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                          required
                        />
                      </div>

                      {/* Followers */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Follower Count *</label>
                        <input 
                          type="text" 
                          placeholder="e.g., 10,000"
                          value={formData.followers}
                          onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                          required
                        />
                      </div>

                      {/* Hack Date */}
                      <div>
                        <label className="block text-sm font-medium mb-2">When did this happen?</label>
                        <input 
                          type="text" 
                          placeholder="MM-DD-YYYY"
                          value={formData.hackDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, hackDate: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all"
                        />
                      </div>

                      {/* Hack Details */}
                      <div>
                        <label className="block text-sm font-medium mb-2">What happened? How were you hacked?</label>
                        <textarea 
                          placeholder="Describe what happened..."
                          value={formData.hackDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, hackDetails: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all h-24 resize-none"
                        />
                      </div>

                      {/* Screenshot Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Problem Screenshot (Optional)</label>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors cursor-pointer">
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData(prev => ({ ...prev, screenshot: e.target.files?.[0] || null }))}
                            className="hidden"
                            id="screenshot-upload"
                          />
                          <label htmlFor="screenshot-upload" className="cursor-pointer">
                            {formData.screenshot ? (
                              <div className="text-green-400">
                                <div className="text-2xl mb-2">✓</div>
                                <div className="text-sm">{formData.screenshot.name}</div>
                              </div>
                            ) : (
                              <div className="text-gray-400">
                                <div className="text-2xl mb-2">📷</div>
                                <div className="text-sm">Click to upload image</div>
                                <div className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG</div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={formData.agreement}
                            onChange={(e) => setFormData(prev => ({ ...prev, agreement: e.target.checked }))}
                            className="w-5 h-5 mt-0.5 accent-cyan-400"
                            required
                          />
                          <span className="text-sm text-gray-300">
                            I understand the recovery fee is <span className="text-cyan-400 font-semibold">$300 - $1000</span> and agree to the terms.
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="flex-1 py-4 rounded-full text-lg font-semibold bg-white/10 hover:bg-white/20 transition-all"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={isSubmitting || !formData.agreement}
                          className={`flex-1 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${formData.agreement ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-xl hover:shadow-cyan-400/25' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
