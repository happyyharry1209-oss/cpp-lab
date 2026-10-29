export type ExerciseCategory =
  | "基礎語法"
  | "流程控制"
  | "陣列"
  | "函式"
  | "搜尋"
  | "字串"
  | "STL";

export type ExerciseDifficulty = 1 | 2 | 3;

export interface JudgeCase {
  input: string;
  output: string;
}

interface ExerciseCore {
  slug: string;
  stage: 1 | 2;
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

export interface Exercise extends ExerciseCore {
  constraints: string[];
  strategy: string[];
  walkthrough: string[];
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  commonMistakes: Array<{
    mistake: string;
    fix: string;
  }>;
}

const starter = (body: string) => `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ${body}
    return 0;
}
`;

const exerciseCores: ExerciseCore[] = [
  {
    slug: "hello-cpp-lab",
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
  {
    slug: "count-vowels",
    stage: 2,
    title: "計算母音數量",
    category: "字串",
    difficulty: 2,
    summary: "走訪字串中的每個字元，計算英文母音 a、e、i、o、u。",
    description: "讀取一行文字，計算其中英文母音 a、e、i、o、u 的數量，大小寫都算。",
    inputFormat: "一行可能包含空白的文字。",
    outputFormat: "輸出母音總數。",
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    int count = 0;
    // 走訪每個字元並判斷是否為母音
    cout << count;
    return 0;
}`,
    hints: [
      "使用範圍迴圈可以逐一讀取字串中的 char。",
      "a、e、i、o、u 都要計入，大寫 A、E、I、O、U 也要。",
      "先將字元轉成小寫，可以減少要判斷的條件。",
      "tolower 接收 char 時，先轉成 unsigned char 可以避免未定義行為。",
      `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    int count = 0;
    for (char ch : line) {
        char lower = tolower(static_cast<unsigned char>(ch));
        if (lower == 'a' || lower == 'e' || lower == 'i'
            || lower == 'o' || lower == 'u') {
            count++;
        }
    }
    cout << count;
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    int count = 0;
    for (char ch : line) {
        char lower = tolower(static_cast<unsigned char>(ch));
        if (lower == 'a' || lower == 'e' || lower == 'i'
            || lower == 'o' || lower == 'u') {
            count++;
        }
    }
    cout << count;
    return 0;
}`,
    samples: [
      { input: "Hello C++ World", output: "3" },
      { input: "AEIOU", output: "5" },
    ],
    tests: [
      { input: "xyz", output: "0" },
      { input: "Binary Search", output: "4" },
    ],
    lessonSlug: "strings-basics",
  },
  {
    slug: "word-count",
    stage: 2,
    title: "計算單字數量",
    category: "字串",
    difficulty: 2,
    summary: "使用 stringstream 依空白切分輸入文字。",
    description: "讀取一整行文字，輸出其中以空白分隔的單字數量。",
    inputFormat: "一行文字。",
    outputFormat: "輸出單字數量。",
    starterCode: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream stream(line);
    string word;
    int count = 0;
    // 逐一讀取單字
    cout << count;
    return 0;
}`,
    hints: [
      "stringstream 可以像 cin 一樣用 >> 讀取。",
      "當 stream >> word 失敗時，代表沒有更多單字。",
      "用 while (stream >> word) 包住讀取。",
      "每成功讀到一個 word，就把 count 加一。",
      `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream stream(line);
    string word;
    int count = 0;
    while (stream >> word) count++;
    cout << count;
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream stream(line);
    string word;
    int count = 0;
    while (stream >> word) count++;
    cout << count;
    return 0;
}`,
    samples: [
      { input: "learn cpp every day", output: "4" },
      { input: "Hello", output: "1" },
    ],
    tests: [
      { input: "  one   two three ", output: "3" },
      { input: "", output: "0" },
    ],
    lessonSlug: "string-search-parsing",
  },
  {
    slug: "first-repeated-word",
    stage: 2,
    title: "第一個重複單字",
    category: "STL",
    difficulty: 2,
    summary: "使用 set 判斷某個單字是否已經出現。",
    description: "輸入 n 個單字，依序找出第一個第二次出現的單字；若沒有重複，輸出 none。",
    inputFormat: "第一行 n，接著 n 個以小寫字母組成的單字。",
    outputFormat: "第一個重複單字，或 none。",
    starterCode: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<string> seen;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        // 判斷 word 是否已經出現
    }
    return 0;
}`,
    hints: [
      "set 適合保存已經看過且不重複的元素。",
      "用 seen.count(word) 判斷 word 是否已存在。",
      "第一次重複時輸出 word，並立刻結束程式。",
      "若迴圈結束仍沒重複，最後輸出 none。",
      `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<string> seen;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        if (seen.count(word)) {
            cout << word;
            return 0;
        }
        seen.insert(word);
    }
    cout << "none";
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<string> seen;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        if (seen.count(word)) {
            cout << word;
            return 0;
        }
        seen.insert(word);
    }
    cout << "none";
    return 0;
}`,
    samples: [
      { input: "5\napple banana apple banana cherry", output: "apple" },
      { input: "4\none two three four", output: "none" },
    ],
    tests: [
      { input: "3\na b b", output: "b" },
      { input: "5\na a a a a", output: "a" },
    ],
    lessonSlug: "sets-and-maps",
  },
  {
    slug: "unique-count",
    stage: 2,
    title: "不重複數字數量",
    category: "STL",
    difficulty: 1,
    summary: "用 set 自動去除重複元素並計算不同數字數量。",
    description: "輸入 n 個整數，輸出其中不同整數的數量。",
    inputFormat: "第一行 n，第二行 n 個整數。",
    outputFormat: "不同整數的數量。",
    starterCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> uniqueValues;
    // 讀取資料並加入 set
    cout << uniqueValues.size();
    return 0;
}`,
    hints: [
      "set 會自動忽略已經存在的相同數值。",
      "讀取整數後直接 insert 到 set。",
      "處理完所有輸入後，set.size() 就是不同數量。",
      "不需要手動搜尋是否重複，set 會處理。",
      `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> uniqueValues;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        uniqueValues.insert(value);
    }
    cout << uniqueValues.size();
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> uniqueValues;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        uniqueValues.insert(value);
    }
    cout << uniqueValues.size();
    return 0;
}`,
    samples: [
      { input: "6\n1 2 2 3 3 3", output: "3" },
      { input: "3\n-1 0 1", output: "3" },
    ],
    tests: [
      { input: "5\n7 7 7 7 7", output: "1" },
      { input: "4\n9 1 9 2", output: "3" },
    ],
    lessonSlug: "sets-and-maps",
  },
  {
    slug: "word-frequency",
    stage: 2,
    title: "查詢單字出現次數",
    category: "STL",
    difficulty: 2,
    summary: "使用 map 累計每個單字出現的次數。",
    description: "輸入 n 個單字與一個查詢單字 target，輸出 target 出現的次數。",
    inputFormat: "第一行 n，第二行 n 個單字，第三行 target。",
    outputFormat: "target 的出現次數。",
    starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> frequency;
    // 讀取單字並累計
    string target;
    cin >> target;
    cout << frequency[target];
    return 0;
}`,
    hints: [
      "map 可以讓單字對應到出現次數。",
      "讀到一個單字時，執行 frequency[word]++。",
      "最後用 frequency[target] 取得查詢次數。",
      "若 target 從未出現，map 會回傳預設值 0。",
      `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> frequency;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        frequency[word]++;
    }
    string target;
    cin >> target;
    cout << frequency[target];
    return 0;
}`,
    ],
    solution: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> frequency;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        frequency[word]++;
    }
    string target;
    cin >> target;
    cout << frequency[target];
    return 0;
}`,
    samples: [
      {
        input: "5\ncpp vector cpp map cpp\ncpp",
        output: "3",
      },
      { input: "3\na b c\nd", output: "0" },
    ],
    tests: [
      { input: "4\nhi hi ho hi\nhi", output: "3" },
      { input: "1\nsolo\nsolo", output: "1" },
    ],
    lessonSlug: "sets-and-maps",
  },
  {
    slug: "sort-scores",
    stage: 2,
    title: "成績排行榜",
    category: "STL",
    difficulty: 3,
    summary: "使用 pair 與自訂比較器完成多欄位排序。",
    description: "輸入每位學生的名稱與成績，依成績由高到低排序；同分時名稱依字母順序由小到大。",
    inputFormat: "第一行 n，接著 n 行包含名稱與整數成績。",
    outputFormat: "排序後每行輸出名稱與成績。",
    starterCode: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> scores(n);
    for (auto& item : scores) cin >> item.first >> item.second;
    // 依成績由高到低，同分依名稱排序
    for (const auto& item : scores) {
        cout << item.first << " " << item.second << "\\n";
    }
    return 0;
}`,
    hints: [
      "pair 的 first 是名稱，second 是成績。",
      "自訂比較器要先比較 second，且分數高者排前面。",
      "若第二個值不同，回傳 a.second > b.second。",
      "分數相同時回傳 a.first < b.first。",
      `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> scores(n);
    for (auto& item : scores) cin >> item.first >> item.second;
    sort(scores.begin(), scores.end(),
        [](const auto& a, const auto& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });
    for (const auto& item : scores) {
        cout << item.first << " " << item.second << "\\n";
    }
    return 0;
}`,
    ],
    solution: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> scores(n);
    for (auto& item : scores) cin >> item.first >> item.second;
    sort(scores.begin(), scores.end(),
        [](const auto& a, const auto& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });
    for (const auto& item : scores) {
        cout << item.first << " " << item.second << "\\n";
    }
    return 0;
}`,
    samples: [
      {
        input: "3\nBob 80\nAda 90\nCy 80",
        output: "Ada 90\nBob 80\nCy 80",
      },
      {
        input: "2\nZoe 70\nAmy 70",
        output: "Amy 70\nZoe 70",
      },
    ],
    tests: [
      {
        input: "3\nB 100\nA 100\nC 99",
        output: "A 100\nB 100\nC 99",
      },
      {
        input: "2\nB 1\nA 2",
        output: "A 2\nB 1",
      },
    ],
    lessonSlug: "custom-sort-pairs",
  },
  {
    slug: "lower-bound-index",
    stage: 2,
    title: "lower_bound 的位置",
    category: "STL",
    difficulty: 3,
    summary: "使用 STL 二分搜尋找出第一個不小於 target 的索引。",
    description: "輸入一個遞增排序的陣列與 target，輸出 lower_bound 的索引；若不存在則輸出 -1。",
    inputFormat: "第一行 n，第二行已排序的 n 個整數，第三行 target。",
    outputFormat: "第一個大於等於 target 的索引，或 -1。",
    starterCode: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    // 使用 lower_bound 並輸出索引
    return 0;
}`,
    hints: [
      "lower_bound 需要已排序的容器。",
      "它回傳的是 iterator，不是直接索引。",
      "若 iterator 等於 values.end()，代表找不到。",
      "使用 distance(values.begin(), it) 轉成索引。",
      `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    auto it = lower_bound(values.begin(), values.end(), target);
    if (it == values.end()) cout << -1;
    else cout << distance(values.begin(), it);
    return 0;
}`,
    ],
    solution: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    auto it = lower_bound(values.begin(), values.end(), target);
    if (it == values.end()) cout << -1;
    else cout << distance(values.begin(), it);
    return 0;
}`,
    samples: [
      { input: "5\n1 3 3 5 8\n4", output: "3" },
      { input: "4\n2 4 6 8\n9", output: "-1" },
    ],
    tests: [
      { input: "4\n1 2 2 5\n2", output: "1" },
      { input: "3\n10 20 30\n15", output: "1" },
    ],
    lessonSlug: "binary-search-stl",
  },
  {
    slug: "upper-bound-count",
    stage: 2,
    title: "用上下界計算出現次數",
    category: "STL",
    difficulty: 3,
    summary: "結合 lower_bound 與 upper_bound 統計重複值。",
    description: "輸入一個遞增排序的陣列與 target，使用上下界輸出 target 出現的次數。",
    inputFormat: "第一行 n，第二行已排序的 n 個整數，第三行 target。",
    outputFormat: "target 的出現次數。",
    starterCode: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    // 計算 lower_bound 到 upper_bound 的距離
    return 0;
}`,
    hints: [
      "lower_bound 找到第一個等於 target 的位置。",
      "upper_bound 找到第一個大於 target 的位置。",
      "這兩個 iterator 之間都等於 target。",
      "用 distance(first, last) 取得元素數量。",
      `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    auto first = lower_bound(values.begin(), values.end(), target);
    auto last = upper_bound(values.begin(), values.end(), target);
    cout << distance(first, last);
    return 0;
}`,
    ],
    solution: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    for (int& value : values) cin >> value;
    int target;
    cin >> target;
    auto first = lower_bound(values.begin(), values.end(), target);
    auto last = upper_bound(values.begin(), values.end(), target);
    cout << distance(first, last);
    return 0;
}`,
    samples: [
      { input: "7\n1 3 3 3 5 8 8\n3", output: "3" },
      { input: "4\n2 4 6 8\n5", output: "0" },
    ],
    tests: [
      { input: "5\n1 1 1 2 3\n1", output: "3" },
      { input: "3\n-2 -2 -2\n-2", output: "3" },
    ],
    lessonSlug: "binary-search-stl",
  },
];

type ExerciseDetail = Omit<Exercise, keyof ExerciseCore>;

const exerciseDetails: Record<string, ExerciseDetail> = {
  "hello-cpp-lab": {
    constraints: [
      "程式不需要讀取輸入。",
      "輸出必須與題目逐字相同，包含大小寫與標點。",
      "只能輸出指定文字，不能加入提示句。",
    ],
    strategy: [
      "先建立最小的 main 函式。",
      "使用 cout 輸出完整字串。",
      "提交前逐字核對逗號、空白與驚嘆號。",
    ],
    walkthrough: [
      "程式啟動後直接進入 main。",
      "cout 將字串 Hello, C++ Lab! 寫入標準輸出。",
      "沒有其他輸出，因此批改會判定完全相符。",
    ],
    complexity: {
      time: "O(1)",
      space: "O(1)",
      explanation: "固定長度文字只輸出一次，成本不隨輸入成長。",
    },
    commonMistakes: [
      {
        mistake: "多輸出 Please enter 等提示文字。",
        fix: "批改只接受題目指定的輸出，提示文字也會被視為錯誤答案。",
      },
      {
        mistake: "漏掉驚嘆號或使用小寫 hello。",
        fix: "字串比較區分大小寫與標點，必須完全一致。",
      },
    ],
  },
  "swap-numbers": {
    constraints: [
      "輸入恰好包含兩個整數。",
      "兩個整數皆在 int 可表示範圍內。",
      "輸出必須以一個空白分隔。",
    ],
    strategy: [
      "先讀取 a 與 b。",
      "可以輸出 b、a，或使用暫存變數真正交換。",
      "確認最後沒有多餘提示文字。",
    ],
    walkthrough: [
      "輸入 3 8 後，a = 3、b = 8。",
      "交換後兩個值變成 a = 8、b = 3。",
      "輸出 8 3，順序與題目要求一致。",
    ],
    complexity: {
      time: "O(1)",
      space: "O(1)",
      explanation: "只進行固定次數的讀取、賦值與輸出。",
    },
    commonMistakes: [
      {
        mistake: "連續寫 a = b; b = a;，結果兩個變數都變成 b。",
        fix: "先保存舊的 a，或直接以相反順序輸出。",
      },
      {
        mistake: "把輸出中間的空白省略。",
        fix: "兩個數字之間要輸出且只輸出一個空白。",
      },
    ],
  },
  "even-or-odd": {
    constraints: [
      "輸入為一個可放入 int 的整數。",
      "0 視為偶數。",
      "負數也要正確判斷。",
    ],
    strategy: [
      "讀取整數 n。",
      "使用 n % 2 == 0 判斷偶數。",
      "依條件輸出小寫的 even 或 odd。",
    ],
    walkthrough: [
      "n = -3 時，-3 % 2 不等於 0。",
      "因此條件 n % 2 == 0 不成立。",
      "程式進入 else，輸出 odd。",
    ],
    complexity: {
      time: "O(1)",
      space: "O(1)",
      explanation: "只進行一次餘數運算與條件判斷。",
    },
    commonMistakes: [
      {
        mistake: "使用 n % 2 == 1 判斷奇數。",
        fix: "負奇數的餘數可能是 -1，使用 != 0 更可靠。",
      },
      {
        mistake: "輸出 Even 或 ODD。",
        fix: "批改區分大小寫，必須使用題目指定的小寫。",
      },
    ],
  },
  "largest-of-three": {
    constraints: [
      "輸入恰好有三個整數。",
      "允許負數與重複值。",
      "只需輸出一個最大值。",
    ],
    strategy: [
      "先假設第一個數是最大值。",
      "依序與其他兩個數比較並更新。",
      "最後輸出保存的最大值。",
    ],
    walkthrough: [
      "輸入 -4 -2 -9，best 先設為 -4。",
      "-2 > -4，因此 best 更新成 -2。",
      "-9 不大於 -2，best 保持 -2。",
    ],
    complexity: {
      time: "O(1)",
      space: "O(1)",
      explanation: "固定比較三個數字，不隨資料量成長。",
    },
    commonMistakes: [
      {
        mistake: "把最大值初始化為 0。",
        fix: "若全部是負數，0 並不存在於輸入，答案會錯誤。",
      },
      {
        mistake: "只寫兩個 if，沒有處理第三個數。",
        fix: "每個候選值都必須與目前最大值比較。",
      },
    ],
  },
  "sum-to-n": {
    constraints: [
      "n 為正整數。",
      "本站測資保證總和在 32-bit int 範圍內。",
      "輸出只需要總和。",
    ],
    strategy: [
      "準備 sum 並初始化為 0。",
      "讓 i 從 1 走到 n。",
      "每回合把 i 加進 sum。",
    ],
    walkthrough: [
      "n = 5，sum 初始為 0。",
      "依序加入 1、2、3、4、5。",
      "sum 最後為 15。",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      explanation: "迴圈執行 n 次，只保存一個總和。",
    },
    commonMistakes: [
      {
        mistake: "把 sum 初始化為 1。",
        fix: "總和起點是 0，否則答案會多 1。",
      },
      {
        mistake: "迴圈條件寫成 i < n。",
        fix: "題目包含 n，因此條件需讓 i 等於 n 時仍執行。",
      },
    ],
  },
  "count-positives": {
    constraints: [
      "第一行 n 表示整數數量。",
      "0 不是正數。",
      "需處理全為 0 或負數的情況。",
    ],
    strategy: [
      "讀取 n 並準備 count = 0。",
      "執行 n 次讀取，每次檢查 value > 0。",
      "符合條件時將 count 加一。",
    ],
    walkthrough: [
      "輸入資料 -2 0 3 7 -1。",
      "依序判斷後只有 3 與 7 大於 0。",
      "count 最終為 2。",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      explanation: "每個數字檢查一次，不需要保存整份資料。",
    },
    commonMistakes: [
      {
        mistake: "把 0 算成正數。",
        fix: "正數條件是 value > 0，不包含等於 0。",
      },
      {
        mistake: "count 初始值設錯。",
        fix: "尚未看到任何正數時，數量必須是 0。",
      },
    ],
  },
  "reverse-array": {
    constraints: [
      "n 至少為 1。",
      "輸出數字以一個空白分隔。",
      "最後一個數字後不可多輸出空白。",
    ],
    strategy: [
      "先將所有元素讀入 vector。",
      "從索引 n - 1 往 0 走訪。",
      "只在元素之間輸出空白。",
    ],
    walkthrough: [
      "資料為 1 2 3 4。",
      "走訪索引 3、2、1、0。",
      "輸出 4 3 2 1。",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
      explanation: "需要保存 n 個元素，並反向走訪一次。",
    },
    commonMistakes: [
      {
        mistake: "從索引 n 開始走訪。",
        fix: "最後合法索引是 n - 1。",
      },
      {
        mistake: "每個數字後都輸出空白。",
        fix: "只在目前索引大於 0 時輸出分隔空白。",
      },
    ],
  },
  gcd: {
    constraints: [
      "a 與 b 都是正整數。",
      "其中一個數可以是另一個數的倍數。",
      "輸出唯一的最大公因數。",
    ],
    strategy: [
      "使用性質 gcd(a, b) = gcd(b, a % b)。",
      "持續計算餘數並交換角色。",
      "當 b 變成 0 時，a 就是答案。",
    ],
    walkthrough: [
      "a = 48、b = 18，48 % 18 = 12。",
      "新狀態 a = 18、b = 12，18 % 12 = 6。",
      "新狀態 a = 12、b = 6，最後餘數 0，答案為 6。",
    ],
    complexity: {
      time: "O(log min(a, b))",
      space: "O(1)",
      explanation: "輾轉相除法的餘數會快速縮小，迭代版本只保存常數個變數。",
    },
    commonMistakes: [
      {
        mistake: "更新 a 前先覆蓋 b，導致遺失舊值。",
        fix: "先保存餘數，再依序更新 a = b、b = remainder。",
      },
      {
        mistake: "迴圈條件寫成 b > 0 以外的不等式。",
        fix: "當 b == 0 時停止，此時 a 即為最大公因數。",
      },
    ],
  },
  "prime-check": {
    constraints: [
      "n 是大於 1 的整數。",
      "2 是質數。",
      "只要找到一個因數就能判定 composite。",
    ],
    strategy: [
      "先假設 n 是質數。",
      "從 2 開始尋找可能的因數。",
      "找到因數後立即停止。",
    ],
    walkthrough: [
      "n = 49，prime 初始為 true。",
      "檢查 i = 7 時發現 49 % 7 == 0。",
      "prime 變成 false 並 break，輸出 composite。",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      explanation: "目前解法最壞會檢查到 n - 1，之後可進一步優化到 √n。",
    },
    commonMistakes: [
      {
        mistake: "把 2 判定成 composite。",
        fix: "迴圈從 2 開始且 i < n；n = 2 時不會找到因數。",
      },
      {
        mistake: "找到因數後仍繼續迴圈。",
        fix: "可以 break，避免不必要檢查。",
      },
    ],
  },
  "linear-search": {
    constraints: [
      "陣列不一定已排序。",
      "可能有多個相同目標，只需回傳第一個索引。",
      "找不到時輸出 -1。",
    ],
    strategy: [
      "從索引 0 開始逐項比較。",
      "命中時立即輸出索引並結束。",
      "完整走完仍未找到才輸出 -1。",
    ],
    walkthrough: [
      "在 [4, 8, 15, 16, 23] 尋找 15。",
      "索引 0、1 都不符合。",
      "索引 2 等於 15，因此回傳 2。",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      explanation: "最壞情況下每個元素都必須檢查一次。",
    },
    commonMistakes: [
      {
        mistake: "第一次不相等就輸出 -1。",
        fix: "必須等整段迴圈結束後才能宣告找不到。",
      },
      {
        mistake: "從索引 1 開始。",
        fix: "索引 0 是第一筆資料，不能跳過。",
      },
    ],
  },
  "first-at-least": {
    constraints: [
      "陣列以非遞減順序排序，允許重複值。",
      "target 可能大於所有元素。",
      "需要第一個符合條件的位置，而不是任意位置。",
    ],
    strategy: [
      "使用閉區間二分搜尋。",
      "當 values[mid] >= target 時記錄答案並往左。",
      "否則往右尋找。",
    ],
    walkthrough: [
      "資料 [1, 3, 3, 5, 8, 10]，target = 4。",
      "mid = 2 時值為 3，往右。",
      "mid = 3 時值為 5，記錄索引 3 後繼續往左，最終答案仍為 3。",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      explanation: "每次比較排除一半搜尋範圍。",
    },
    commonMistakes: [
      {
        mistake: "條件符合就立刻回傳。",
        fix: "可能還有更左邊的符合元素，需保存答案並繼續往左。",
      },
      {
        mistake: "忘記處理全部元素都小於 target。",
        fix: "answer 初始值設為 -1，迴圈結束仍沒更新時即可輸出。",
      },
    ],
  },
  "binary-search": {
    constraints: [
      "陣列已依非遞減順序排序。",
      "重複值要回傳第一次出現的位置。",
      "找不到時輸出 -1。",
    ],
    strategy: [
      "維護閉區間 [left, right]。",
      "使用安全公式計算 mid。",
      "等於 target 時記錄位置並繼續往左找第一次出現。",
    ],
    walkthrough: [
      "資料 [1, 2, 2, 2, 5, 8]，target = 2。",
      "mid 命中某個 2，先記錄位置並將 right 左移。",
      "後續檢查仍命中索引 1，答案是第一個 2。",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      explanation: "每回合區間減半，只需要常數個狀態變數。",
    },
    commonMistakes: [
      {
        mistake: "找到任意 target 立刻結束。",
        fix: "題目要求第一次出現，需繼續往左搜尋。",
      },
      {
        mistake: "更新邊界時沒有 +1 或 -1。",
        fix: "排除已檢查的 mid，才能保證區間縮小。",
      },
    ],
  },
  "count-vowels": {
    constraints: [
      "輸入是一整行文字，可能包含空白。",
      "只計算英文 a、e、i、o、u。",
      "大小寫母音都要計算。",
    ],
    strategy: [
      "使用 getline 保留整行內容。",
      "逐一走訪每個 char。",
      "將字元轉成小寫後判斷是否為母音。",
    ],
    walkthrough: [
      "文字 Hello C++ World。",
      "e、o、o 是母音。",
      "其餘空白、標點與子音不計入，答案為 3。",
    ],
    complexity: {
      time: "O(L)",
      space: "O(1)",
      explanation: "L 是字串長度；每字元檢查固定數量條件。",
    },
    commonMistakes: [
      {
        mistake: "使用 cin >> line。",
        fix: "cin 會在空白停止，必須使用 getline。",
      },
      {
        mistake: "只判斷小寫母音。",
        fix: "使用 tolower 或同時列出大小寫。",
      },
    ],
  },
  "word-count": {
    constraints: [
      "輸入是一整行文字。",
      "多個連續空白不應產生空單字。",
      "空行應輸出 0。",
    ],
    strategy: [
      "用 getline 讀取完整內容。",
      "把字串交給 stringstream。",
      "每次成功執行 stream >> word 就把 count 加一。",
    ],
    walkthrough: [
      "輸入 learn cpp every day。",
      "stringstream 依序取出四個單字。",
      "第五次讀取失敗，count 停在 4。",
    ],
    complexity: {
      time: "O(L)",
      space: "O(L)",
      explanation: "需保存輸入字串，並掃描其中的字元。",
    },
    commonMistakes: [
      {
        mistake: "用固定次數的 cin >> word。",
        fix: "單字數量未知，應用 while 讀到串流結束。",
      },
      {
        mistake: "自行以單一空白切分。",
        fix: "連續空白與開頭空白會造成空字串，stringstream 能自然處理。",
      },
    ],
  },
  "first-repeated-word": {
    constraints: [
      "單字由小寫字母組成。",
      "回傳的是第二次出現的第一個單字。",
      "完全沒有重複時輸出 none。",
    ],
    strategy: [
      "使用 set 保存已看過的單字。",
      "每讀到新單字先檢查是否已在 set。",
      "若已存在就立即輸出並結束。",
    ],
    walkthrough: [
      "依序看到 apple、banana。",
      "再次看到 apple 時，set.count(apple) 為 1。",
      "立即輸出 apple，後續資料不再處理。",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      explanation: "最多保存 n 個單字，set 操作通常是對數成本。",
    },
    commonMistakes: [
      {
        mistake: "先 insert 再檢查 count，所有單字都會被認為重複。",
        fix: "先檢查，確定沒出現過後再 insert。",
      },
      {
        mistake: "統計完所有頻率後才找。",
        fix: "題目要求第一個重複，找到即可停止。",
      },
    ],
  },
  "unique-count": {
    constraints: [
      "n 表示整數數量。",
      "相同整數只計算一次。",
      "輸出不同整數的總數。",
    ],
    strategy: [
      "準備 set<int>。",
      "把每個讀到的整數插入 set。",
      "最後用 size 取得不同值數量。",
    ],
    walkthrough: [
      "輸入 1 2 2 3 3 3。",
      "set 只保留 1、2、3。",
      "size 為 3。",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      explanation: "n 次插入，每次 set 插入具有對數成本。",
    },
    commonMistakes: [
      {
        mistake: "使用 vector 但不檢查重複。",
        fix: "vector 不會自動去重，應使用 set 或另外記錄。",
      },
      {
        mistake: "在輸入途中輸出 size。",
        fix: "全部資料處理完後才能取得最終不同數量。",
      },
    ],
  },
  "word-frequency": {
    constraints: [
      "n 表示單字數量。",
      "target 可能沒有出現。",
      "單字由小寫字母組成。",
    ],
    strategy: [
      "使用 map<string, int>。",
      "每讀到 word 就執行 frequency[word]++。",
      "最後輸出 frequency[target]。",
    ],
    walkthrough: [
      "cpp 出現三次、vector 與 map 各一次。",
      "frequency[cpp] = 3，其他 key 各有自己的次數。",
      "查詢 cpp 時輸出 3。",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      explanation: "每個不同單字可能建立一個 map entry，操作為對數成本。",
    },
    commonMistakes: [
      {
        mistake: "把每個單字存成獨立變數。",
        fix: "單字種類未知，應使用 map 依 key 儲存。",
      },
      {
        mistake: "查詢不存在單字時輸出錯誤資訊。",
        fix: "map 的預設整數值為 0，本題應直接輸出 0。",
      },
    ],
  },
  "sort-scores": {
    constraints: [
      "名稱由英文字母組成。",
      "分數為整數，允許同分。",
      "先比分數，再比名稱。",
    ],
    strategy: [
      "使用 vector<pair<string, int>> 保存資料。",
      "撰寫先比較分數、再比較名稱的 comparator。",
      "排序後逐行輸出。",
    ],
    walkthrough: [
      "Bob 80、Ada 90、Cy 80。",
      "主排序先處理分數：Ada 在前。",
      "Bob 與 Cy 同分，再依名稱得到 Bob、Cy。",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      explanation: "排序比較次數是 O(n log n)，資料保存在 vector。",
    },
    commonMistakes: [
      {
        mistake: "只比較分數。",
        fix: "同分時仍需要用名稱決定順序。",
      },
      {
        mistake: "比較器在相等時回傳 true。",
        fix: "相等元素應回傳 false，維持嚴格弱序。",
      },
    ],
  },
  "lower-bound-index": {
    constraints: [
      "values 已依非遞減順序排序。",
      "target 可能大於所有元素。",
      "找不到符合元素時輸出 -1。",
    ],
    strategy: [
      "呼叫 lower_bound。",
      "先檢查回傳 iterator 是否等於 end。",
      "使用 distance 轉換成索引。",
    ],
    walkthrough: [
      "[1, 3, 3, 5, 8]，target = 4。",
      "lower_bound 跳過所有小於 4 的元素。",
      "停在 5，對應索引 3。",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      explanation: "STL 二分搜尋只使用常數個 iterator 狀態。",
    },
    commonMistakes: [
      {
        mistake: "直接解引用 end iterator。",
        fix: "先比較 it == values.end()，再決定是否取值。",
      },
      {
        mistake: "把 iterator 當成整數索引直接輸出。",
        fix: "使用 distance(begin, it) 得到索引。",
      },
    ],
  },
  "upper-bound-count": {
    constraints: [
      "values 已依非遞減順序排序。",
      "target 可能不存在。",
      "需要統計所有等於 target 的元素。",
    ],
    strategy: [
      "用 lower_bound 找第一個不小於 target 的位置。",
      "用 upper_bound 找第一個大於 target 的位置。",
      "兩個 iterator 的距離就是出現次數。",
    ],
    walkthrough: [
      "資料 [1, 3, 3, 3, 5]，target = 3。",
      "first 指向索引 1。",
      "last 指向索引 4，距離為 3。",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      explanation: "執行兩次二分搜尋，整體仍為對數時間。",
    },
    commonMistakes: [
      {
        mistake: "使用 upper_bound 後仍減 1 當成起點。",
        fix: "lower_bound 才是第一個等於 target 的位置。",
      },
      {
        mistake: "target 不存在時仍輸出 1。",
        fix: "找不到時 lower_bound 與 upper_bound 會指向相同位置，距離為 0。",
      },
    ],
  },
};

export const exercises: Exercise[] = exerciseCores.map((exercise) => ({
  ...exercise,
  ...exerciseDetails[exercise.slug],
  samples: [...exercise.samples, exercise.tests[0]],
}));

export function getExercise(slug: string) {
  return exercises.find((exercise) => exercise.slug === slug);
}
