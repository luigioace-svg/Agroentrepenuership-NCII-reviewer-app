import { useState, useEffect } from 'react';
import { BookOpen, Brain, HelpCircle, Layers, Trophy, Home, Menu, X, ChevronRight, Leaf } from 'lucide-react';
import { TopicsList } from './sections/TopicsList';
import { TopicDetail } from './sections/TopicDetail';
import { QuizMode } from './sections/QuizMode';
import { FlashcardMode } from './sections/FlashcardMode';
import { EnumerationChallenge } from './sections/EnumerationChallenge';
import { StudyGuide } from './sections/StudyGuide';
import { topics } from './data/studyData';
import './App.css';

type Page = 'home' | 'topic' | 'quiz' | 'flashcards' | 'enumeration' | 'study-guide';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentPage('topic');
    setMobileMenuOpen(false);
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} onTopicSelect={handleTopicSelect} />;
      case 'topic':
        return <TopicDetail topicId={selectedTopicId} onBack={() => setCurrentPage('home')} />;
      case 'quiz':
        return <QuizMode onBack={() => setCurrentPage('home')} />;
      case 'flashcards':
        return <FlashcardMode onBack={() => setCurrentPage('home')} />;
      case 'enumeration':
        return <EnumerationChallenge onBack={() => setCurrentPage('home')} />;
      case 'study-guide':
        return <StudyGuide onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={navigate} onTopicSelect={handleTopicSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-green-900 leading-tight">Agroentrepreneurship</h1>
                <p className="text-xs text-green-600 leading-tight">NC II Study Reviewer</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <NavButton active={currentPage === 'home'} onClick={() => navigate('home')} icon={<Home className="w-4 h-4" />} label="Home" />
              <NavButton active={currentPage === 'study-guide'} onClick={() => navigate('study-guide')} icon={<BookOpen className="w-4 h-4" />} label="Study" />
              <NavButton active={currentPage === 'quiz'} onClick={() => navigate('quiz')} icon={<HelpCircle className="w-4 h-4" />} label="Quiz" />
              <NavButton active={currentPage === 'flashcards'} onClick={() => navigate('flashcards')} icon={<Layers className="w-4 h-4" />} label="Cards" />
              <NavButton active={currentPage === 'enumeration'} onClick={() => navigate('enumeration')} icon={<Brain className="w-4 h-4" />} label="Challenge" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-green-800" /> : <Menu className="w-5 h-5 text-green-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <MobileNavButton active={currentPage === 'home'} onClick={() => navigate('home')} icon={<Home className="w-4 h-4" />} label="Home" />
              <MobileNavButton active={currentPage === 'study-guide'} onClick={() => navigate('study-guide')} icon={<BookOpen className="w-4 h-4" />} label="Study Guide" />
              <MobileNavButton active={currentPage === 'quiz'} onClick={() => navigate('quiz')} icon={<HelpCircle className="w-4 h-4" />} label="Practice Quiz" />
              <MobileNavButton active={currentPage === 'flashcards'} onClick={() => navigate('flashcards')} icon={<Layers className="w-4 h-4" />} label="Flashcards" />
              <MobileNavButton active={currentPage === 'enumeration'} onClick={() => navigate('enumeration')} icon={<Brain className="w-4 h-4" />} label="Enumeration Challenge" />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-green-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-green-700">Agroentrepreneurship NC II — Comprehensive Study Reviewer</p>
          <p className="text-xs text-green-500 mt-1">Based on TESDA Training Regulations and Competency Standards</p>
        </div>
      </footer>
    </div>
  );
}

// Nav Button Component
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-green-100 text-green-800 shadow-sm'
          : 'text-green-700 hover:bg-green-50 hover:text-green-900'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-green-100 text-green-800'
          : 'text-green-700 hover:bg-green-50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Home Page Component
function HomePage({ onNavigate, onTopicSelect }: { onNavigate: (page: Page) => void; onTopicSelect: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white p-8 sm:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 w-20 h-20 rounded-full border-2 border-white" />
          <div className="absolute bottom-8 right-16 w-32 h-32 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border border-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-4">
            <Trophy className="w-3.5 h-3.5" />
            TESDA Qualification
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Agroentrepreneurship <span className="text-green-300">NC II</span> Reviewer
          </h1>
          <p className="text-green-100 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
            Your comprehensive interactive study guide for the TESDA National Certificate II assessment. Master all competency units through quizzes, flashcards, and challenges.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('study-guide')}
              className="inline-flex items-center gap-2 bg-white text-green-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-md hover:shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              Start Studying
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 bg-green-600/50 backdrop-blur-sm text-white border border-green-400/50 px-5 py-2.5 rounded-lg font-semibold hover:bg-green-600/70 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              Take Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section>
        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          Interactive Study Modes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ModeCard
            title="Study Guide"
            description="Browse all topics with definitions, lists, and exam tips"
            icon={<BookOpen className="w-6 h-6" />}
            color="bg-blue-50 border-blue-200 hover:border-blue-300"
            iconColor="bg-blue-500"
            onClick={() => onNavigate('study-guide')}
          />
          <ModeCard
            title="Practice Quiz"
            description="Test your knowledge with multiple choice and true/false questions"
            icon={<HelpCircle className="w-6 h-6" />}
            color="bg-green-50 border-green-200 hover:border-green-300"
            iconColor="bg-green-500"
            onClick={() => onNavigate('quiz')}
          />
          <ModeCard
            title="Flashcards"
            description="Memorize key terms and definitions with flip cards"
            icon={<Layers className="w-6 h-6" />}
            color="bg-amber-50 border-amber-200 hover:border-amber-300"
            iconColor="bg-amber-500"
            onClick={() => onNavigate('flashcards')}
          />
          <ModeCard
            title="Enumeration"
            description="Challenge yourself with list-recall exercises"
            icon={<Brain className="w-6 h-6" />}
            color="bg-purple-50 border-purple-200 hover:border-purple-300"
            iconColor="bg-purple-500"
            onClick={() => onNavigate('enumeration')}
          />
        </div>
      </section>

      {/* Topics Grid */}
      <section>
        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          Study Modules
        </h2>
        <TopicsList onTopicSelect={onTopicSelect} />
      </section>

      {/* Stats */}
      <section className="bg-white rounded-xl border border-green-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-green-900 mb-4">Study Progress Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox number={topics.length} label="Study Topics" color="text-green-600" />
          <StatBox number={40} label="Quiz Questions" color="text-blue-600" />
          <StatBox number={20} label="Flashcards" color="text-amber-600" />
          <StatBox number={4} label="Core Competencies" color="text-purple-600" />
        </div>
      </section>
    </div>
  );
}

function ModeCard({ title, description, icon, color, iconColor, onClick }: {
  title: string; description: string; icon: React.ReactNode; color: string; iconColor: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} border rounded-xl p-5 text-left transition-all hover:shadow-md group`}
    >
      <div className={`${iconColor} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 mt-3 text-sm font-medium text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
        Start <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
}

function StatBox({ number, label, color }: { number: number; label: string; color: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-green-50/50">
      <div className={`text-2xl sm:text-3xl font-bold ${color}`}>{number}</div>
      <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

export default App;
