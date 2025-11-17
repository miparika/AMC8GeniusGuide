export interface Problem {
  problem: string;
  options: string[];
  answer: string;
  topic: string;
  problemImage?: string; // Optional field for SVG image string
}

export interface Solution {
  solution: string;
  concepts: string;
}

export interface ProgressEntry {
  topic: string;
  correct: number;
  total: number;
}

export interface VerifiedProblem {
    problem: Problem;
    solution: Solution;
}