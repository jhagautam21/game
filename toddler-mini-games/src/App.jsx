\
  import React, { useMemo, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";

  // Simple color/shape data
  const COLORS = [
    { name: "Red", value: "#ef4444", emoji: "🔴" },
    { name: "Blue", value: "#3b82f6", emoji: "🔵" },
    { name: "Yellow", value: "#f59e0b", emoji: "🟡" },
    { name: "Green", value: "#22c55e", emoji: "🟢" },
    { name: "Purple", value: "#8b5cf6", emoji: "🟣" },
    { name: "Orange", value: "#f97316", emoji: "🟠" }
  ];

  const SHAPES = [
    { name: "Circle", emoji: "⚪" },
    { name: "Square", emoji: "🟦" },
    { name: "Triangle", emoji: "🔺" },
    { name: "Heart", emoji: "❤️" },
    { name: "Star", emoji: "⭐" },
    { name: "Diamond", emoji: "🔶" }
  ];

  function Header({ title, subtitle }) {
    return (
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="text-lg opacity-80 mt-1">{subtitle}</p>}
      </div>
    );
  }

  function BigButton({ children, onClick, className = "" }) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={
          "px-5 py-4 text-xl md:text-2xl rounded-2xl shadow bg-white hover:shadow-md active:shadow-sm transition border border-black/5 " +
          className
        }
      >
        {children}
      </motion.button>
    );
  }

  function Card({ children, className = "" }) {
    return (
      <div className={`rounded-3xl p-4 md:p-6 bg-white shadow border border-black/5 ${className}`}>
        {children}
      </div>
    );
  }

  function Tab({ active, onClick, children }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-2xl text-base md:text-lg font-semibold border transition shadow-sm mr-2 mb-2 ${
          active ? "bg-black text-white" : "bg-white hover:bg-black/5"
        }`}
      >
        {children}
      </button>
    );
  }

  function ConfettiLine({ show }) {
    if (!show) return null;
    return <div className="text-2xl md:text-3xl select-none">🎉🎊✨🥳🎈</div>;
  }

  // Game 1: Tap the Color
  function GameColors() {
    const [target, setTarget] = useState(() => COLORS[Math.floor(Math.random() * 4)]);
    const [message, setMessage] = useState("");
    const [round, setRound] = useState(1);

    const options = useMemo(() => {
      const shuffled = [...COLORS].sort(() => Math.random() - 0.5).slice(0, 4);
      if (!shuffled.find((c) => c.name === target.name)) {
        shuffled[Math.floor(Math.random() * 4)] = target;
      }
      return shuffled;
    }, [round]);

    function nextRound() {
      setTarget(COLORS[Math.floor(Math.random() * COLORS.length)]);
      setMessage("");
      setRound((r) => r + 1);
    }

    function guess(color) {
      if (color.name === target.name) {
        setMessage("Correct!");
      } else {
        setMessage("Try again!");
      }
    }

    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">Tap the Color</div>
          <div className="opacity-70">Round {round}</div>
        </div>

        <div className="text-center mt-4 space-y-3">
          <div className="text-lg">
            Find: <span className="font-bold">{target.emoji} {target.name}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center">
            {options.map((c, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.9 }}
                onClick={() => guess(c)}
                aria-label={c.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-3xl shadow border border-black/5 flex items-center justify-center text-5xl"
                style={{ backgroundColor: c.value }}
              >
                <span className="drop-shadow-sm">{c.emoji}</span>
              </motion.button>
            ))}
          </div>
          <div className="h-8 text-xl font-semibold">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {message === "Correct!" ? (
                    <span className="text-green-600">✅ {message}</span>
                  ) : (
                    <span className="text-amber-600">↩️ {message}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ConfettiLine show={message === "Correct!"} />
          <BigButton onClick={nextRound} className="mt-2">Next ▶</BigButton>
        </div>
      </Card>
    );
  }

  // Game 2: Count the Apples
  function GameCounting() {
    const [round, setRound] = useState(1);
    const [count, setCount] = useState(() => Math.floor(Math.random() * 5) + 1);
    const [message, setMessage] = useState("");

    function nextRound() {
      setCount(Math.floor(Math.random() * 5) + 1);
      setMessage("");
      setRound((r) => r + 1);
    }

    function guess(n) {
      if (n === count) setMessage("Correct!");
      else setMessage("Try again!");
    }

    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">Count the Apples</div>
          <div className="opacity-70">Round {round}</div>
        </div>

        <div className="text-center mt-4 space-y-4">
          <div className="text-6xl md:text-7xl leading-[1.2] break-words">
            {"🍎".repeat(count)}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <BigButton key={n} onClick={() => guess(n)}>{n}</BigButton>
            ))}
          </div>
          <div className="h-8 text-xl font-semibold">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {message === "Correct!" ? (
                    <span className="text-green-600">✅ {message}</span>
                  ) : (
                    <span className="text-amber-600">↩️ {message}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ConfettiLine show={message === "Correct!"} />
          <BigButton onClick={nextRound}>Next ▶</BigButton>
        </div>
      </Card>
    );
  }

  // Game 3: Match the Shape
  function GameShapes() {
    const [target, setTarget] = useState(() => SHAPES[Math.floor(Math.random() * 4)]);
    const [message, setMessage] = useState("");
    const [round, setRound] = useState(1);

    const options = useMemo(() => {
      const shuffled = [...SHAPES].sort(() => Math.random() - 0.5).slice(0, 4);
      if (!shuffled.find((s) => s.name === target.name)) {
        shuffled[Math.floor(Math.random() * 4)] = target;
      }
      return shuffled;
    }, [round]);

    function nextRound() {
      setTarget(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
      setMessage("");
      setRound((r) => r + 1);
    }

    function guess(shape) {
      if (shape.name === target.name) setMessage("Correct!");
      else setMessage("Try again!");
    }

    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">Match the Shape</div>
          <div className="opacity-70">Round {round}</div>
        </div>

        <div className="text-center mt-4 space-y-3">
          <div className="text-lg">Find: <span className="font-bold">{target.emoji} {target.name}</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center">
            {options.map((s, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.9 }}
                onClick={() => guess(s)}
                aria-label={s.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-3xl shadow border border-black/5 bg-white flex items-center justify-center text-5xl"
              >
                <span className="drop-shadow-sm">{s.emoji}</span>
              </motion.button>
            ))}
          </div>
          <div className="h-8 text-xl font-semibold">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {message === "Correct!" ? (
                    <span className="text-green-600">✅ {message}</span>
                  ) : (
                    <span className="text-amber-600">↩️ {message}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ConfettiLine show={message === "Correct!"} />
          <BigButton onClick={nextRound} className="mt-2">Next ▶</BigButton>
        </div>
      </Card>
    );
  }

  export default function MiniGames() {
    const [tab, setTab] = useState("colors");
    const [bigMode, setBigMode] = useState(true);

    return (
      <div className={`min-h-[70vh] ${bigMode ? "text-xl" : "text-base"} p-4 md:p-6 bg-gradient-to-b from-amber-50 to-amber-100`}> 
        <div className="max-w-4xl mx-auto">
          <Header title="Toddler Mini‑Games" subtitle="Ages 3+ • Tap • Count • Match" />

          <div className="flex flex-wrap items-center justify-between mb-4">
            <div>
              <Tab active={tab === "colors"} onClick={() => setTab("colors")}>🎨 Colors</Tab>
              <Tab active={tab === "count"} onClick={() => setTab("count")}>🔢 Counting</Tab>
              <Tab active={tab === "shapes"} onClick={() => setTab("shapes")}>🔷 Shapes</Tab>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm md:text-base">Big Mode</span>
              <button
                onClick={() => setBigMode((v) => !v)}
                className={`w-16 h-9 rounded-full border border-black/10 shadow-inner relative transition ${bigMode ? "bg-black" : "bg-white"}`}
                aria-label="Toggle big mode"
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 transition-all w-7 h-7 rounded-full bg-white shadow ${bigMode ? "right-1" : "left-1"}`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {tab === "colors" && <GameColors />}
            {tab === "count" && <GameCounting />}
            {tab === "shapes" && <GameShapes />}
          </div>

          <div className="mt-6 text-center opacity-70 text-sm">
            Tip: Keep sessions short (5–7 minutes). Celebrate tries and successes! 🌟
          </div>
        </div>
      </div>
    );
  }
