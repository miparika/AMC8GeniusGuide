import type { VerifiedProblem } from '../types';

// A pool of high-quality, pre-generated problems to serve instantly for the first few user interactions.
// This list can be expanded to any size.
export const INITIAL_PROBLEMS: VerifiedProblem[] = [
  {
    problem: {
      problem: "A square with side length 4 is inscribed in a circle. What is the area of the region inside the circle but outside the square?",
      options: ["(A) 4π - 16", "(B) 8π - 16", "(C) 16π - 16", "(D) 8π - 8", "(E) 16π - 8"],
      answer: "B",
      topic: "Geometry",
      difficulty: "Mid-to-High Difficulty (Approx. #18-22)",
      problemImage: `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#d3e3fd" stroke="#3b82f6" stroke-width="1"/><rect x="21.7" y="21.7" width="56.6" height="56.6" fill="#ffffff" stroke="#1e293b" stroke-width="1"/></svg>`
    },
    solution: {
      solution: "Let the side length of the square be s = 4. The diagonal of the inscribed square is the diameter of the circle. Using the Pythagorean theorem, the diagonal d satisfies d² = 4² + 4² = 32, so d = √32 = 4√2. The radius of the circle is r = d/2 = 2√2. The area of the circle is πr² = π(2√2)² = 8π. The area of the square is s² = 4² = 16. The required area is the area of the circle minus the area of the square, which is 8π - 16.",
      concepts: "**Key Concepts:**\n1. **Inscribed Shapes:** The diagonal of a square inscribed in a circle is equal to the circle's diameter.\n2. **Pythagorean Theorem:** To find the diagonal of the square.\n3. **Area Formulas:** For a circle (πr²) and a square (s²)."
    }
  },
  {
    problem: {
      problem: "What is the sum of the prime factors of 2024?",
      options: ["(A) 18", "(B) 20", "(C) 36", "(D) 101", "(E) 114"],
      answer: "C",
      topic: "Number Theory",
      difficulty: "Medium Difficulty (Approx. #15-20)",
      problemImage: null
    },
    solution: {
      solution: "To find the sum of the prime factors of 2024, we first need to find its prime factorization. \n2024 is an even number, so it's divisible by 2. \n2024 = 2 * 1012\n1012 = 2 * 506\n506 = 2 * 253\nTo factor 253, we can test small prime numbers. It's not divisible by 3 (sum of digits is 10) or 5. Let's try 7: 253/7 is not an integer. Let's try 11: 253 = 11 * 23. Both 11 and 23 are prime numbers. So, the prime factorization of 2024 is 2 * 2 * 2 * 11 * 23, or 2³ * 11 * 23. The distinct prime factors are 2, 11, and 23. The sum of these prime factors is 2 + 11 + 23 = 36.",
      concepts: "**Key Concepts:**\n1. **Prime Factorization:** Breaking down a composite number into its prime factors.\n2. **Divisibility Rules:** Quickly testing for divisibility by small primes."
    }
  },
  {
    problem: {
        problem: "How many distinct four-letter arrangements can be formed from the letters of the word 'GENIUS'?",
        options: ["(A) 24", "(B) 120", "(C) 360", "(D) 720", "(E) 1296"],
        answer: "C",
        topic: "Combinatorics",
        difficulty: "Medium Difficulty (Approx. #12-18)",
        problemImage: null
    },
    solution: {
        solution: "The word 'GENIUS' has 6 distinct letters. We want to find the number of distinct four-letter arrangements. This is a permutation problem, as the order of the letters matters. We are choosing 4 letters out of 6 and arranging them. The formula for permutations is P(n, k) = n! / (n-k)!, where n is the total number of items to choose from, and k is the number of items to choose. In this case, n=6 and k=4. So, P(6, 4) = 6! / (6-4)! = 6! / 2! = (6 * 5 * 4 * 3 * 2 * 1) / (2 * 1) = 6 * 5 * 4 * 3 = 360. Therefore, there are 360 distinct four-letter arrangements.",
        concepts: "**Key Concepts:**\n1. **Permutations:** Understanding that order matters when arranging items.\n2. **Factorials:** Calculating factorials to solve permutation problems."
    }
  },
  {
    problem: {
        problem: "If x and y are positive integers such that 3x + 5y = 50, what is a possible value of x + y?",
        options: ["(A) 8", "(B) 9", "(C) 10", "(D) 11", "(E) 12"],
        answer: "E",
        topic: "Algebra",
        difficulty: "High Difficulty (Approx. #20-24)",
        problemImage: null
    },
    solution: {
        solution: "We are looking for positive integer solutions (x, y) to the equation 3x + 5y = 50. We can test integer values for y and see if we get an integer for x. Since x and y are positive, 5y must be less than 50, so y must be less than 10. Also, 50 - 5y must be a multiple of 3. Let's test y=1, 2, 3... \nIf y=1, 3x + 5 = 50 -> 3x = 45 -> x=15. This is a valid solution. x+y = 15+1=16. \nIf y=2, 3x + 10 = 50 -> 3x = 40 (not an integer x). \nIf y=3, 3x + 15 = 50 -> 3x = 35 (not an integer x). \nIf y=4, 3x + 20 = 50 -> 3x = 30 -> x=10. This is a valid solution. x+y = 10+4=14. \nIf y=5, 3x + 25 = 50 -> 3x = 25 (not an integer x). \nIf y=6, 3x + 30 = 50 -> 3x = 20 (not an integer x). \nIf y=7, 3x + 35 = 50 -> 3x = 15 -> x=5. This is a valid solution. x+y = 5+7=12. \nIf y=8 or 9, x will not be an integer. The possible integer pairs (x,y) are (15,1), (10,4), and (5,7). The possible sums for x+y are 16, 14, and 12. Looking at the options, only 12 is available.",
        concepts: "**Key Concepts:**\n1. **Linear Diophantine Equations:** Finding integer solutions to equations of the form ax + by = c.\n2. **Systematic Testing:** Iterating through possible values for one variable to find valid solutions for the other."
    }
  },
  {
    problem: {
        problem: "A bag contains 5 red marbles, 4 blue marbles, and 3 green marbles. If two marbles are drawn from the bag without replacement, what is the probability that they are both the same color?",
        options: ["(A) 19/66", "(B) 1/3", "(C) 21/66", "(D) 19/72", "(E) 1/4"],
        answer: "A",
        topic: "Probability",
        difficulty: "Mid-to-High Difficulty (Approx. #17-21)",
        problemImage: null
    },
    solution: {
        solution: "First, find the total number of marbles: 5 (red) + 4 (blue) + 3 (green) = 12 marbles. We want to find the probability of drawing two marbles of the same color. This can happen in three mutually exclusive ways: both are red, both are blue, or both are green. We calculate the probability for each case and add them together.\n\nCase 1: Both marbles are red.\nThe probability of the first marble being red is 5/12. After drawing one red marble, there are 4 red marbles left and a total of 11 marbles. So, the probability of the second marble being red is 4/11. P(Red and Red) = (5/12) * (4/11) = 20/132.\n\nCase 2: Both marbles are blue.\nThe probability of the first being blue is 4/12. The probability of the second being blue is 3/11. P(Blue and Blue) = (4/12) * (3/11) = 12/132.\n\nCase 3: Both marbles are green.\nThe probability of the first being green is 3/12. The probability of the second being green is 2/11. P(Green and Green) = (3/12) * (2/11) = 6/132.\n\nTotal Probability = P(Red and Red) + P(Blue and Blue) + P(Green and Green) = 20/132 + 12/132 + 6/132 = 38/132. Now, we simplify the fraction. Both numbers are divisible by 2: 38/132 = 19/66.",
        concepts: "**Key Concepts:**\n1. **Probability without Replacement:** Understanding how the total number of outcomes changes after each event.\n2. **Mutually Exclusive Events:** The probability of one of several mutually exclusive events occurring is the sum of their individual probabilities."
    }
  },
  {
    problem: {
        problem: "At a restaurant, chicken nuggets can be ordered in boxes of 6, 9, or 20. What is the largest number of nuggets that CANNOT be ordered?",
        options: ["(A) 23", "(B) 37", "(C) 43", "(D) 49", "(E) 53"],
        answer: "C",
        topic: "Number Theory",
        difficulty: "High Difficulty (Approx. #21-25)",
        problemImage: null
    },
    solution: {
        solution: "This is a variation of the Frobenius Coin Problem, also known as the McNugget number problem. We are looking for the largest number that cannot be expressed in the form 6x + 9y + 20z for non-negative integers x, y, z. First, notice that any combination of 6s and 9s will be a multiple of 3. Let's analyze numbers modulo 3. \n20 ≡ 2 (mod 3). \n20*2 = 40 ≡ 1 (mod 3). \n20*3 = 60 ≡ 0 (mod 3).\nThis means we can create numbers with any remainder modulo 3 using combinations of 20s, and then add multiples of 3 (using 6s and 9s) to get any sufficiently large number. The problem is finding the largest number we *can't* make. Let's test the options. We'll check numbers backwards from 43.\n49 = 20*2 + 9*1 (40+9)\n48 = 6*8\n47 = 20*1 + 9*3 (20+27)\n46 = 20*2 + 6*1 (40+6)\n45 = 9*5\n44 = 20*1 + 6*4 (20+24)\n43: Let's try to make 43. Using 20s: \n- z=0: 43 is not a multiple of 3. No solution.\n- z=1: 43 - 20 = 23. 23 is not a multiple of 3. No solution.\n- z=2: 43 - 40 = 3. 3 is a multiple of 3, but cannot be made with 6s and 9s (since 3 is too small). Wait, 6x+9y=3 has no non-negative integer solutions. \nWait, let's recheck. 43-40 = 3. `6x+9y=3` -> `2x+3y=1`. If x= -1, y=1, it works, but not for non-negative integers. So 43 cannot be made.\nSince we showed that 44, 45, 46, 47, 48, 49 can be made, it's highly likely that all subsequent numbers can also be made. Thus, 43 is the largest number that cannot be ordered.",
        concepts: "**Key Concepts:**\n1. **Frobenius Coin Problem:** Understanding the concept of finding the largest number not representable by a linear combination of integers.\n2. **Modular Arithmetic & Casework:** Systematically checking possibilities to prove a number cannot be formed."
    }
  },
  {
    problem: {
        problem: "A right triangle has legs of length 6 and 8. Semicircles are drawn on the two legs and the hypotenuse as diameters. What is the total area of the two crescent-shaped regions (lunes) formed?",
        options: ["(A) 12", "(B) 24", "(C) 12.5π", "(D) 24π", "(E) 48"],
        answer: "B",
        topic: "Geometry",
        difficulty: "High Difficulty (Approx. #21-25)",
        problemImage: `<svg width="200" height="180" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"><path d="M 10 90 L 10 30 L 90 90 Z" fill="#e0e7ff" stroke="#1e293b" stroke-width="1"/><path d="M 10 60 C 10 43.4 23.4 30 40 30 C 56.6 30 70 43.4 70 60 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/><path d="M 50 90 C 27.9 90 10 72.1 10 50 C 10 27.9 27.9 10 50 10 C 72.1 10 90 27.9 90 50 Z" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="2,2"/><path d="M 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 C 27.9 10 10 27.9 10 50 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" clip-path="url(#cut-off-bottom)"/><defs><clipPath id="cut-off-bottom"><rect x="0" y="0" width="120" height="90" /></clipPath></defs></svg>`
    },
    solution: {
        solution: "This problem describes the Lunes of Hippocrates. Let the legs of the right triangle be a=6 and b=8. By the Pythagorean theorem, the hypotenuse c satisfies c² = 6² + 8² = 36 + 64 = 100, so c=10.\nLet A_triangle be the area of the triangle. A_triangle = (1/2) * a * b = (1/2) * 6 * 8 = 24.\nLet SC(d) denote the area of a semicircle with diameter d. The areas of the three semicircles are:\nSC(a) = (1/2) * π * (a/2)² = (1/2) * π * 3² = 4.5π\nSC(b) = (1/2) * π * (b/2)² = (1/2) * π * 4² = 8π\nSC(c) = (1/2) * π * (c/2)² = (1/2) * π * 5² = 12.5π\nThe total area of the lunes is the sum of the areas of the two smaller semicircles plus the area of the triangle, minus the area of the largest semicircle that overlaps.\nArea of Lunes = (SC(a) + SC(b) + A_triangle) - SC(c).\nArea of Lunes = (4.5π + 8π + 24) - 12.5π = (12.5π + 24) - 12.5π = 24.\nA remarkable result is that the area of the lunes is exactly equal to the area of the right triangle.",
        concepts: "**Key Concepts:**\n1. **Lunes of Hippocrates:** A theorem stating the area of lunes formed on the legs of a right triangle equals the triangle's area.\n2. **Pythagorean Theorem:** To find the length of the hypotenuse.\n3. **Area of a Semicircle:** A = (πr²)/2."
    }
  },
  {
    problem: {
        problem: "Alice and Bob agree to meet at a cafe between 1:00 PM and 2:00 PM. Each agrees to wait for 15 minutes for the other to arrive. If their arrival times are random and independent, what is the probability they will meet?",
        options: ["(A) 1/4", "(B) 3/8", "(C) 7/16", "(D) 1/2", "(E) 9/16"],
        answer: "C",
        topic: "Probability",
        difficulty: "High Difficulty (Approx. #22-25)",
        problemImage: null
    },
    solution: {
        solution: "This is a geometric probability problem. Let the 60-minute interval be represented by a 60x60 square on a coordinate plane, where the x-axis is Alice's arrival time and the y-axis is Bob's. The total area of possible outcomes is 60 * 60 = 3600.\nThey will meet if the difference in their arrival times is no more than 15 minutes, i.e., |x - y| ≤ 15. This inequality is equivalent to -15 ≤ x - y ≤ 15, which can be written as two linear inequalities: y ≤ x + 15 and y ≥ x - 15.\nIt's easier to calculate the probability of them *not* meeting and subtract it from 1. They do not meet if |x - y| > 15, which means y > x + 15 or y < x - 15.\nThese two inequalities represent two triangular regions at the corners of the 60x60 square.\n- The region y > x + 15 is a triangle with vertices at (0, 15), (0, 60), and (45, 60). Its area is (1/2) * base * height = (1/2) * 45 * 45 = 1012.5.\n- The region y < x - 15 is a triangle with vertices at (15, 0), (60, 0), and (60, 45). Its area is also (1/2) * 45 * 45 = 1012.5.\nThe total area where they do not meet is 1012.5 + 1012.5 = 2025. The probability of not meeting is 2025 / 3600.\nThe probability of meeting is 1 - (2025 / 3600) = (3600 - 2025) / 3600 = 1575 / 3600.\nTo simplify the fraction 1575/3600, we can divide both by 225: 1575/225 = 7 and 3600/225 = 16. The probability is 7/16.",
        concepts: "**Key Concepts:**\n1. **Geometric Probability:** Using areas to represent probabilities.\n2. **Graphing Linear Inequalities:** Visualizing the successful region on a coordinate plane.\n3. **Complementary Counting:** Finding the probability of an event by calculating the probability of its complement."
    }
  },
  {
    problem: {
        problem: "What is the number of trailing zeros in the decimal representation of the product of the first 100 positive even integers (2 × 4 × 6 × ... × 200)?",
        options: ["(A) 10", "(B) 12", "(C) 20", "(D) 24", "(E) 100"],
        answer: "D",
        topic: "Number Theory",
        difficulty: "Mid-to-High Difficulty (Approx. #18-22)",
        problemImage: null
    },
    solution: {
        solution: "Trailing zeros are created by factors of 10, which are formed by pairs of prime factors 2 and 5. We need to find the number of factors of 5 in the prime factorization of the product.\nThe product is P = 2 × 4 × 6 × ... × 200.\nWe can factor out a 2 from each of the 100 terms:\nP = (2×1) × (2×2) × (2×3) × ... × (2×100)\nP = 2¹⁰⁰ × (1 × 2 × 3 × ... × 100)\nP = 2¹⁰⁰ × 100!\nThe number of factors of 2 is clearly very large. The limiting factor will be the number of factors of 5. We only need to count the factors of 5 in 100!.\nUsing Legendre's formula, the number of factors of a prime p in n! is given by the sum of floor(n/p^k).\nNumber of 5s = floor(100/5) + floor(100/5²) + floor(100/5³) + ...\nNumber of 5s = floor(20) + floor(4) + floor(0.8) + ...\nNumber of 5s = 20 + 4 + 0 + ... = 24.\nSince there are 24 factors of 5 and more than 24 factors of 2, we can make 24 pairs of (2×5). Therefore, there are 24 trailing zeros.",
        concepts: "**Key Concepts:**\n1. **Trailing Zeros:** Understanding they are formed by factors of 10 (2×5).\n2. **Prime Factorization of Factorials:** Using Legendre's formula to count prime factors.\n3. **Algebraic Manipulation:** Factoring a common term from a product."
    }
  },
  {
    problem: {
        problem: "A spider is at corner A of a 4x4 grid and wants to reach the opposite corner B. The direct path from grid point (2,2) to (2,3) is blocked (A is at (0,0), B is at (4,4)). How many valid paths are there, moving only up or right?",
        options: ["(A) 18", "(B) 35", "(C) 52", "(D) 56", "(E) 70"],
        answer: "C",
        topic: "Combinatorics",
        difficulty: "Mid-to-High Difficulty (Approx. #19-23)",
        problemImage: `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><path id="grid-path" d="M 10 10 V 90 M 30 10 V 90 M 50 10 V 90 M 70 10 V 90 M 90 10 V 90 M 10 10 H 90 M 10 30 H 90 M 10 50 H 90 M 10 70 H 90 M 10 90 H 90" stroke="#9ca3af" stroke-width="1"/></defs><use href="#grid-path"/><circle cx="10" cy="90" r="3" fill="#3b82f6"/><text x="5" y="98" font-size="8" fill="#3b82f6">A</text><circle cx="90" cy="10" r="3" fill="#3b82f6"/><text x="88" y="7" font-size="8" fill="#3b82f6">B</text><line x1="50" y1="50" x2="50" y2="30" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2,1"/><text x="45" y="43" fill="#ef4444" font-size="12">X</text></svg>`
    },
    solution: {
        solution: "This problem uses combinatorial path counting with a blocked path, which is best solved using the subtraction principle.\n1. **Calculate the total number of paths without any blockage.**\nTo get from A(0,0) to B(4,4), the spider must make 4 'Right' moves and 4 'Up' moves, for a total of 8 moves. The number of paths is the number of ways to arrange these moves: 8! / (4! * 4!) = (8×7×6×5)/(4×3×2×1) = 70 total paths.\n\n2. **Calculate the number of paths that use the blocked segment.**\nA path uses the blocked segment if it goes from A(0,0) to (2,2), then takes the path from (2,2) to (2,3), and finally goes from (2,3) to B(4,4).\n- Paths from A(0,0) to (2,2): Requires 2 'Right' and 2 'Up' moves. 4! / (2! * 2!) = 6 paths.\n- Paths from (2,2) to (2,3): This is the single blocked path (1 path).\n- Paths from (2,3) to B(4,4): Requires 2 'Right' (from x=2 to x=4) and 1 'Up' (from y=3 to y=4) move. 3! / (2! * 1!) = 3 paths.\nThe total number of blocked paths is the product: 6 × 1 × 3 = 18 paths.\n\n3. **Subtract the blocked paths from the total.**\nValid paths = Total paths - Blocked paths = 70 - 18 = 52.",
        concepts: "**Key Concepts:**\n1. **Grid Path Counting:** Using combinations (n!/k!(n-k)!) to count paths.\n2. **Subtraction Principle (Complementary Counting):** Finding the size of a desired set by subtracting the size of the undesired set from the total universal set."
    }
  },
  {
    problem: {
        problem: "Alice can paint a fence in 4 hours. Bob can paint the same fence in 6 hours. They start working together, but after one hour, Bob leaves. How many more hours will it take Alice to finish painting the fence alone?",
        options: ["(A) 2", "(B) 7/3", "(C) 5/2", "(D) 8/3", "(E) 3"],
        answer: "B",
        topic: "Algebra",
        difficulty: "Medium Difficulty (Approx. #14-19)",
        problemImage: null
    },
    solution: {
        solution: "First, let's determine the work rates of Alice and Bob.\n- Alice's rate: 1 fence / 4 hours = 1/4 of the fence per hour.\n- Bob's rate: 1 fence / 6 hours = 1/6 of the fence per hour.\nWhen they work together, their rates add up.\n- Combined rate: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 of the fence per hour.\nIn the first hour, they work together and complete 5/12 of the fence.\nThe remaining portion of the fence to be painted is 1 - 5/12 = 7/12.\nNow, Alice must complete this remaining work alone at her own rate. The time it takes is the amount of work divided by her rate.\nTime = Work / Rate = (7/12) / (1/4).\nTime = (7/12) * 4 = 28/12 = 7/3 hours.\nIt will take Alice 7/3 more hours to finish the job.",
        concepts: "**Key Concepts:**\n1. **Work-Rate Problems:** Understanding that Rate = Work / Time. Rates are additive when people work together.\n2. **Fractions:** Manipulating fractions to calculate work done and work remaining."
    }
  },
  {
    problem: {
        problem: "A solid is formed by placing a cone with radius 3 cm and height 4 cm on top of a cylinder with the same radius and a height of 5 cm. What is the total surface area of the solid?",
        options: ["(A) 48π", "(B) 51π", "(C) 54π", "(D) 60π", "(E) 63π"],
        answer: "C",
        topic: "Geometry",
        difficulty: "Mid-to-High Difficulty (Approx. #17-21)",
        problemImage: `<svg width="150" height="200" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg"><path d="M 5 40 L 55 40 L 55 85 L 5 85 Z" fill="#dbeafe" stroke="#1e293b" stroke-width="1"/><ellipse cx="30" cy="85" rx="25" ry="5" fill="#dbeafe" stroke="#1e293b" stroke-width="1"/><path d="M 5 40 L 30 0 L 55 40" fill="#a5b4fc" stroke="#1e293b" stroke-width="1"/><ellipse cx="30" cy="40" rx="25" ry="5" fill="#dbeafe" stroke="#1e293b" stroke-width="1"/></svg>`
    },
    solution: {
        solution: "The total surface area of this composite solid consists of three parts: the lateral area of the cone, the lateral area of the cylinder, and the area of the circular base of the cylinder. The top of the cylinder and the base of the cone are not included as they are internal to the solid.\nGiven: radius r=3, cylinder height h_c=5, cone height h_n=4.\n1. **Area of the cylinder's base:** A_base = πr² = π(3)² = 9π.\n2. **Lateral area of the cylinder:** A_cyl_lat = 2πrh_c = 2π(3)(5) = 30π.\n3. **Lateral area of the cone:** A_cone_lat = πrl, where l is the slant height of the cone. We find l using the Pythagorean theorem: l = √(r² + h_n²) = √(3² + 4²) = √(9 + 16) = √25 = 5. So, A_cone_lat = π(3)(5) = 15π.\n\n**Total Surface Area** = A_base + A_cyl_lat + A_cone_lat\nTotal Surface Area = 9π + 30π + 15π = 54π.",
        concepts: "**Key Concepts:**\n1. **Surface Area of Solids:** Knowing the formulas for the area of a circle (πr²), lateral area of a cylinder (2πrh), and lateral area of a cone (πrl).\n2. **Pythagorean Theorem:** To calculate the slant height of the cone.\n3. **Composite Shapes:** Identifying which surfaces are external and which are internal."
    }
  },
  {
    problem: {
        problem: "What is the remainder when 3²⁰²⁴ is divided by 10?",
        options: ["(A) 1", "(B) 3", "(C) 7", "(D) 9", "(E) 0"],
        answer: "A",
        topic: "Number Theory",
        difficulty: "Medium Difficulty (Approx. #16-20)",
        problemImage: null
    },
    solution: {
        solution: "Finding the remainder when a number is divided by 10 is equivalent to finding its last digit. We need to find the pattern (cycle) of the last digits of the powers of 3.\n3¹ = 3\n3² = 9\n3³ = 27 → last digit is 7\n3⁴ = 81 → last digit is 1\n3⁵ = 243 → last digit is 3\nThe cycle of the last digits is (3, 9, 7, 1). This cycle has a length of 4.\nTo find the last digit of 3²⁰²⁴, we need to determine where the exponent 2024 falls within this 4-step cycle. We can do this by finding the remainder of the exponent when divided by the cycle length (4).\nWe calculate 2024 mod 4. Since 24 is divisible by 4, the entire number 2024 is divisible by 4. So, 2024 mod 4 = 0.\nAn exponent that is a multiple of the cycle length corresponds to the last element in the cycle. In our case, the 4th element is 1.\nTherefore, the last digit of 3²⁰²⁴ is 1, and the remainder when it's divided by 10 is 1.",
        concepts: "**Key Concepts:**\n1. **Cyclicity (Patterns) of Last Digits:** Recognizing that the last digits of powers of an integer repeat in a cycle.\n2. **Modular Arithmetic:** Using remainders (specifically, the exponent modulo the cycle length) to solve problems involving large powers."
    }
  },
  {
    problem: {
        problem: "There are two bags. Bag A has 3 fair coins and 1 two-headed coin. Bag B has 2 fair coins and 2 two-headed coins. You pick a bag at random, then draw and flip one coin. It shows Heads. What is the probability it came from Bag A?",
        options: ["(A) 1/2", "(B) 5/8", "(C) 5/11", "(D) 6/11", "(E) 3/4"],
        answer: "C",
        topic: "Probability",
        difficulty: "High Difficulty (Approx. #23-25)",
        problemImage: null
    },
    solution: {
        solution: "This is a conditional probability problem that can be solved using Bayes' Theorem. Let H be the event of getting a Head, A be picking Bag A, and B be picking Bag B. We want to find P(A|H).\nBayes' Theorem: P(A|H) = [P(H|A) * P(A)] / P(H).\nFirst, let's find the components:\n- P(A) = 1/2 and P(B) = 1/2 (since a bag is picked at random).\n- P(H|A): Probability of getting a Head from Bag A. In Bag A (4 coins total): P(H) = P(fair) * P(H|fair) + P(2-headed) * P(H|2-headed) = (3/4)*(1/2) + (1/4)*(1) = 3/8 + 2/8 = 5/8.\n- P(H|B): Probability of getting a Head from Bag B. In Bag B (4 coins total): P(H) = (2/4)*(1/2) + (2/4)*(1) = 1/4 + 2/4 = 3/4.\n- P(H): The total probability of getting a Head. P(H) = P(H|A)P(A) + P(H|B)P(B) = (5/8)*(1/2) + (3/4)*(1/2) = 5/16 + 3/8 = 5/16 + 6/16 = 11/16.\nNow, we can find P(A|H):\nP(A|H) = (P(H|A) * P(A)) / P(H) = ((5/8) * (1/2)) / (11/16) = (5/16) / (11/16) = 5/11.",
        concepts: "**Key Concepts:**\n1. **Conditional Probability:** The probability of an event occurring given that another event has already occurred.\n2. **Bayes' Theorem:** A formula to find conditional probabilities.\n3. **Law of Total Probability:** Calculating the total probability of an event by considering all possible scenarios."
    }
  },
  {
    problem: {
        problem: "How many integers from 1 to 500 (inclusive) are divisible by 3 or 5, but not by 2?",
        options: ["(A) 116", "(B) 117", "(C) 133", "(D) 150", "(E) 200"],
        answer: "A",
        topic: "Combinatorics",
        difficulty: "Mid-to-High Difficulty (Approx. #18-22)",
        problemImage: null
    },
    solution: {
        solution: "We are looking for numbers that are odd and are multiples of 3 or 5. We can use the Principle of Inclusion-Exclusion.\nLet S be the set of odd integers from 1 to 500. Let A be the set of multiples of 3 in S, and B be the set of multiples of 5 in S.\nWe want to find |A ∪ B| = |A| + |B| - |A ∩ B|.\n\n1. **Find |A|: Odd multiples of 3.**\n- Total multiples of 3: floor(500/3) = 166.\n- Multiples of 6 (even multiples of 3): floor(500/6) = 83.\n- Odd multiples of 3 = Total multiples of 3 - Even multiples of 3 = 166 - 83 = 83.\n\n2. **Find |B|: Odd multiples of 5.**\n- Total multiples of 5: floor(500/5) = 100.\n- Multiples of 10 (even multiples of 5): floor(500/10) = 50.\n- Odd multiples of 5 = 100 - 50 = 50.\n\n3. **Find |A ∩ B|: Odd multiples of 15.**\n- These are numbers divisible by both 3 and 5, so they are multiples of 15. We only want the odd ones.\n- Total multiples of 15: floor(500/15) = 33.\n- Multiples of 30 (even multiples of 15): floor(500/30) = 16.\n- Odd multiples of 15 = 33 - 16 = 17.\n\nFinally, apply the formula:\n|A ∪ B| = |A| + |B| - |A ∩ B| = 83 + 50 - 17 = 133 - 17 = 116.",
        concepts: "**Key Concepts:**\n1. **Principle of Inclusion-Exclusion:** To count the elements in the union of two sets: |A∪B| = |A|+|B|-|A∩B|.\n2. **Divisibility:** Finding the number of multiples of a number within a range.\n3. **Set Theory:** Applying counting principles to sets with specific properties (e.g., being odd)."
    }
  }
];