export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description: {
    text: string;
  };
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  constraints?: string[];
  examples?: {
    example_num: number;
    example_text: string;
  }[];
}


export const GITHUB_DATA_SOURCE = "/data/leetcode.json";

export const PROBLEMS: Record<string, Problem> = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    },
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n}`,
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
    defaultCode: "// Write your solution here\n",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
    defaultCode: "# Write your solution here\n",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
    defaultCode: "class Solution {\n    public static void main(String[] args) {\n        \n    }\n}\n",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
    defaultCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Write your solution here\n        \n    }\n};\n\nint main() {\n    Solution sol;\n    sol.solve();\n    return 0;\n}\n",
  },
};

export type LanguageType = keyof typeof LANGUAGE_CONFIG;