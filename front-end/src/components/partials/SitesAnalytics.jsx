"use client"

import React, { useState, useEffect } from "react";
import { Pie, PieChart, Sector, ResponsiveContainer } from "recharts";
import SsiApi from "../../../src/services/api/SsiApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Hospital, Store, Building2, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const SitesAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChartHovered, setIsChartHovered] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getSitesAnalytics();
        setAnalytics(response.data);
      } catch (err) {
        setError("Failed to load site analytics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getPieChartData = () => {
    if (!analytics) return [];
    
    const siteTypes = {
      Hospital: { color: "#0369a1" }, 
      Mall: { color: "#0284c7" },     
      Office: { color: "#0ea5e9" },   
      Other: { color: "#38bdf8" }     
    };
    
    return Object.entries(analytics.by_type).map(([name, value]) => ({
      name,
      value,
      fill: siteTypes[name]?.color || "#7dd3fc" 
    }));
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#0c4a6e" className="text-lg font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#0c4a6e" className="text-xl font-bold">
          {value}
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

  const getSiteTypeIcon = (type) => {
    switch (type) {
      case "Hospital":
        return <Hospital className="h-5 w-5 text-sky-600" />;
      case "Mall":
        return <Store className="h-5 w-5 text-sky-600" />;
      case "Office":
        return <Building2 className="h-5 w-5 text-sky-600" />;
      default:
        return <Building className="h-5 w-5 text-sky-600" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const chartVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        duration: 0.3
      }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6,
        duration: 0.4
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardTitle className="text-xl text-gray-800">Sites Distribution</CardTitle>
            <CardDescription className="text-gray-500">
              Overview of security sites by type
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        {loading ? (
          <CardContent className="flex justify-center py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Skeleton className="h-64 w-full max-w-md" />
            </motion.div>
          </CardContent>
        ) : error ? (
          <CardContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            </motion.div>
          </CardContent>
        ) : (
          <>
            <CardContent className="pb-0">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="bg-sky-50 rounded-lg p-4 border border-sky-100 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-2">
                    <Hospital className="h-5 w-5 text-sky-600 mr-2" />
                    <span className="text-sm font-medium text-sky-800">Hospitals</span>
                  </div>
                  <div className="text-2xl font-bold text-sky-700">{analytics.by_type.Hospital}</div>
                </motion.div>
                
                <motion.div 
                  className="bg-sky-50 rounded-lg p-4 border border-sky-100 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-2">
                    <Store className="h-5 w-5 text-sky-600 mr-2" />
                    <span className="text-sm font-medium text-sky-800">Malls</span>
                  </div>
                  <div className="text-2xl font-bold text-sky-700">{analytics.by_type.Mall}</div>
                </motion.div>
                
                <motion.div 
                  className="bg-sky-50 rounded-lg p-4 border border-sky-100 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-sky-600 mr-2" />
                    <span className="text-sm font-medium text-sky-800">Offices</span>
                  </div>
                  <div className="text-2xl font-bold text-sky-700">{analytics.by_type.Office}</div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mx-auto aspect-square max-h-[300px] relative cursor-pointer"
                variants={chartVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setIsChartHovered(true)}
                onHoverEnd={() => setIsChartHovered(false)}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={getPieChartData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={isChartHovered ? 85 : 80}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      strokeWidth={2}
                      stroke="#f8fafc"
                      animationBegin={400}
                      animationDuration={1000}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {isChartHovered && (
                  <motion.div 
                    className="absolute inset-0 bg-sky-50/10 rounded-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 0.5,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                )}
              </motion.div>
            </CardContent>
            
            <motion.div
              variants={footerVariants}
              initial="hidden"
              animate="visible"
            >
              <CardFooter className="flex-col gap-2 text-sm pt-2 pb-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-2 font-medium leading-none text-sky-700">
                  <TrendingUp className="h-4 w-4" />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {analytics.created_last_month} new sites added this month
                  </motion.span>
                </div>
                <div className="leading-none text-gray-500">
                  Hover over chart segments to see details
                </div>
              </CardFooter>
            </motion.div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SitesAnalytics;