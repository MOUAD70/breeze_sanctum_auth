import React, { useState } from "react";
import { AreaChart as ReChartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const sampleData = [
  { name: 'Jan', value: 40, secondValue: 24 },
  { name: 'Feb', value: 30, secondValue: 13 },
  { name: 'Mar', value: 45, secondValue: 20 },
  { name: 'Apr', value: 50, secondValue: 32 },
  { name: 'May', value: 35, secondValue: 18 },
  { name: 'Jun', value: 55, secondValue: 27 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-card-foreground backdrop-blur-sm">
        <p className="font-medium text-sm mb-2 border-b pb-1 border-border">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs">
              <span className="font-medium">{entry.name}: </span>
              <span className="font-semibold">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AreaChart({ 
  data = sampleData, 
  areaKey = "value", 
  secondAreaKey = "secondValue",
  color = "var(--primary)",
  secondColor = "var(--destructive)",
  name = "Value",
  secondName = "Second Value",
  stacked = false,
  showSecondArea = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full h-full"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ReChartsArea
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
            {showSecondArea && (
              <linearGradient id="secondColorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={secondColor} stopOpacity={0.1}/>
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
          <XAxis 
            dataKey="name" 
            className="text-muted-foreground" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            dy={10}
            tickFormatter={val => val.slice(0,3)}
          />
          <YAxis 
            className="text-muted-foreground" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend 
            verticalAlign="top"
            height={36}
            formatter={(value) => <span className="text-xs font-medium">{value}</span>}
          />
          
          {showSecondArea && (
            <Area 
              type="natural" 
              dataKey={secondAreaKey} 
              name={secondName}
              stroke={secondColor} 
              strokeWidth={isHovered ? 3 : 2}
              fillOpacity={0.4} 
              fill="url(#secondColorGradient)" 
              animationDuration={1500}
              animationEasing="ease-out"
              stackId={stacked ? "a" : undefined}
              dot={{ 
                r: 4,
                strokeWidth: 2,
                fill: 'var(--background)',
                stroke: secondColor
              }}
              activeDot={{ 
                r: 8, 
                stroke: 'var(--background)',
                strokeWidth: 2,
                fill: secondColor
              }}
            />
          )}
          
          <Area 
            type="natural" 
            dataKey={areaKey} 
            name="Attendances"
            stroke={color} 
            strokeWidth={isHovered ? 3 : 2}
            fillOpacity={0.4} 
            fill="url(#colorGradient)" 
            animationDuration={1500}
            animationEasing="ease-out"
            stackId={stacked ? "a" : undefined}
            dot={{ 
              r: 4,
              strokeWidth: 2,
              fill: 'var(--background)',
              stroke: color
            }}
            activeDot={{ 
              r: 8, 
              stroke: 'var(--background)',
              strokeWidth: 2,
              fill: color
            }}
          />
        </ReChartsArea>
      </ResponsiveContainer>
    </motion.div>
  );
}