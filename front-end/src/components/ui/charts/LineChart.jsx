import React, { useState, useEffect, useRef } from "react";
import { LineChart as ReChartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const sampleData = [
  { name: 'Jan', value: 40, secondValue: 24 },
  { name: 'Feb', value: 30, secondValue: 13 },
  { name: 'Mar', value: 45, secondValue: 20 },
  { name: 'Apr', value: 50, secondValue: 32 },
  { name: 'May', value: 35, secondValue: 18 },
  { name: 'Jun', value: 55, secondValue: 27 },
];

// Define severity colors
const severityColors = {
  High: "var(--destructive)",
  Medium: "var(--chart-2)",
  Low: "var(--chart-3)"
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-lg shadow-lg p-3 text-card-foreground backdrop-blur-sm"
      >
        <p className="font-semibold text-sm mb-2 border-b pb-1 border-border">{label}</p>
        {payload.map((entry, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-2 mb-1.5"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs">
              <span className="font-medium">{entry.name}: </span>
              <span className="font-semibold">{entry.value}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }
  return null;
};

export function LineChart({ 
  data = sampleData, 
  lines = [{ key: "value", color: "var(--primary)", name: "Primary" }],
  showAverage = false,
  showGrid = true,
  height = 300,
  animate = true,
  className = ""
}) {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [isChartReady, setIsChartReady] = useState(false);
  const chartRef = useRef(null);
  
  // Calculate average values for each line if showAverage is true
  const averages = showAverage ? lines.map(line => ({
    key: line.key,
    value: data.reduce((sum, item) => sum + (item[line.key] || 0), 0) / data.length,
    color: line.color
  })) : [];

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

  // Animate in the chart after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Get current and average values for the first line
  const currentValue = data.length > 0 ? data[data.length - 1][lines[0]?.key] : 0;
  const averageValue = data.length > 0 
    ? (data.reduce((sum, item) => sum + (item[lines[0]?.key] || 0), 0) / data.length).toFixed(1)
    : 0;

  return (
    <div className={`w-full h-full ${className}`}>
      <motion.div 
        className="w-full h-full relative"
        initial="hidden"
        animate={isChartReady ? "visible" : "hidden"}
        variants={chartVariants}
        ref={chartRef}
      >
        <ResponsiveContainer width="100%" height={height}>
          <ReChartsLine
            data={data}
            margin={{ top: 10, right: 12, left: 12, bottom: 10 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted/30" 
                vertical={false} 
              />
            )}
            <XAxis 
              dataKey="name" 
              className="text-muted-foreground" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
            
            {/* Reference lines for averages */}
            {showAverage && averages.map((avg, i) => (
              <ReferenceLine 
                key={`avg-${i}`}
                y={avg.value} 
                stroke={avg.color}
                strokeDasharray="3 3"
                strokeWidth={1.5}
                className={`${hoveredLine === i ? 'opacity-100' : 'opacity-50'}`}
              >
                <Label 
                  value={`Avg: ${avg.value.toFixed(1)}`} 
                  position="right" 
                  fill={avg.color}
                  fontSize={10}
                />
              </ReferenceLine>
            ))}

            {/* Render lines */}
            {lines.map((line, index) => (
              <Line 
                key={index}
                type="natural" 
                dataKey={line.key} 
                name={line.name || line.key}
                stroke={line.color} 
                strokeWidth={hoveredLine === index ? 3 : 2}
                dot={{ 
                  r: 4,
                  fill: 'var(--background)',
                  stroke: line.color,
                  strokeWidth: 2
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: 'var(--background)',
                  strokeWidth: 2,
                  fill: line.color
                }}
                onMouseEnter={() => setHoveredLine(index)}
                onMouseLeave={() => setHoveredLine(null)}
                animationDuration={animate ? 1500 : 0}
                animationEasing="ease-out"
                opacity={hoveredLine === null || hoveredLine === index ? 1 : 0.3}
                isAnimationActive={animate}
              />
            ))}
          </ReChartsLine>
        </ResponsiveContainer>
      </motion.div>
      
      {/* Optional footer with stats */}
      {lines.length > 0 && (
        <div className="flex-col items-start gap-2 text-sm mt-2 px-2">
          <div className="flex gap-2 font-medium leading-none">
            Current: {currentValue} 
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary"
            >
              {currentValue > averageValue ? "↑" : "↓"}
            </motion.span>
          </div>
          {showAverage && (
            <div className="leading-none text-muted-foreground mt-1">
              Average: {averageValue} over the last {data.length} months
            </div>
          )}
        </div>
      )}
    </div>
  );
}