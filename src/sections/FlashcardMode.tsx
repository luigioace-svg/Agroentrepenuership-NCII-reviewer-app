import { useState, useCallback } from 'react';
import { flashcards, keyTermsGame } from '../data/studyData';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Layers, Shuffle, Trophy, BookOpen } from 'lucide-react';

interface FlashcardModeProps {
  onBack: () => void;
}

type Mode = 'menu' | 'flip' | 'match';

export function FlashcardMode({ onBack }: FlashcardModeProps) {
  const [mode, setMode] = useState<Mode>('menu');

  if (mode === 'flip') {
    return <FlipCards onBack={() => setMode('menu')} />;
  }

  if (mode === 'match') {
    return <MatchGame onBack={() => setMode('menu')} />;
  }

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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Flashcards</h1>
              <p className="text-amber-100 text-sm">Memorize key terms and definitions</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <ModeCard
            title="Flip Cards"
            description={`Study ${flashcards.length} key terms with interactive flashcards. Click to reveal definitions.`}
            icon={<RotateCw className="w-5 h-5" />}
            color="bg-green-600 hover:bg-green-700"
            onClick={() => setMode('flip')}
          />
          <ModeCard
            title="Matching Challenge"
            description="Match terms with their definitions in a timed memory game."
            icon={<Shuffle className="w-5 h-5" />}
            color="bg-amber-500 hover:bg-amber-600"
            onClick={() => setMode('match')}
          />

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 text-sm mb-2">Available Categories</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(flashcards.map(f => f.category))).map(cat => (
                <span key={cat} className="bg-white text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ title, description, icon, color, onClick }: {
  title: string; description: string; icon: React.ReactNode; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full ${color} text-white p-5 rounded-xl text-left transition-all shadow-md hover:shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-white/80 text-sm mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
}

// Flip Cards Mode
function FlipCards({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState([...flashcards]);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [studyAgain, setStudyAgain] = useState<Set<number>>(new Set());

  const shuffle = useCallback(() => {
    setShuffled(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % shuffled.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + shuffled.length) % shuffled.length);
    }, 150);
  };

  const markKnown = () => {
    setKnown(prev => new Set(prev).add(shuffled[currentIndex].id));
    handleNext();
  };

  const markStudyAgain = () => {
    setStudyAgain(prev => new Set(prev).add(shuffled[currentIndex].id));
    handleNext();
  };

  const current = shuffled[currentIndex];
  // Progress tracking

  return (
    <div className="max-w-xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={shuffle}
          className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Card {currentIndex + 1} of {shuffled.length}</span>
          <span>{known.size} known · {studyAgain.size} study again</span>
        </div>
        <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(currentIndex / shuffled.length) * 100}%` }} />
        </div>
      </div>

      {/* Card */}
      <div className="flashcard cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard-inner relative ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-front bg-white rounded-xl border-2 border-green-300 shadow-lg p-8 min-h-[240px] flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full mb-4">
              {current.category}
            </span>
            <h3 className="text-2xl font-bold text-green-900 text-center">{current.term}</h3>
            <p className="text-sm text-gray-400 mt-4">Click to reveal definition</p>
          </div>

          {/* Back */}
          <div className="flashcard-back absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-8 min-h-[240px] flex flex-col items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-200 mb-3" />
            <p className="text-white text-center text-lg leading-relaxed">{current.definition}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Prev
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); markStudyAgain(); }}
            className="flex items-center gap-1.5 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Study Again
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); markKnown(); }}
            className="flex items-center gap-1.5 bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
          >
            Got it!
          </button>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {known.size === shuffled.length && (
        <div className="mt-6 bg-green-100 rounded-xl p-6 text-center">
          <Trophy className="w-10 h-10 text-green-600 mx-auto mb-2" />
          <h3 className="font-bold text-green-800 text-lg">All cards reviewed!</h3>
          <p className="text-green-600 text-sm">You&apos;ve gone through all the flashcards.</p>
        </div>
      )}
    </div>
  );
}

// Matching Game
interface MatchItem {
  id: number;
  text: string;
  type: 'term' | 'definition';
  pairId: number;
}

function MatchGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<MatchItem[]>([]);
  const [selected, setSelected] = useState<MatchItem | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game
  useState(() => {
    initGame();
  });

  function initGame() {
    const pairs = [...keyTermsGame].sort(() => Math.random() - 0.5).slice(0, 6);
    const gameItems: MatchItem[] = [];
    pairs.forEach((pair, idx) => {
      gameItems.push({ id: idx * 2, text: pair.term, type: 'term', pairId: idx });
      gameItems.push({ id: idx * 2 + 1, text: pair.match, type: 'definition', pairId: idx });
    });
    setItems(gameItems.sort(() => Math.random() - 0.5));
    setMatched(new Set());
    setScore(0);
    setMoves(0);
    setGameComplete(false);
    setSelected(null);
  }

  const handleClick = (item: MatchItem) => {
    if (matched.has(item.pairId) || (selected && selected.id === item.id)) return;

    if (!selected) {
      setSelected(item);
      return;
    }

    // Check match
    if (selected.pairId === item.pairId && selected.type !== item.type) {
      // Match!
      setMatched(prev => {
        const newSet = new Set(prev);
        newSet.add(item.pairId);
        if (newSet.size === 6) {
          setGameComplete(true);
        }
        return newSet;
      });
      setScore(prev => prev + 100);
    } else {
      setScore(prev => Math.max(0, prev - 10));
    }

    setMoves(prev => prev + 1);
    setSelected(null);
  };

  return (
    <div className="max-w-xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium text-gray-600">Score: <span className="text-green-700 font-bold">{score}</span></span>
          <span className="font-medium text-gray-600">Moves: <span className="text-blue-700 font-bold">{moves}</span></span>
        </div>
      </div>

      {gameComplete ? (
        <div className="bg-green-100 rounded-xl p-8 text-center">
          <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-green-800 text-xl mb-2">Congratulations!</h3>
          <p className="text-green-600 mb-4">You matched all pairs in {moves} moves!</p>
          <button
            onClick={initGame}
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {items.map((item) => {
            const isMatched = matched.has(item.pairId);
            const isSelected = selected?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                disabled={isMatched}
                className={`match-card p-3 sm:p-4 rounded-xl border-2 text-sm font-medium text-center min-h-[80px] flex items-center justify-center transition-all ${
                  isMatched
                    ? 'bg-green-100 border-green-400 text-green-700 opacity-50'
                    : isSelected
                    ? 'bg-amber-100 border-amber-400 text-amber-800 ring-2 ring-amber-300'
                    : 'bg-white border-green-200 text-gray-700 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                <span className="leading-snug">{item.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {!gameComplete && (
        <button
          onClick={initGame}
          className="w-full mt-4 bg-gray-100 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}
