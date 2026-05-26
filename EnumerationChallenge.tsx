import { useState, useCallback } from 'react';
import { additionalQuestions } from '../data/studyData';
import type { QuizQuestion } from '../data/studyData';
import { ArrowLeft, CheckCircle, XCircle, Brain, Trophy, RotateCcw, Zap, ChevronRight, Lightbulb } from 'lucide-react';

interface EnumerationChallengeProps {
  onBack: () => void;
}

interface GameState {
  phase: 'menu' | 'playing' | 'results';
  currentQIndex: number;
  userAnswers: string[];
  revealed: boolean;
  score: number;
  streak: number;
  bestStreak: number;
  questions: QuizQuestion[];
  totalHistory: { question: string; correct: string[]; userAnswers: string[]; gotRight: number; total: number }[];
}

const initialState: GameState = {
  phase: 'menu',
  currentQIndex: 0,
  userAnswers: [],
  revealed: false,
  score: 0,
  streak: 0,
  bestStreak: 0,
  questions: [],
  totalHistory: [],
};

export function EnumerationChallenge({ onBack }: EnumerationChallengeProps) {
  const [state, setState] = useState<GameState>(initialState);
  const [inputValue, setInputValue] = useState('');

  const startGame = useCallback(() => {
    const enumQuestions = additionalQuestions.filter(q => q.type === 'enumeration');
    const shuffled = [...enumQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setState({
      ...initialState,
      phase: 'playing',
      questions: shuffled,
    });
    setInputValue('');
  }, []);

  const currentQ = state.questions[state.currentQIndex];
  const correctAnswers = (currentQ?.correctAnswer as string[]) || [];

  const handleAddAnswer = () => {
    if (!inputValue.trim() || state.revealed) return;
    setState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, inputValue.trim()],
    }));
    setInputValue('');
  };

  const handleReveal = () => {
    if (state.revealed) return;

    // Calculate how many answers matched (case-insensitive, partial match)
    const normalizedCorrect = correctAnswers.map(a => a.toLowerCase().trim());
    const normalizedUser = state.userAnswers.map(a => a.toLowerCase().trim());

    let matchedCount = 0;
    const matchedUser = new Set<number>();

    normalizedCorrect.forEach(correct => {
      for (let i = 0; i < normalizedUser.length; i++) {
        if (!matchedUser.has(i) && (normalizedUser[i].includes(correct) || correct.includes(normalizedUser[i]))) {
          matchedCount++;
          matchedUser.add(i);
          break;
        }
      }
    });

    const gotAll = matchedCount === correctAnswers.length;
    const newStreak = gotAll ? state.streak + 1 : 0;
    const newBestStreak = Math.max(state.bestStreak, newStreak);
    const points = Math.round((matchedCount / correctAnswers.length) * 100) + (gotAll ? 50 : 0) + (newStreak * 10);

    setState(prev => ({
      ...prev,
      revealed: true,
      streak: newStreak,
      bestStreak: newBestStreak,
      score: prev.score + points,
      totalHistory: [...prev.totalHistory, {
        question: currentQ.question,
        correct: correctAnswers,
        userAnswers: prev.userAnswers,
        gotRight: matchedCount,
        total: correctAnswers.length,
      }],
    }));
  };

  const handleNext = () => {
    if (state.currentQIndex < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQIndex: prev.currentQIndex + 1,
        userAnswers: [],
        revealed: false,
      }));
      setInputValue('');
    } else {
      setState(prev => ({ ...prev, phase: 'results' }));
    }
  };

  const handleRemoveAnswer = (index: number) => {
    if (state.revealed) return;
    setState(prev => ({
      ...prev,
      userAnswers: prev.userAnswers.filter((_, i) => i !== index),
    }));
  };

  if (state.phase === 'menu') {
    return (
      <div className="max-w-2xl mx-auto fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-4 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Enumeration Challenge</h1>
                <p className="text-purple-100 text-sm">Test your memory by listing items</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-purple-800 text-sm">How it works:</h3>
              <ul className="text-sm text-purple-700 space-y-1.5">
                <li className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  You&apos;ll be asked to list items (e.g., &quot;Name the 4Ps of Marketing&quot;)
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Type each item and press Enter or Add to add it to your list
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Points are awarded for each correct item, with bonus for streaks!
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-bold text-green-800">5</div>
                <div className="text-xs text-green-600">Questions</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="font-bold text-blue-800">∞</div>
                <div className="text-xs text-blue-600">Guesses</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <div className="font-bold text-amber-800">High</div>
                <div className="text-xs text-amber-600">Challenge</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.phase === 'results') {
    const totalCorrect = state.totalHistory.reduce((acc, h) => acc + h.gotRight, 0);
    const totalItems = state.totalHistory.reduce((acc, h) => acc + h.total, 0);
    const accuracy = totalItems > 0 ? Math.round((totalCorrect / totalItems) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto fade-in">
        <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-6 text-white text-center">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Challenge Complete!</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{state.score} <span className="text-lg text-gray-400">pts</span></div>
              <div className="text-sm text-gray-500 mt-1">
                {totalCorrect} correct out of {totalItems} items ({accuracy}%)
              </div>
              <div className="text-sm text-purple-600 mt-1">Best streak: {state.bestStreak}x</div>
            </div>

            {/* Review */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Review</h3>
              {state.totalHistory.map((h, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${h.gotRight === h.total ? 'bg-green-50' : 'bg-amber-50'}`}>
                  <p className="text-sm font-medium text-gray-800">{h.question}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {h.correct.map((ans, ai) => {
                      const gotIt = h.userAnswers.some(ua =>
                        ua.toLowerCase().includes(ans.toLowerCase()) ||
                        ans.toLowerCase().includes(ua.toLowerCase())
                      );
                      return (
                        <span
                          key={ai}
                          className={`text-xs px-2 py-1 rounded-full ${
                            gotIt ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {gotIt ? '✓' : '✗'} {ans}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
              <button
                onClick={() => setState(initialState)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-purple-700">{state.currentQIndex + 1}</span>
              <span>/</span>
              <span>{state.questions.length}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                {state.streak}x
              </span>
              <span className="font-medium text-purple-700">{state.score} pts</span>
            </div>
          </div>
          <div className="w-full h-2 bg-purple-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all"
              style={{ width: `${((state.currentQIndex + (state.revealed ? 1 : 0)) / state.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Question */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{currentQ?.question}</h2>
            <p className="text-sm text-gray-500 mt-1">
              List {correctAnswers.length} item{correctAnswers.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Input */}
          {!state.revealed && (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddAnswer()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2.5 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                autoFocus
              />
              <button
                onClick={handleAddAnswer}
                disabled={!inputValue.trim()}
                className="bg-purple-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
              >
                Add
              </button>
            </div>
          )}

          {/* User Answers */}
          {state.userAnswers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {state.userAnswers.map((ans, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    state.revealed
                      ? correctAnswers.some(ca =>
                          ca.toLowerCase().includes(ans.toLowerCase()) ||
                          ans.toLowerCase().includes(ca.toLowerCase())
                        )
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  {state.revealed && (
                    correctAnswers.some(ca =>
                      ca.toLowerCase().includes(ans.toLowerCase()) ||
                      ans.toLowerCase().includes(ca.toLowerCase())
                    ) ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )
                  )}
                  {ans}
                  {!state.revealed && (
                    <button
                      onClick={() => handleRemoveAnswer(idx)}
                      className="ml-1 text-purple-400 hover:text-purple-600"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Reveal Results */}
          {state.revealed && (
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 text-sm mb-2">Correct Answers:</h4>
                <div className="flex flex-wrap gap-2">
                  {correctAnswers.map((ans, idx) => (
                    <span key={idx} className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
                      {ans}
                    </span>
                  ))}
                </div>
              </div>

              {currentQ?.explanation && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <p className="text-sm text-blue-800">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {!state.revealed ? (
              <>
                <button
                  onClick={handleReveal}
                  disabled={state.userAnswers.length === 0}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Check Answers
                </button>
                <button
                  onClick={handleReveal}
                  className="px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm"
                >
                  Give up
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                {state.currentQIndex < state.questions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
