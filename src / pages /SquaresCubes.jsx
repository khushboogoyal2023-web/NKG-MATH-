import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export default function SquaresCubes() {
  const [searchSq, setSearchSq] = useState('');
  const [searchCb, setSearchCb] = useState('');

  const squares = Array.from({ length: 100 }, (_, i) => ({ n: i + 1, val: (i + 1) ** 2 }));
  const cubes = Array.from({ length: 50 }, (_, i) => ({ n: i + 1, val: (i + 1) ** 3 }));

  const filteredSquares = searchSq ? squares.filter(s => String(s.n).includes(searchSq)) : squares;
  const filteredCubes = searchCb ? cubes.filter(c => String(c.n).includes(searchCb)) : cubes;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl text-center mb-2">⭐ वर्ग और घन</h1>
      <p className="text-center text-muted-foreground font-body mb-8">
        वर्ग (Squares) 1-100 | घन (Cubes) 1-50
      </p>

      <Tabs defaultValue="squares" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 h-12 rounded-2xl">
          <TabsTrigger value="squares" className="rounded-xl font-heading text-base">📐 वर्ग (n²)</TabsTrigger>
          <TabsTrigger value="cubes" className="rounded-xl font-heading text-base">🧊 घन (n³)</TabsTrigger>
        </TabsList>

        <TabsContent value="squares">
          <div className="max-w-xs mx-auto mb-6">
            <Input
              type="number"
              placeholder="🔍 संख्या खोजें..."
              value={searchSq}
              onChange={e => setSearchSq(e.target.value)}
              className="text-center rounded-2xl h-12 font-body"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {filteredSquares.map(({ n, val }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.01, 0.5) }}
                className="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform"
              >
                <div className="font-heading text-2xl">{n}²</div>
                <div className="text-xs opacity-80 font-body">= {val}</div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cubes">
          <div className="max-w-xs mx-auto mb-6">
            <Input
              type="number"
              placeholder="🔍 संख्या खोजें..."
              value={searchCb}
              onChange={e => setSearchCb(e.target.value)}
              className="text-center rounded-2xl h-12 font-body"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {filteredCubes.map(({ n, val }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.01, 0.3) }}
                className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform"
              >
                <div className="font-heading text-2xl">{n}³</div>
                <div className="text-xs opacity-80 font-body">= {val.toLocaleString()}</div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
