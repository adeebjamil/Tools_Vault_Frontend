"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Particle component for orbiting dots
function OrbitingParticle({ 
  delay, 
  duration, 
  radius, 
  size, 
  color,
  reverse = false,
  tilt = 0
}: { 
  delay: number; 
  duration: number; 
  radius: number; 
  size: number; 
  color: string;
  reverse?: boolean;
  tilt?: number;
}) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className="absolute inset-0"
      style={{ 
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt}deg)`,
      }}
    >
      <div 
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
          top: "50%",
          left: "50%",
          transform: `translateX(-50%) translateY(-50%) translateX(${radius}px)`,
        }}
      />
    </motion.div>
  );
}

// Connection line component
function ConnectionLine({ 
  angle, 
  length, 
  delay 
}: { 
  angle: number; 
  length: number; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 origin-left"
      style={{
        width: length,
        height: 1,
        background: `linear-gradient(90deg, rgba(6, 182, 212, 0.8) 0%, transparent 100%)`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 80 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    radius: 200 + Math.random() * 150,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    tilt: Math.random() * 60 - 30,
    reverse: Math.random() > 0.5,
    color: ['#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 4)],
  }));

  // Generate connection lines
  const lines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30,
    length: 150 + Math.random() * 100,
    delay: i * 0.5,
  }));

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Deep space background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px]" 
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[150px]" 
        />
      </div>

      {/* Main 3D container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Outer orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-cyan-500/20 rounded-full"
          style={{ transform: "rotateX(75deg)" }}
        />
        
        {/* Middle orbit ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-purple-500/30 rounded-full"
          style={{ transform: "rotateX(75deg) rotateZ(30deg)" }}
        />
        
        {/* Inner orbit ring with glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
          style={{ 
            transform: "rotateX(75deg) rotateZ(-15deg)",
            border: "2px solid rgba(6, 182, 212, 0.4)",
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.1)"
          }}
        />

        {/* Connection lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {lines.map((line) => (
            <ConnectionLine key={line.id} {...line} />
          ))}
        </div>

        {/* Main globe/sphere */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          {/* Floating animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Globe glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-[380px] h-[380px] rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                  boxShadow: `
                    0 0 80px rgba(6, 182, 212, 0.4),
                    0 0 120px rgba(139, 92, 246, 0.2),
                    inset 0 0 60px rgba(6, 182, 212, 0.2)
                  `,
                }}
              />
            </div>
            
            {/* Hero image (your dodecahedron) */}
            <div className="relative z-10 flex items-center justify-center">
              <Image 
                src="/hero.png" 
                alt="3D Hero Element" 
                width={380} 
                height={380} 
                className="drop-shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                style={{
                  filter: "brightness(1.1) contrast(1.05)",
                }}
                priority
              />
            </div>

            {/* Rim light effect */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div 
                className="w-[390px] h-[390px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.6) 10%, transparent 20%, transparent 50%, rgba(139, 92, 246, 0.4) 60%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {particles.map((particle) => (
            <OrbitingParticle key={particle.id} {...particle} />
          ))}
        </div>

        {/* Floating nodes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 250 + Math.random() * 50;
          return (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="absolute w-3 h-3 bg-cyan-400 rounded-full"
              style={{
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
              }}
            />
          );
        })}

        {/* Network connection dots */}
        {[...Array(20)].map((_, i) => {
          const x = (Math.random() - 0.5) * 500;
          const y = (Math.random() - 0.5) * 500;
          return (
            <motion.div
              key={`node-${i}`}
              animate={{ 
                opacity: [0, 0.6, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.6)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Foreground particles */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-32 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
        style={{ boxShadow: "0 0 15px rgba(6, 182, 212, 0.8)" }}
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-50"
        style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)" }}
      />
    </div>
  );
}
