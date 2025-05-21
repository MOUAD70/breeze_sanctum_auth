import React, { useState } from "react";
import {
  PieChart as ReChartsPie,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const sampleData = [
  { name: "Hospital", value: 35 },
  { name: "Mall", value: 25 },
  { name: "Office", value: 30 },
  { name: "Other", value: 10 },
];

// Updated colors to use CSS variables for consistency
const defaultColors = {
  Hospital: "var(--chart-1)",
  Mall: "var(--chart-2)",
  Office: "var(--chart-3)",
  Other: "var(--chart-4)",
  High: "var(--destructive)",
  Medium: "var(--chart-2)", // Changed from white to chart-2 color
  Low: "var(--chart-3)"
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4 text-card-foreground backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.payload.fill }}></div>
          <p className="text-sm font-medium">{data.name}</p>
        </div>
        <p className="text-xs mt-1">
          <span className="font-medium">Types: </span>
          <span className="font-semibold">{data.value}</span>
        </p>
      </motion.div>
    );
  }
  return null;
};

export function PieChart({
  data = sampleData,
  colors = defaultColors,
  height = 300,
  animate = true
}) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
      percent
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy - 15}
          dy={8}
          textAnchor="middle"
          fill="currentColor"
          className="text-lg font-medium"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy + 10}
          dy={8}
          textAnchor="middle"
          fill="currentColor"
          className="text-xl font-bold"
        >
          {value}
        </text>
        <text
          x={cx}
          y={cy + 30}
          dy={8}
          textAnchor="middle"
          fill="currentColor"
          className="text-xs opacity-75"
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 12}
          fill={fill}
        />
      </g>
    );
  };

  const getColor = (entry) => {
    return colors[entry.name] || defaultColors[entry.name] || "var(--primary)";
  };

  const CustomLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <motion.li 
            key={`legend-${index}`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
              activeIndex === index 
                ? 'bg-background shadow-sm border border-border' 
                : 'bg-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveIndex(index)}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className={`text-xs ${activeIndex === index ? 'font-bold' : 'font-medium'}`}>
              {entry.value}
            </span>
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div 
      className="w-full h-full relative"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute top-0 left-0 right-0 z-10 text-center py-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm shadow-sm border border-border">
              {data[activeIndex]?.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <ResponsiveContainer width="100%" height={height}>
        <ReChartsPie>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={isHovered ? 85 : 80}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onClick={(_, index) => setActiveIndex(index)}
            animationDuration={animate ? 1500 : 0}
            animationEasing="ease-out"
            stroke="var(--background)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={getColor(entry)}
                style={{
                  filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0,0,0,0.3))' : 'none',
                }}
              />
            ))}
          </Pie>
          <Legend content={<CustomLegend />} />
          <Tooltip content={<CustomTooltip />} />
        </ReChartsPie>
      </ResponsiveContainer>
    </motion.div>
  );
}