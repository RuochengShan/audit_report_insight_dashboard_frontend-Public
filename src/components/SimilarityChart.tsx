
'use client';

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SimilarityChartProps {
  data: { name: string; score: number }[];
}

export function SimilarityChart({ data }: SimilarityChartProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 75,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '16px' }}/>
          <Bar dataKey="score" fill="hsl(var(--primary))" name="Similarity Score (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
