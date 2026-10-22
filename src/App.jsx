import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  Users, 
  UserX, 
  GraduationCap, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  Calendar
} from 'lucide-react';

// Datos inyectados
const studentData = {
  states: [
    { name: "Hidalgo", value: 1496 },
    { name: "Estado de México", value: 86 },
    { name: "Ciudad de México", value: 37 },
    { name: "Veracruz", value: 9 },
    { name: "Puebla", value: 8 },
    { name: "Otros", value: 49 }
  ],
  cities: [
    { name: "Pachuca de Soto", value: 407 },
    { name: "Mineral de la Reforma", value: 241 },
    { name: "Zempoala", value: 72 },
    { name: "Tulancingo", value: 52 },
    { name: "Tizayuca", value: 52 },
    { name: "Tula de Allende", value: 43 },
    { name: "Ixmiquilpan", value: 40 },
    { name: "Actopan", value: 40 }
  ],
  status: [
    { name: "Baja Definitiva", value: 1444 },
    { name: "Titulado", value: 404 },
    { name: "Regular", value: 371 },
    { name: "Egresado", value: 195 },
    { name: "Irregular", value: 155 },
    { name: "Baja Temporal", value: 134 }
  ],
  progress: [
    { name: "0-20%", alumnos: 2001 },
    { name: "21-40%", alumnos: 210 },
    { name: "41-60%", alumnos: 492 },
    { name: "61-80%", alumnos: 0 },
    { name: "81-100%", alumnos: 0 }
  ]
};

const historicalData = [
  {"short_name": "Ene-Abr 18", "Activos": 429, "Bajas": 0, "Egresados": 0},
  {"short_name": "May-Ago 18", "Activos": 262, "Bajas": 108, "Egresados": 0},
  {"short_name": "Sep-Dic 18", "Activos": 431, "Bajas": 44, "Egresados": 0},
  {"short_name": "Ene-Abr 19", "Activos": 427, "Bajas": 22, "Egresados": 0},
  {"short_name": "May-Ago 19", "Activos": 347, "Bajas": 162, "Egresados": 0},
  {"short_name": "Sep-Dic 19", "Activos": 537, "Bajas": 39, "Egresados": 0},
  {"short_name": "Ene-Abr 20", "Activos": 529, "Bajas": 96, "Egresados": 13},
  {"short_name": "May-Ago 20", "Activos": 450, "Bajas": 59, "Egresados": 13},
  {"short_name": "Sep-Dic 20", "Activos": 582, "Bajas": 18, "Egresados": 6},
  {"short_name": "Ene-Abr 21", "Activos": 613, "Bajas": 35, "Egresados": 10},
  {"short_name": "May-Ago 21", "Activos": 481, "Bajas": 63, "Egresados": 71},
  {"short_name": "Sep-Dic 21", "Activos": 633, "Bajas": 21, "Egresados": 73},
  {"short_name": "Ene-Abr 22", "Activos": 661, "Bajas": 59, "Egresados": 61},
  {"short_name": "May-Ago 22", "Activos": 533, "Bajas": 51, "Egresados": 44},
  {"short_name": "Sep-Dic 22", "Activos": 667, "Bajas": 41, "Egresados": 25},
  {"short_name": "Ene-Abr 23", "Activos": 634, "Bajas": 54, "Egresados": 23},
  {"short_name": "May-Ago 23", "Activos": 497, "Bajas": 56, "Egresados": 61},
  {"short_name": "Sep-Dic 23", "Activos": 617, "Bajas": 66, "Egresados": 42},
  {"short_name": "Ene-Abr 24", "Activos": 618, "Bajas": 38, "Egresados": 31},
  {"short_name": "May-Ago 24", "Activos": 526, "Bajas": 37, "Egresados": 36},
  {"short_name": "Sep-Dic 24", "Activos": 598, "Bajas": 55, "Egresados": 47},
  {"short_name": "Ene-Abr 25", "Activos": 661, "Bajas": 86, "Egresados": 37},
  {"short_name": "May-Ago 25", "Activos": 631, "Bajas": 88, "Egresados": 50},
  {"short_name": "Sep-Dic 25", "Activos": 721, "Bajas": 73, "Egresados": 62},
  {"short_name": "Ene-Abr 26", "Activos": 711, "Bajas": 23, "Egresados": 134},
  {"short_name": "May-Ago 26", "Activos": 642, "Bajas": 15, "Egresados": 20},
  {"short_name": "Sep-Dic 26", "Activos": 689, "Bajas": 9, "Egresados": 117}
];

// Paletas de colores
const STATE_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#94a3b8'];
const STATUS_COLORS = {
  "Baja Definitiva": "#ef4444", // Rojo para contexto de alerta
  "Titulado": "#10b981",       // Esmeralda
  "Regular": "#3b82f6",        // Azul
  "Egresado": "#6366f1",       // Indigo
  "Irregular": "#f59e0b",      // Ambar
  "Baja Temporal": "#f43f5e"   // Rosa/Rojo claro
};

// Componente Tarjeta de Resumen (KPI)
const KpiCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-full ${colorClass}`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  </div>
);

// Componente Contenedor de Gráficas
const ChartCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-96">
    <div className="flex items-center space-x-2 mb-6 border-b border-slate-100 pb-4">
      {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
      <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
    </div>
    <div className="flex-grow w-full">
      {children}
    </div>
  </div>
);

export default function Dashboard() {
  const totalStudents = studentData.status.reduce((acc, curr) => acc + curr.value, 0);
  const totalBajas = studentData.status.find(s => s.name === "Baja Definitiva")?.value || 0;
  const hidalgoStudents = studentData.states.find(s => s.name === "Hidalgo")?.value || 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
          Dashboard de Analítica Estudiantil
        </h1>
        <p className="text-slate-500 mt-2">
          Análisis de residencia y avance académico basado en los registros oficiales.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Total Alumnos Analizados" 
          value={totalStudents.toLocaleString()} 
          icon={Users}
          colorClass="bg-blue-500 shadow-blue-200 shadow-lg"
        />
        <KpiCard 
          title="Estatus Mayoritario" 
          value="Baja Definitiva" 
          subtitle={`${((totalBajas/totalStudents)*100).toFixed(1)}% del total`}
          icon={UserX}
          colorClass="bg-red-500 shadow-red-200 shadow-lg"
        />
        <KpiCard 
          title="Concentración (Hidalgo)" 
          value={`${((hidalgoStudents/totalStudents)*100).toFixed(1)}%`} 
          subtitle={`${hidalgoStudents} alumnos residentes`}
          icon={MapPin}
          colorClass="bg-indigo-500 shadow-indigo-200 shadow-lg"
        />
        <KpiCard 
          title="Alumnos Titulados" 
          value={studentData.status.find(s => s.name === "Titulado")?.value || 0} 
          subtitle="Casos de éxito académico"
          icon={GraduationCap}
          colorClass="bg-emerald-500 shadow-emerald-200 shadow-lg"
        />
      </div>

      {/* Sección 1: Residencia */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 mt-12 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-slate-400" />
        Geografía y Residencia
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distribución por Estado (Donut) */}
        <ChartCard title="Distribución por Estado" icon={PieChart}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={studentData.states}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
              >
                {studentData.states.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATE_COLORS[index % STATE_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`${value} alumnos`, 'Cantidad']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Municipios (BarChart Horizontal) */}
        <ChartCard title="Top 8 Municipios de Residencia" icon={MapPin}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={studentData.cities}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" textAnchor="end" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#475569', fontSize: 12 }} width={110} />
              <RechartsTooltip 
                cursor={{fill: '#f1f5f9'}}
                formatter={(value) => [`${value} alumnos`, 'Residentes']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]}>
                {
                  studentData.cities.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#818cf8'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Sección 2: Rendimiento y Avance */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 mt-12 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-slate-400" />
        Rendimiento y Avance Académico
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        
        {/* Avance Académico (BarChart Vertical) */}
        <ChartCard title="Distribución de Avance Académico" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={studentData.progress}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 13 }} dy={10} />
              <YAxis tick={{ fill: '#64748b', fontSize: 13 }} />
              <RechartsTooltip 
                cursor={{fill: '#f1f5f9'}}
                formatter={(value) => [`${value} alumnos`, 'Total']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="alumnos" fill="#10b981" radius={[4, 4, 0, 0]}>
                {
                   studentData.progress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === '0-20%' ? '#0ea5e9' : '#10b981'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Estatus de los Alumnos (Area/Donut Adaptado a Pie) */}
        <ChartCard title="Estatus General del Alumnado" icon={AlertTriangle}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={studentData.status}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => percent > 0.04 ? `${(percent * 100).toFixed(0)}%` : ''}
              >
                {studentData.status.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#cbd5e1'} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`${value} alumnos`, 'Cantidad']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: '12px', paddingLeft: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* Sección 3: Evolución Histórica */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 mt-4 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-slate-400" />
        Evolución Histórica Cuatrimestral
      </h2>
      <div className="pb-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col" style={{ height: '480px' }}>
          <div className="flex items-center space-x-2 mb-8 border-b border-slate-100 pb-4">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-slate-700">Tendencia de Activos, Bajas y Egresados (2018 - 2026)</h2>
          </div>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="colorActivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBajas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgresados" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="short_name" 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  angle={-45} 
                  textAnchor="end" 
                  dy={15} 
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px' }} />
                <Area type="monotone" dataKey="Activos" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorActivos)" />
                <Area type="monotone" dataKey="Egresados" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEgresados)" />
                <Area type="monotone" dataKey="Bajas" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBajas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
