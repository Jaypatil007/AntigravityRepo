import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User, Wand2, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatMessage = ({ message, onPrettyPrint }) => {
    const isBot = message.role === 'model' || message.role === 'assistant';
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 p-6 rounded-2xl mb-4 ${isBot ? 'bg-white/5 border border-white/10' : 'bg-transparent'
                }`}
        >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-content-center ${isBot ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-600'
                }`}>
                <div className="w-full h-full flex items-center justify-center text-white">
                    {isBot ? <Bot size={20} /> : <User size={20} />}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-gray-300">
                        {isBot ? 'Gemini Agent' : 'You'}
                    </span>
                    <div className="flex gap-2">
                        {isBot && (
                            <button
                                onClick={() => onPrettyPrint(message.content)}
                                className="btn-icon text-xs flex gap-1 items-center text-purple-300 hover:text-purple-200"
                                title="Pretty Print with Agent"
                            >
                                <Wand2 size={14} />
                                <span>Beautify</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-100 leading-relaxed">
                    <Markdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <div className="relative group">
                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                                                className="p-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <SyntaxHighlighter
                                            {...props}
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {message.content}
                    </Markdown>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
