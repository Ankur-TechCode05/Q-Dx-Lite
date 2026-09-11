export function GradientMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-2-rgb), 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full opacity-10 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-3-rgb), 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}
