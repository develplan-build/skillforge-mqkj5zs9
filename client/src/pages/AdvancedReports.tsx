import React from 'react'
import { BarChart3, TrendingUp, Users, CreditCard } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export default function AdvancedReports() {
  const salesData = [
    { name: 'Gen', vendite: 4000, rimborsi: 240 },
    { name: 'Feb', vendite: 3000, rimborsi: 139 },
    { name: 'Mar', vendite: 2000, rimborsi: 980 },
    { name: 'Apr', vendite: 2780, rimborsi: 390 },
    { name: 'Mag', vendite: 1890, rimborsi: 480 },
    { name: 'Giu', vendite: 2390, rimborsi: 380 },
  ]

  const engagementData = [
    { name: 'Lun', attivi: 120 },
    { name: 'Mar', attivi: 132 },
    { name: 'Mer', attivi: 101 },
    { name: 'Gio', attivi: 143 },
    { name: 'Ven', attivi: 90 },
    { name: 'Sab', attivi: 45 },
    { name: 'Dom', attivi: 56 },
  ]

  const courseData = [
    { name: 'React', value: 400 },
    { name: 'Node.js', value: 300 },
    { name: 'Python', value: 300 },
    { name: 'Design', value: 200 },
  ]

  const COLORS = ['#fb00ff', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Report Avanzati</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Analisi dettagliata delle performance della piattaforma.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} color="var(--accent)" /> Vendite vs Rimborsi
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }} />
                <Bar dataKey="vendite" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rimborsi" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="var(--info)" /> Engagement Settimanale
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }} />
                <Line type="monotone" dataKey="attivi" stroke="var(--info)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={20} color="var(--warning)" /> Distribuzione Iscritti per Corso
        </h3>
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {courseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}