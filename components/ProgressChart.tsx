
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProgressEntry } from '../types';
import { InfoIcon } from './icons';

interface ProgressChartProps {
  data: ProgressEntry[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    percentage: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
  }));
  
  const hasData = data.some(item => item.total > 0);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg h-96">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} stroke="#9ca3af" />
            <YAxis dataKey="topic" type="category" width={80} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#334155',
                color: '#f1f5f9',
                borderRadius: '0.5rem',
              }}
              formatter={(value, name, props) => {
                if (name === 'Accuracy') {
                    return [`${props.payload.correct}/${props.payload.total} (${value}%)`, 'Accuracy'];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Bar dataKey="percentage" name="Accuracy" fill="#3b82f6" background={{ fill: 'rgba(100, 116, 139, 0.2)' }} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <InfoIcon className="h-10 w-10 mb-4" />
            <h4 className="font-semibold text-lg">No Progress Yet</h4>
            <p className="text-center mt-2">Attempt some problems to see your progress here!</p>
        </div>
      )}
    </div>
  );
};
