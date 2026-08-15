"use client";

import { useState } from "react";

const questions = [
  {
    question: "Yer jasthi love malpuna mane namana madhye? ❤️",
    options: ["Deepu 😎", "Viddu 😌"],
    reactions: [
      "😎 EXCELLENT CHOICE! Deepu is very happy ❤️",
      "🚨 SYSTEM ERROR! This answer is under investigation 😂",
    ],
  },
  {
    question: "Yeth joklu bodu nikku? 😂",
    options: ["1", "2", "3", "4+ ❤️"],
    reactions: [
      "🏃‍♂️💨 Ayyooo! Catch me if you can!",
      "😂 Still trying?",
      "🏃‍♂️💨 Almost! But NO!",
      "😳 AHA! Finally honest!",
    ],
  },
  {
    question: "Deepugu aadh ee dada korpa? 😂",
    options: ["Joklu 😂", "2 joklu 🤣", "2 ponnu joklu 😭", "2 aan joklu 😎"],
    reactions: [
      "😂 One? Really?",
      "🤣 Okay okay!",
      "😭 This answer is getting dangerous!",
      "😎 Deepu needs to investigate!",
    ],
  },
  {
    question: "Putta istana Deepu ista na? ❤️",
    options: ["Putta 😌", "Deepu 😎❤️"],
    reactions: [
      "😭 Okay... Deepu is leaving this website.",
      "😎❤️ THAT'S MY GIRL!",
    ],
  },
  {
    question: "Nikku ninna Putta yeth ista? 🥹❤️",
    options: [
      "Thumbhaaaaaaa 🥹❤️",
      "Aaye Yenna Jeeva 😭❤️",
      "Aayene yenk pura 😂❤️",
    ],
    reactions: [
      "🥹 Awww...",
      "😭❤️ Aaye Yenna Jeeva!",
      "😂❤️ Deepu's heart has accepted this answer!",
    ],
  },
  {
    question: "Deepun yencha thuvonuva? 👀❤️",
    options: ["Baale leka 😂", "Yenna ammaleka ❤️"],
    reactions: [
      "😂 Baale leka aa?",
      "❤️ Yenna ammaleka... nice answer!",
    ],
  },
  {
    question: "Deepuda ista avanna vishya dada? 😏",
    options: [
      "Kopa 😤",
      "Doubt 🤨",
      "Frndship opposition 😂",
      "Ovla ijji aaye Yenna bangaruu 🥹❤️",
    ],
    reactions: [
      "😤 Hmmm... noted!",
      "🤨 Deepu has questions!",
      "😂 Friendship opposition!",
      "🥹❤️ Aaye Yenna Bangaruu!",
    ],
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [reaction, setReaction] = useState("");
  const [love, setLove] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finalStage, setFinalStage] = useState(false);
  const [surprise, setSurprise] = useState(false);

  /*
    Question 2 escape system

    Each naughty option gets its own position.
    Initially ALL positions are null, so all 4 buttons
    appear normally in the grid.

    Only after the user actually touches/clicks
    option 1, 2 or 3 will that particular button escape.
  */
  const [escapePositions, setEscapePositions] = useState<
    Record<number, { x: number; y: number } | null>
  >({
    0: null,
    1: null,
    2: null,
  });

  const [escapeCount, setEscapeCount] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
  });

  const question = questions[current];

  // Move only the button she tried to catch
  const makeButtonEscape = (index: number) => {
    const buttonWidth = 150;
    const buttonHeight = 65;
    const padding = 20;

    const maxX = Math.max(
      padding,
      window.innerWidth - buttonWidth - padding
    );

    const maxY = Math.max(
      padding,
      window.innerHeight - buttonHeight - padding
    );

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setEscapePositions((previous) => ({
      ...previous,
      [index]: { x, y },
    }));

    setEscapeCount((previous) => ({
      ...previous,
      [index]: (previous[index] || 0) + 1,
    }));

    setReaction(
      index === 0
        ? "😂 Ayyooo! You tried 1!"
        : index === 1
        ? "🤣 You tried 2! But NO!"
        : "🏃‍♂️💨 You tried 3! Catch me!"
    );
  };

  const resetEscapeButtons = () => {
    setEscapePositions({
      0: null,
      1: null,
      2: null,
    });

    setEscapeCount({
      0: 0,
      1: 0,
      2: 0,
    });
  };

  const answer = (index: number) => {
    // QUESTION 2
    // Options 1, 2 and 3 escape ONLY when clicked/touched.
    if (current === 1 && index !== 3) {
      makeButtonEscape(index);
      return;
    }

    setReaction(question.reactions[index]);
    setLove((old) => Math.min(100, old + 15));

    setTimeout(() => {
      setReaction("");
      resetEscapeButtons();

      if (current === questions.length - 1) {
        setLove(100);
        setFinalStage(true);
      } else {
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          setCurrent((old) => old + 1);
        }, 1300);
      }
    }, 1100);
  };

  // =========================
  // START SCREEN
  // =========================

  if (!started) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#9d174d,#3b071d_45%,#080008)] text-white flex items-center justify-center px-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute left-[8%] top-[15%] text-6xl animate-pulse">
            ❤️
          </span>

          <span className="absolute right-[12%] top-[20%] text-5xl animate-bounce">
            💕
          </span>

          <span className="absolute left-[15%] bottom-[15%] text-5xl animate-bounce">
            💗
          </span>

          <span className="absolute right-[15%] bottom-[20%] text-6xl animate-pulse">
            💖
          </span>
        </div>

        <div className="relative z-10 w-full max-w-xl text-center">
          <div className="text-8xl animate-pulse">💌</div>

          <p className="mt-7 uppercase tracking-[0.4em] text-pink-300 text-xs">
            Private & Confidential
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black">
            DEEPU
            <span className="text-pink-400"> ❤️ </span>
            VIDDUMAAAA
          </h1>

          <p className="mt-5 text-xl text-pink-100/70">
            The Ultimate Love Test 😂
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
            <div className="text-3xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-black">
              A VERY SERIOUS EXAMINATION
            </h2>

            <p className="mt-4 text-white/60 leading-relaxed">
              Promise to answer honestly.
              <br />
              Deepu will remember every answer. 👀😂
            </p>

            <button
              onClick={() => setStarted(true)}
              className="mt-8 w-full py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 font-black text-lg transition-all hover:scale-[1.03]"
            >
              I PROMISE ❤️
            </button>
          </div>

          <p className="mt-6 text-xs text-white/30">
            No cheating allowed 😂
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_center,#831843,#25051d,#050005)] text-white flex items-center justify-center px-6">
        <div className="text-center w-full max-w-md">
          <div className="text-7xl animate-pulse">🤔</div>

          <h2 className="mt-7 text-3xl font-black">
            ANALYZING YOUR ANSWER...
          </h2>

          <div className="mt-8 h-4 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 animate-[loading_1.3s_linear]" />
          </div>

          <p className="mt-6 text-pink-200">
            Deepu is reviewing your answer... 👀
          </p>
        </div>

        <style jsx>{`
          @keyframes loading {
            from {
              width: 0%;
            }

            to {
              width: 100%;
            }
          }
        `}</style>
      </main>
    );
  }

  // =========================
  // FINAL SCREEN
  // =========================

  if (finalStage) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_center,#db2777,#831843_45%,#09000b)] text-white flex items-center justify-center px-6 overflow-hidden relative">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-bounce pointer-events-none"
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            {i % 3 === 0 ? "💖" : i % 2 === 0 ? "❤️" : "💕"}
          </span>
        ))}

        <div className="relative z-10 text-center max-w-5xl">
          <div className="text-8xl md:text-[11rem] animate-pulse">
            💯
          </div>

          <p className="mt-5 uppercase tracking-[0.5em] text-pink-100 text-sm">
            Compatibility Result
          </p>

          <h1 className="mt-5 text-6xl md:text-9xl font-black">
            100%
          </h1>

          <p className="text-3xl md:text-5xl font-black mt-4">
            COMPATIBLE ❤️
          </p>

          <div className="mt-8 text-5xl">
            🥹 ❤️ 🫶 ❤️ 🥰
          </div>

          <button
            onClick={() => setSurprise(true)}
            className="mt-10 px-8 py-4 rounded-2xl bg-white text-pink-700 font-black text-lg hover:scale-105 transition-all shadow-2xl"
          >
            ONE LAST SURPRISE 😏
          </button>

          {surprise && (
            <div className="mt-10 animate-pulse">
              <h2 className="text-5xl md:text-8xl font-black">
                VIDDUMAAAA ❤️
              </h2>

              <p className="mt-6 text-3xl md:text-5xl font-black text-pink-100">
                LOVE YOU SO MUCH
              </p>

              <p className="mt-8 text-xl md:text-2xl text-white/80">
                No matter what the questions asked...
              </p>

              <p className="mt-4 text-2xl md:text-4xl font-bold">
                My favourite answer will always be YOU. ❤️
              </p>

              <div className="mt-8 text-5xl">
                🥹🫶❤️🫶🥹
              </div>

              <p className="mt-8 text-xl text-pink-200">
                — Deepu 😎❤️
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }

  // =========================
  // QUESTION SCREEN
  // =========================

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#831843,#25051d_50%,#050005)] text-white flex items-center justify-center px-5 py-8 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <span className="absolute left-5 top-10 text-7xl">❤️</span>
        <span className="absolute right-5 top-24 text-5xl">💕</span>
        <span className="absolute left-10 bottom-10 text-6xl">💗</span>
        <span className="absolute right-10 bottom-20 text-7xl">💖</span>
      </div>

      <section className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-7">
          <p className="text-pink-300 uppercase tracking-[0.3em] text-xs">
            Deepu ❤️ Viddu
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-black">
            LOVE TEST 😂
          </h1>
        </div>

        {/* Love Meter */}
        <div className="mb-7">
          <div className="flex justify-between text-xs text-pink-200 mb-2">
            <span>LOVE METER ❤️</span>
            <span>{love}%</span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-pink-600 via-rose-400 to-pink-200 transition-all duration-700"
              style={{ width: `${love}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-6 md:p-10">
          <div className="flex justify-between items-center">
            <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-200 text-sm">
              Question {current + 1}
            </span>

            <span className="text-sm text-white/40">
              {current + 1}/{questions.length}
            </span>
          </div>

          <h2 className="mt-8 text-2xl md:text-4xl font-black text-center leading-relaxed min-h-[110px] flex items-center justify-center">
            {question.question}
          </h2>

          {/* OPTIONS */}
          <div className="mt-8 grid gap-4">
            {question.options.map((option, index) => {
              const isQuestionTwo = current === 1;
              const isEscapeOption = isQuestionTwo && index !== 3;
              const position = escapePositions[index];

              /*
                IMPORTANT:
                If position is null:
                -> button stays in normal grid position.

                If position exists:
                -> button becomes fixed and moves to its
                   new escape position.
              */
              const hasEscaped = isEscapeOption && position !== null;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => answer(index)}
                  className={`
                    rounded-2xl border px-6 py-4
                    font-bold text-lg
                    transition-all duration-200
                    touch-manipulation
                    select-none
                    ${
                      hasEscaped
                        ? "fixed z-[100] w-[150px] bg-red-500 border-red-300 shadow-2xl"
                        : "relative w-full bg-white/10 border-white/15 hover:bg-white/20 hover:border-pink-300/50 active:scale-95"
                    }
                  `}
                  style={
                    hasEscaped
                      ? {
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                        }
                      : undefined
                  }
                >
                  {index + 1}. {option}
                </button>
              );
            })}
          </div>

          {/* Reaction */}
          <div className="min-h-[80px] mt-6 flex items-center justify-center">
            {reaction && (
              <div className="text-center">
                <p className="text-pink-200 font-bold text-lg animate-pulse">
                  {reaction}
                </p>

                {current === 1 && reaction.includes("Catch") && (
                  <p className="text-white/40 text-sm mt-2">
                    Try again 😂
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-white/30">
          Every answer is being recorded 😂❤️
        </p>
      </section>
    </main>
  );
}