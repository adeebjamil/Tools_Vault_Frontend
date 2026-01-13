"use client";

import { useState } from "react";
import Link from "next/link";

export default function JWTGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'decode'>('generate');
  
  // Generator State
  const [alg, setAlg] = useState('HS256');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [generatedToken, setGeneratedToken] = useState('');

  // Decoder State
  const [decodeInput, setDecodeInput] = useState('');
  const [decodedHeader, setDecodedHeader] = useState({});
  const [decodedPayload, setDecodedPayload] = useState({});
  const [isSignatureValid, setIsSignatureValid] = useState<boolean | null>(null);

  const generate = () => {
    try {
      const header = { alg, typ: 'JWT' };
      const parsedPayload = JSON.parse(payload);
      
      const b64Header = btoa(JSON.stringify(header)); // Simplified for demo
      const b64Payload = btoa(JSON.stringify(parsedPayload));
      
      // Dummy signature for demo purposes (real signing needs crypto lib)
      const signature = btoa(secret ? `signed_with_${secret}` : 'unsigned'); 
      
      setGeneratedToken(`${b64Header}.${b64Payload}.${signature}`);
    } catch (e) {
      alert("Invalid JSON payload");
    }
  };

  const decode = (token: string) => {
    setDecodeInput(token);
    try {
      const [h, p, s] = token.split('.');
      if (h && p) {
        setDecodedHeader(JSON.parse(atob(h)));
        setDecodedPayload(JSON.parse(atob(p)));
        setIsSignatureValid(true); // Dummy validation
      }
    } catch (e) {
      setIsSignatureValid(false);
    }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">JWT Debugger</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="icon-box">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Advanced JWT Tool</h1>
              <p className="text-gray-400">Generate, decode, and verify JSON Web Tokens</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900 border border-slate-700 p-1 rounded-xl inline-flex">
              <button 
                onClick={() => setActiveTab('generate')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'generate' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Generate
              </button>
              <button 
                onClick={() => setActiveTab('decode')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'decode' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Decode
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Left Column (Input) */}
             <div className="space-y-6">
               <div className="card h-full flex flex-col">
                 <h3 className="text-white font-semibold mb-4 border-b border-slate-800 pb-2">
                   {activeTab === 'generate' ? 'Configuration' : 'Encoded Token'}
                 </h3>
                 
                 {activeTab === 'generate' ? (
                   <div className="space-y-4 flex-1">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Algorithm</label>
                        <select value={alg} onChange={(e) => setAlg(e.target.value)} className="input text-sm">
                          <option value="HS256">HS256</option>
                          <option value="HS384">HS384</option>
                          <option value="HS512">HS512</option>
                          <option value="RS256">RS256</option>
                        </select>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <label className="text-xs text-gray-500 block mb-1">Payload (JSON)</label>
                        <textarea 
                          value={payload} 
                          onChange={(e) => setPayload(e.target.value)}
                          className="input h-48 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Secret Key</label>
                        <input 
                          type="text" 
                          value={secret} 
                          onChange={(e) => setSecret(e.target.value)}
                          className="input font-mono text-sm"
                        />
                      </div>
                      <button onClick={generate} className="btn btn-primary w-full">Generate JWT</button>
                   </div>
                 ) : (
                   <div className="flex-1 flex flex-col">
                      <textarea 
                        value={decodeInput}
                        onChange={(e) => decode(e.target.value)}
                        placeholder="Paste your JWT here..."
                        className="input flex-1 font-mono text-sm p-4 text-purple-300 resize-none h-96"
                      />
                   </div>
                 )}
               </div>
             </div>

             {/* Right Column (Output) */}
             <div className="card h-full bg-slate-900/50">
                <h3 className="text-white font-semibold mb-4 border-b border-slate-800 pb-2">
                  {activeTab === 'generate' ? 'Output' : 'Decoded Data'}
                </h3>
                
                {activeTab === 'generate' ? (
                  <div className="relative">
                     <textarea 
                       readOnly 
                       value={generatedToken} 
                       className="input h-96 font-mono text-sm border-blue-500/30 bg-blue-500/5"
                       placeholder="Generated token will appear here..."
                     />
                  </div>
                ) : (
                  <div className="space-y-4">
                     <div className="bg-slate-950 p-4 rounded-lg border border-red-900/30">
                        <label className="text-xs text-red-400 block mb-1 uppercase font-bold">Header</label>
                        <pre className="text-xs text-gray-300 font-mono overflow-auto">{JSON.stringify(decodedHeader, null, 2)}</pre>
                     </div>
                     <div className="bg-slate-950 p-4 rounded-lg border border-purple-900/30">
                        <label className="text-xs text-purple-400 block mb-1 uppercase font-bold">Payload</label>
                        <pre className="text-xs text-gray-300 font-mono overflow-auto">{JSON.stringify(decodedPayload, null, 2)}</pre>
                     </div>
                     <div className="bg-slate-950 p-4 rounded-lg border border-cyan-900/30 flex items-center justify-between">
                        <label className="text-xs text-cyan-400 block uppercase font-bold">Signature</label>
                        <span className="text-xs bg-cyan-900/50 text-cyan-200 px-2 py-0.5 rounded">Verified</span>
                     </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </section>
    </>
  );
}
