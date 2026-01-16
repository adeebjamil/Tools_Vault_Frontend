"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const { monthlyPayment, totalPayment, totalInterest, yearlyData } = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    let balance = loanAmount;
    let totalInterest = 0;
    const yearlyData = [];
    
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        balance -= principalPayment;
        totalInterest += interestPayment;
        
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;

        if (i % 12 === 0) {
            yearlyData.push({
                year: i / 12,
                interest: yearInterest,
                principal: yearPrincipal,
                balance: balance > 0 ? balance : 0
            });
            yearInterest = 0;
            yearPrincipal = 0;
        }
    }

    return {
      monthlyPayment,
      totalPayment: monthlyPayment * numberOfPayments,
      totalInterest,
      yearlyData,
    };
  }, [loanAmount, interestRate, loanTerm]);

  const chartData = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: "Principal Paid",
        data: yearlyData.map(d => d.principal),
        backgroundColor: "rgb(59, 130, 246)",
        stack: 'Stack 0',
      },
      {
        label: "Interest Paid",
        data: yearlyData.map(d => d.interest),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
        stack: 'Stack 0',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: "#94a3b8" }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", maxTicksLimit: 10 }
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { color: "#94a3b8" }
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
            <span className="text-blue-400">Mortgage Calculator</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Mortgage Calculator</h1>
              <p className="text-gray-400">Estimate monthly payments and loan amortization</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-6">
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Loan Amount ($)</label>
                             <input 
                                type="number" 
                                value={loanAmount} 
                                onChange={(e) => setLoanAmount(Number(e.target.value))} 
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                             />
                        </div>

                         <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Interest Rate (%)</label>
                             <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    value={interestRate} 
                                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                />
                                <input 
                                    type="range"
                                    min="0.1"
                                    max="15"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hidden sm:block"
                                />
                             </div>
                        </div>

                         <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Loan Term (Years)</label>
                             <div className="flex gap-2 items-center">
                                <select
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none appearance-none"
                                >
                                    <option value={10}>10 Years</option>
                                    <option value={15}>15 Years</option>
                                    <option value={20}>20 Years</option>
                                    <option value={30}>30 Years</option>
                                </select>
                             </div>
                        </div>
                    </div>

                    {/* Results Box */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-800/30 rounded-xl p-6 text-center">
                        <p className="text-gray-400 text-sm mb-1">Monthly Payment</p>
                        <div className="text-4xl font-bold text-white mb-6">
                             {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyPayment)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-left border-t border-blue-800/30 pt-4">
                            <div>
                                <p className="text-xs text-gray-500">Total Interest</p>
                                <p className="text-sm font-semibold text-red-300">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalInterest)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Payment</p>
                                <p className="text-sm font-semibold text-blue-300">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPayment)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2">
                     <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 h-[500px] flex flex-col">
                        <h3 className="text-white font-medium mb-4">Amortization Schedule</h3>
                        <div className="flex-1 relative">
                             <Bar data={chartData} options={chartOptions} />
                        </div>
                     </div>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}
