import { useState, useEffect } from 'react';
import { Zap, ArrowRight, Cpu, Activity, Database, Atom, ChevronRight, FileText } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface LandingPageProps {
  onLaunch: () => void;
  onExplore: () => void;
}

export function LandingPage({ onLaunch, onExplore }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Grid pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" style={{ zIndex: 0 }} />

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-15 animate-float" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full opacity-10 animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl animate-pulse-glow" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.2))' }} />
            <Zap size={22} style={{ color: 'var(--accent)' }} className="relative z-10" />
          </div>
          <div>
            <span className="text-xl font-bold gradient-text">Q-Dx</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <span className="text-sm transition-smooth hover:opacity-100 cursor-pointer" style={{ color: 'var(--text-secondary)' }} onClick={onExplore}>Technology</span>
          <span className="text-sm transition-smooth hover:opacity-100 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Research</span>
          <span className="text-sm transition-smooth hover:opacity-100 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Datasets</span>
          <span className="text-sm transition-smooth hover:opacity-100 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>About</span>
        </div>
        <button onClick={onLaunch} className="neon-btn text-sm">
          Launch Platform
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-20 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-blink" style={{ background: 'var(--accent)' }} />
              <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--accent)' }}>HYBRID QUANTUM ML • EARLY RISK ANALYTICS</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>
              Hybrid Quantum Intelligence for <span className="gradient-text">Early Disease Detection</span>
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              Combining Classical Machine Learning and Quantum Computing concepts to transform health-risk prediction through intelligent, explainable analytics.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={onLaunch} className="neon-btn neon-btn-primary text-base flex items-center gap-2 group">
                Launch Q-Dx Platform
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onExplore} className="neon-btn text-base flex items-center gap-2">
                Explore Technology
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
              For research and educational demonstration only. Not a medical diagnosis.
            </p>
          </div>

          {/* Right: hero visual */}
          <div className="relative animate-scale-in">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Activity} value={3} label="Disease Modules" />
          <StatCard icon={Cpu} value={6} suffix="+" label="ML Models" />
          <StatCard icon={Database} value={5} suffix="+" label="Dataset Sources" />
          <StatCard icon={Atom} value={1} label="Quantum-Classical Pipeline" />
        </div>
      </section>

      {/* Feature highlights */}
      <section id="technology" className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
            A <span className="gradient-text">Quantum-Enhanced</span> Healthcare Platform
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Six pillars of intelligent, explainable, and futuristic disease risk analytics.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon={Atom} title="Quantum Feature Mapping" desc="Encode classical medical data into quantum states using amplitude encoding for higher-dimensional analysis." />
            <FeatureCard icon={Cpu} title="Hybrid ML Ensemble" desc="Combine classical models (RF, SVM, XGBoost, NN) with quantum classifiers for superior prediction accuracy." />
            <FeatureCard icon={Activity} title="Early Risk Detection" desc="Identify risk patterns for Skin Cancer, Breast Cancer, and Hypertension before symptoms appear." />
            <FeatureCard icon={Database} title="Multi-Source Datasets" desc="Leverage clinical datasets with rich feature sets for training and validation across disease modules." />
            <FeatureCard icon={Zap} title="Explainable AI" desc="Feature importance, model agreement scores, and quantum enhancement metrics provide full transparency." />
            <FeatureCard icon={FileText} title="Visual Report Generation" desc="Generate professional, downloadable analysis reports with charts, insights, and disclaimers." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-4xl mx-auto text-center glass-card p-10 lg:p-14">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to Explore <span className="gradient-text">Quantum Healthcare?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Launch the full Q-Dx platform and experience the future of disease risk analytics.
          </p>
          <button onClick={onLaunch} className="neon-btn neon-btn-primary text-base inline-flex items-center gap-2 group">
            Launch Q-Dx Platform
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-10 text-sm" style={{ color: 'var(--text-muted)' }}>
            Quantum Intelligence. Earlier Insights. Smarter Healthcare.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, value, suffix, label }: { icon: typeof Zap; value: number; suffix?: string; label: string }) {
  return (
    <div className="glass-card card-hover p-5 text-center">
      <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}>
        <Icon size={20} style={{ color: 'var(--accent)' }} />
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: typeof Zap; title: string; desc: string }) {
  return (
    <div className="glass-card card-hover p-6">
      <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.15), rgba(var(--accent-2-rgb),0.1))', border: '1px solid rgba(var(--accent-rgb),0.2)' }}>
        <Icon size={22} style={{ color: 'var(--accent)' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Middle ring */}
      <div className="absolute inset-8 animate-spin-reverse">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* Inner ring */}
      <div className="absolute inset-16 animate-spin-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(244,114,182,0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.2))', border: '1px solid rgba(34,211,238,0.4)' }}>
            <Atom size={36} style={{ color: 'var(--accent)' }} className="animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Orbiting nodes */}
      <OrbitingNodes />

      {/* Floating data points */}
      <FloatingDataPoints />

      {/* Neural network SVG */}
      <NeuralNetworkSVG />
    </div>
  );
}

function OrbitingNodes() {
  const nodes = [
    { icon: Activity, color: '#22d3ee', delay: '0s', r: '150px' },
    { icon: Cpu, color: '#a78bfa', delay: '-2s', r: '150px' },
    { icon: Database, color: '#f472b6', delay: '-4s', r: '150px' },
    { icon: Zap, color: '#34d399', delay: '-6s', r: '150px' },
  ];

  return (
    <>
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              '--orbit-r': node.r,
              animation: `orbit 20s linear infinite`,
              animationDelay: node.delay,
            } as React.CSSProperties}
          >
            <div className="w-10 h-10 -ml-5 -mt-5 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15,23,42,0.8)', border: `1px solid ${node.color}40`, backdropFilter: 'blur(8px)' }}>
              <Icon size={16} style={{ color: node.color }} />
            </div>
          </div>
        );
      })}
    </>
  );
}

function FloatingDataPoints() {
  const points = [
    { x: '10%', y: '20%', delay: '0s' },
    { x: '85%', y: '15%', delay: '1s' },
    { x: '15%', y: '75%', delay: '2s' },
    { x: '80%', y: '80%', delay: '0.5s' },
    { x: '50%', y: '8%', delay: '1.5s' },
    { x: '90%', y: '50%', delay: '2.5s' },
    { x: '5%', y: '50%', delay: '3s' },
    { x: '50%', y: '92%', delay: '0.8s' },
  ];

  return (
    <>
      {points.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-float"
          style={{
            left: p.x,
            top: p.y,
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
            animationDelay: p.delay,
            opacity: 0.6,
          }}
        />
      ))}
    </>
  );
}

function NeuralNetworkSVG() {
  const layers = [
    { x: 60, nodes: [80, 140, 200, 260] },
    { x: 160, nodes: [100, 180, 260] },
    { x: 260, nodes: [120, 200] },
    { x: 340, nodes: [160] },
  ];

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
      {/* Connections */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.nodes.map((y1, ni) =>
          layers[li + 1].nodes.map((y2, nj) => (
            <line
              key={`${li}-${ni}-${nj}`}
              x1={layer.x}
              y1={y1}
              x2={layers[li + 1].x}
              y2={y2}
              stroke="rgba(34,211,238,0.15)"
              strokeWidth="0.5"
            />
          ))
        )
      )}
      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.nodes.map((y, ni) => (
          <circle
            key={`${li}-${ni}`}
            cx={layer.x}
            cy={y}
            r="3"
            fill="rgba(34,211,238,0.4)"
            className="animate-blink"
            style={{ animationDelay: `${(li + ni) * 0.3}s` }}
          />
        ))
      )}
    </svg>
  );
}
