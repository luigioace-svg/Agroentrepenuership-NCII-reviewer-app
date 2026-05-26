import { topics } from '../data/studyData';
import { ChevronRight } from 'lucide-react';

interface TopicsListProps {
  onTopicSelect: (topicId: string) => void;
  compact?: boolean;
}

const iconMap: Record<string, string> = {};
topics.forEach(t => { iconMap[t.id] = t.icon; });

export function TopicsList({ onTopicSelect, compact = false }: TopicsListProps) {
  if (compact) {
    return (
      <div className="space-y-1">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-green-50 transition-colors text-left group"
          >
            <span className="text-lg">{topic.icon}</span>
            <span className="text-sm font-medium text-green-800 group-hover:text-green-900 flex-1">
              {topic.title}
            </span>
            <ChevronRight className="w-4 h-4 text-green-400 group-hover:text-green-600" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic, index) => (
        <button
          key={topic.id}
          onClick={() => onTopicSelect(topic.id)}
          className="topic-card bg-white border border-green-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">{topic.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-green-900 text-sm leading-snug mb-1">
                {topic.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {topic.description}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600">
                {topic.sections.length} sections
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
