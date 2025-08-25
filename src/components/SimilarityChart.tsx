
'use client';

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SimilarityChartProps {
  data: Array<Record<string, string | number>>;
}

// A palette of visually distinct colors for the chart bars
const barColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function SimilarityChart({ data }: SimilarityChartProps) {
  // Determine the score keys dynamically from the first data item.
  // We assume all items in the data array have the same structure.
  const scoreKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];

  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 120, // Increased bottom margin for rotated labels
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-60} // Rotate labels to prevent overlap
            textAnchor="end" 
            interval={0} 
            height={100} // Allocate more space for labels
            style={{ fontSize: '12px' }} 
           />
          <YAxis />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '16px' }}/>
          
          {scoreKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={barColors[index % barColors.length]} // Cycle through colors
              name={key} // The legend will use this name
              maxBarSize={30}
            />
          ))}

        </BarChart>
      </ResponsiveContainer>
  );
}
