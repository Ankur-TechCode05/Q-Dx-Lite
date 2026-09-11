import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3, TrendingUp, Target, Activity, Award, PieChart as PieChartIcon } from 'lucide-react';
import { riskDistribution, diseaseDistribution, predictionTrends, featureImportanceData, mlModels } from '@/data/mockData';

export function AnalyticsPage() {
  const modelPerfData = mlModels.map((m) => ({ name: m.shortName, accuracy: m.accuracy, f1: m.f1 }));

  const radialData = [
    { name: 'Low', value: 35, fill: '#34d399' },
    { name: 'Moderate', value: 30, fill: '#fbbf24' },
    { name: 'High', value: 25, fill: '#f87171' },
    { name: 'Very High', value: 10, fill: '#dc2626' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Comprehensive analytics dashboard with real-time visualizations</p>
      </div>

      {/* Row 1: Risk distribution + Disease distribution */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Risk Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Disease Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={diseaseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={3} label={(e: any) => e.name ?? ''}>
                {diseaseDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Prediction trends + Model performance */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Prediction Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionTrends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="low" name="Low Risk" stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="moderate" name="Moderate" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="high" name="High Risk" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="veryHigh" name="Very High" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Model Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={modelPerfData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="an-bar1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0.2} /></linearGradient>
                <linearGradient id="an-bar2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} /><stop offset="100%" stopColor="#a78bfa" stopOpacity={0.2} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="accuracy" name="Accuracy" fill="url(#an-bar1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" name="F1 Score" fill="url(#an-bar2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Feature importance + Radial */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Feature Importance</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={featureImportanceData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 0 }}>
              <defs>
                <linearGradient id="fi-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--accent)" stopOpacity={0.9} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="feature" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Bar dataKey="importance" fill="url(#fi-bar)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Risk Radial Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart data={radialData} cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={6} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4: Area chart */}
      <div className="glass-card card-hover p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Cumulative Analysis Volume</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={predictionTrends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cum-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--accent)" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            <Area type="monotone" dataKey="low" stackId="1" stroke="#34d399" strokeWidth={1} fill="#34d39920" />
            <Area type="monotone" dataKey="moderate" stackId="1" stroke="#fbbf24" strokeWidth={1} fill="#fbbf2420" />
            <Area type="monotone" dataKey="high" stackId="1" stroke="#f87171" strokeWidth={1} fill="#f8717120" />
            <Area type="monotone" dataKey="veryHigh" stackId="1" stroke="#dc2626" strokeWidth={1} fill="#dc262620" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
