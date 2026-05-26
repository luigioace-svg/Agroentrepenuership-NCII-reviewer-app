import { useState, useCallback, useEffect } from 'react';
import { quizQuestions } from '../data/studyData';
import type { QuizQuestion } from '../data/studyData';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, HelpCircle, ChevronRight, Zap, Timer } from 'lucide-react';

interface QuizModeProps {
  onBack: () => void;
}

type QuizState = 'menu' | 'playing' | 'results';
type QuizType = 'mixed' | 'multiple_choice' | 'true_false' | 'identification';
type Difficulty = 'easy' | 'medium' | 'hard';

const QUESTIONS_PER_QUIZ = 10;

export function QuizMode({ onBack }: QuizModeProps) {
  const [quizState, setQuizState] = useState<QuizState>('menu');
  const [quizType, setQuizType] = useState<QuizType>('mixed');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean; userAnswer: string }[]>([]);
  const [timer, setTimer] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (quizState === 'playing' && !showResult) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [quizState, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = useCallback(() => {
    let pool = [...quizQuestions];

    // Filter by type
    if (quizType === 'multiple_choice') {
      pool = pool.filter(q => q.type === 'multiple_choice');
    } else if (quizType === 'true_false') {
      pool = pool.filter(q => q.type === 'true_false');
    } else if (quizType === 'identification') {
      pool = pool.filter(q => q.type === 'identification');
    }

    // Shuffle and select
    pool = pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, Math.min(QUESTIONS_PER_QUIZ, pool.length));

    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setTimer(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizState('playing');
  }, [quizType]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    const currentQ = currentQuestions[currentIndex];
    const correct = answer.toLowerCase().trim() === (Array.isArray(currentQ.correctAnswer) ? currentQ.correctAnswer[0] : currentQ.correctAnswer).toLowerCase().trim();

    setSelectedAnswer(answer);
    setShowResult(true);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));

      // Score based on difficulty and streak
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
      const streakBonus = Math.min(newStreak * 2, 10);
      setScore(prev => prev + basePoints + streakBonus);
    } else {
      setStreak(0);
    }

    setAnswers(prev => [...prev, { questionId: currentQ.id, correct, userAnswer: answer }]);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizState('results');
    }
  };

  const currentQ = currentQuestions[currentIndex];
  const progress = currentQuestions.length > 0 ? ((currentIndex + (showResult ? 1 : 0)) / currentQuestions.length) * 100 : 0;
  const correctCount = answers.filter(a => a.correct).length;

  if (quizState === 'menu') {
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
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Practice Quiz</h1>
                <p className="text-green-100 text-sm">Test your knowledge with interactive questions</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Quiz Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  { value: 'mixed' as QuizType, label: 'Mixed' },
                  { value: 'multiple_choice' as QuizType, label: 'Multiple Choice' },
                  { value: 'true_false' as QuizType, label: 'True/False' },
                  { value: 'identification' as QuizType, label: 'Identification' },
                ]).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setQuizType(type.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      quizType === type.value
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'easy' as Difficulty, label: 'Easy', desc: '10 pts each' },
                  { value: 'medium' as Difficulty, label: 'Medium', desc: '15 pts each' },
                  { value: 'hard' as Difficulty, label: 'Hard', desc: '20 pts each' },
                ]).map((diff) => (
                  <button
                    key={diff.value}
                    onClick={() => setDifficulty(diff.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      difficulty === diff.value
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <div>{diff.label}</div>
                    <div className="text-xs opacity-75">{diff.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-green-50 rounded-lg p-4 flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-800">{QUESTIONS_PER_QUIZ}</div>
                <div className="text-green-600 text-xs">Questions</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-800">{quizQuestions.length}</div>
                <div className="text-green-600 text-xs">Total Available</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-800">~{Math.round(QUESTIONS_PER_QUIZ * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2))}m</div>
                <div className="text-green-600 text-xs">Est. Time</div>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    const totalQuestions = currentQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
    const gradeColor = grade === 'A' ? 'text-green-600' : grade === 'B' ? 'text-blue-600' : grade === 'C' ? 'text-amber-600' : 'text-red-600';
    const gradeBg = grade === 'A' ? 'bg-green-100' : grade === 'B' ? 'bg-blue-100' : grade === 'C' ? 'bg-amber-100' : 'bg-red-100';

    return (
      <div className="max-w-2xl mx-auto fade-in">
        <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-6 text-white text-center">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Quiz Complete!</h1>
            <p className="text-green-100 text-sm">Here&apos;s how you performed</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Score Circle */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${gradeBg} mb-2`}>
                <span className={`text-4xl font-bold ${gradeColor}`}>{grade}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{score} <span className="text-lg text-gray-400">pts</span></div>
              <p className="text-sm text-gray-500">{correctCount} correct out of {totalQuestions} ({percentage}%)</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="font-bold text-green-800 text-lg">{formatTime(timer)}</div>
                <div className="text-xs text-green-600">Time</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-bold text-blue-800 text-lg">{bestStreak}x</div>
                <div className="text-xs text-blue-600">Best Streak</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="font-bold text-purple-800 text-lg">{totalQuestions}</div>
                <div className="text-xs text-purple-600">Questions</div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Answer Review</h3>
              {answers.map((ans, idx) => {
                const q = currentQuestions.find(q => q.id === ans.questionId);
                if (!q) return null;
                return (
                  <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${ans.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                    {ans.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{q.question}</p>
                      {!ans.correct && (
                        <p className="text-xs text-gray-500 mt-1">
                          Your answer: <span className="text-red-600">{ans.userAnswer}</span>
                          {' | '}
                          Correct: <span className="text-green-600">{Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={startQuiz}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={() => setQuizState('menu')}
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

  // Playing state
  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
        {/* Progress Header */}
        <div className="px-6 py-4 border-b border-green-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-green-700">{currentIndex + 1}</span>
              <span>/</span>
              <span>{currentQuestions.length}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                {streak}x streak
              </span>
              <span className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                {formatTime(timer)}
              </span>
              <span className="font-medium text-green-700">{score} pts</span>
            </div>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        {currentQ && (
          <div className="p-6">
            <div className="mb-2">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full uppercase">
                {currentQ.type.replace('_', ' ')}
              </span>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                {currentQ.module}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-6">{currentQ.question}</h2>

            {/* Options based on question type */}
            {currentQ.type === 'multiple_choice' && currentQ.options && (
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const letter = option.charAt(0);
                  const text = option.slice(3);
                  const isSelected = selectedAnswer === letter;
                  const isCorrect = letter === currentQ.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(letter)}
                      disabled={showResult}
                      className={`quiz-option w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'answer-correct'
                          : showWrong
                          ? 'answer-wrong'
                          : isSelected
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          showCorrect ? 'bg-green-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-green-100 text-green-700'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-sm">{text}</span>
                        {showCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-3">
                {['True', 'False'].map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQ.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                      className={`quiz-option p-4 rounded-lg border-2 font-semibold text-center transition-all ${
                        showCorrect
                          ? 'answer-correct'
                          : showWrong
                          ? 'answer-wrong'
                          : isSelected
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                      }`}
                    >
                      {option}
                      {showCorrect && <CheckCircle className="w-5 h-5 text-green-500 inline ml-2" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-500 inline ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'identification' && (
              <div className="space-y-3">
                {!showResult ? (
                  <>
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && selectedAnswer.trim() && handleAnswer(selectedAnswer.trim())}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => selectedAnswer.trim() && handleAnswer(selectedAnswer.trim())}
                      disabled={!selectedAnswer.trim()}
                      className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <div className={`p-4 rounded-lg ${
                    answers[answers.length - 1]?.correct ? 'answer-correct' : 'answer-wrong'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {answers[answers.length - 1]?.correct ? (
                        <><CheckCircle className="w-5 h-5 text-green-600" /><span className="font-semibold text-green-800">Correct!</span></>
                      ) : (
                        <><XCircle className="w-5 h-5 text-red-600" /><span className="font-semibold text-red-800">Incorrect</span></>
                      )}
                    </div>
                    <p className="text-sm">
                      Your answer: <span className="font-medium">{selectedAnswer}</span>
                    </p>
                    {!answers[answers.length - 1]?.correct && (
                      <p className="text-sm mt-1">
                        Correct answer: <span className="font-medium">{Array.isArray(currentQ.correctAnswer) ? currentQ.correctAnswer[0] : currentQ.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Result & Explanation */}
            {showResult && (
              <div className="mt-4 space-y-3">
                {currentQ.explanation && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-sm text-blue-800">{currentQ.explanation}</p>
                  </div>
                )}
                <button
                  onClick={handleNext}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {currentIndex < currentQuestions.length - 1 ? (
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
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
