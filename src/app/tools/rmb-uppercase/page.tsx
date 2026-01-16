"use client";

import { useState } from "react";
import Link from "next/link";

export default function RmbUppercasePage() {
  const [amount, setAmount] = useState<number | string>("");
  const [result, setResult] = useState("");

  const convertToRMB = (n: number | string) => {
    let num = Number(n);
    if (isNaN(num)) return "Invalid Input";
    if (num > 999999999999.99) return "Amount too large";
    
    let strOutput = "";
    let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += 0.00000001;
    let strNum = num.toFixed(2).toString().replace(".", "");
    
    // Pad input so it matches the length of units
    // Or slice units to match input length
    // Easier approach: standard implementation:
    
    const maxLen = 15; // 9999... max
    // It's easier to just use a proven snippet logic for RMB
    
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    const head = num < 0 ? '欠' : '';
    num = Math.abs(num);
    
    let s = '';
    
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    num = Math.floor(num);
    
    for (let i = 0; i < unit[0].length && num > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && num > 0; j++) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  };

  const handleConvert = (val: string) => {
      setAmount(val);
      if(!val) {
          setResult("");
          return;
      }
      setResult(convertToRMB(val));
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">RMB Converter</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
                <span className="text-2xl font-bold text-white">¥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">RMB Uppercase Converter</h1>
              <p className="text-gray-400">Convert numbers to Chinese financial text</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Enter Amount (¥)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => handleConvert(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 text-3xl font-bold text-white focus:border-blue-500 focus:outline-none placeholder-gray-700"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-xs text-blue-400 uppercase tracking-wider font-bold mb-2 block">Uppercase Result</label>
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 min-h-[120px] flex items-center justify-center">
                            {result ? (
                                <p className="text-3xl md:text-4xl text-white font-serif tracking-wide text-center leading-relaxed">
                                    {result}
                                </p>
                            ) : (
                                <p className="text-gray-600 italic">Result will appear here...</p>
                            )}
                        </div>
                         {result && (
                            <button
                                onClick={() => navigator.clipboard.writeText(result)}
                                className="absolute top-8 right-4 text-gray-400 hover:text-white p-2"
                                title="Copy"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}
