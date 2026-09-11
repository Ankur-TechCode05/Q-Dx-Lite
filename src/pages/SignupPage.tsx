import { useState, useEffect } from 'react';
import { Zap, Mail, Lock, ArrowRight, ArrowLeft, Loader2, Eye, EyeOff, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

interface SignupPageProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onBack, onSwitchToLogin }: SignupPageProps) {
  const { signUp } = useAuth();
  const { notify } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password, confirmPassword]);

  const passwordChecks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Contains a number', ok: /[0-9]/.test(password) },
    { label: 'Contains uppercase letter', ok: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      notify(error, 'error');
    } else {
      notify('Account created! Welcome to Q-Dx.', 'success');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      {/* Grid pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" style={{ zIndex: 0 }} />

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-15 animate-float" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] rounded-full opacity-10 animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-sm transition-smooth hover:opacity-80"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md px-6 animate-scale-in">
        <div className="glass-card p-8 lg:p-10" style={{ boxShadow: '0 0 60px rgba(var(--accent-rgb),0.1)' }}>
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-2xl animate-pulse-glow" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(34,211,238,0.2))' }} />
              <Zap size={32} style={{ color: 'var(--accent)' }} className="relative z-10" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Q-Dx</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Quantum ML Platform</p>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(var(--accent-2-rgb), 0.08)', border: '1px solid rgba(var(--accent-2-rgb), 0.3)' }}>
            <Sparkles size={12} style={{ color: 'var(--accent-2)' }} />
            <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--accent-2)' }}>CREATE ACCOUNT</span>
          </div>

          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Join Q-Dx</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Create your account to start analyzing with quantum ML</p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm animate-fade-in" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-smooth"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-smooth"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl text-sm transition-smooth"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-smooth hover:opacity-80"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password strength indicators */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1 animate-fade-in">
                  {passwordChecks.map((check) => (
                    <div key={check.label} className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} style={{ color: check.ok ? '#34d399' : 'var(--text-muted)' }} />
                      <span className="text-xs" style={{ color: check.ok ? '#34d399' : 'var(--text-muted)' }}>{check.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-smooth"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="neon-btn neon-btn-primary w-full flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border-glow)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-glow)' }} />
          </div>

          {/* Switch to login */}
          <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-semibold transition-smooth hover:opacity-80" style={{ color: 'var(--accent)' }}>
              Sign in
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Sparkles size={12} style={{ color: 'var(--text-muted)' }} />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Quantum Intelligence. Earlier Insights. Smarter Healthcare.</p>
        </div>
      </div>
    </div>
  );
}
