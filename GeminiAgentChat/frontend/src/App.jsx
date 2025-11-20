import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ChatMessage from './components/ChatMessage';

function App() {
    const [messages, setMessages] = useState([
        { role: 'model', content: "Hello! I'm your SAP CPI Agent. How can I help you with Groovy scripts today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // In a real implementation, this would call the backend API
            // For now, we'll simulate the backend response since we can't easily run the full ADK stack in this environment without setup.
            // However, the code is set up to proxy /api to the backend.

            // const response = await fetch('/api/run_sse', { ... });

            // Mock response for demonstration
            setTimeout(() => {
                const botResponse = {
                    role: 'model',
                    content: `Here is a sample Groovy script for your request: "${userMessage.content}"\n\n\`\`\`groovy\nimport com.sap.gateway.ip.core.customdev.util.Message;\n\ndef Message processData(Message message) {\n    // Logic for ${userMessage.content}\n    return message;\n}\n\`\`\``
                };
                setMessages(prev => [...prev, botResponse]);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    const handlePrettyPrint = async (content) => {
        // Call the pretty print agent
        // Mock implementation
        const prettyContent = `*** PRETTY PRINTED ***\n\n${content}\n\n**********************`;
        setMessages(prev => [...prev, { role: 'model', content: prettyContent }]);
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto w-full p-4 md:p-6">
            {/* Header */}
            <header className="glass-panel rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Gemini Agent
                        </h1>
                        <p className="text-xs text-purple-300 font-medium">SAP CPI Assistant</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10">
                    v1.0.0
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 glass-panel rounded-2xl mb-6 overflow-hidden flex flex-col relative">
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    {messages.map((msg, idx) => (
                        <ChatMessage
                            key={idx}
                            message={msg}
                            onPrettyPrint={handlePrettyPrint}
                        />
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 p-6 rounded-2xl mb-4 bg-white/5 border border-white/10 animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/5">
                    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about SAP CPI scripts..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
