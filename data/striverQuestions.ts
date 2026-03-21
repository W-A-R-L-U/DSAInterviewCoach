export type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export type StriverQuestion = {
  topic: "Arrays" | "Strings" | "Linked Lists" | "Binary Trees" | "Graphs" | "Dynamic Programming";
  difficulty: QuestionDifficulty;
  title: string;
  description: string;
  link: string;
};

export const striverQuestions: StriverQuestion[] = [
  {
    topic: "Arrays",
    difficulty: "Easy",
    title: "Two Sum",
    description:
      "Given an array of integers nums and a target value, return indices of two numbers that add up to the target.",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    topic: "Arrays",
    difficulty: "Medium",
    title: "Maximum Subarray",
    description:
      "Find the contiguous subarray with the largest sum and explain the intuition behind the optimal solution.",
    link: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    topic: "Arrays",
    difficulty: "Medium",
    title: "Merge Intervals",
    description:
      "Given an array of intervals, merge all overlapping intervals and return the non-overlapping result.",
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    topic: "Arrays",
    difficulty: "Hard",
    title: "Trapping Rain Water",
    description:
      "Given elevation heights, compute how much rain water can be trapped after raining.",
    link: "https://leetcode.com/problems/trapping-rain-water/"
  },
  {
    topic: "Arrays",
    difficulty: "Medium",
    title: "Set Matrix Zeroes",
    description:
      "If an element in a matrix is zero, set its entire row and column to zero while thinking carefully about in-place updates.",
    link: "https://leetcode.com/problems/set-matrix-zeroes/"
  },
  {
    topic: "Arrays",
    difficulty: "Medium",
    title: "Next Permutation",
    description:
      "Rearrange numbers into the lexicographically next greater permutation and explain the pattern behind the transformation.",
    link: "https://leetcode.com/problems/next-permutation/"
  },
  {
    topic: "Strings",
    difficulty: "Easy",
    title: "Valid Anagram",
    description:
      "Check whether two strings are anagrams of each other while discussing time and space trade-offs.",
    link: "https://leetcode.com/problems/valid-anagram/"
  },
  {
    topic: "Strings",
    difficulty: "Medium",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Find the length of the longest substring without repeating characters.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    topic: "Strings",
    difficulty: "Medium",
    title: "Longest Palindromic Substring",
    description:
      "Return the longest palindromic substring in a string and discuss multiple solution strategies.",
    link: "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  {
    topic: "Strings",
    difficulty: "Medium",
    title: "Group Anagrams",
    description:
      "Group a list of strings into sets of anagrams and justify the key you choose for grouping.",
    link: "https://leetcode.com/problems/group-anagrams/"
  },
  {
    topic: "Strings",
    difficulty: "Hard",
    title: "Minimum Window Substring",
    description:
      "Find the minimum window in a string that contains all characters of another string.",
    link: "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    topic: "Linked Lists",
    difficulty: "Easy",
    title: "Reverse Linked List",
    description:
      "Reverse a singly linked list iteratively and explain how pointer updates work safely.",
    link: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    topic: "Linked Lists",
    difficulty: "Medium",
    title: "Linked List Cycle",
    description:
      "Detect whether a linked list has a cycle and explain the reasoning behind Floyd’s algorithm.",
    link: "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    topic: "Linked Lists",
    difficulty: "Medium",
    title: "Add Two Numbers",
    description:
      "Add two numbers represented by linked lists and return the sum as a linked list.",
    link: "https://leetcode.com/problems/add-two-numbers/"
  },
  {
    topic: "Linked Lists",
    difficulty: "Medium",
    title: "Remove Nth Node From End of List",
    description:
      "Remove the nth node from the end of a linked list and explain how a two-pointer approach avoids multiple passes.",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },
  {
    topic: "Linked Lists",
    difficulty: "Hard",
    title: "Reverse Nodes in k-Group",
    description:
      "Reverse nodes of a linked list in groups of size k while preserving the remaining nodes correctly.",
    link: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
  },
  {
    topic: "Binary Trees",
    difficulty: "Easy",
    title: "Binary Tree Inorder Traversal",
    description:
      "Return the inorder traversal of a binary tree using both recursive and iterative perspectives.",
    link: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  },
  {
    topic: "Binary Trees",
    difficulty: "Medium",
    title: "Level Order Traversal",
    description:
      "Traverse a binary tree level by level and explain why breadth-first search is a good fit here.",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    topic: "Binary Trees",
    difficulty: "Medium",
    title: "Lowest Common Ancestor of a Binary Tree",
    description:
      "Find the lowest common ancestor of two given nodes in a binary tree.",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
  },
  {
    topic: "Binary Trees",
    difficulty: "Medium",
    title: "Diameter of Binary Tree",
    description:
      "Compute the diameter of a binary tree and explain how height and path length interact.",
    link: "https://leetcode.com/problems/diameter-of-binary-tree/"
  },
  {
    topic: "Binary Trees",
    difficulty: "Hard",
    title: "Serialize and Deserialize Binary Tree",
    description:
      "Design algorithms to serialize and deserialize a binary tree without losing structure.",
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    topic: "Graphs",
    difficulty: "Easy",
    title: "Find if Path Exists in Graph",
    description:
      "Determine whether there is a valid path between two vertices in an undirected graph.",
    link: "https://leetcode.com/problems/find-if-path-exists-in-graph/"
  },
  {
    topic: "Graphs",
    difficulty: "Medium",
    title: "Number of Islands",
    description:
      "Count the number of islands in a grid and discuss DFS versus BFS approaches.",
    link: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    topic: "Graphs",
    difficulty: "Medium",
    title: "Course Schedule",
    description:
      "Determine if you can finish all courses given prerequisite dependencies.",
    link: "https://leetcode.com/problems/course-schedule/"
  },
  {
    topic: "Graphs",
    difficulty: "Hard",
    title: "Word Ladder",
    description:
      "Find the length of the shortest transformation sequence from beginWord to endWord.",
    link: "https://leetcode.com/problems/word-ladder/"
  },
  {
    topic: "Graphs",
    difficulty: "Medium",
    title: "Rotting Oranges",
    description:
      "Determine the minimum time needed for all fresh oranges in a grid to become rotten using a graph traversal mindset.",
    link: "https://leetcode.com/problems/rotting-oranges/"
  },
  {
    topic: "Graphs",
    difficulty: "Hard",
    title: "Alien Dictionary",
    description:
      "Given a sorted dictionary of an alien language, derive a valid character ordering using graph concepts.",
    link: "https://www.geeksforgeeks.org/problems/alien-dictionary/1"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Easy",
    title: "Climbing Stairs",
    description:
      "Count the distinct ways to climb to the top when you can take one or two steps at a time.",
    link: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Medium",
    title: "House Robber",
    description:
      "Maximize the money you can rob without taking from adjacent houses.",
    link: "https://leetcode.com/problems/house-robber/"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Medium",
    title: "Longest Increasing Subsequence",
    description:
      "Find the length of the longest strictly increasing subsequence in an array.",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Hard",
    title: "Edit Distance",
    description:
      "Compute the minimum number of operations required to convert one string into another.",
    link: "https://leetcode.com/problems/edit-distance/"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Medium",
    title: "Coin Change",
    description:
      "Find the minimum number of coins needed to make up a given amount and explain the recurrence relation.",
    link: "https://leetcode.com/problems/coin-change/"
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Medium",
    title: "Partition Equal Subset Sum",
    description:
      "Determine whether an array can be partitioned into two subsets with equal sum.",
    link: "https://leetcode.com/problems/partition-equal-subset-sum/"
  }
];

export const topicLabels = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Binary Trees",
  "Graphs",
  "Dynamic Programming"
] as const;
