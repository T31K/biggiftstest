"use client";

import { useState, useRef, useEffect } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    text: "Hi there! 👋 I can help you find the perfect swag. First, what's your budget per item?",
    options: ["Under $5", "$5 - $10", "$10 - $25", "$25 - $50", "$50+"],
  },
  {
    id: 2,
    text: "Great! And how many items are you looking to order approximately?",
    options: ["Less than 50", "50 - 100", "100 - 500", "500 - 1000", "1000+"],
  },
  {
    id: 3,
    text: "What is the primary occasion or purpose for these items?",
    options: [
      "Employee Appreciation",
      "Trade Show / Conference",
      "Client Gifts",
      "Brand Awareness",
      "New Hire Onboarding",
    ],
  },
  {
    id: 4,
    text: "Do you have a specific category in mind?",
    options: [
      "Apparel (T-shirts, Hats)",
      "Tech (Chargers, Audio)",
      "Drinkware (Mugs, Bottles)",
      "Office (Notebooks, Pens)",
      "Bags & Totes",
      "Open to suggestions",
    ],
  },
  {
    id: 5,
    text: "Last question! When do you need these delivered by?",
    options: [
      "ASAP (Rush)",
      "Within 2 weeks",
      "Within 1 month",
      "No rush / Planning ahead",
    ],
  },
];

export default function ProductFinder() {
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(true);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  useEffect(() => {
    // 3-5 second delay
    const delay = 1000;
    const timer = setTimeout(() => {
      setHistory([
        {
          type: "bot",
          text: QUESTIONS[0].text,
          options: QUESTIONS[0].options,
          questionId: 1,
        },
      ]);
      setIsTyping(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = async (option, questionId) => {
    // 1. Add user response
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    setHistory((prev) => [...prev, { type: "user", text: option }]);

    // 2. Determine next step
    const nextQuestionId = questionId + 1;
    const nextQuestion = QUESTIONS.find((q) => q.id === nextQuestionId);

    // 3. Simulate bot thinking
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (nextQuestion) {
        setHistory((prev) => [
          ...prev,
          {
            type: "bot",
            text: nextQuestion.text,
            options: nextQuestion.options,
            questionId: nextQuestion.id,
          },
        ]);
      } else {
        // Finished
        setHistory((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Thanks! Analyzing your requirements...",
            isFinal: true,
          },
        ]);

        // Simulate finding products
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              type: "bot",
              text: "Here are some top recommendations based on your needs:",
              isResult: true,
            },
          ]);
        }, 1500);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <TopNav />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-[#00ADEF] p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h1 className="font-bold text-lg">Swag Finder Assistant</h1>
              <p className="text-xs text-blue-100 opacity-90">Online</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {history.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  } px-5 py-3 rounded-2xl shadow-sm`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-5 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-12">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}

            {/* Display options for the latest bot message if it's not a result */}
            {!isTyping &&
              history.length > 0 &&
              history[history.length - 1].type === "bot" &&
              history[history.length - 1].options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 ml-2">
                  {history[history.length - 1].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        handleOptionClick(
                          option,
                          history[history.length - 1].questionId
                        )
                      }
                      className="text-left px-4 py-3 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-blue-700 rounded-lg transition-all text-sm font-medium shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

            {/* Fake Results Card */}
            {!isTyping &&
              history.length > 0 &&
              history[history.length - 1].isResult && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Result 1 */}
                  <Link href="/product/1" className="block group">
                    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center text-4xl">
                        📒
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
                        Eco Friendly Notebook
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Perfect for office & events
                      </p>
                      <span className="text-blue-600 font-bold text-sm">
                        From $5.20
                      </span>
                    </div>
                  </Link>

                  {/* Result 2 */}
                  <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center text-4xl">
                      🧢
                    </div>
                    <h3 className="font-bold text-gray-900 hover:text-blue-600">
                      Classic Cotton Cap
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Great for brand awareness
                    </p>
                    <span className="text-blue-600 font-bold text-sm">
                      From $8.50
                    </span>
                  </div>
                </div>
              )}

            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
