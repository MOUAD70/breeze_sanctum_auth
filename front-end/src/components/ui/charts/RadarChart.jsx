import React, { useState } from "react";
import { RadarChart as ReChartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const sampleData = [
  { name: 'Security', value: 80 },
  { name: 'Response', value: 65 },
  { name: 'Training', value: 90 },
  { name: 'Equipment', value: 70 },
  { name: 'Protocols', value: 85 },
  { name: 'Staffing', value: 60 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-card-foreground">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
          <p className="text-sm font-medium">{data.name}</p>
        </div>
        <p className="text-xs mt-1">
          <span className="font-medium">Score: </span>
          <span>{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function RadarChart({ data = sampleData, dataKey = "value" }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="w-full h-full"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ReChartsRadar 
          cx="50%" 
          cy="50%" 
          outerRadius="80%" 
          data={data}
        >
          <PolarGrid className="stroke-muted" />
          <PolarAngleAxis 
            dataKey="name" 
            className="text-muted-foreground" 
            tick={{ 
              fontSize: 12,
              fontWeight: 500,
              fill: 'var(--foreground)'
            }} 
          />
          <PolarRadiusAxis 
            className="text-muted-foreground" 
            tick={{ 
              fontSize: 10,
              fill: 'var(--muted-foreground)'
            }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar 
            name="Data" 
            dataKey={dataKey} 
            stroke="var(--primary)" 
            fill="var(--primary)" 
            fillOpacity={isHovered ? 0.7 : 0.6}
            strokeWidth={isHovered ? 2 : 1}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </ReChartsRadar>
      </ResponsiveContainer>
    </motion.div>
  );
}