"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Category = "Example" | "Length" | "Weight" | "Temperature" | "Area" | "Speed" | "Time";

const CONVERSION_RATES: Record<string, Record<string, number>> = {
  Length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Mile: 1609.34,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
  },
  Weight: {
    Kilogram: 1,
    Gram: 0.001,
    Milligram: 0.000001,
    Pound: 0.453592,
    Ounce: 0.0283495,
    Ton: 1000,
  },
  Area: {
    "Square Meter": 1,
    "Square Kilometer": 1000000,
    "Square Foot": 0.092903,
    "Square Yard": 0.836127,
    "Acre": 4046.86,
    "Hectare": 10000,
  },
  Speed: {
    "Meters per Second": 1,
    "Kilometers per Hour": 0.277778,
    "Miles per Hour": 0.44704,
    "Knot": 0.514444,
  },
  Time: {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
    Year: 31536000,
  }
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Foot");
  const [inputValue, setInputValue] = useState<number | string>(1);
  const [result, setResult] = useState<number | string>("");

  useEffect(() => {
    // Set defaults when category changes
    if (category === "Temperature") {
        setFromUnit("Celsius");
        setToUnit("Fahrenheit");
    } else {
        const units = Object.keys(CONVERSION_RATES[category]);
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
    }
  }, [category]);

  const convert = (val: number) => {
    if (category === "Temperature") {
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") return (val * 9/5) + 32;
      if (fromUnit === "Fahrenheit" && toUnit === "Celsius") return (val - 32) * 5/9;
      if (fromUnit === "Celsius" && toUnit === "Kelvin") return val + 273.15;
      if (fromUnit === "Kelvin" && toUnit === "Celsius") return val - 273.15;
      if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") return (val - 32) * 5/9 + 273.15;
      if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") return (val - 273.15) * 9/5 + 32;
      return val;
    }

    const rates = CONVERSION_RATES[category];
    if (!rates) return val;
    
    // Convert to base
    const baseValue = val * rates[fromUnit];
    // Convert from base to target
    return baseValue / rates[toUnit];
  };

  useEffect(() => {
    if (inputValue === "") {
        setResult("");
        return;
    }
    const val = Number(inputValue);
    if (!isNaN(val)) {
        const res = convert(val);
        setResult(Number(res.toFixed(6))); // Trim precision
    }
  }, [inputValue, fromUnit, toUnit, category]);

  const units = category === "Temperature" 
    ? ["Celsius", "Fahrenheit", "Kelvin"] 
    : Object.keys(CONVERSION_RATES[category] || {});

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Unit Converter</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Universal Unit Converter</h1>
              <p className="text-gray-400">Convert between measurement systems instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["Length", "Weight", "Temperature", "Area", "Speed", "Time"].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat as Category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        category === cat
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* From */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <label className="text-sm font-medium text-gray-400 mb-4 block">From</label>
                <div className="space-y-4">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-3xl text-white focus:border-blue-500 focus:outline-none"
                    />
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none"
                    >
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

            {/* To */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative">
                 {/* Swap Button (Decor only for now) */}
                 <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-[#0F1115] z-10 hidden lg:flex">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </div>

                <label className="text-sm font-medium text-gray-400 mb-4 block">To</label>
                <div className="space-y-4">
                    <div className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-3xl text-blue-400 font-bold overflow-hidden">
                        {result}
                    </div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none"
                    >
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

        </div>
      </div>
      </section>
    </>
  );
}
