"use client";

import { useState } from "react";
import Link from "next/link";
import { evaluate } from "mathjs";

const buttons = [
  { label: "(", type: "op" },
  { label: ")", type: "op" },
  { label: "C", type: "action", action: "clear" },
  { label: "⌫", type: "action", action: "backspace" },
  
  { label: "sin", type: "func" },
  { label: "cos", type: "func" },
  { label: "tan", type: "func" },
  { label: "/", type: "op" },

  { label: "7", type: "num" },
  { label: "8", type: "num" },
  { label: "9", type: "num" },
  { label: "*", type: "op" },

  { label: "4", type: "num" },
  { label: "5", type: "num" },
  { label: "6", type: "num" },
  { label: "-", type: "op" },

  { label: "1", type: "num" },
  { label: "2", type: "num" },
  { label: "3", type: "num" },
  { label: "+", type: "op" },

  { label: "0", type: "num" },
  { label: ".", type: "num" },
  { label: "^", type: "op" },
  { label: "=", type: "equal" },
  
  { label: "sqrt", type: "func" },
  { label: "log", type: "func" },
  { label: "ln", type: "func" },
  { label: "pi", type: "const" },
  { label: "e", type: "const" },
];

export default function ScientificCalculatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handlePress = (btn: typeof buttons[0]) => {
    if (btn.type === "num" || btn.type === "op") {
      setInput((prev) => prev + btn.label);
    } else if (btn.type === "func") {
        setInput((prev) => prev + btn.label + "(");
    } else if (btn.type === "const") {
        setInput((prev) => prev + btn.label);
    } else if (btn.type === "action") {
      if (btn.action === "clear") {
        setInput("");
        setResult("");
      } else if (btn.action === "backspace") {
        setInput((prev) => prev.slice(0, -1));
      }
    } else if (btn.type === "equal") {
      try {
        const res = evaluate(input);
        setResult(String(res));
        setHistory((prev) => [`${input} = ${res}`, ...prev].slice(0, 5));
      } catch (e) {
        setResult("Error");
      }
    }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Scientific Calculator</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.666a2.435 2.435 0 01-1.285 4.332 2 4.436 4.436 0 012.569 8.239m-4.283-.435h7.283" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Scientific Calculator</h1>
              <p className="text-gray-400">Perform complex calculations with ease</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Calculator */}
            <div className="flex-1 max-w-lg mx-auto lg:mx-0">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
                    
                    {/* Display */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 text-right">
                        <div className="text-gray-500 text-sm h-6 mb-1 overflow-hidden">{result ? input + ' =' : ''}</div>
                        <div className="text-3xl text-white font-mono tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide h-10">
                            {result || input || "0"}
                        </div>
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-4 gap-3">
                        {buttons.map((btn, i) => (
                            <button
                                key={i}
                                onClick={() => handlePress(btn)}
                                className={`
                                    h-14 rounded-xl text-lg font-medium transition-all active:scale-95
                                    ${btn.label === "=" 
                                        ? "col-span-1 bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                        : btn.type === "num" || btn.type === "const"
                                            ? "bg-slate-800 text-white hover:bg-slate-700"
                                            : btn.type === "action"
                                                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                                : "bg-slate-800/50 text-blue-400 hover:bg-slate-800"
                                    }
                                `}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* History */}
            <div className="w-full lg:w-80">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 h-full">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Calculation History</h3>
                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <p className="text-gray-600 text-sm italic">No history yet</p>
                        ) : (
                            history.map((item, i) => (
                                <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-right">
                                    <div className="text-xs text-gray-500 mb-1">{item.split('=')[0]}</div>
                                    <div className="text-blue-400 font-mono font-bold">{item.split('=')[1]}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>
      </section>
    </>
  );
}
