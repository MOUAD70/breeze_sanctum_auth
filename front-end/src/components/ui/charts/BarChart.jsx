import React, { useState } from "react";
import { BarChart as ReChartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const sampleData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 56 },
  { name: 'Jun', value: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-card-foreground">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs">
              <span className="font-medium">{entry.name}: </span>
              <span>{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BarChart({ 
  data = sampleData, 
  xKey = "name", 
  yKey = "value", 
  color = "rgb(7, 89, 133)", // sky-800 color in RGB
  hideLabel = false,
  accessibilityLayer = true
}) {
  const [hoveredBar, setHoveredBar] = useState(null);
  
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
    >
      <ResponsiveContainer width="100%" height={300}>
        <ReChartsBar
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" horizontal={true} vertical={false} />
          <XAxis 
            dataKey={xKey} 
            className="text-muted-foreground" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value}
          />
          <YAxis 
            className="text-muted-foreground" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={false}
          />
          <Bar 
            dataKey={yKey} 
            name="USERS"
            fill={color}
            radius={8} 
            animationDuration={1500}
            animationEasing="ease-out"
            onMouseEnter={(data, index) => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {data.map((entry, index) => (
              <motion.rect 
                key={`bar-${index}`}
                fill={hoveredBar === index ? 'rgb(3, 105, 161)' : color} // Slightly lighter on hover
                animate={{ 
                  fill: hoveredBar === index ? 'rgb(3, 105, 161)' : color,
                  scale: hoveredBar === index ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </Bar>
        </ReChartsBar>
      </ResponsiveContainer>
    </motion.div>
  );
}