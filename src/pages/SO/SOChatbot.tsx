import React, { useState } from 'react';
import { Mic, Send, Bot, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

const SOChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: 'শুভ সকাল! আজকে আপনার ৩টি গুরুত্বপূর্ণ ভিজিট আছে। প্রথমটি রহিম স্টোর। আমি কি রুট ম্যাপ চালু করবো?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: inputText
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const newBotMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'আপনার নির্দেশ পেয়েছি। তথ্য প্রসেস করা হচ্ছে...'
      };
      setMessages(prev => [...prev, newBotMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-background-offwhite absolute inset-0 z-50">
      
      <div className="p-4 flex-shrink-0 bg-white border-b-2 border-border shadow-sm flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center active:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
           <h2 className="text-xl font-extrabold text-text-primary">AI অ্যাসিস্ট্যান্ট</h2>
           <p className="text-xs text-text-muted mt-0.5 font-medium">ভয়েস বা টেক্সট দিয়ে কমান্ড দিন</p>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-6">
        
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
             <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center shadow-md font-bold text-white ${msg.role === 'user' ? 'bg-text-primary' : 'bg-accent'}`}>
               {msg.role === 'user' ? 'MK' : <Bot className="w-6 h-6" />}
             </div>
             <div className={`border-2 p-4 font-bold text-[15px] shadow-sm ${
               msg.role === 'user' 
                 ? 'bg-text-primary text-white border-text-primary rounded-2xl rounded-tr-none' 
                 : 'bg-white border-border text-text-primary rounded-2xl rounded-tl-none'
             }`}>
               {msg.text}
             </div>
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-2 border-border pb-safe">
         <div className="flex items-center gap-3 bg-background-offwhite border-2 border-border rounded-full p-2">
            <button className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0">
               <Mic className="w-6 h-6" />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="কথা বলতে চাপ দিন বা লিখুন..."
              className="flex-grow bg-transparent border-none focus:outline-none text-text-primary font-bold px-2 w-full"
            />
            <button 
              onClick={handleSend}
              className="w-12 h-12 rounded-full bg-text-primary text-white flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
            >
               <Send className="w-5 h-5 ml-1" />
            </button>
         </div>
      </div>

    </div>
  );
};

export default SOChatbot;
