export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out all possible pairs in an unsorted array.",
      "So, if we fix one of the numbers say, x, we have to find another number y such that x + y = target. Can we get O(n) better time complexity?",
      "Try to use a hash map to reduce the lookup time.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    
    return {};
}

int main() {
    vector<int> test1 = {2, 7, 11, 15};
    vector<int> result1 = twoSum(test1, 9);
    cout << "[" << result1[0] << "," << result1[1] << "]" << endl; // Expected: [0,1]
    
    vector<int> test2 = {3, 2, 4};
    vector<int> result2 = twoSum(test2, 6);
    cout << "[" << result2[0] << "," << result2[1] << "]" << endl; // Expected: [1,2]
    
    vector<int> test3 = {3, 3};
    vector<int> result3 = twoSum(test3, 6);
    cout << "[" << result3[0] << "," << result3[1] << "]" << endl; // Expected: [0,1]
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    
    return result;
}

int main() {
    int test1[] = {2, 7, 11, 15};
    int returnSize1 = 0;
    int* result1 = twoSum(test1, 4, 9, &returnSize1);
    printf("[%d,%d]\\n", result1[0], result1[1]); // Expected: [0,1]
    free(result1);
    
    int test2[] = {3, 2, 4};
    int returnSize2 = 0;
    int* result2 = twoSum(test2, 3, 6, &returnSize2);
    printf("[%d,%d]\\n", result2[0], result2[1]); // Expected: [1,2]
    free(result2);
    
    int test3[] = {3, 3};
    int returnSize3 = 0;
    int* result3 = twoSum(test3, 2, 6, &returnSize3);
    printf("[%d,%d]\\n", result3[0], result3[1]); // Expected: [0,1]
    free(result3);
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0,1]\n[1,2]\n[0,1]",
      c: "[0,1]\n[1,2]\n[0,1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    hints: [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!",
      "Set the left pointer at the beginning and right pointer at the end. Swap the characters and move the pointers towards each other.",
    ],
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
    
}

int main() {
    vector<char> test1 = {'h','e','l','l','o'};
    reverseString(test1);
    cout << "[";
    for(int i = 0; i < test1.size(); i++) {
        cout << "'" << test1[i] << "'";
        if(i < test1.size()-1) cout << ",";
    }
    cout << "]" << endl; // Expected: ['o','l','l','e','h']
    
    vector<char> test2 = {'H','a','n','n','a','h'};
    reverseString(test2);
    cout << "[";
    for(int i = 0; i < test2.size(); i++) {
        cout << "'" << test2[i] << "'";
        if(i < test2.size()-1) cout << ",";
    }
    cout << "]" << endl; // Expected: ['h','a','n','n','a','H']
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

void reverseString(char* s, int sSize) {
    // Write your solution here
    
}

int main() {
    char test1[] = {'h','e','l','l','o'};
    int size1 = 5;
    reverseString(test1, size1);
    printf("[");
    for(int i = 0; i < size1; i++) {
        printf("'%c'", test1[i]);
        if(i < size1-1) printf(",");
    }
    printf("]\\n"); // Expected: ['o','l','l','e','h']
    
    char test2[] = {'H','a','n','n','a','h'};
    int size2 = 6;
    reverseString(test2, size2);
    printf("[");
    for(int i = 0; i < size2; i++) {
        printf("'%c'", test2[i]);
        if(i < size2-1) printf(",");
    }
    printf("]\\n"); // Expected: ['h','a','n','n','a','H']
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
      cpp: "['o','l','l','e','h']\n['h','a','n','n','a','H']",
      c: "['o','l','l','e','h']\n['h','a','n','n','a','H']",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    hints: [
      "Filter out non-alphanumeric characters and convert to lowercase.",
      "Use two pointers approach - one from the beginning and one from the end.",
      "Compare characters as you move the pointers towards each other.",
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl; // Expected: true
    cout << (isPalindrome("race a car") ? "true" : "false") << endl; // Expected: false
    cout << (isPalindrome(" ") ? "true" : "false") << endl; // Expected: true
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

bool isPalindrome(char* s) {
    // Write your solution here
    
    return false;
}

int main() {
    printf("%s\\n", isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false"); // Expected: true
    printf("%s\\n", isPalindrome("race a car") ? "true" : "false"); // Expected: false
    printf("%s\\n", isPalindrome(" ") ? "true" : "false"); // Expected: true
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
      c: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    hints: [
      "Try using Kadane's algorithm - keep track of the maximum sum ending at the current position.",
      "At each index, decide whether to extend the existing subarray or start a new one.",
      "Time complexity should be O(n) with single pass.",
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> test1 = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(test1) << endl; // Expected: 6
    
    vector<int> test2 = {1};
    cout << maxSubArray(test2) << endl; // Expected: 1
    
    vector<int> test3 = {5,4,-1,7,8};
    cout << maxSubArray(test3) << endl; // Expected: 23
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <limits.h>

int maxSubArray(int* nums, int numsSize) {
    // Write your solution here
    
    return 0;
}

int main() {
    int test1[] = {-2,1,-3,4,-1,2,1,-5,4};
    printf("%d\\n", maxSubArray(test1, 9)); // Expected: 6
    
    int test2[] = {1};
    printf("%d\\n", maxSubArray(test2, 1)); // Expected: 1
    
    int test3[] = {5,4,-1,7,8};
    printf("%d\\n", maxSubArray(test3, 5)); // Expected: 23
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
      cpp: "6\n1\n23",
      c: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    hints: [
      "The amount of water stored is the minimum of the two heights multiplied by the distance between them.",
      "Use two pointers starting from both ends.",
      "Move the pointer pointing to the shorter line inward, as moving the taller line will always result in less or equal water.",
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> test1 = {1,8,6,2,5,4,8,3,7};
    cout << maxArea(test1) << endl; // Expected: 49
    
    vector<int> test2 = {1,1};
    cout << maxArea(test2) << endl; // Expected: 1
    
    return 0;
}`,
      c: `#include <stdio.h>

int maxArea(int* height, int heightSize) {
    // Write your solution here
    
    return 0;
}

int main() {
    int test1[] = {1,8,6,2,5,4,8,3,7};
    printf("%d\\n", maxArea(test1, 9)); // Expected: 49
    
    int test2[] = {1,1};
    printf("%d\\n", maxArea(test2, 2)); // Expected: 1
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
      cpp: "49\n1",
      c: "49\n1",
    },
  },

  "add-two-numbers": {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List • Math",
    description: {
      text: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
      notes: ["You may assume the two numbers do not contain any leading zero, except the number 0 itself."],
    },
    hints: [
      "Keep track of the carry as you traverse both lists.",
      "Create a new linked list to store the result.",
      "Handle the case where one list is longer than the other.",
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros",
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function addTwoNumbers(l1, l2) {
  // Write your solution here
  
}

// Test cases
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
const result = addTwoNumbers(l1, l2);
console.log(result); // Expected: [7,0,8]`,
      python: `# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    # Write your solution here
    pass

# Test cases
l1 = ListNode(2, ListNode(4, ListNode(3)))
l2 = ListNode(5, ListNode(6, ListNode(4)))
result = addTwoNumbers(l1, l2)
# Expected: [7,0,8]`,
      java: `/**
 * Definition for singly-linked list.
 */
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your solution here
        
        return null;
    }
}`,
      cpp: `/**
 * Definition for singly-linked list node.
 */
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your solution here
        
        return nullptr;
    }
};`,
      c: `/**
 * Definition for singly-linked list node.
 */
typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // Write your solution here
    
    return NULL;
}`,
    },
    expectedOutput: {
      javascript: "ListNode { val: 7, next: ListNode { val: 0, next: ListNode { val: 8, next: null } } }",
      python: "ListNode",
      java: "ListNode",
      cpp: "ListNode*",
      c: "ListNode*",
    },
  },

  "longest-substring-without-repeating-characters": {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Hash Table • Sliding Window • String",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    hints: [
      "Use a sliding window approach with two pointers.",
      "Use a hash map to store the most recent index of each character.",
      "When a repeating character is found, move the left pointer.",
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "The answer is 'b', with the length of 1.",
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: "The answer is 'wke', with the length of 3.",
      },
    ],
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Expected: 3`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))  # Expected: 3`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(sol.lengthOfLongestSubstring("bbbbb")); // Expected: 1
        System.out.println(sol.lengthOfLongestSubstring("pwwkew")); // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    
    return 0;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // Expected: 3
    cout << lengthOfLongestSubstring("bbbbb") << endl; // Expected: 1
    cout << lengthOfLongestSubstring("pwwkew") << endl; // Expected: 3
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    // Write your solution here
    
    return 0;
}

int main() {
    printf("%d\\n", lengthOfLongestSubstring("abcabcbb")); // Expected: 3
    printf("%d\\n", lengthOfLongestSubstring("bbbbb")); // Expected: 1
    printf("%d\\n", lengthOfLongestSubstring("pwwkew")); // Expected: 3
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
      cpp: "3\n1\n3",
      c: "3\n1\n3",
    },
  },

  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array • Binary Search • Divide and Conquer",
    description: {
      text: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      notes: [
        "The overall run time complexity should be O(log(min(m, n))).",
        "You may assume nums1 and nums2 cannot be both empty.",
      ],
    },
    hints: [
      "Try to use binary search on the smaller array.",
      "The key is to find a partition such that all elements on the left are smaller than all on the right.",
      "Think about what conditions must be satisfied for a valid partition.",
    ],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}

// Test cases
console.log(findMedianSortedArrays([1,3], [2])); // Expected: 2.00000
console.log(findMedianSortedArrays([1,2], [3,4])); // Expected: 2.50000`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass

# Test cases
print(findMedianSortedArrays([1,3], [2]))  # Expected: 2.00000
print(findMedianSortedArrays([1,2], [3,4]))  # Expected: 2.50000`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
        return 0.0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.findMedianSortedArrays(new int[]{1,3}, new int[]{2})); // Expected: 2.0
        System.out.println(sol.findMedianSortedArrays(new int[]{1,2}, new int[]{3,4})); // Expected: 2.5
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Write your solution here
    
    return 0.0;
}

int main() {
    vector<int> nums1 = {1,3}, nums2 = {2};
    cout << findMedianSortedArrays(nums1, nums2) << endl; // Expected: 2.0
    
    nums1 = {1,2}; nums2 = {3,4};
    cout << findMedianSortedArrays(nums1, nums2) << endl; // Expected: 2.5
    
    return 0;
}`,
      c: `#include <stdio.h>

double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    // Write your solution here
    
    return 0.0;
}

int main() {
    int nums1[] = {1,3}, nums2[] = {2};
    printf("%f\\n", findMedianSortedArrays(nums1, 2, nums2, 1)); // Expected: 2.0
    
    int nums1_2[] = {1,2}, nums2_2[] = {3,4};
    printf("%f\\n", findMedianSortedArrays(nums1_2, 2, nums2_2, 2)); // Expected: 2.5
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2.5",
      python: "2.0\n2.5",
      java: "2.0\n2.5",
      cpp: "2\n2.5",
      c: "2.000000\n2.500000",
    },
  },

  "regular-expression-matching": {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "String • Dynamic Programming • Backtracking",
    description: {
      text: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
      notes: [
        "The matching should cover the entire input string (not partial).",
        "'.' Matches any single character.",
        "'*' Matches zero or more of the preceding element.",
      ],
    },
    hints: [
      "Use dynamic programming with a 2D table.",
      "dp[i][j] represents if s[0...i-1] matches p[0...j-1].",
      "Handle '*' carefully as it can match zero or more characters.",
    ],
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".',
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: '"*" means zero or more of the preceding element, \'a\'. Therefore, by repeating \'a\' once, "aa" matches "a*".',
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: '".*" means "zero or more (*) of any character (.)". Therefore, "ab" matches ".*".',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 20",
      "1 ≤ p.length ≤ 30",
      "s contains only lowercase English letters",
      "p contains only lowercase English letters, '.', and '*'",
      "For each appearance of the character '*', there will be a previous character to match",
    ],
    starterCode: {
      javascript: `function isMatch(s, p) {
  // Write your solution here
  
}

// Test cases
console.log(isMatch("aa", "a")); // Expected: false
console.log(isMatch("aa", "a*")); // Expected: true
console.log(isMatch("ab", ".*")); // Expected: true`,
      python: `def isMatch(s, p):
    # Write your solution here
    pass

# Test cases
print(isMatch("aa", "a"))  # Expected: False
print(isMatch("aa", "a*"))  # Expected: True
print(isMatch("ab", ".*"))  # Expected: True`,
      java: `class Solution {
    public boolean isMatch(String s, String p) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isMatch("aa", "a")); // Expected: false
        System.out.println(sol.isMatch("aa", "a*")); // Expected: true
        System.out.println(sol.isMatch("ab", ".*")); // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

bool isMatch(string s, string p) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << (isMatch("aa", "a") ? "true" : "false") << endl; // Expected: false
    cout << (isMatch("aa", "a*") ? "true" : "false") << endl; // Expected: true
    cout << (isMatch("ab", ".*") ? "true" : "false") << endl; // Expected: true
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isMatch(char* s, char* p) {
    // Write your solution here
    
    return false;
}

int main() {
    printf("%s\\n", isMatch("aa", "a") ? "true" : "false"); // Expected: false
    printf("%s\\n", isMatch("aa", "a*") ? "true" : "false"); // Expected: true
    printf("%s\\n", isMatch("ab", ".*") ? "true" : "false"); // Expected: true
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "false\ntrue\ntrue",
      python: "False\nTrue\nTrue",
      java: "false\ntrue\ntrue",
      cpp: "false\ntrue\ntrue",
      c: "false\ntrue\ntrue",
    },
  },

  "remove-nth-node-from-end-of-list": {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
      notes: [],
    },
    hints: [
      "Use the two-pointer technique.",
      "Create a dummy node to handle edge cases like removing the first node.",
      "First pass: find the length of the list.",
      "Second pass: remove the node.",
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
      },
      {
        input: "head = [1,2], n = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "The number of nodes in the list is sz.",
      "1 ≤ sz ≤ 30",
      "0 ≤ Node.val ≤ 100",
      "1 ≤ n ≤ sz",
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function removeNthFromEnd(head, n) {
  // Write your solution here
  
}`,
      python: `# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head, n):
    # Write your solution here
    pass`,
      java: `/**
 * Definition for singly-linked list.
 */
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your solution here
        
        return head;
    }
}`,
      cpp: `/**
 * Definition for singly-linked list node.
 */
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your solution here
        
        return head;
    }
};`,
      c: `/**
 * Definition for singly-linked list node.
 */
typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode* removeNthFromEnd(ListNode* head, int n) {
    // Write your solution here
    
    return head;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,5]",
      python: "[1,2,3,5]",
      java: "[1,2,3,5]",
      cpp: "[1,2,3,5]",
      c: "[1,2,3,5]",
    },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "String • Stack",
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      notes: [
        "An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order. 3) Every close bracket has a corresponding open bracket of the same type.",
      ],
    },
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the top of the stack.",
      "If the stack is empty at the end, all parentheses are valid.",
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s[i] is a parenthesis or bracket",
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
  
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,
      python: `def isValid(s):
    # Write your solution here
    pass

# Test cases
print(isValid("()"))  # Expected: True
print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))  # Expected: False`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()")); // Expected: true
        System.out.println(sol.isValid("()[]{}")); // Expected: true
        System.out.println(sol.isValid("(]")); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << (isValid("()") ? "true" : "false") << endl; // Expected: true
    cout << (isValid("()[]{}") ? "true" : "false") << endl; // Expected: true
    cout << (isValid("(]") ? "true" : "false") << endl; // Expected: false
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isValid(char* s) {
    // Write your solution here
    
    return false;
}

int main() {
    printf("%s\\n", isValid("()") ? "true" : "false"); // Expected: true
    printf("%s\\n", isValid("()[]{}") ? "true" : "false"); // Expected: true
    printf("%s\\n", isValid("(]") ? "true" : "false"); // Expected: false
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
      cpp: "true\ntrue\nfalse",
      c: "true\ntrue\nfalse",
    },
  },

  "merge-k-sorted-lists": {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List • Divide and Conquer • Heap",
    description: {
      text: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      notes: [],
    },
    hints: [
      "Use a min-heap to efficiently find the smallest node among all lists.",
      "Alternatively, use divide and conquer to merge lists pairwise.",
      "Time complexity should be O(n*k*log(k)) where n is average list length.",
    ],
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,1,3,4,4,5,6]",
      },
      {
        input: "lists = []",
        output: "[]",
      },
      {
        input: "lists = [[]]",
        output: "[]",
      },
    ],
    constraints: [
      "k == lists.length",
      "0 ≤ k ≤ 10⁴",
      "0 ≤ lists[i].length ≤ 500",
      "-10⁴ ≤ lists[i][j] ≤ 10⁴",
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function mergeKLists(lists) {
  // Write your solution here
  
}`,
      python: `# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists):
    # Write your solution here
    pass`,
      java: `/**
 * Definition for singly-linked list.
 */
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Write your solution here
        
        return null;
    }
}`,
      cpp: `/**
 * Definition for singly-linked list node.
 */
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Write your solution here
        
        return nullptr;
    }
};`,
      c: `/**
 * Definition for singly-linked list node.
 */
typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode* mergeKLists(ListNode** lists, int listsSize) {
    // Write your solution here
    
    return NULL;
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,1,3,4,4,5,6]",
      python: "[1,1,2,1,3,4,4,5,6]",
      java: "[1,1,2,1,3,4,4,5,6]",
      cpp: "[1,1,2,1,3,4,4,5,6]",
      c: "[1,1,2,1,3,4,4,5,6]",
    },
  },

  "search-in-rotated-sorted-array": {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array • Binary Search",
    description: {
      text: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]].",
      notes: [
        "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        "You must write an algorithm with O(log n) runtime complexity.",
      ],
    },
    hints: [
      "Use binary search to achieve O(log n) time complexity.",
      "Determine which side of the pivot is sorted.",
      "Use the sorted side to determine where the target might be.",
    ],
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
      },
      {
        input: "nums = [1], target = 1",
        output: "0",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 5000",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "All values of nums are unique",
      "-10⁴ ≤ target ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4
console.log(search([4,5,6,7,0,1,2], 3)); // Expected: -1
console.log(search([1], 1)); // Expected: 0`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([4,5,6,7,0,1,2], 0))  # Expected: 4
print(search([4,5,6,7,0,1,2], 3))  # Expected: -1
print(search([1], 1))  # Expected: 0`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.search(new int[]{4,5,6,7,0,1,2}, 0)); // Expected: 4
        System.out.println(sol.search(new int[]{4,5,6,7,0,1,2}, 3)); // Expected: -1
        System.out.println(sol.search(new int[]{1}, 1)); // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your solution here
    
    return -1;
}

int main() {
    vector<int> nums1 = {4,5,6,7,0,1,2};
    cout << search(nums1, 0) << endl; // Expected: 4
    cout << search(nums1, 3) << endl; // Expected: -1
    
    vector<int> nums2 = {1};
    cout << search(nums2, 1) << endl; // Expected: 0
    
    return 0;
}`,
      c: `#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    // Write your solution here
    
    return -1;
}

int main() {
    int nums1[] = {4,5,6,7,0,1,2};
    printf("%d\\n", search(nums1, 7, 0)); // Expected: 4
    printf("%d\\n", search(nums1, 7, 3)); // Expected: -1
    
    int nums2[] = {1};
    printf("%d\\n", search(nums2, 1, 1)); // Expected: 0
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1\n0",
      python: "4\n-1\n0",
      java: "4\n-1\n0",
      cpp: "4\n-1\n0",
      c: "4\n-1\n0",
    },
  },

  "combination-sum": {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Array • Backtracking",
    description: {
      text: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
      notes: [
        "You may return the combinations in any order.",
        "The same number in candidates may be chosen an unlimited number of times.",
      ],
    },
    hints: [
      "Use backtracking to explore all possible combinations.",
      "For each number, decide whether to include it or skip it.",
      "Once you include a number, you can include it again (unlike other combination problems).",
    ],
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]",
      },
      {
        input: "candidates = [2], target = 1",
        output: "[]",
      },
    ],
    constraints: [
      "1 ≤ candidates.length ≤ 30",
      "2 ≤ candidates[i] ≤ 40",
      "All elements of candidates are distinct",
      "1 ≤ target ≤ 40",
    ],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {
  // Write your solution here
  
}

// Test cases
console.log(combinationSum([2,3,6,7], 7)); // Expected: [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // Expected: [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)); // Expected: []`,
      python: `def combinationSum(candidates, target):
    # Write your solution here
    pass

# Test cases
print(combinationSum([2,3,6,7], 7))  # Expected: [[2,2,3],[7]]
print(combinationSum([2,3,5], 8))  # Expected: [[2,2,2,2],[2,3,3],[3,5]]
print(combinationSum([2], 1))  # Expected: []`,
      java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your solution here
        
        return new ArrayList<>();
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    // Write your solution here
    
    return {};
}`,
      c: `#include <stdio.h>

int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    // Write your solution here
    
    return NULL;
}`,
    },
    expectedOutput: {
      javascript: "[[2,2,3],[7]]",
      python: "[[2,2,3],[7]]",
      java: "[[2,2,3],[7]]",
      cpp: "[[2,2,3],[7]]",
      c: "[[2,2,3],[7]]",
    },
  },

  "count-and-say": {
    id: "count-and-say",
    title: "Count and Say",
    difficulty: "Medium",
    category: "String",
    description: {
      text: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = '1' countAndSay(n) is the way you would 'say' the digits of countAndSay(n-1), which is then converted into a different digit string.",
      notes: [
        "Given a positive integer n, return the nth term of the count-and-say sequence as a string.",
        "Example: '1' is read off as 'one 1' or 11. '11' is read off as 'two 1s' or 21. '21' is read off as 'one 2, then one 1' or 1211.",
      ],
    },
    hints: [
      "Start with '1' and generate each subsequent term by counting consecutive digits.",
      "For example, '111' becomes '31' (three 1s).",
      "Use iteration to build each term from the previous one.",
    ],
    examples: [
      {
        input: "n = 1",
        output: '"1"',
      },
      {
        input: "n = 4",
        output: '"1211"',
        explanation: 'The sequence is "1", "11", "21", "1211".',
      },
    ],
    constraints: ["1 ≤ n ≤ 30"],
    starterCode: {
      javascript: `function countAndSay(n) {
  // Write your solution here
  
}

// Test cases
console.log(countAndSay(1)); // Expected: "1"
console.log(countAndSay(4)); // Expected: "1211"`,
      python: `def countAndSay(n):
    # Write your solution here
    pass

# Test cases
print(countAndSay(1))  # Expected: "1"
print(countAndSay(4))  # Expected: "1211"`,
      java: `class Solution {
    public String countAndSay(int n) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.countAndSay(1)); // Expected: "1"
        System.out.println(sol.countAndSay(4)); // Expected: "1211"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string countAndSay(int n) {
    // Write your solution here
    
    return "";
}

int main() {
    cout << countAndSay(1) << endl; // Expected: "1"
    cout << countAndSay(4) << endl; // Expected: "1211"
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* countAndSay(int n) {
    // Write your solution here
    
    return "";
}

int main() {
    printf("%s\\n", countAndSay(1)); // Expected: "1"
    printf("%s\\n", countAndSay(4)); // Expected: "1211"
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '"1"\n"1211"',
      python: "1\n1211",
      java: "1\n1211",
      cpp: "1\n1211",
      c: "1\n1211",
    },
  },

  "spiral-matrix": {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Array • Matrix • Simulation",
    description: {
      text: "Given an m x n matrix, return all elements of the matrix in spiral order.",
      notes: [],
    },
    hints: [
      "Traverse the matrix layer by layer from outside to inside.",
      "Keep track of the boundaries (top, bottom, left, right).",
      "After each direction, adjust the corresponding boundary.",
    ],
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]",
      },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 10",
      "-100 ≤ matrix[i][j] ≤ 100",
    ],
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Write your solution here
  
}

// Test cases
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])); // Expected: [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])); // Expected: [1,2,3,4,8,12,11,10,9,5,6,7]`,
      python: `def spiralOrder(matrix):
    # Write your solution here
    pass

# Test cases
print(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [1,2,3,6,9,8,7,4,5]
print(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))  # Expected: [1,2,3,4,8,12,11,10,9,5,6,7]`,
      java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        
        return new ArrayList<>();
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    // Write your solution here
    
    return {};
}`,
      c: `#include <stdio.h>

int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    // Write your solution here
    
    return NULL;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,6,9,8,7,4,5]\n[1,2,3,4,8,12,11,10,9,5,6,7]",
      python: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      java: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      cpp: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      c: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
    },
  },

  "jump-game": {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Array • Greedy • Dynamic Programming",
    description: {
      text: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length from that position.",
      notes: [
        "Determine if you can reach the last index of the array.",
        "Return true if you can reach the last index, or false otherwise.",
      ],
    },
    hints: [
      "Use a greedy approach to keep track of the maximum reachable index.",
      "Iterate through the array and update the maximum reachable index.",
      "If at any point the current index exceeds the maximum reachable, return false.",
    ],
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "You will always arrive at index 3. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "0 ≤ nums[i] ≤ 10⁵",
    ],
    starterCode: {
      javascript: `function canJump(nums) {
  // Write your solution here
  
}

// Test cases
console.log(canJump([2,3,1,1,4])); // Expected: true
console.log(canJump([3,2,1,0,4])); // Expected: false`,
      python: `def canJump(nums):
    # Write your solution here
    pass

# Test cases
print(canJump([2,3,1,1,4]))  # Expected: True
print(canJump([3,2,1,0,4]))  # Expected: False`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.canJump(new int[]{2,3,1,1,4})); // Expected: true
        System.out.println(sol.canJump(new int[]{3,2,1,0,4})); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool canJump(vector<int>& nums) {
    // Write your solution here
    
    return false;
}

int main() {
    vector<int> nums1 = {2,3,1,1,4};
    cout << (canJump(nums1) ? "true" : "false") << endl; // Expected: true
    
    vector<int> nums2 = {3,2,1,0,4};
    cout << (canJump(nums2) ? "true" : "false") << endl; // Expected: false
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

bool canJump(int* nums, int numsSize) {
    // Write your solution here
    
    return false;
}

int main() {
    int nums1[] = {2,3,1,1,4};
    printf("%s\\n", canJump(nums1, 5) ? "true" : "false"); // Expected: true
    
    int nums2[] = {3,2,1,0,4};
    printf("%s\\n", canJump(nums2, 5) ? "true" : "false"); // Expected: false
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
      c: "true\nfalse",
    },
  },

  "merge-sorted-array": {
    id: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of valid elements in nums1 and nums2 respectively.",
      notes: [
        "Merge nums2 into nums1 as one sorted array.",
        "Note: You must modify nums1 in-place and not return anything.",
        "You may assume that nums1 has a total length of m + n, that is enough space to hold additional elements from nums2.",
      ],
    },
    hints: [
      "Start from the end of both arrays and compare.",
      "Place the larger element at the end of nums1.",
      "Move backwards to avoid overwriting elements.",
    ],
    examples: [
      {
        input: "nums1 = [1,2,4,5,6,0], m = 5, nums2 = [2,3,6], n = 3",
        output: "[1,2,2,3,4,5,6,6]",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
      },
      {
        input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 ≤ m, n ≤ 200",
      "1 ≤ m + n ≤ 200",
      "-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹",
    ],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  // Modify nums1 in-place
  
}

// Test cases
let nums1 = [1,2,4,5,6,0];
merge(nums1, 5, [2,3,6], 3);
console.log(nums1); // Expected: [1,2,2,3,4,5,6,6]`,
      python: `def merge(nums1, m, nums2, n):
    # Write your solution here
    # Modify nums1 in-place
    pass

# Test cases
nums1 = [1,2,4,5,6,0]
merge(nums1, 5, [2,3,6], 3)
print(nums1)  # Expected: [1,2,2,3,4,5,6,6]`,
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
        
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    // Write your solution here
    
}`,
      c: `#include <stdio.h>

void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    // Write your solution here
    
}`,
    },
    expectedOutput: {
      javascript: "[1,2,2,3,4,5,6,6]",
      python: "[1, 2, 2, 3, 4, 5, 6, 6]",
      java: "[1,2,2,3,4,5,6,6]",
      cpp: "[1,2,2,3,4,5,6,6]",
      c: "[1,2,2,3,4,5,6,6]",
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Math • Dynamic Programming • Memoization",
    description: {
      text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      notes: [],
    },
    hints: [
      "This is a Fibonacci problem.",
      "To reach step n, you can either come from step n-1 or n-2.",
      "So, climbStairs(n) = climbStairs(n-1) + climbStairs(n-2).",
    ],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "1. 1 step + 1 step\\n2. 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "1. 1 step + 1 step + 1 step\\n2. 1 step + 2 steps\\n3. 2 steps + 1 step",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
  
}

// Test cases
console.log(climbStairs(2)); // Expected: 2
console.log(climbStairs(3)); // Expected: 3
console.log(climbStairs(4)); // Expected: 5`,
      python: `def climbStairs(n):
    # Write your solution here
    pass

# Test cases
print(climbStairs(2))  # Expected: 2
print(climbStairs(3))  # Expected: 3
print(climbStairs(4))  # Expected: 5`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.climbStairs(2)); // Expected: 2
        System.out.println(sol.climbStairs(3)); // Expected: 3
        System.out.println(sol.climbStairs(4)); // Expected: 5
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // Write your solution here
    
    return 0;
}

int main() {
    cout << climbStairs(2) << endl; // Expected: 2
    cout << climbStairs(3) << endl; // Expected: 3
    cout << climbStairs(4) << endl; // Expected: 5
    
    return 0;
}`,
      c: `#include <stdio.h>

int climbStairs(int n) {
    // Write your solution here
    
    return 0;
}

int main() {
    printf("%d\\n", climbStairs(2)); // Expected: 2
    printf("%d\\n", climbStairs(3)); // Expected: 3
    printf("%d\\n", climbStairs(4)); // Expected: 5
    
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3\n5",
      python: "2\n3\n5",
      java: "2\n3\n5",
      cpp: "2\n3\n5",
      c: "2\n3\n5",
    },
  },

  "binary-tree-level-order-traversal": {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree • Breadth-First Search • Queue",
    description: {
      text: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      notes: [],
    },
    hints: [
      "Use a queue to perform breadth-first search.",
      "Process nodes level by level.",
      "For each level, add the next level's children to the queue.",
    ],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000]",
      "-1000 ≤ Node.val ≤ 1000",
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function levelOrder(root) {
  // Write your solution here
  
}`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    # Write your solution here
    pass`,
      java: `/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        
        return new ArrayList<>();
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your solution here
        
        return {};
    }
};`,
      c: `/**
 * Definition for a binary tree node.
 */
typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int** levelOrder(TreeNode* root, int* returnSize, int** returnColumnSizes) {
    // Write your solution here
    
    return NULL;
}`,
    },
    expectedOutput: {
      javascript: "[[3],[9,20],[15,7]]",
      python: "[[3], [9, 20], [15, 7]]",
      java: "[[3], [9, 20], [15, 7]]",
      cpp: "[[3], [9, 20], [15, 7]]",
      c: "[[3], [9, 20], [15, 7]]",
    },
  },

  "flatten-binary-tree-to-linked-list": {
    id: "flatten-binary-tree-to-linked-list",
    title: "Flatten Binary Tree to Linked List",
    difficulty: "Medium",
    category: "Tree • Linked List • Stack • Depth-First Search",
    description: {
      text: "Given the root of a binary tree, flatten the tree into a 'linked list' in-place where the 'linked list' is in pre-order traversal order of the binary tree.",
      notes: ["The 'linked list' should use the right pointer of the tree node as the next pointer in the linked list."],
    },
    hints: [
      "Use pre-order traversal and modify pointers.",
      "Process the tree recursively.",
      "After flattening left and right subtrees, connect them.",
    ],
    examples: [
      {
        input: "root = [1,2,5,3,4,null,6]",
        output: "[1,null,2,null,3,null,4,null,5,null,6]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000]",
      "-100 ≤ Node.val ≤ 100",
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function flatten(root) {
  // Write your solution here
  // Modify the tree in-place
  
}`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def flatten(root):
    # Write your solution here
    # Modify the tree in-place
    pass`,
      java: `/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public void flatten(TreeNode root) {
        // Write your solution here
        
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    void flatten(TreeNode* root) {
        // Write your solution here
        
    }
};`,
      c: `/**
 * Definition for a binary tree node.
 */
typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void flatten(TreeNode* root) {
    // Write your solution here
    
}`,
    },
    expectedOutput: {
      javascript: "void",
      python: "void",
      java: "void",
      cpp: "void",
      c: "void",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
  c: {
    name: "C",
    icon: "/c.png",
    monacoLang: "c",
  },
};