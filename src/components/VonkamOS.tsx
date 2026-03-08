import { useState, useEffect, useRef, useCallback } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vonkam-chat`;

const BOOT_LINES = [
  { text: "$ vonkam-os --initialize", delay: 0 },
  { text: "→ Loading intelligence modules...", delay: 400 },
  { text: "→ Connecting to knowledge base...", delay: 800 },
  { text: "→ Calibrating agent parameters...", delay: 1200 },
  { text: "✓ VONKAM OS online.", delay: 1600, orange: true },
];

const THINKING_STATES = [
  "Analyzing query...",
  "Retrieving case data...",
  "Cross-referencing systems...",
  "Processing request...",
];

async function streamChat(
  messages: Msg[],
  onDelta: (t: string) => void,
  onDone: () => void
) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${resp.status})`);
  }
  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done: rd, value } = await reader.read();
    if (rd) break;
    buf += decoder.decode(value, { stream: true });

    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        onDone();
        return;
      }
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

export default function VonkamOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState<typeof BOOT_LINES>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState("Analyzing query...");
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [hasOpened, setHasOpened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulseButton, setPulseButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const thinkingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bootLines, isTyping]);

  useEffect(() => {
    if (!hasOpened) {
      const timer = setTimeout(() => {
        setPulseButton(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }, 45000);
      return () => clearTimeout(timer);
    }
  }, [hasOpened]);

  const openChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
    setPulseButton(false);
    if (!hasOpened) {
      setHasOpened(true);
      startBoot();
    }
  };

  const startBoot = () => {
    setBooting(true);
    setBootLines([]);
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBooting(false);
            setBootComplete(true);
            setMessages([
              {
                role: "assistant",
                content:
                  "VONKAM OS online. I'm VAI — VONKAM's operations intelligence. I can walk you through our systems, show you relevant case studies, or get you connected with the team. What brings you here today?",
              },
            ]);
            setQuickReplies([
              "See what we build",
              "I have a specific problem",
              "Book a strategy call",
            ]);
          }, 600);
        }
      }, line.delay);
    });
  };

  const startThinking = () => {
    let i = 0;
    setThinkingText(THINKING_STATES[0]);
    thinkingInterval.current = setInterval(() => {
      i = (i + 1) % THINKING_STATES.length;
      setThinkingText(THINKING_STATES[i]);
    }, 800);
  };

  const stopThinking = () => {
    if (thinkingInterval.current) clearInterval(thinkingInterval.current);
  };

  const sendMessage = useCallback(
    async (text?: string) => {
      const userText = text || input.trim();
      if (!userText) return;
      setInput("");
      setQuickReplies([]);

      const userMsg: Msg = { role: "user", content: userText };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setIsTyping(true);
      startThinking();

      let assistantSoFar = "";
      try {
        await streamChat(
          newMessages,
          (chunk) => {
            assistantSoFar += chunk;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                return prev.map((m, idx) =>
                  idx === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantSoFar }];
            });
            stopThinking();
            setIsTyping(false);
          },
          () => {
            stopThinking();
            setIsTyping(false);
            if (newMessages.length <= 2) {
              setQuickReplies([
                "Tell me about pricing",
                "Show me a case study",
                "How long does it take?",
              ]);
            } else if (
              assistantSoFar.toLowerCase().includes("call") ||
              assistantSoFar.toLowerCase().includes("scope")
            ) {
              setQuickReplies([
                "Book a strategy call",
                "What is the process?",
                "Tell me more first",
              ]);
            }
          }
        );
      } catch {
        stopThinking();
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Connection interrupted. Retry or visit vonkam.online directly.",
          },
        ]);
      }
    },
    [input, messages]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <style>{`
        .vai-trigger{position:fixed;bottom:28px;right:28px;z-index:1000}
        .vai-btn{position:relative;background:#E8570A;border:none;color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:2px;padding:14px 20px;cursor:pointer;display:flex;align-items:center;gap:10px;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .2s ease}
        .vai-btn:hover{background:#ff6b1a;transform:translateY(-2px)}
        .vai-btn-dot{width:8px;height:8px;background:#fff;border-radius:50%;animation:vaiBlink 1.5s infinite}
        .vai-pulse-ring{position:absolute;inset:-8px;border:2px solid #E8570A;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);animation:vaiPulse 2s infinite;opacity:0}
        .vai-pulse-ring.active{animation:vaiPulse 1s infinite}
        @keyframes vaiPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.3);opacity:0}}
        @keyframes vaiBlink{0%,100%{opacity:1}50%{opacity:.2}}
        .vai-tooltip{position:absolute;bottom:60px;right:0;background:#1A1A1A;border:1px solid #333;color:#888;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;padding:10px 14px;white-space:nowrap;animation:vaiFadeUp .3s ease}
        @keyframes vaiFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .vai-window{position:fixed;bottom:100px;right:28px;width:420px;height:580px;background:#0A0A0A;border:1px solid #222;display:flex;flex-direction:column;z-index:999;animation:vaiSlideUp .3s cubic-bezier(.16,1,.3,1);box-shadow:0 0 60px rgba(232,87,10,.08),0 20px 60px rgba(0,0,0,.8)}
        @keyframes vaiSlideUp{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .vai-topbar{background:#111;border-bottom:1px solid #1E1E1E;padding:10px 16px;flex-shrink:0}
        .vai-topbar-row1{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .vai-title{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#E8570A;letter-spacing:2px}
        .vai-status{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:9px;color:#4ade80;letter-spacing:2px}
        .vai-status-dot{width:6px;height:6px;background:#4ade80;border-radius:50%;animation:vaiBlink 2s infinite}
        .vai-controls{display:flex;gap:8px}
        .vai-ctrl-btn{background:none;border:1px solid #333;color:#555;font-family:'JetBrains Mono',monospace;font-size:10px;width:20px;height:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
        .vai-ctrl-btn:hover{border-color:#E8570A;color:#E8570A}
        .vai-progress-bar{height:2px;background:#1A1A1A;overflow:hidden}
        .vai-progress-fill{height:100%;background:linear-gradient(90deg,transparent,#E8570A,transparent);width:40%;animation:vaiScan 2.5s linear infinite}
        @keyframes vaiScan{from{transform:translateX(-200%)}to{transform:translateX(400%)}}
        .vai-thinking-text{font-family:'JetBrains Mono',monospace;font-size:9px;color:#444;letter-spacing:2px;margin-top:6px}
        .vai-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;scrollbar-width:thin;scrollbar-color:#222 transparent}
        .vai-messages::-webkit-scrollbar{width:4px}
        .vai-messages::-webkit-scrollbar-thumb{background:#222}
        .vai-boot-line{font-family:'JetBrains Mono',monospace;font-size:11px;color:#555;letter-spacing:1px;animation:vaiFadeIn .3s ease}
        .vai-boot-line.orange{color:#E8570A;font-weight:700}
        @keyframes vaiFadeIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}
        .vai-msg-ai{display:flex;flex-direction:column;gap:6px;animation:vaiFadeIn .3s ease}
        .vai-msg-ai-prefix{font-family:'JetBrains Mono',monospace;font-size:10px;color:#E8570A;letter-spacing:2px;font-weight:700}
        .vai-msg-ai-text{font-family:'JetBrains Mono',monospace;font-size:12px;color:#CCC;line-height:1.7;padding-left:12px;border-left:2px solid #1E1E1E;word-wrap:break-word;overflow-wrap:break-word;white-space:pre-wrap}
        .vai-msg-ai-time{font-family:'JetBrains Mono',monospace;font-size:9px;color:#333;padding-left:12px}
        .vai-msg-user{display:flex;flex-direction:column;align-items:flex-end;gap:4px;animation:vaiFadeIn .3s ease}
        .vai-msg-user-bubble{background:#141414;border:1px solid #2A2A2A;padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#FFF;line-height:1.6;max-width:80%;word-wrap:break-word;overflow-wrap:break-word}
        .vai-msg-user-time{font-family:'JetBrains Mono',monospace;font-size:9px;color:#333}
        .vai-typing{display:flex;flex-direction:column;gap:8px;animation:vaiFadeIn .3s ease}
        .vai-typing-prefix{font-family:'JetBrains Mono',monospace;font-size:10px;color:#E8570A;letter-spacing:2px;font-weight:700}
        .vai-typing-dots{display:flex;gap:5px;padding-left:12px}
        .vai-typing-dot{width:6px;height:6px;background:#E8570A;border-radius:50%;animation:vaiDotBounce 1.2s infinite}
        .vai-typing-dot:nth-child(2){animation-delay:.2s}
        .vai-typing-dot:nth-child(3){animation-delay:.4s}
        @keyframes vaiDotBounce{0%,60%,100%{transform:translateY(0);opacity:.3}30%{transform:translateY(-6px);opacity:1}}
        .vai-quick-replies{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 12px;flex-shrink:0}
        .vai-qr-btn{background:transparent;border:1px solid #2A2A2A;color:#888;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;padding:6px 12px;cursor:pointer;transition:all .15s;white-space:nowrap}
        .vai-qr-btn:hover{border-color:#E8570A;color:#E8570A;background:rgba(232,87,10,.05)}
        .vai-input-area{border-top:1px solid #1A1A1A;padding:12px 16px;flex-shrink:0;background:#0D0D0D}
        .vai-input-row{display:flex;align-items:center;gap:8px}
        .vai-input-prefix{color:#E8570A;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;flex-shrink:0}
        .vai-input{flex:1;background:transparent;border:none;outline:none;color:#FFF;font-family:'JetBrains Mono',monospace;font-size:12px;caret-color:#E8570A}
        .vai-input::placeholder{color:#333}
        .vai-send-btn{background:#E8570A;border:none;color:#fff;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1.5px;padding:7px 12px;cursor:pointer;flex-shrink:0;transition:background .15s}
        .vai-send-btn:hover{background:#ff6b1a}
        .vai-send-btn:disabled{background:#2A2A2A;color:#444;cursor:not-allowed}
        .vai-footer-text{font-family:'JetBrains Mono',monospace;font-size:9px;color:#2A2A2A;letter-spacing:1px;margin-top:8px;text-align:center}
        @media(max-width:480px){
          .vai-window{bottom:0;right:0;left:0;width:100%;height:100dvh;border:none}
          .vai-trigger{bottom:20px;right:20px}
        }
      `}</style>

      {/* Trigger button */}
      <div className="vai-trigger">
        {showTooltip && (
          <div className="vai-tooltip">
            Detecting idle session. Need a system walkthrough?
          </div>
        )}
        <button
          className="vai-btn"
          onClick={isOpen ? () => setIsOpen(false) : openChat}
        >
          <div className={`vai-pulse-ring ${pulseButton ? "active" : ""}`} />
          <div className="vai-btn-dot" />
          {isOpen ? "[ MINIMIZE ]" : "[ VONKAM OS ]"}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="vai-window">
          <div className="vai-topbar">
            <div className="vai-topbar-row1">
              <div className="vai-title">VONKAM OS v2.1</div>
              <div className="vai-status">
                <div className="vai-status-dot" />
                SYSTEM ACTIVE
              </div>
              <div className="vai-controls">
                <button className="vai-ctrl-btn" onClick={() => setIsOpen(false)}>
                  –
                </button>
                <button className="vai-ctrl-btn" onClick={() => setIsOpen(false)}>
                  ×
                </button>
              </div>
            </div>
            <div className="vai-progress-bar">
              <div className="vai-progress-fill" />
            </div>
            {isTyping && <div className="vai-thinking-text">{thinkingText}</div>}
          </div>

          <div className="vai-messages">
            {(booting || bootComplete) &&
              bootLines.map((line, i) => (
                <div
                  key={i}
                  className={`vai-boot-line ${line.orange ? "orange" : ""}`}
                >
                  {line.text}
                </div>
              ))}
            {messages.map((msg, i) => {
              const time = getTime();
              return msg.role === "assistant" ? (
                <div key={`msg-${i}`} className="vai-msg-ai">
                  <div className="vai-msg-ai-prefix">VAI ›</div>
                  <div className="vai-msg-ai-text">{msg.content}</div>
                  <div className="vai-msg-ai-time">{time}</div>
                </div>
              ) : (
                <div key={`msg-${i}`} className="vai-msg-user">
                  <div className="vai-msg-user-bubble">{msg.content}</div>
                  <div className="vai-msg-user-time">{time}</div>
                </div>
              );
            })}
            {isTyping && messages[messages.length - 1]?.role === "user" && (
              <div className="vai-typing">
                <div className="vai-typing-prefix">VAI ›</div>
                <div className="vai-typing-dots">
                  <div className="vai-typing-dot" />
                  <div className="vai-typing-dot" />
                  <div className="vai-typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {quickReplies.length > 0 && !isTyping && (
            <div className="vai-quick-replies">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  className="vai-qr-btn"
                  onClick={() => sendMessage(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div className="vai-input-area">
            <div className="vai-input-row">
              <span className="vai-input-prefix">›</span>
              <input
                className="vai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Enter query..."
                disabled={isTyping || booting}
              />
              <button
                className="vai-send-btn"
                onClick={() => sendMessage()}
                disabled={isTyping || booting || !input.trim()}
              >
                [ EXECUTE ]
              </button>
            </div>
            <div className="vai-footer-text">
              ENCRYPTED · POWERED BY VONKAM AI
            </div>
          </div>
        </div>
      )}
    </>
  );
}
