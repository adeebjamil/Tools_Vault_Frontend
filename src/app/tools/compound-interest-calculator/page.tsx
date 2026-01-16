"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [compoundFreq, setCompoundFreq] = useState(12); // monthly

  const { labels, dataPoints, totalPrincipal, totalInterest } = useMemo(() => {
    let currentBalance = principal;
    let totalInvested = principal;
    const labels = [];
    const balanceData = [];
    const investedData = [];

    const totalMonths = years * 12;

    for (let i = 0; i <= totalMonths; i++) {
      if (i % 12 === 0) { // Record yearly
        labels.push(`Year ${i / 12}`);
        balanceData.push(currentBalance);
        investedData.push(totalInvested);
      }

      // Calculate monthly interest
      const monthlyRate = rate / 100 / 12;
      currentBalance += currentBalance * monthlyRate;
      currentBalance += monthlyContribution;
      totalInvested += monthlyContribution;
    }

    return {
      labels,
      dataPoints: {
        balance: balanceData,
        invested: investedData,
      },
      totalPrincipal: totalInvested,
      totalInterest: currentBalance - totalInvested,
    };
  }, [principal, monthlyContribution, rate, years, compoundFreq]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Balance",
        data: dataPoints.balance,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Principal Invested",
        data: dataPoints.invested,
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#94a3b8" },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 1,
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
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { color: "#94a3b8" },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { 
            color: "#94a3b8",
            callback: function(value: any) {
                return '$' + value / 1000 + 'k';
            }
        },
      },
    },
    interaction: {
       mode: 'nearest' as const,
       axis: 'x' as const,
       intersect: false
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
            <span className="text-blue-400">Compound Interest Calculator</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Compound Interest Calculator</h1>
              <p className="text-gray-400">Project your savings growth over time</p>
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
                             <label className="text-sm font-medium text-gray-300">Initial Principal ($)</label>
                             <input 
                                type="number" 
                                value={principal} 
                                onChange={(e) => setPrincipal(Number(e.target.value))} 
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Monthly Contribution ($)</label>
                             <input 
                                type="number" 
                                value={monthlyContribution} 
                                onChange={(e) => setMonthlyContribution(Number(e.target.value))} 
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Interest Rate (%)</label>
                             <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    value={rate} 
                                    onChange={(e) => setRate(Number(e.target.value))} 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                />
                                <input 
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hidden sm:block"
                                />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Time Period (Years)</label>
                             <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    value={years} 
                                    onChange={(e) => setYears(Number(e.target.value))} 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                />
                                <input 
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hidden sm:block"
                                />
                             </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <span className="text-gray-400">Total Invested</span>
                                <span className="text-white font-medium">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrincipal)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <span className="text-blue-400">Total Interest</span>
                                <span className="text-blue-400 font-bold">
                                    +{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalInterest)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-lg text-white font-bold">Future Value</span>
                                <span className="text-xl text-green-400 font-bold">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrincipal + totalInterest)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 h-[500px] flex flex-col">
                        <h3 className="text-white font-medium mb-4">Growth Projection</h3>
                        <div className="flex-1 relative">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}
