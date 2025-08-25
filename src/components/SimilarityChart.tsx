
'use client';

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, ReferenceLine } from 'recharts';

interface SimilarityChartProps {
  data: Array<Record<string, string | number>>;
}

const barColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <text x={x + width / 2} y={y - radius} fill="hsl(var(--foreground))" textAnchor="middle" dominantBaseline="middle" className="text-xs font-medium">
      {`${value}%`}
    </text>
  );
};

const CustomizedLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-4 mt-4 text-sm">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, backgroundColor: entry.color }} />
          <span>{entry.value}</span>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <div className="w-4 border-b-2 border-dashed border-destructive" />
        <span>Attention Threshold (95%)</span>
      </div>
    </div>
  );
};


export function SimilarityChart({ data }: SimilarityChartProps) {
  const scoreKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];

  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 120,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-60}
            textAnchor="end" 
            interval={0} 
            height={100}
            style={{ fontSize: '12px' }} 
            tick={{ fill: 'hsl(var(--foreground))' }}
           />
          <YAxis tick={{ fill: 'hsl(var(--foreground))' }} domain={[0, 100]}/>
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
              color: 'hsl(var(--foreground))'
            }}
            cursor={{fill: 'hsl(var(--muted))'}}
            formatter={(value: number) => `${value}%`}
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '16px' }} content={<CustomizedLegend />} />
          
          {scoreKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={barColors[index % barColors.length]}
              name={key}
              maxBarSize={30}
            >
              <LabelList dataKey={key} content={<CustomizedLabel />} />
            </Bar>
          ))}

          <ReferenceLine y={95} stroke="hsl(var(--destructive))" strokeDasharray="3 3" ifOverflow="visible" />

        </BarChart>
      </ResponsiveContainer>
  );
}
