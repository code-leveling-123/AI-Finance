import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { fetchAIResponse } from "./../components/service/aiService";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI financial assistant. I can help you with budgeting, saving tips, investment advice, and answering your money questions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    "Budget tips",
    "Saving strategies",
    "Investment basics",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageContent) => {
    if (loading) return;

    const userMessage = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiContent = await fetchAIResponse(messageContent);
    const aiMessage = { role: "assistant", content: aiContent };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const messageContent = input.trim();
    if (!messageContent) return;

    setInput(""); // Clear input *before* sending
    sendMessage(messageContent);
  };

  /**
   * Handles clicking a quick suggestion
   */
  const handleSuggestionClick = (suggestion) => {
    // Directly send the suggestion as a message
    sendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you with your finances today?",
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              AI Financial Assistant
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Always here to help with your finances
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Clear chat"
        >
          <Trash2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 sm:p-6">
        {/* Quick suggestions */}
        <div className="mb-3 flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={loading} // <-- Disable when loading
              className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Form handles 'Enter' key press automatically */}
        <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about finances..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
            disabled={loading} // <-- Disable when loading
          />
          <button
            type="submit" // <-- Important for form
            disabled={!input.trim() || loading}
            className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
