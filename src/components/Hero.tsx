import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Camera, Clock, Users } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Report.
              <span className="block text-primary-glow">Track.</span>
              <span className="block text-secondary">Resolve.</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Transform your city with crowdsourced civic issue reporting. 
              Citizens report, government responds, community thrives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" className="group">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Report an Issue
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <MapPin className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-glow mb-1">2,847</div>
                <div className="text-white/70 text-sm">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">24h</div>
                <div className="text-white/70 text-sm">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">15K+</div>
                <div className="text-white/70 text-sm">Active Citizens</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Feature cards */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-smooth shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Instant Reporting</h3>
                  <p className="text-white/70">Snap, tag location, and submit in seconds</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-smooth shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Real-time Tracking</h3>
                  <p className="text-white/70">Follow your report from submission to resolution</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-smooth shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Community Impact</h3>
                  <p className="text-white/70">Join thousands making cities better</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary-glow rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-secondary rounded-full animate-bounce" />
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-accent rounded-full animate-pulse" />
    </section>
  );
};

export default Hero;