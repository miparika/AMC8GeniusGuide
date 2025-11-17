import React, { useState } from 'react';
import type { Problem, Solution } from '../types';
import { getHints } from '../services/geminiService';
import { LightbulbIcon, CheckCircleIcon, XCircleIcon, SparklesIcon, BookOpenIcon } from './icons';

interface ProblemSolverProps {
  problem: Problem;
  solution: Solution;
  onNextProblem: () => void;
  onProblemAttempt: (isCorrect: boolean, topic: string) => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({ problem, solution, onNextProblem, onProblemAttempt }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const [hints, setHints] = useState<string[]>([]);
  const [revealedHints, setRevealedHints] = useState(0);
  const [isLoadingHints, setIsLoadingHints] = useState(false);

  const handleGetHint = async () => {
    if (revealedHints < 3) {
      if (hints.length === 0) {
        setIsLoadingHints(true);
        try {
          const fetchedHints = await getHints(problem);
          setHints(fetchedHints);
          setRevealedHints(1);
        } catch (e) {
          console.error("Failed to fetch hints");
        } finally {
          setIsLoadingHints(false);
        }
      } else {
        setRevealedHints(prev => prev + 1);
      }
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    const selectedLetter = selectedOption.substring(1, 2);
    const correct = selectedLetter === problem.answer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    onProblemAttempt(correct, problem.topic);
  };
  
  const getOptionClasses = (option: string) => {
    const letter = option.substring(1, 2);
    let classes = 'p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center';
    if (!isAnswerChecked) {
      return `${classes} ${selectedOption === option ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-blue-400'}`;
    }
    if (letter === problem.answer) {
      return `${classes} bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200`;
    }
    if (selectedOption === option && letter !== problem.answer) {
      return `${classes} bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200`;
    }
    return `${classes} bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold mb-4 leading-relaxed">{problem.problem}</h3>
            <span className="ml-4 flex-shrink-0 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-1 rounded-full">{problem.topic}</span>
        </div>

        {problem.problemImage && (
            <div className="my-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-700/50 flex justify-center">
              <div className="max-w-xs" dangerouslySetInnerHTML={{ __html: problem.problemImage }} />
            </div>
        )}
        
        <div className="space-y-3">
          {problem.options.map(option => (
            <div key={option} className={getOptionClasses(option)} onClick={() => !isAnswerChecked && setSelectedOption(option)}>
                {isAnswerChecked && option.substring(1,2) === problem.answer && <CheckCircleIcon className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />}
                {isAnswerChecked && selectedOption === option && option.substring(1,2) !== problem.answer && <XCircleIcon className="h-5 w-5 mr-3 text-red-600 dark:text-red-400" />}
                {option}
            </div>
          ))}
        </div>

        {!isAnswerChecked && (
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="w-full sm:w-auto flex-grow justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-600 transition-colors"
            >
              Check Answer
            </button>
            <button 
              onClick={handleGetHint} 
              disabled={revealedHints >= 3 || isLoadingHints}
              className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <LightbulbIcon className="h-5 w-5 mr-2" />
                {isLoadingHints ? 'Getting Hint...' : `Get Hint (${3 - revealedHints} left)`}
            </button>
          </div>
        )}
      </div>

      {hints.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-lg shadow-md space-y-4">
              <h4 className="font-bold text-amber-800 dark:text-amber-200">Hints</h4>
              {hints.slice(0, revealedHints).map((hint, index) => (
                  <p key={index} className="text-amber-700 dark:text-amber-300 animate-fade-in"><strong>Hint {index + 1}:</strong> {hint}</p>
              ))}
          </div>
      )}

      {isAnswerChecked && (
        <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in">
                <h4 className="text-lg font-bold mb-3 flex items-center"><BookOpenIcon className="h-5 w-5 mr-2"/>Detailed Solution</h4>
                <div className="prose prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: solution.solution.replace(/\n/g, '<br />') }} />
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in">
                <h4 className="text-lg font-bold mb-3 flex items-center"><SparklesIcon className="h-5 w-5 mr-2"/>Key Concepts</h4>
                <div className="prose prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: solution.concepts.replace(/\n/g, '<br />') }} />
            </div>
        </>
      )}

      {isAnswerChecked && (
          <div className="mt-6 text-center">
              <button
                  onClick={onNextProblem}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform hover:scale-105"
              >
                  Next Problem
              </button>
          </div>
      )}

    </div>
  );
};