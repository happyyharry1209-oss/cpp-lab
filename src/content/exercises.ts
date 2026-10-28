export type ExerciseCategory =
  | "基礎語法"
  | "流程控制"
  | "陣列"
  | "函式"
  | "搜尋";

export type ExerciseDifficulty = 1 | 2 | 3;

export interface JudgeCase {
  input: string;
  output: string;
}

export interface Exercise {
  slug: string;
  title: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  summary: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  starterCode: string;
  hints: [string, string, string, string, string];
  solution: string;
  samples: JudgeCase[];
  tests: JudgeCase[];
  lessonSlug: string;
}

const starter = (body: string) => `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ${body}
    return 0;
}
`;

export const exercises: Exercise[] = [
  {
    slug: "hello-cpp-lab",
    title: "輸出 Hello, C++ Lab!",
    category: "基礎語法",
    difficulty: 1,
    summary: "練習最基礎的輸出，注意大小寫、逗號與驚嘆號。",
    description: "請輸出指定文字，內容必須與題目完全一致。",
    inputFormat: "本題不需要輸入。",
    outputFormat: "輸出 Hello, C++ Lab!",
    starterCode: starter("// 在這裡寫你的程式碼"),
    hints: [
      "輸出可以使用 cout。",
      "提示一的關鍵是 cout，但別忘了分號。",
      "你可以先寫 cout << ； 再接上文字。",
      "文字要放在雙引號中，例如 \"文字\"。",
      `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++ Lab!" << endl;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++ Lab!" << endl;
    return 0;
}`,
    samples: [
      { input: "", output: "Hello, C++ Lab!" },
      { input: "", output: "Hello, C++ Lab!" },
    ],
    tests: [
      { input: "", output: "Hello, C++ Lab!" },
      { input: "", output: "Hello, C++ Lab!" },
    ],
    lessonSlug: "input-output-types",
  },
  {
    slug: "swap-numbers",
    title: "交換兩個整數",
    category: "基礎語法",
    difficulty: 1,
    summary: "讀取兩個整數，交換後輸出。",
    description: "輸入兩個整數 a 與 b，將它們交換後以空白分隔輸出。",
    inputFormat: "一行包含兩個整數 a、b。",
    outputFormat: "以空白分隔輸出 b、a。",
    starterCode: starter("int a, b;\n    cin >> a >> b;\n    // 輸出交換後的值"),
    hints: [
      "程式讀到 a 與 b 後，輸出順序可以不同。",
      "你不一定要真的改動變數，輸出 b 再輸出 a 也能完成題目。",
      "cout 可以用空白字元分隔兩個值。",
      "輸出格式類似：cout << b << ' ' << a << endl;",
      `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << b << " " << a << endl;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << b << " " << a << endl;
    return 0;
}`,
    samples: [
      { input: "3 8", output: "8 3" },
      { input: "15 -2", output: "-2 15" },
    ],
    tests: [
      { input: "42 7", output: "7 42" },
      { input: "0 9", output: "9 0" },
      { input: "-5 -11", output: "-11 -5" },
    ],
    lessonSlug: "input-output-types",
  },
  {
    slug: "even-or-odd",
    title: "奇數還是偶數",
    category: "流程控制",
    difficulty: 1,
    summary: "使用餘數判斷一個整數的奇偶性。",
    description: "讀取一個整數；若為偶數輸出 even，否則輸出 odd。",
    inputFormat: "一個整數 n。",
    outputFormat: "even 或 odd。",
    starterCode: starter("int n;\n    cin >> n;\n    // 判斷 n 的奇偶性"),
    hints: [
      "判斷偶數時，可以觀察除以 2 的餘數。",
      "C++ 的 % 運算子能取得整數餘數。",
      "條件可以寫成 n % 2 == 0。",
      "若條件成立輸出 even，否則輸出 odd。",
      `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) cout << "even";
    else cout << "odd";
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) cout << "even";
    else cout << "odd";
    return 0;
}`,
    samples: [
      { input: "8", output: "even" },
      { input: "7", output: "odd" },
    ],
    tests: [
      { input: "0", output: "even" },
      { input: "-3", output: "odd" },
      { input: "100", output: "even" },
    ],
    lessonSlug: "conditions-and-edges",
  },
  {
    slug: "largest-of-three",
    title: "三個數的最大值",
    category: "流程控制",
    difficulty: 2,
    summary: "比較三個整數，找出最大值。",
    description: "輸入三個整數，輸出其中最大的整數。",
    inputFormat: "一行包含三個整數 a、b、c。",
    outputFormat: "輸出最大值。",
    starterCode: starter("int a, b, c;\n    cin >> a >> b >> c;\n    // 找出最大值"),
    hints: [
      "可以先假設第一個數是最大值。",
      "依序拿 a、b、c 與目前最大值比較。",
      "也可以用條件判斷分情況比較。",
      "若目前值較大，就更新保存最大值的變數。",
      `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int best = a;
    if (b > best) best = b;
    if (c > best) best = c;
    cout << best;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int best = a;
    if (b > best) best = b;
    if (c > best) best = c;
    cout << best;
    return 0;
}`,
    samples: [
      { input: "3 9 5", output: "9" },
      { input: "-4 -2 -9", output: "-2" },
    ],
    tests: [
      { input: "12 12 7", output: "12" },
      { input: "0 -1 0", output: "0" },
      { input: "-10 -10 -10", output: "-10" },
    ],
    lessonSlug: "conditions-and-edges",
  },
  {
    slug: "sum-to-n",
    title: "從 1 加到 n",
    category: "流程控制",
    difficulty: 1,
    summary: "使用迴圈累加一連串整數。",
    description: "讀取正整數 n，輸出 1 + 2 + ... + n。",
    inputFormat: "一個正整數 n。",
    outputFormat: "輸出總和。",
    starterCode: starter("int n;\n    cin >> n;\n    int sum = 0;\n    // 累加 1 到 n"),
    hints: [
      "準備一個變數保存目前總和。",
      "使用 for 讓 i 從 1 走到 n。",
      "每一回合把 i 加到 sum。",
      "初始值要是 0，否則答案會多出原本的數字。",
      `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum;
    return 0;
}`,
    samples: [
      { input: "5", output: "15" },
      { input: "1", output: "1" },
    ],
    tests: [
      { input: "10", output: "55" },
      { input: "100", output: "5050" },
      { input: "3", output: "6" },
    ],
    lessonSlug: "loops-and-arrays",
  },
  {
    slug: "count-positives",
    title: "計算正數數量",
    category: "陣列",
    difficulty: 2,
    summary: "讀取一串整數，計算大於 0 的數字個數。",
    description: "第一行是元素數量 n，第二行有 n 個整數；輸出其中正數的個數。",
    inputFormat: "第一行 n，第二行 n 個整數。",
    outputFormat: "輸出正數個數。",
    starterCode: starter("int n;\n    cin >> n;\n    int count = 0;\n    // 讀取 n 個數字並計算正數"),
    hints: [
      "正數的條件是大於 0。",
      "你需要先讀取 n，再執行 n 次處理。",
      "用迴圈讀取每個數字。",
      "每當 value > 0 成立，就把 count 加一。",
      `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 0;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        if (value > 0) count++;
    }
    cout << count;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 0;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        if (value > 0) count++;
    }
    cout << count;
    return 0;
}`,
    samples: [
      { input: "5\n-2 0 3 7 -1", output: "2" },
      { input: "3\n1 2 3", output: "3" },
    ],
    tests: [
      { input: "4\n0 0 -1 -2", output: "0" },
      { input: "6\n-5 4 0 9 2 -7", output: "3" },
    ],
    lessonSlug: "loops-and-arrays",
  },
  {
    slug: "reverse-array",
    title: "反轉陣列",
    category: "陣列",
    difficulty: 2,
    summary: "從後往前輸出 n 個整數。",
    description: "讀取 n 個整數，依照相反順序輸出，數字之間以空白分隔。",
    inputFormat: "第一行 n，第二行 n 個整數。",
    outputFormat: "反轉後的整數序列。",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    // 讀取後反轉
    return 0;
}`,
    hints: [
      "先將所有元素保存起來。",
      "vector 可以透過索引存取。",
      "最後一個元素的索引是 n - 1。",
      "可以讓索引從 n - 1 遞減到 0。",
      `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    for (int i = n - 1; i >= 0; i--) {
        cout << values[i];
        if (i > 0) cout << " ";
    }
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    for (int i = n - 1; i >= 0; i--) {
        cout << values[i];
        if (i > 0) cout << " ";
    }
    return 0;
}`,
    samples: [
      { input: "4\n1 2 3 4", output: "4 3 2 1" },
      { input: "3\n9 5 2", output: "2 5 9" },
    ],
    tests: [
      { input: "1\n42", output: "42" },
      { input: "5\n-1 0 8 2 4", output: "4 2 8 0 -1" },
    ],
    lessonSlug: "loops-and-arrays",
  },
  {
    slug: "gcd",
    title: "最大公因數",
    category: "函式",
    difficulty: 2,
    summary: "用輾轉相除法找出兩個整數的最大公因數。",
    description: "輸入兩個正整數 a、b，輸出它們的最大公因數。",
    inputFormat: "一行包含兩個正整數。",
    outputFormat: "輸出最大公因數。",
    starterCode: starter("int a, b;\n    cin >> a >> b;\n    // 使用輾轉相除法"),
    hints: [
      "兩個數的最大公因數與 (b, a % b) 相同。",
      "當 b 變成 0 時，a 就是答案。",
      "在迴圈中反覆計算餘數並交換角色。",
      "可以用 temp 暫時保存舊的 b。",
      `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    while (b != 0) {
        int remainder = a % b;
        a = b;
        b = remainder;
    }
    cout << a;
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    while (b != 0) {
        int remainder = a % b;
        a = b;
        b = remainder;
    }
    cout << a;
    return 0;
}`,
    samples: [
      { input: "48 18", output: "6" },
      { input: "7 13", output: "1" },
    ],
    tests: [
      { input: "100 75", output: "25" },
      { input: "12 24", output: "12" },
    ],
    lessonSlug: "functions-and-decomposition",
  },
  {
    slug: "prime-check",
    title: "判斷質數",
    category: "函式",
    difficulty: 2,
    summary: "檢查一個整數是否只能被 1 與自己整除。",
    description: "輸入大於 1 的整數 n；若 n 是質數輸出 prime，否則輸出 composite。",
    inputFormat: "一個大於 1 的整數 n。",
    outputFormat: "prime 或 composite。",
    starterCode: starter("int n;\n    cin >> n;\n    bool prime = true;\n    // 檢查 2 到 n - 1 是否可整除 n"),
    hints: [
      "從 2 開始尋找可能的因數。",
      "如果找到因數，就把 prime 設為 false。",
      "只要 n % i == 0，就代表 i 是 n 的因數。",
      "找到因數後可以直接 break。",
      `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool prime = true;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            prime = false;
            break;
        }
    }
    cout << (prime ? "prime" : "composite");
    return 0;
}`,
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool prime = true;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            prime = false;
            break;
        }
    }
    cout << (prime ? "prime" : "composite");
    return 0;
}`,
    samples: [
      { input: "13", output: "prime" },
      { input: "12", output: "composite" },
    ],
    tests: [
      { input: "2", output: "prime" },
      { input: "49", output: "composite" },
      { input: "97", output: "prime" },
    ],
    lessonSlug: "functions-and-decomposition",
  },
  {
    slug: "linear-search",
    title: "線性搜尋位置",
    category: "搜尋",
    difficulty: 2,
    summary: "逐項尋找目標，回傳它第一次出現的位置。",
    description: "輸入 n 個整數與目標 target；輸出 target 第一次出現的索引，找不到則輸出 -1。索引從 0 開始。",
    inputFormat: "第一行 n，第二行 n 個整數，第三行 target。",
    outputFormat: "目標索引或 -1。",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    // 從左到右尋找 target
    return 0;
}`,
    hints: [
      "依索引由左而右逐一比較。",
      "找到 target 時，可以直接輸出目前索引。",
      "如果迴圈結束仍沒找到，就輸出 -1。",
      "找到後可以 return 0，避免繼續搜尋。",
      `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    for (int i = 0; i < n; i++) {
        if (values[i] == target) {
            cout << i;
            return 0;
        }
    }
    cout << -1;
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    for (int i = 0; i < n; i++) {
        if (values[i] == target) {
            cout << i;
            return 0;
        }
    }
    cout << -1;
    return 0;
}`,
    samples: [
      { input: "5\n4 8 15 16 23\n15", output: "2" },
      { input: "3\n1 2 3\n9", output: "-1" },
    ],
    tests: [
      { input: "4\n7 7 9 1\n7", output: "0" },
      { input: "1\n5\n5", output: "0" },
      { input: "2\n-1 4\n-2", output: "-1" },
    ],
    lessonSlug: "linear-search-complexity",
  },
  {
    slug: "first-at-least",
    title: "第一個大於等於的數",
    category: "搜尋",
    difficulty: 3,
    summary: "在已排序陣列中找出第一個大於等於 target 的索引。",
    description: "輸入一個遞增排序的陣列與 target，輸出第一個大於等於 target 的索引；若不存在則輸出 -1。",
    inputFormat: "第一行 n，第二行已排序的 n 個整數，第三行 target。",
    outputFormat: "第一個大於等於 target 的索引，或 -1。",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    // 使用二分搜尋找出 lower bound
    return 0;
}`,
    hints: [
      "資料已經排序，可以使用二分搜尋。",
      "即使 values[mid] >= target，答案仍可能在更左邊。",
      "保存目前找到的最佳索引，再往左縮小。",
      "最後回傳最佳索引；若從未找到，就是 -1。",
      `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    int left = 0, right = n - 1, answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] >= target) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    cout << answer;
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    int left = 0, right = n - 1, answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] >= target) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    cout << answer;
    return 0;
}`,
    samples: [
      { input: "6\n1 3 3 5 8 10\n4", output: "3" },
      { input: "4\n2 4 6 8\n9", output: "-1" },
    ],
    tests: [
      { input: "5\n1 3 5 7 9\n1", output: "0" },
      { input: "5\n1 2 2 2 4\n2", output: "1" },
      { input: "3\n10 20 30\n15", output: "1" },
    ],
    lessonSlug: "binary-search-debugging",
  },
  {
    slug: "binary-search",
    title: "二分搜尋",
    category: "搜尋",
    difficulty: 3,
    summary: "在已排序陣列中用 O(log n) 找到目標。",
    description: "輸入一個遞增排序的陣列與 target，使用二分搜尋輸出 target 第一次出現的索引；找不到則輸出 -1。",
    inputFormat: "第一行 n，第二行已排序的 n 個整數，第三行 target。",
    outputFormat: "目標索引或 -1。",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    int left = 0;
    int right = n - 1;
    int answer = -1;
    // 實作二分搜尋
    return 0;
}`,
    hints: [
      "每回合先檢查 left 是否仍小於等於 right。",
      "用 left + (right - left) / 2 安全地計算中間索引。",
      "values[mid] 若大於等於 target，答案可能在左側。",
      "找到相等元素時記錄位置，再繼續往左尋找第一次出現的位置。",
      `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    int left = 0, right = n - 1, answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] >= target) {
            if (values[mid] == target) answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    cout << answer;
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    int left = 0, right = n - 1, answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] >= target) {
            if (values[mid] == target) answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    cout << answer;
    return 0;
}`,
    samples: [
      { input: "7\n1 3 5 7 9 11 13\n7", output: "3" },
      { input: "4\n2 4 6 8\n5", output: "-1" },
    ],
    tests: [
      { input: "6\n1 2 2 2 5 8\n2", output: "1" },
      { input: "1\n42\n42", output: "0" },
      { input: "5\n-8 -2 0 3 9\n9", output: "4" },
    ],
    lessonSlug: "binary-search-invariant",
  },
];

export function getExercise(slug: string) {
  return exercises.find((exercise) => exercise.slug === slug);
}
