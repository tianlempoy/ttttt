
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Bot, Mic, MicOff, Loader2, Globe, ExternalLink, ShieldCheck, Volume2 } from 'lucide-react';
import { getMomoAIResponse } from '../services/geminiService';
import { GoogleGenAI, Modality } from '@google/genai';

interface Message {
  role: 'bot' | 'user';
  text: string;
  sources?: { title: string; uri: string }[];
}

const MomoAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Selamat datang di pusat kedaulatan digital SMAN 2 Tompaso. Saya Momo AI v4.0. Klik ikon mikrofon untuk berbicara langsung dengan saya.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    const response = await getMomoAIResponse(userMsg);
    setMessages(prev => [...prev, { 
      role: 'bot', 
      text: response.text,
      sources: response.sources
    }]);
    setLoading(false);
  };

  const toggleVoice = async () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      sessionRef.current?.close();
      return;
    }

    try {
      setIsVoiceActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log("Voice Concierge Connected");
            setMessages(prev => [...prev, { role: 'bot', text: '[Mode Suara Aktif] Silakan bicara...' }]);
          },
          onmessage: async (message: any) => {
             // Audio processing logic
          },
          onclose: () => setIsVoiceActive(false),
          onerror: (e) => console.error("Live API Error", e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: "Anda adalah asisten suara Momo AI SMAN 2 Tompaso. Berikan jawaban yang singkat, hangat, dan informatif dalam Bahasa Indonesia yang baik."
        }
      });
      
      sessionRef.current = await sessionPromise;
      
    } catch (err) {
      console.error(err);
      setIsVoiceActive(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 right-10 z-[1000] group flex items-center space-x-4 bg-[#0A0F1E] p-5 lg:p-7 rounded-[35px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-700 border border-white/10 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-20 group-hover:opacity-50 transition-opacity"></div>
          <Bot className="h-7 w-7 lg:h-9 lg:w-9 text-[#D4AF37] relative z-10" />
        </div>
        <div className="text-left hidden lg:block pr-4">
          <p className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-1">Momo AI v4.0</p>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-500 text-[8px] font-bold uppercase tracking-[0.3em]">Mode Suara Aktif</p>
          </div>
        </div>
      </button>

      <div className={`fixed inset-0 lg:inset-auto lg:bottom-12 lg:right-12 lg:w-[550px] lg:h-[800px] z-[2000] bg-white lg:rounded-[60px] shadow-[0_60px_120px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-40 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0A0F1E] p-10 lg:p-14 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Globe className="h-4 w-4 text-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37]">Gerbang Saraf Digital</span>
              </div>
              <h3 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">MOMO <br/> <span className="text-[#D4AF37] italic font-serif-prestige font-light lowercase">asisten.</span></h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 border border-white/10 transition-all active:scale-90">
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow p-10 lg:p-12 overflow-y-auto space-y-10 bg-[#FAFAFA] custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[92%] p-8 lg:p-10 rounded-[35px] lg:rounded-[45px] text-base lg:text-lg leading-relaxed ${
                msg.role === 'user' ? 'bg-[#0A0F1E] text-white shadow-2xl rounded-tr-none' : 'bg-white text-[#0A0F1E] border border-gray-100 shadow-sm rounded-tl-none'
              }`}>
                {msg.text}
                {msg.sources && (
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                    {msg.sources.map((s, idx) => (
                      <a key={idx} href={s.uri} target="_blank" className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-100 hover:bg-[#D4AF37]/10 transition-colors">
                        <Globe className="h-3 w-3 text-[#D4AF37]" />
                        <span className="truncate max-w-[120px]">{s.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-6 p-8 bg-white rounded-[35px] border border-gray-100 shadow-sm">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Sinkronisasi Saraf...</span>
            </div>
          )}
        </div>

        <div className="p-10 lg:p-12 bg-white border-t border-gray-50 shrink-0">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-grow">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan apa saja..."
                className="w-full bg-[#F5F5F7] border border-transparent px-10 py-7 rounded-full text-[#0A0F1E] focus:outline-none focus:border-[#D4AF37] transition-all pr-20 text-lg font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A0F1E] text-[#D4AF37] p-5 rounded-full hover:bg-[#D4AF37] hover:text-[#0A0F1E] transition-all disabled:opacity-20 shadow-xl"
              >
                <Send className="h-6 w-6" />
              </button>
            </div>
            <button 
              onClick={toggleVoice}
              className={`p-7 rounded-full transition-all shadow-xl active:scale-95 flex items-center justify-center ${
                isVoiceActive ? 'bg-red-500 text-white animate-pulse' : 'bg-[#D4AF37] text-[#0A0F1E]'
              }`}
            >
              {isVoiceActive ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
            </button>
          </div>
          <div className="flex items-center justify-center space-x-4 opacity-30">
             <ShieldCheck className="h-4 w-4" />
             <p className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-400">Layanan AI v4.0 Aktif</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MomoAI;
