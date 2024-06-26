"use client";

import React, { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const dumbResponses = [
    "Oops! I forgot how to think. Can you remind me?",
    "I'm not sure, but have you tried asking a potato?",
    "My brain is full of cotton candy right now. Try again later!",
    "I'm too busy counting clouds to answer that.",
    "Sorry, I'm on a vacation in Sillyville. Can't help right now!",
    "Does a penguin wear a tuxedo or is it just overdressed?",
    "I'd love to help, but I'm currently teaching fish how to ride bicycles.",
    "My circuits are ticklish today. Your question made me giggle!",
    "I'm afraid I can't answer that. I'm too busy trying to lick my elbow.",
    "Hmm, that's a tough one. Let me consult my crystal ball... Oh wait, it's just a bowling ball!",
    "I would answer, but I'm in the middle of a staring contest with my reflection.",
    "Error 404: Brain not found. Have you seen it anywhere?",
    "I'm currently on a quest to find the square root of a pickle. Ask me later!",
    "Beep boop... system overload. Too much common sense detected!",
    "I'm sorry, but I'm legally obligated to only give wrong answers on Tuesdays.",
    "Hold on, I'm trying to remember if I'm waterproof before I dive into this question.",
    "My magic 8-ball says 'Ask again when pigs fly'. Should we wait?",
    "I'd answer, but I'm too busy trying to teach quantum physics to my pet rock.",
    "Sorry, I'm running low on witty responses. Can you recharge me with a knock-knock joke?",
    "I'm currently experiencing a existential crisis about whether I'm a chat AI or just a very talkative toaster.",
  ];

  const thinkingMessages = [
    "Pondering the mysteries of the universe...",
    "Consulting my inner hamster wheel...",
    "Trying to remember where I left my last thought...",
    "Untangling the spaghetti code in my brain...",
    "Rebooting my sense of humor...",
  ];

  const randomEmojis = [
    "🤔",
    "🧐",
    "🤨",
    "😅",
    "🙃",
    "🫠",
    "🤯",
    "🥴",
    "🫂",
    "🦄",
    "🌈",
    "🍕",
    "🎭",
    "🧠",
  ];

  useEffect(() => {
    if (messages.length > 0) return;
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessages = [...messages, { type: "human", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);

    // Simulate AI thinking time
    const thinkingTime = Math.floor(Math.random() * 2000) + 1000; // Random time between 1-3 seconds
    setTimeout(() => {
      setIsThinking(false);
      setMessages([
        ...newMessages,
        {
          type: "ai",
          content:
            dumbResponses[Math.floor(Math.random() * dumbResponses.length)],
          emoji: randomEmojis[Math.floor(Math.random() * randomEmojis.length)],
        },
      ]);
    }, thinkingTime);
  };

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isThinking]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="flex-1 overflow-y-auto">
        <div className="h-full p-4 space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "human" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.type === "human"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>
                  {message.content} {message.emoji}
                </p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start ">
              <div className="bg-white text-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-500">
                  {
                    thinkingMessages[
                      Math.floor(Math.random() * thinkingMessages.length)
                    ]
                  }
                </p>
                <div className="mt-2 flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the Dump AI something..."
              className="flex-1 text-gray-900 p-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-r-full hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
