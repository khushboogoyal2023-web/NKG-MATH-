import { useState } from 'react';
import { motion } from 'framer-motion';
import WorkbookQuestions from '../components/workbook/WorkbookQuestions';
import Whiteboard from '../components/workbook/Whiteboard';

const tabs = [
  { id: 'questions', label: '📝 सवाल हल करो', emoji: '📝' },
  { id: 'whiteboard', label: '🖊️ डिजिटल व्हाइटबोर्ड', emoji: '🖊️' },
];

export default function Workbook() {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="font-heading text-3xl md:text-4xl mb-1">📒 वर्कबुक</h1>
        <p className="text-muted-foreground font-body">सवाल हल करो और रफ काम भी करो!</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-muted rounded-2xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 rounded-xl font-heading text-sm md:text-base transition-all ${
              activeTab === tab.id
                ? 'bg-white shadow-md text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'questions' && <WorkbookQuestions />}
      {activeTab === 'whiteboard' && <Whiteboard />}
    </div>
  );
}
