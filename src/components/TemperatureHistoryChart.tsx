import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DailyWeather } from '../types/weather';

interface TemperatureHistoryChartProps {
  dailyData: DailyWeather;
}

interface ChartData {
  day: string;
  max: number;
  min: number;
}

export function TemperatureHistoryChart({ dailyData }: TemperatureHistoryChartProps) {
  const chartData: ChartData[] = dailyData.time.map((date, index) => {
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
    
    return {
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      max: Math.round(dailyData.temperature_2m_max[index]),
      min: Math.round(dailyData.temperature_2m_min[index])
    };
  });

  return (
    <div className="temperature-history-chart">
      <h3>Histórico de Temperatura - Últimos 7 Dias</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              color: '#1e293b'
            }}
            formatter={(value: number) => [`${value}°C`, '']}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '1rem' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="max" 
            stroke="#f97316" 
            strokeWidth={2}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Máxima"
          />
          <Line 
            type="monotone" 
            dataKey="min" 
            stroke="#06b6d4" 
            strokeWidth={2}
            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Mínima"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
