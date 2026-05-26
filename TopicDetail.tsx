import { useState } from 'react';
import { topics } from '../data/studyData';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, List, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

interface TopicDetailProps {
  topicId: string;
  onBack: () => void;
}

export function TopicDetail({ topicId, onBack }: TopicDetailProps) {
  const topic = topics.find(t => t.id === topicId);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Topic not found.</p>
        <button onClick={onBack} className="mt-4 text-green-600 hover:underline">Go back</button>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-4 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Topics
      </button>

      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{topic.icon}</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{topic.title}</h1>
              <p className="text-green-100 text-sm mt-1">{topic.description}</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="divide-y divide-green-100">
          {topic.sections.map((section) => {
            const isExpanded = expandedSections[section.id] ?? true;
            return (
              <div key={section.id} className="bg-white">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-5 py-4 hover:bg-green-50/50 transition-colors"
                >
                  <h2 className="font-bold text-green-900 text-sm sm:text-base text-left pr-4">{section.title}</h2>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3">
                    {section.content.map((item, idx) => {
                      switch (item.type) {
                        case 'definition':
                          return (
                            <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-green-600" />
                                <h4 className="font-bold text-green-800 text-sm">{item.term}</h4>
                              </div>
                              <p className="text-sm text-green-700 leading-relaxed">{item.definition}</p>
                            </div>
                          );

                        case 'list':
                          return (
                            <div key={idx}>
                              {item.title && (
                                <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                                  <List className="w-4 h-4 text-green-600" />
                                  {item.title}
                                </h4>
                              )}
                              <ul className="space-y-1.5">
                                {item.items?.map((listItem, liIdx) => (
                                  <li key={liIdx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{listItem}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );

                        case 'steps':
                          return (
                            <div key={idx}>
                              {item.title && (
                                <h4 className="font-semibold text-gray-800 text-sm mb-3">{item.title}</h4>
                              )}
                              <div className="space-y-2">
                                {item.steps?.map((step, sIdx) => (
                                  <div key={sIdx} className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                      {sIdx + 1}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{step.title}</p>
                                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );

                        case 'table':
                          return (
                            <div key={idx} className="overflow-x-auto">
                              {item.title && (
                                <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.title}</h4>
                              )}
                              <table className="w-full text-sm border border-green-200 rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-green-100">
                                    {item.tableHeaders?.map((header, hIdx) => (
                                      <th key={hIdx} className="text-left px-3 py-2 font-semibold text-green-800 text-xs uppercase tracking-wider">
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-green-100">
                                  {item.tableRows?.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-green-50/50">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="px-3 py-2 text-gray-700">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );

                        case 'note':
                          return (
                            <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                              <p className="text-sm text-blue-800 leading-relaxed italic">{item.text}</p>
                            </div>
                          );

                        case 'exam_tip':
                          return (
                            <div key={idx} className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <h4 className="font-bold text-amber-800 text-sm">{item.title || 'Exam Tip'}</h4>
                              </div>
                              <p className="text-sm text-amber-800 leading-relaxed">{item.text}</p>
                            </div>
                          );

                        case 'key_term':
                          return (
                            <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-purple-500" />
                                <span className="font-bold text-purple-800 text-sm">{item.term}:</span>
                                <span className="text-sm text-purple-700">{item.definition}</span>
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
