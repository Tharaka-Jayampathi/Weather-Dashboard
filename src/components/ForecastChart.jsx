import { WiThermometer } from 'react-icons/wi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 border-t border-indigo-50/50">
      <div className="bg-white/90 p-6 sm:p-8 rounded-3xl flex flex-col shadow-lg border border-indigo-50 transition-all hover:shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center z-10">
          <span className="bg-indigo-100/80 text-indigo-600 p-2 border border-indigo-200/50 rounded-xl mr-3 shadow-sm">
            <WiThermometer className="h-6 w-6" />
          </span>
          24-Hour Forecast
        </h3>
        <div className="w-full z-10 h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={forecastData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#9ca3af"
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                tickMargin={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(val) => `${val}°`}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '12px 16px',
                  backdropFilter: 'blur(8px)'
                }}
                itemStyle={{ color: '#4f46e5', fontWeight: '800', fontSize: '16px' }}
                labelStyle={{ color: '#6b7280', marginBottom: '4px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                formatter={(value) => [`${value}°C`, 'Temperature']}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#6366f1"
                strokeWidth={4}
                dot={{ r: 5, strokeWidth: 2, fill: '#ffffff', stroke: '#6366f1' }}
                activeDot={{ r: 7, strokeWidth: 0, fill: '#4f46e5' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
