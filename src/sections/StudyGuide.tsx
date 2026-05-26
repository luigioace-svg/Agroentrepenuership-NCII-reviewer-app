import { useState } from 'react';
import { topics } from '../data/studyData';
import { ArrowLeft, Search, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { TopicDetail } from './TopicDetail';

interface StudyGuideProps {
  onBack: () => void;
}

export function StudyGuide({ onBack }: StudyGuideProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  if (selectedTopicId) {
    return <TopicDetail topicId={selectedTopicId} onBack={() => setSelectedTopicId('')} />;
  }

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.sections.some(section =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-4 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900">Study Guide</h1>
              <p className="text-sm text-gray-500">Browse all topics and study materials</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics, sections, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Topics List */}
        <div className="divide-y divide-green-50">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className="flex items-center gap-4 w-full px-6 py-4 hover:bg-green-50/50 transition-colors text-left"
            >
              <span className="text-2xl flex-shrink-0">{topic.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-green-900 text-sm">{topic.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <BookOpen className="w-3 h-3" />
                    {topic.sections.length} sections
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Lightbulb className="w-3 h-3" />
                    {topic.sections.reduce((acc, s) => acc + s.content.filter(c => c.type === 'exam_tip').length, 0)} tips
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0" />
            </button>
          ))}

          {filteredTopics.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No topics found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
