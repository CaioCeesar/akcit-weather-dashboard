import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DailyWeather } from '../types/weather';

interface RainHistoryChartProps {
  dailyData: DailyWeather;
}

interface ChartData {
  day: string;
  precipitation: number;
}

export function RainHistoryChart({ dailyData }: RainHistoryChartProps) {
  const chartData: ChartData[] = dailyData.time.map((date, index) => {
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
    
    return {
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      precipitation: Math.round(dailyData.precipitation_sum[index] * 10) / 10
    };
  });

  return (
    <div className="rain-history-chart">
      <h3>Histórico de Chuva - Últimos 7 Dias</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: 'Precipitação (mm)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              color: '#1e293b'
            }}
            formatter={(value: number) => [`${value} mm`, 'Precipitação']}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '1rem' }}
            iconType="rect"
          />
          <Bar 
            dataKey="precipitation" 
            fill="#06b6d4" 
            name="Precipitação"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
