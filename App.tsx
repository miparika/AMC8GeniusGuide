import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { ProblemSolver } from './components/ProblemSolver';
import { ProgressChart } from './components/ProgressChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getNewProblem } from './services/geminiService';
import type { ProgressEntry, VerifiedProblem } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ErrorIcon, InfoIcon } from './components/icons';
import { INITIAL_PROBLEMS } from './lib/initialProblems';

const PREFETCH_BUFFER_SIZE = 2; // Desired number of problems to keep in the queue once API fetching starts.
const API_FETCH_UNLOCK_COUNT = 2; // Number of completed problems before we start using the API.

const App: React.FC = () => {
  const [problemQueue, setProblemQueue] = useState<VerifiedProblem[]>([]);
  const [problemsCompletedCount, setProblemsCompletedCount] = useState(0);
  const usedInitialIndices = useRef(new Set<number>());

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPrefetching, setIsPrefetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const [progressData, setProgressData] = useLocalStorage<ProgressEntry[]>('amc8-progress', [
    { topic: 'Combinatorics', correct: 0, total: 0 },
    { topic: 'Number Theory', correct: 0, total: 0 },
    { topic: 'Geometry', correct: 0, total: 0 },
    { topic: 'Algebra', correct: 0, total: 0 },
    { topic: 'Probability', correct: 0, total: 0 },
  ]);
  
  const addInitialProblemToQueue = useCallback(() => {
    if (usedInitialIndices.current.size >= INITIAL_PROBLEMS.length) {
      return; // Stop adding if we've used all initial problems
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * INITIAL_PROBLEMS.length);
    } while (usedInitialIndices.current.has(randomIndex));
    
    usedInitialIndices.current.add(randomIndex);
    const newProblem = INITIAL_PROBLEMS[randomIndex];
    setProblemQueue(prev => [...prev, newProblem]);
  }, []);

  // Effect for initial population from the local pool
  useEffect(() => {
    if (problemQueue.length === 0 && problemsCompletedCount === 0) {
      addInitialProblemToQueue();
      setIsLoading(false);
    }
  }, [addInitialProblemToQueue, problemQueue.length, problemsCompletedCount]);

  // Effect for continuous API pre-fetching to keep the buffer full
  useEffect(() => {
    const shouldFetchFromApi = problemsCompletedCount >= API_FETCH_UNLOCK_COUNT;
    const isBufferLow = problemQueue.length < PREFETCH_BUFFER_SIZE;

    if (shouldFetchFromApi && isBufferLow && !isFetchingRef.current) {
        const fetchProblems = async () => {
            if (isFetchingRef.current) return;
            isFetchingRef.current = true;
            setIsPrefetching(true);
            try {
                const needed = PREFETCH_BUFFER_SIZE - problemQueue.length;
                if (needed > 0) {
                    const promises = Array(needed).fill(0).map(() => getNewProblem());
                    const newProblems = await Promise.all(promises);
                    setProblemQueue(prev => [...prev, ...newProblems]);
                }
            } catch (err) {
                setError('Failed to fetch new problems. Please check your connection and refresh.');
                console.error(err);
            } finally {
                setIsPrefetching(false);
                isFetchingRef.current = false;
            }
        };
        fetchProblems();
    }
  }, [problemQueue.length, problemsCompletedCount]);
  
  const handleNextProblem = () => {
    const newCount = problemsCompletedCount + 1;
    setProblemsCompletedCount(newCount);

    // For early problems, pull from the local pool. The useEffect will handle API calls later.
    if (newCount < 3) {
      addInitialProblemToQueue();
    }
    
    // Always remove the completed problem from the front of the queue.
    setProblemQueue(prev => prev.slice(1));
  };
  
  const handleProblemAttempt = (isCorrect: boolean, topic: string) => {
    setProgressData(prevData => {
      const topicIndex = prevData.findIndex(item => item.topic === topic);
      const newData = [...prevData];
      
      if (topicIndex !== -1) {
        newData[topicIndex] = {
          ...newData[topicIndex],
          correct: newData[topicIndex].correct + (isCorrect ? 1 : 0),
          total: newData[topicIndex].total + 1,
        };
      } else {
        newData.push({ topic, correct: isCorrect ? 1 : 0, total: 1 });
      }
      return newData;
    });
  };

  const currentVerifiedProblem = problemQueue[0] || null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header isPrefetching={isPrefetching} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-300">Problem Challenge</h2>
            {isLoading && (
              <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 min-h-[400px]">
                <LoadingSpinner />
                <p className="mt-4 text-lg">Loading first problem...</p>
              </div>
            )}
            {error && !isLoading && (
               <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md shadow-md" role="alert">
                <div className="flex items-center">
                   <ErrorIcon className="h-6 w-6 mr-3" />
                   <div>
                     <p className="font-bold">An Error Occurred</p>
                     <p>{error}</p>
                   </div>
                 </div>
               </div>
            )}
            {!isLoading && !error && currentVerifiedProblem && (
              <ProblemSolver 
                key={currentVerifiedProblem.problem.problem} 
                problem={currentVerifiedProblem.problem} 
                solution={currentVerifiedProblem.solution}
                onNextProblem={handleNextProblem} 
                onProblemAttempt={handleProblemAttempt}
              />
            )}
             {!isLoading && !error && !currentVerifiedProblem && (
              <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 min-h-[400px]">
                <InfoIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold">All Done for Now!</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">The next problem is being generated in the background. It will appear here shortly.</p>
                {isPrefetching && <div className="mt-4"><LoadingSpinner /></div>}
              </div>
             )}
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-300">Your Progress</h2>
            <ProgressChart data={progressData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
