
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, MessageCircle, Users, Smile, Hash, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  isMe: boolean;
  time: string;
}

interface ChatRoomProps {
  onClose: () => void;
  userNickname: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onClose, userNickname }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-1',
      text: "TOUR MGM 라이브 라운지에 입장하셨습니다. 매너 있는 대화를 부탁드립니다. 😊",
      sender: "시스템",
      isMe: false,
      time: ""
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeUsers, setActiveUsers] = useState(32);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 다른 방문자의 메시지 시뮬레이션
  useEffect(() => {
    if (!isJoined) return;

    const mockMessages = [
      { sender: "골프매니아", text: "호치민 탄손넛 지금 날씨 어떤가요?" },
      { sender: "베트남초보", text: "무이네 지프투어 예약하고 싶은데 카톡으로 하면 되나요?" },
      { sender: "MGM매니저", text: "네, 카카오톡 vnseen1로 문의주시면 실시간 상담 가능합니다! ⛳" },
      { sender: "여행가이드", text: "오늘 붕따우 파도가 아주 잔잔하네요. 요트 투어하기 딱 좋습니다." }
    ];

    const timer = setInterval(() => {
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const newMessage: Message = {
        id: `mock-${Date.now()}`,
        text: randomMsg.text,
        sender: randomMsg.sender,
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 15000);

    return () => clearInterval(timer);
  }, [isJoined]);

  const handleJoin = () => {
    setIsJoined(true);
    
    const joinMsg: Message = {
      id: `sys-${Date.now()}`,
      text: `${userNickname}님이 라운지에 입장하셨습니다.`,
      sender: "시스템",
      isMe: false,
      time: ""
    };
    setMessages(prev => [...prev, joinMsg]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: userNickname,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
  };

  if (!isJoined) {
    return (
      <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[100] w-full sm:w-[400px] h-full sm:h-[600px] bg-white sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500">
        <div className="bg-emerald-600 p-6 flex items-center justify-between text-white">
          <h2 className="text-lg font-black tracking-tight">MGM 라이브 라운지</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-slate-50">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <Users className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">실시간 라운지</h3>
          <p className="text-sm text-slate-500 mb-10 font-medium">환영합니다! {userNickname === '손님' ? '로그인 없이도' : userNickname + '님,'}<br/>함께 대화하며 베트남 정보를 나누어보세요!</p>
          
          <button 
            onClick={handleJoin}
            className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
          >
            대화방 참여하기
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-8 text-[11px] text-slate-400 font-medium italic">닉네임 '<span className="text-emerald-600 font-bold">{userNickname}</span>'으로 즉시 입장합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[100] w-full sm:w-[400px] h-full sm:h-[600px] bg-white sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500">
      {/* Chat Header */}
      <div className="bg-emerald-600 p-5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight leading-none">MGM 라이브 라운지</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span className="text-[10px] font-bold opacity-80">현재 {activeUsers}명 접속 중</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages List */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50 no-scrollbar"
      >
        {messages.map((msg) => (
          msg.sender === "시스템" ? (
            <div key={msg.id} className="flex justify-center my-2">
              <span className="bg-slate-200/50 px-4 py-1 rounded-full text-[10px] font-bold text-slate-500">
                {msg.text}
              </span>
            </div>
          ) : (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!msg.isMe && (
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                )}
                <div className="space-y-1">
                  {!msg.isMe && (
                    <div className="text-[10px] font-bold text-slate-400 ml-1">
                      {msg.sender}
                    </div>
                  )}
                  <div className={`p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.isMe 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[9px] text-slate-400 font-bold ${msg.isMe ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Chat Input */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0"
      >
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="메시지를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-slate-800"
          />
        </div>
        <button 
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg hover:bg-emerald-700 disabled:bg-slate-200 transition-all active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
