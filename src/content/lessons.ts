export interface LessonSection {
  title: string;
  body: string;
  code?: string;
  trace?: string[];
  pitfalls?: string[];
  keyPoints?: string[];
}

export interface LessonQuiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  number: number;
  stage: 1 | 2;
  title: string;
  summary: string;
  duration: string;
  recommendedExerciseSlug: string;
  objectives: string[];
  sections: LessonSection[];
  quiz: LessonQuiz;
  quizzes: LessonQuiz[];
}

type LessonCore = Omit<Lesson, "quizzes">;

interface LessonEnrichment {
  example: {
    intro: string;
    code: string;
  };
  trace: {
    intro: string;
    states: string[];
  };
  mistakes: {
    intro: string;
    items: string[];
  };
  summary: {
    intro: string;
    points: string[];
  };
  quiz: LessonQuiz;
}

const lessonCores: LessonCore[] = [
  {
    slug: "input-output-types",
    number: 1,
    stage: 1,
    title: "輸入、輸出與資料型別",
    summary: "先看懂程式的入口，再學會讓資料進入程式、顯示結果。",
    duration: "25 分鐘",
    recommendedExerciseSlug: "hello-cpp-lab",
    objectives: [
      "辨認 main 函式的角色",
      "使用 cin 與 cout",
      "選擇整數、浮點數或字串型別",
    ],
    sections: [
      {
        title: "每個 C++ 程式都從 main 開始",
        body: "作業系統執行程式後，會先找到 int main()。大括號中的內容稱為程式區塊，每一道指令通常以分號結束。",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++ Lab!" << endl;
    return 0;
}`,
      },
      {
        title: "用 cin 接收資料",
        body: "cin 會依空白分割輸入。若程式要讀取兩個整數，就必須提供兩個變數，而且變數型別要與資料相符。",
        code: `int a, b;
cin >> a >> b;
cout << a + b << endl;`,
      },
      {
        title: "先選對型別",
        body: "整數使用 int，小數使用 double，一段文字使用 string。選錯型別可能得到截斷的數值或無法編譯。",
        code: `int count = 3;
double price = 19.5;
string name = "C++";
cout << count << " " << price << " " << name;`,
      },
    ],
    quiz: {
      question: "要讀取一個可能含有小數的成績，哪個型別最合適？",
      options: ["int", "double", "bool", "char"],
      answer: 1,
      explanation: "double 能保留小數部分；int 會讓小數資訊遺失。",
    },
  },
  {
    slug: "conditions-and-edges",
    number: 2,
    stage: 1,
    title: "條件判斷與邊界",
    summary: "讓程式依情況做決定，並先處理輸入的最小值、最大值與特殊案例。",
    duration: "30 分鐘",
    recommendedExerciseSlug: "even-or-odd",
    objectives: ["撰寫 if/else", "比較數值與字元", "辨認常見邊界案例"],
    sections: [
      {
        title: "條件只會回答是或否",
        body: "比較運算會產生 true 或 false。若一個條件不夠，可以使用 else if 繼續檢查下一個可能。",
        code: `if (score >= 60) {
    cout << "及格";
} else {
    cout << "再試一次";
}`,
      },
      {
        title: "把邊界寫進思考清單",
        body: "遇到「正數」時要想 0；遇到「範圍」時要想最小值與最大值。邊界條件通常比中間的一般案例更容易出錯。",
        code: `if (n > 0) {
    cout << "positive";
} else if (n < 0) {
    cout << "negative";
} else {
    cout << "zero";
}`,
      },
    ],
    quiz: {
      question: "判斷 x 是否為偶數，哪個條件正確？",
      options: ["x / 2 == 0", "x % 2 == 0", "x + 2 == 0", "x = 2"],
      answer: 1,
      explanation: "% 會取得整數除法的餘數；偶數除以 2 的餘數為 0。",
    },
  },
  {
    slug: "loops-and-arrays",
    number: 3,
    stage: 1,
    title: "迴圈、陣列與索引",
    summary: "用迴圈處理重複工作，用 vector 保存一連串資料。",
    duration: "40 分鐘",
    recommendedExerciseSlug: "sum-to-n",
    objectives: ["使用 for 與 while", "建立與走訪 vector", "理解索引從 0 開始"],
    sections: [
      {
        title: "索引從 0 開始",
        body: "大小為 n 的 vector，可用索引 0 到 n - 1 存取。存取 n 會超出範圍，是初學者最常見的錯誤之一。",
        code: `vector<int> values = {4, 8, 15, 16};
for (int i = 0; i < values.size(); i++) {
    cout << values[i] << " ";
}`,
      },
      {
        title: "用範圍迴圈讀資料",
        body: "當你只需要讀取每個元素，不需要索引時，range-based for 更簡潔。",
        code: `for (int value : values) {
    cout << value << " ";
}`,
      },
    ],
    quiz: {
      question: "大小為 5 的 vector，合法索引範圍是什麼？",
      options: ["1 到 5", "0 到 4", "0 到 5", "1 到 4"],
      answer: 1,
      explanation: "C++ 陣列索引從 0 開始，因此大小 5 的最後索引是 4。",
    },
  },
  {
    slug: "functions-and-decomposition",
    number: 4,
    stage: 1,
    title: "函式與問題拆解",
    summary: "把大問題切成可命名、可測試、可重複使用的小步驟。",
    duration: "35 分鐘",
    recommendedExerciseSlug: "gcd",
    objectives: ["定義與呼叫函式", "選擇參數與回傳值", "用函式描述解題步驟"],
    sections: [
      {
        title: "函式把意圖變成名字",
        body: "好的函式名稱會直接說明它完成什麼事。參數是輸入，return 是輸出；不要讓一個函式同時處理太多責任。",
        code: `int square(int value) {
    return value * value;
}

int main() {
    cout << square(6);
}`,
      },
      {
        title: "先寫出步驟，再寫程式",
        body: "看到題目後先寫：讀取 → 計算 → 輸出。若「計算」很長，再拆成函式。這個順序能減少一邊想架構、一邊想語法的壓力。",
      },
    ],
    quiz: {
      question: "函式中的 return 主要負責什麼？",
      options: ["顯示文字", "接收輸入", "把結果交回呼叫者", "重新啟動程式"],
      answer: 2,
      explanation: "return 會結束函式，並把值交回呼叫它的地方。",
    },
  },
  {
    slug: "sorting-and-order",
    number: 5,
    stage: 1,
    title: "排序與有序資料",
    summary: "排序不只是整理輸出，也能建立讓後續搜尋更快的「有序」前提。",
    duration: "30 分鐘",
    recommendedExerciseSlug: "sort-scores",
    objectives: ["使用 sort", "理解遞增與遞減", "說明排序帶來的機會與成本"],
    sections: [
      {
        title: "先排序，再善用順序",
        body: "sort 會把元素排成遞增順序。一般排序成本是 O(n log n)，但排好之後，某些搜尋可以降為 O(log n)。",
        code: `sort(values.begin(), values.end());
for (int value : values) {
    cout << value << " ";
}`,
      },
      {
        title: "二分搜尋必須搭配已排序資料",
        body: "二分搜尋會根據中間值判斷答案在左邊或右邊。若資料沒有排序，這個判斷就沒有意義。",
      },
    ],
    quiz: {
      question: "二分搜尋能正確工作的前提是什麼？",
      options: ["元素都是正數", "元素已經排序", "元素數量是偶數", "不能有重複值"],
      answer: 1,
      explanation: "二分搜尋依賴有序性，才能排除一半的候選範圍。",
    },
  },
  {
    slug: "linear-search-complexity",
    number: 6,
    stage: 1,
    title: "線性搜尋與時間複雜度",
    summary: "從逐項掃描開始，學會用最壞情況估計程式需要多少步驟。",
    duration: "35 分鐘",
    recommendedExerciseSlug: "linear-search",
    objectives: ["實作線性搜尋", "讀懂 O(n)", "判斷何時需要更快的搜尋"],
    sections: [
      {
        title: "一項一項找",
        body: "線性搜尋從第一個元素開始，找到目標就停止。資料量增加兩倍，最壞情況下的檢查次數也大約增加兩倍。",
        code: `int findIndex(const vector<int>& values, int target) {
    for (int i = 0; i < values.size(); i++) {
        if (values[i] == target) return i;
    }
    return -1;
}`,
      },
      {
        title: "O(n) 描述成長趨勢",
        body: "O(n) 不是精確秒數，而是表示資料量 n 變大時，工作量大致呈線性成長。對一百萬筆未排序資料逐項搜尋，可能需要一百萬次比較。",
      },
    ],
    quiz: {
      question: "在未排序資料中尋找指定值，通常需要哪種複雜度？",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2,
      explanation: "最壞情況必須檢查所有元素，因此是線性時間。",
    },
  },
  {
    slug: "binary-search-invariant",
    number: 7,
    stage: 1,
    title: "二分搜尋的不變量",
    summary: "把搜尋範圍維持為 [left, right]，每回合安全地刪掉一半。",
    duration: "45 分鐘",
    recommendedExerciseSlug: "binary-search",
    objectives: ["解釋二分搜尋區間", "計算 mid", "追蹤 left 與 right 的更新"],
    sections: [
      {
        title: "一開始，答案可能在任何位置",
        body: "使用閉區間 [left, right] 時，left 與 right 都是可能的答案。每回合計算中間索引，再依比較結果排除一半。",
        code: `int left = 0;
int right = values.size() - 1;

while (left <= right) {
    int mid = left + (right - left) / 2;
    if (values[mid] == target) return mid;
    if (values[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,
      },
      {
        title: "每一回合都要讓區間縮小",
        body: "更新 left 或 right 時，必須排除已經檢查過的 mid。若區間沒有變小，程式就可能永遠停在相同範圍。",
      },
    ],
    quiz: {
      question: "閉區間 [left, right] 的二分搜尋，迴圈通常何時停止？",
      options: ["left < right", "left <= right", "mid == 0", "right == size"],
      answer: 1,
      explanation: "只要 left 尚未超過 right，區間仍可能有答案；當 left > right 時才停止。",
    },
  },
  {
    slug: "binary-search-debugging",
    number: 8,
    stage: 1,
    title: "二分搜尋變體與除錯",
    summary: "處理上下界、重複值、無限迴圈與整數溢位等實際問題。",
    duration: "50 分鐘",
    recommendedExerciseSlug: "first-at-least",
    objectives: ["找出無限迴圈原因", "安全計算 mid", "辨認 lower bound 類問題"],
    sections: [
      {
        title: "常見錯誤一：不做 +1 或 -1",
        body: "若 left = mid 而 mid 沒有前進，區間便可能不再縮小。使用 mid + 1 與 mid - 1 能讓每次更新都排除舊的 mid。",
      },
      {
        title: "常見錯誤二：整數加法溢位",
        body: "在非常大的索引下，left + right 可能超過 int 上限。先算 right - left 再加 left，能安全取得中間位置。",
        code: `int mid = left + (right - left) / 2;`,
      },
      {
        title: "常見錯誤三：把答案當成位置",
        body: "有些題目找的是「第一個大於等於目標的位置」，不是目標本身的位置。先寫清楚每一回合要保留哪一側，再改判斷條件。",
      },
    ],
    quiz: {
      question: "為什麼不建議使用 (left + right) / 2？",
      options: ["會改變陣列順序", "可能整數溢位", "結果一定是小數", "不能處理偶數"],
      answer: 1,
      explanation: "當 left 與 right 都很大時，加法可能超出 int 可表示的範圍。",
    },
  },
  {
    slug: "strings-basics",
    number: 9,
    stage: 2,
    title: "std::string 字串基礎",
    summary: "建立、讀取、修改與走訪 C++ 字串，處理包含空白的整行輸入。",
    duration: "40 分鐘",
    recommendedExerciseSlug: "count-vowels",
    objectives: [
      "使用 string 建立與串接文字",
      "用 size 與索引走訪字元",
      "使用 getline 讀取整行輸入",
    ],
    sections: [
      {
        title: "字串是一串可調整長度的字元",
        body: "std::string 會自行管理容量，不需要像 C 字元陣列一樣手動配置。size() 回傳字元數量，合法索引從 0 到 size() - 1。",
        code: `#include <string>
string name = "C++ Lab";
cout << name.size();       // 7
cout << name[0];           // C
name += "!";`,
      },
      {
        title: "cin 與 getline 的差別",
        body: "cin >> 會在空白處停止；若輸入可能包含空白，應使用 getline(cin, line)。混用 cin 與 getline 時，記得清除前一次輸入留下的換行。",
        code: `string line;
getline(cin, line);
cout << "長度：" << line.size();`,
      },
      {
        title: "範圍迴圈讀取字元",
        body: "範圍迴圈能把每個字元交給 value。若需要修改原字串，請使用 char&；只讀取時則直接使用 char。",
        code: `for (char ch : line) {
    if (ch == 'a') count++;
}`,
      },
    ],
    quiz: {
      question: "要讀取可能包含空格的整行文字，哪個做法最合適？",
      options: ["cin >> text", "getline(cin, text)", "cin.get()", "text.length()"],
      answer: 1,
      explanation: "getline 會保留空白，直到讀到換行為止。",
    },
  },
  {
    slug: "string-search-parsing",
    number: 10,
    stage: 2,
    title: "字串搜尋與解析",
    summary: "用 find、substr 與 stringstream 拆解文字並取出需要的資料。",
    duration: "45 分鐘",
    recommendedExerciseSlug: "word-count",
    objectives: [
      "使用 find 判斷子字串是否存在",
      "使用 substr 取出片段",
      "用 stringstream 切分單字",
    ],
    sections: [
      {
        title: "找不到時會回傳 npos",
        body: "string::find 回傳第一次出現的位置；找不到時回傳 string::npos。判斷時應比較 find 的結果是否等於 npos。",
        code: `size_t position = text.find("C++");
if (position != string::npos) {
    cout << position;
}`,
      },
      {
        title: "用 substr 取出一段文字",
        body: "substr(開始位置, 長度) 會建立新的字串。第二個參數可省略，表示取到字串結尾。",
        code: `string word = "key=value";
size_t separator = word.find('=');
string key = word.substr(0, separator);
string value = word.substr(separator + 1);`,
      },
      {
        title: "stringstream 適合逐字解析",
        body: "當輸入以空白分隔時，stringstream 能像 cin 一樣逐項讀取，適合處理一行中的多個單字。",
        code: `string line = "learn cpp every day";
stringstream stream(line);
string word;
while (stream >> word) {
    cout << word << "\\n";
}`,
      },
    ],
    quiz: {
      question: "find 找不到指定文字時會回傳什麼？",
      options: ["0", "-1", "string::npos", "字串長度"],
      answer: 2,
      explanation: "string::npos 是代表找不到的特殊位置值。",
    },
  },
  {
    slug: "vector-deep-dive",
    number: 11,
    stage: 2,
    title: "vector 的動態資料管理",
    summary: "掌握 push_back、size、capacity、刪除與函式傳遞，建立可成長的資料容器。",
    duration: "45 分鐘",
    recommendedExerciseSlug: "reverse-array",
    objectives: [
      "使用 push_back 建立動態陣列",
      "理解 size 與 capacity",
      "安全地刪除與傳遞 vector",
    ],
    sections: [
      {
        title: "vector 會隨需求成長",
        body: "push_back 會把元素加到尾端；當容量不足時，vector 會配置更大的空間。size 是元素數量，capacity 是目前不需重新配置時可容納的數量。",
        code: `vector<int> values;
values.push_back(4);
values.push_back(8);
cout << values.size(); // 2`,
      },
      {
        title: "刪除元素會讓後方索引前移",
        body: "erase 會移除指定位置的元素，後方元素向前移動，因此不能在刪除後繼續假設原本的索引不變。",
        code: `values.erase(values.begin() + 1);
for (int value : values) {
    cout << value << " ";
}`,
      },
      {
        title: "傳遞 vector 時避免不必要複製",
        body: "若函式只需要讀取，使用 const vector<T>&；若需要修改原容器，使用 vector<T>&。傳值會複製整份資料。",
        code: `int sum(const vector<int>& values) {
    int total = 0;
    for (int value : values) total += value;
    return total;
}`,
      },
    ],
    quiz: {
      question: "函式只需要讀取 vector 時，哪種參數最合適？",
      options: ["vector<int> values", "vector<int> values&", "const vector<int>& values", "int values"],
      answer: 2,
      explanation: "const 參考能避免複製，同時保證函式不修改原資料。",
    },
  },
  {
    slug: "sets-and-maps",
    number: 12,
    stage: 2,
    title: "set 與 map 的查找",
    summary: "使用有序集合去重、查找成員，並用 map 建立 key 與 value 的關聯。",
    duration: "50 分鐘",
    recommendedExerciseSlug: "word-frequency",
    objectives: [
      "用 set 保存不重複元素",
      "用 map 建立鍵值資料",
      "使用 find 與 count 安全查找",
    ],
    sections: [
      {
        title: "set 自動排序並去除重複",
        body: "set 中每個元素最多出現一次，走訪時會依排序順序輸出。插入與查找的常見成本是 O(log n)。",
        code: `set<int> uniqueValues;
uniqueValues.insert(5);
uniqueValues.insert(5);
cout << uniqueValues.size(); // 1`,
      },
      {
        title: "map 保存 key 與 value",
        body: "map 用鍵查找對應值。使用 [] 讀取不存在的 key 會建立元素，因此只想檢查時應優先使用 find 或 count。",
        code: `map<string, int> scores;
scores["algorithm"] = 95;
if (scores.find("cpp") == scores.end()) {
    cout << "找不到";
}`,
      },
      {
        title: "更新既有計數",
        body: "當 key 一定存在或允許新增時，scores[word]++ 能簡潔地累計次數；若不想意外插入，先用 find 找到 iterator。",
        code: `map<string, int> frequency;
for (const string& word : words) {
    frequency[word]++;
}`,
      },
    ],
    quiz: {
      question: "哪個容器最適合保存「不重複且需排序」的整數？",
      options: ["vector<int>", "queue<int>", "set<int>", "stack<int>"],
      answer: 2,
      explanation: "set 會保持元素唯一並依 Comparator 排序。",
    },
  },
  {
    slug: "custom-sort-pairs",
    number: 13,
    stage: 2,
    title: "pair 與自訂排序",
    summary: "處理成對資料，使用自訂比較器控制排序欄位與同分時的順序。",
    duration: "50 分鐘",
    recommendedExerciseSlug: "sort-scores",
    objectives: [
      "建立與存取 pair",
      "使用 comparator 排序資料",
      "設計穩定且不矛盾的排序規則",
    ],
    sections: [
      {
        title: "pair 把兩個值綁在一起",
        body: "pair 的 first 與 second 可以保存名稱與分數、座標與距離等成對資料。多個 pair 可以放進 vector。",
        code: `vector<pair<string, int>> scores = {
    {"Ada", 95},
    {"Linus", 88}
};`,
      },
      {
        title: "比較器定義先後順序",
        body: "sort 的第三個參數必須回傳「左邊是否應排在右邊之前」。比較器不能同時回傳 a < b 與 b < a，否則順序不具一致性。",
        code: `sort(scores.begin(), scores.end(),
    [](const auto& a, const auto& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });`,
      },
      {
        title: "先比較主欄位，再比較次欄位",
        body: "當主排序值相同時，使用第二個條件決定順序。例如成績由高到低，成績相同則名稱由小到大。",
      },
    ],
    quiz: {
      question: "sort 的自訂比較器應回傳什麼？",
      options: ["兩個元素的總和", "左元素是否應排在右元素之前", "所有元素是否相等", "元素索引"],
      answer: 1,
      explanation: "比較器回傳 true 時，代表左元素應排在右元素之前。",
    },
  },
  {
    slug: "binary-search-stl",
    number: 14,
    stage: 2,
    title: "用 STL 實作上下界搜尋",
    summary: "結合 lower_bound、upper_bound 與 distance，解決重複值與範圍搜尋。",
    duration: "55 分鐘",
    recommendedExerciseSlug: "lower-bound-index",
    objectives: [
      "理解 lower_bound 與 upper_bound",
      "把 iterator 轉成索引",
      "用上下界計算重複值範圍",
    ],
    sections: [
      {
        title: "lower_bound 找第一個不小於目標的位置",
        body: "在已排序的 vector 中，lower_bound 會回傳第一個大於等於 target 的 iterator。若所有元素都小於 target，會回傳 end。",
        code: `vector<int> values = {1, 3, 3, 5, 8};
auto it = lower_bound(values.begin(), values.end(), 3);
int index = distance(values.begin(), it); // 1`,
      },
      {
        title: "upper_bound 找第一個大於目標的位置",
        body: "upper_bound 會跳過所有等於 target 的元素，回傳第一個大於 target 的位置。兩者相減就是 target 出現次數。",
        code: `auto first = lower_bound(values.begin(), values.end(), 3);
auto last = upper_bound(values.begin(), values.end(), 3);
int count = distance(first, last); // 2`,
      },
      {
        title: "上下界能組合出範圍查詢",
        body: "同一個已排序容器可以重複使用 lower_bound 與 upper_bound 處理「第一個達標位置」、「重複值範圍」與「查詢區間內元素數量」。",
      },
    ],
    quiz: {
      question: "陣列 {1, 3, 3, 5} 對 target 3 執行 upper_bound，索引為何？",
      options: ["0", "1", "2", "3"],
      answer: 3,
      explanation: "upper_bound 回傳第一個大於 3 的元素位置，即索引 3 的 5。",
    },
  },
];

const lessonEnrichments: Record<string, LessonEnrichment> = {
  "input-output-types": {
    example: {
      intro: "把輸入、計算與輸出拆成三個獨立步驟，這是後續所有題目的最小程式骨架。",
      code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int sum = a + b;
    cout << sum << endl;
    return 0;
}`,
    },
    trace: {
      intro: "假設輸入為 7 與 5，追蹤每個變數：",
      states: [
        "第 2 行：cout 顯示文字與數值都需要使用 <<。",
        "cin 讀取後：a = 7、b = 5，兩者都是整數。",
        "計算後：sum = 12；最後輸出 12。",
      ],
    },
    mistakes: {
      intro: "輸入輸出題目看似簡單，但錯一個字元就會讓批改失敗。",
      items: [
        "漏掉 #include <iostream> 時，cin 與 cout 無法使用。",
        "把整數除法 7 / 2 當成小數運算時，結果會是 3 而不是 3.5。",
      ],
    },
    summary: {
      intro: "先確認資料怎麼進來、要用什麼型別保存，最後再決定怎麼輸出。",
      points: [
        "main 是程式入口，return 0 表示正常結束。",
        "cin 會依空白切分輸入，型別必須與資料相符。",
        "輸出的空格、換行與大小寫都屬於答案的一部分。",
      ],
    },
    quiz: {
      question: "執行 int result = 7 / 2; 後，result 的值是多少？",
      options: ["3.5", "3", "4", "編譯錯誤"],
      answer: 1,
      explanation: "兩個 int 相除會執行整數除法，小數部分被截斷。",
    },
  },
  "conditions-and-edges": {
    example: {
      intro: "用同一組條件依序判斷成績區間，並把 0、59、60 這些邊界想清楚。",
      code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    if (score >= 90) cout << "A";
    else if (score >= 60) cout << "Pass";
    else cout << "Retry";
    return 0;
}`,
    },
    trace: {
      intro: "假設 score = 60，條件會由上往下檢查：",
      states: [
        "score >= 90 不成立，因為 60 不小於 90。",
        "score >= 60 成立，因此輸出 Pass。",
        "後面的 else 不會再執行，條件分支只會選一條。",
      ],
    },
    mistakes: {
      intro: "條件判斷的錯誤通常來自比較符號與判斷順序。",
      items: [
        "把比較運算 == 寫成賦值運算 =，會改變變數而不是判斷相等。",
        "先判斷較寬的條件，會讓後面的特殊情況永遠無法執行。",
      ],
    },
    summary: {
      intro: "先把所有可能情況寫出來，再排列成互斥且完整的條件。",
      points: [
        "邊界值通常要使用 >= 或 <=，不要漏掉等號。",
        "若條件具有先後關係，較具體的情況應先檢查。",
        "布林結果只能回答 true 或 false，不能同時進入兩個 else 分支。",
      ],
    },
    quiz: {
      question: "哪個條件能正確判斷負奇數與正奇數？",
      options: ["x % 2 == 1", "x % 2 != 0", "x / 2 == 1", "x == 1"],
      answer: 1,
      explanation: "負奇數的餘數可能是 -1，因此使用 != 0 比 == 1 更完整。",
    },
  },
  "loops-and-arrays": {
    example: {
      intro: "逐項讀取資料並加總，可以同時練習索引與迴圈邊界。",
      code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> values(n);
    int sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> values[i];
        sum += values[i];
    }
    cout << sum;
    return 0;
}`,
    },
    trace: {
      intro: "輸入 n = 3、資料為 4 8 1：",
      states: [
        "i = 0：讀入 values[0] = 4，sum 變成 4。",
        "i = 1：讀入 values[1] = 8，sum 變成 12。",
        "i = 2：讀入 values[2] = 1，sum 變成 13，之後迴圈停止。",
      ],
    },
    mistakes: {
      intro: "陣列程式的錯誤多半發生在「多跑一次」或「少跑一次」。",
      items: [
        "使用 i <= n 會存取到 values[n]，超出合法範圍。",
        "在空容器上直接讀 values[0] 會是未定義行為。",
      ],
    },
    summary: {
      intro: "索引從 0 開始，迴圈條件必須讓最後一次存取停在 n - 1。",
      points: [
        "size 是元素數量，最後索引是 size() - 1。",
        "for 迴圈適合已知次數，while 適合依狀態停止。",
        "每次存取 vector 前都要確認索引小於 size。",
      ],
    },
    quiz: {
      question: "大小為 n 的 vector，最後一個合法索引為何？",
      options: ["n", "n - 1", "1", "n + 1"],
      answer: 1,
      explanation: "索引由 0 到 n - 1，共 n 個元素。",
    },
  },
  "functions-and-decomposition": {
    example: {
      intro: "把計算最大值抽成函式，讓 main 只負責輸入與輸出。",
      code: `#include <iostream>
using namespace std;

int larger(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << larger(x, y);
    return 0;
}`,
    },
    trace: {
      intro: "假設輸入 x = 12、y = 8：",
      states: [
        "main 將 12 與 8 複製到 larger 的參數 a、b。",
        "a > b 成立，因此函式執行 return a。",
        "12 回到呼叫位置，main 把它交給 cout。",
      ],
    },
    mistakes: {
      intro: "函式若責任不清，錯誤會很難定位。",
      items: [
        "宣告非 void 回傳值，卻有分支沒有 return，會得到未定義結果。",
        "需要修改呼叫者變數時仍使用傳值，修改只會發生在副本。",
      ],
    },
    summary: {
      intro: "好的函式名稱可以直接說明輸入、責任與回傳結果。",
      points: [
        "參數是函式的輸入，return 是函式的輸出。",
        "函式內宣告的區域變數在函式結束後消失。",
        "先用一句話描述步驟，再決定哪些步驟值得成為函式。",
      ],
    },
    quiz: {
      question: "若函式必須修改呼叫者傳入的 vector，參數應使用什麼？",
      options: ["vector 傳值", "const vector&", "vector&", "只傳 size"],
      answer: 2,
      explanation: "非 const 參考能讓函式直接修改原容器。",
    },
  },
  "sorting-and-order": {
    example: {
      intro: "排序後，最小與最大值會固定在容器兩端，也能讓二分搜尋成立。",
      code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {8, 3, 5, 1};
    sort(values.begin(), values.end());
    cout << values.front() << " " << values.back();
    return 0;
}`,
    },
    trace: {
      intro: "排序前後比較：",
      states: [
        "原始資料：[8, 3, 5, 1]。",
        "sort 後：[1, 3, 5, 8]。",
        "front 是 1、back 是 8，資料具有大小順序。",
      ],
    },
    mistakes: {
      intro: "排序結果與後續搜尋的前提必須一致。",
      items: [
        "認為 sort 一定會保留相同元素的原始順序，其實穩定排序需使用 stable_sort。",
        "資料尚未排序就直接使用二分搜尋，左、右判斷會失效。",
      ],
    },
    summary: {
      intro: "排序是為了建立可利用的順序，不只是為了輸出漂亮。",
      points: [
        "一般 sort 的常見時間成本是 O(n log n)。",
        "升冪排序後，左側元素不大於右側元素。",
        "任何依賴排序的演算法都要先確認資料真的有序。",
      ],
    },
    quiz: {
      question: "使用 lower_bound 前最重要的前提是什麼？",
      options: ["資料都是正數", "資料已排序", "元素不重複", "元素數量為偶數"],
      answer: 1,
      explanation: "二分式搜尋要靠有序性決定要保留哪一半。",
    },
  },
  "linear-search-complexity": {
    example: {
      intro: "線性搜尋逐一比較，找到目標就立即停止。",
      code: `#include <iostream>
#include <vector>
using namespace std;

int findIndex(const vector<int>& values, int target) {
    for (int i = 0; i < values.size(); i++) {
        if (values[i] == target) return i;
    }
    return -1;
}`,
    },
    trace: {
      intro: "在 [4, 9, 2, 7] 尋找 2：",
      states: [
        "檢查索引 0 的 4，不等於 2。",
        "檢查索引 1 的 9，不等於 2。",
        "檢查索引 2 的 2，相等並回傳 2。",
      ],
    },
    mistakes: {
      intro: "線性搜尋最大的風險是過早宣告失敗。",
      items: [
        "第一次不相符就回傳 -1，會漏掉後面的答案。",
        "使用範圍迴圈卻找不到索引時，要另外維護目前索引。",
      ],
    },
    summary: {
      intro: "在資料未排序時，逐項檢查仍是必要且可靠的方法。",
      points: [
        "最壞情況需要檢查 n 個元素，時間複雜度是 O(n)。",
        "找到答案後立即 return 可以避免多餘工作。",
        "只有完整跑完迴圈仍未命中時，才輸出找不到。",
      ],
    },
    quiz: {
      question: "一百萬筆未排序資料最壞要檢查多少元素才能確認目標不存在？",
      options: ["約 20 個", "約 1000 個", "一百萬個", "永遠只要 1 個"],
      answer: 2,
      explanation: "未排序且沒有其他結構資訊時，必須逐項確認每個元素。",
    },
  },
  "binary-search-invariant": {
    example: {
      intro: "閉區間二分搜尋的核心是每回合維持「答案可能仍在 [left, right]」。",
      code: `#include <iostream>
#include <vector>
using namespace std;

int search(const vector<int>& values, int target) {
    int left = 0, right = values.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] == target) return mid;
        if (values[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
    trace: {
      intro: "在 [1, 3, 5, 7, 9, 11, 13] 尋找 9：",
      states: [
        "[0, 6]：mid = 3，values[3] = 7 < 9，丟掉左半，left = 4。",
        "[4, 6]：mid = 5，values[5] = 11 > 9，right = 4。",
        "[4, 4]：mid = 4，values[4] = 9，回傳 4。",
      ],
    },
    mistakes: {
      intro: "二分搜尋的錯誤通常不是概念，而是邊界更新。",
      items: [
        "使用閉區間卻把迴圈寫成 left < right，可能漏掉一個元素。",
        "更新成 left = mid 或 right = mid，會讓區間不再縮小。",
      ],
    },
    summary: {
      intro: "二分搜尋是一種「保持答案仍在候選區間」的證明過程。",
      points: [
        "先明確選擇閉區間或半開區間，再統一所有邊界。",
        "每次比較都要排除不可能的一半。",
        "重複值需要額外決定要回傳任意位置或第一個位置。",
      ],
    },
    quiz: {
      question: "閉區間二分搜尋中，哪個更新能確保區間縮小？",
      options: ["left = mid", "right = mid", "left = mid + 1", "left 不變"],
      answer: 2,
      explanation: "排除已檢查的 mid 並讓 left 前進，區間才會縮小。",
    },
  },
  "binary-search-debugging": {
    example: {
      intro: "尋找第一個不小於 target 的位置時，找到答案後仍要繼續往左確認。",
      code: `#include <iostream>
#include <vector>
using namespace std;

int lowerBound(const vector<int>& values, int target) {
    int left = 0, right = values.size() - 1, answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (values[mid] >= target) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return answer;
}`,
    },
    trace: {
      intro: "在 [1, 3, 3, 5] 尋找第一個大於等於 3 的位置：",
      states: [
        "[0, 3]：mid = 1，values[1] = 3，先記錄 answer = 1，right = 0。",
        "[0, 0]：mid = 0，values[0] = 1 < 3，left = 1。",
        "left > right，停止並回傳目前已找到的最佳位置 1。",
      ],
    },
    mistakes: {
      intro: "上下界題目要同時追蹤「值」與「位置」。",
      items: [
        "找到符合條件的值就立刻回傳，可能不是第一個。",
        "把「沒有符合元素」誤寫成 values.size() 而不是題目要求的 -1。",
      ],
    },
    summary: {
      intro: "先寫清楚答案要滿足的性質，再決定縮小哪一側。",
      points: [
        "答案位置要另外保存，不能只看最後一次 mid。",
        "遇到重複值時，條件成立仍要繼續往左搜尋。",
        "先用三到五個小陣列手動追蹤，是找邊界 bug 的最快方法。",
      ],
    },
    quiz: {
      question: "二分搜尋中可能造成無限迴圈的直接原因是什麼？",
      options: ["mid 沒有被排除", "答案太小", "陣列有負數", "輸出沒有換行"],
      answer: 0,
      explanation: "若每回合都保留相同的 mid，left 與 right 可能永遠不變。",
    },
  },
  "strings-basics": {
    example: {
      intro: "使用 getline 讀取完整句子，再逐字計算特定字元。",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    int spaces = 0;
    for (char ch : line) {
        if (ch == ' ') spaces++;
    }
    cout << spaces;
    return 0;
}`,
    },
    trace: {
      intro: "若 line = \"C++ Lab\"：",
      states: [
        "line 的大小是 7，合法索引為 0 到 6。",
        "走訪到索引 3 時，ch 是空白字元。",
        "spaces 由 0 變成 1，最後輸出 1。",
      ],
    },
    mistakes: {
      intro: "字串常錯在輸入方式與空字串。",
      items: [
        "使用 cin >> 讀句子時，只會拿到第一個空白前的內容。",
        "對空字串直接存取 line[0] 會是未定義行為。",
      ],
    },
    summary: {
      intro: "string 同時提供長度、索引與安全的高階操作。",
      points: [
        "size 回傳字元數量，但索引從 0 開始。",
        "getline 適合含空白的整行輸入。",
        "逐字處理時應先確認字串是否為空。",
      ],
    },
    quiz: {
      question: "讀取整行輸入前，哪個函式最適合搭配 string？",
      options: ["getline", "sort", "find", "push_back"],
      answer: 0,
      explanation: "getline(cin, string) 會讀到換行為止，保留中間空白。",
    },
  },
  "string-search-parsing": {
    example: {
      intro: "用 find 定位分隔符，再用 substr 拆開 key 與 value。",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string input = "name=CppLab";
    size_t pos = input.find('=');
    cout << input.substr(0, pos) << "\\n";
    cout << input.substr(pos + 1);
    return 0;
}`,
    },
    trace: {
      intro: "對 name=CppLab 執行拆解：",
      states: [
        "find('=') 回傳索引 4。",
        "substr(0, 4) 得到 name。",
        "substr(5) 得到 CppLab，因為等號本身要被排除。",
      ],
    },
    mistakes: {
      intro: "字串位置是索引，不是第幾個元素的人類計數。",
      items: [
        "使用 find 後沒有先檢查 npos，就把錯誤位置交給 substr。",
        "要取等號後方的內容時忘記加 1，會把 = 留在結果中。",
      ],
    },
    summary: {
      intro: "搜尋回傳位置，片段工具再依位置建立新字串。",
      points: [
        "find 找不到時回傳 string::npos。",
        "substr 的第二個參數是長度，不是結束索引。",
        "stringstream 適合不固定數量的空白分隔資料。",
      ],
    },
    quiz: {
      question: "substr(2, 3) 會取出多少個字元？",
      options: ["1", "2", "3", "索引 2 和 3"],
      answer: 2,
      explanation: "第一個參數是開始索引，第二個參數是長度。",
    },
  },
  "vector-deep-dive": {
    example: {
      intro: "動態加入元素、計算總和，再觀察容器大小的改變。",
      code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values;
    values.push_back(4);
    values.push_back(7);
    values.push_back(2);
    int sum = 0;
    for (int value : values) sum += value;
    cout << sum;
    return 0;
}`,
    },
    trace: {
      intro: "逐一加入元素時：",
      states: [
        "第一次 push_back 後 size = 1，內容為 [4]。",
        "第二次 push_back 後 size = 2，內容為 [4, 7]。",
        "第三次後 size = 3，sum 從 0 累加到 13。",
      ],
    },
    mistakes: {
      intro: "vector 的錯誤常與索引和重新配置有關。",
      items: [
        "push_back 可能重新配置記憶體，讓先前取得的 element reference 失效。",
        "erase 後容器長度改變，不能繼續使用舊的尾端索引。",
      ],
    },
    summary: {
      intro: "vector 是可調整大小的連續容器，索引操作與陣列相近。",
      points: [
        "size 是元素數，capacity 是目前可容納容量。",
        "只讀傳遞使用 const vector&，修改原容器使用 vector&。",
        "插入或刪除中間元素可能讓後續元素索引改變。",
      ],
    },
    quiz: {
      question: "哪個參數最適合只讀取大型 vector 的函式？",
      options: ["vector<T> values", "vector<T>& values", "const vector<T>& values", "T values"],
      answer: 2,
      explanation: "const 參考避免複製，也禁止函式修改原容器。",
    },
  },
  "sets-and-maps": {
    example: {
      intro: "用 map 統計單字頻率，再用 set 練習成員查找。",
      code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> count;
    count["cpp"]++;
    count["cpp"]++;
    count["lab"]++;
    cout << count["cpp"];
    return 0;
}`,
    },
    trace: {
      intro: "追蹤 map 的內容：",
      states: [
        "第一次 count[\"cpp\"]++ 時，map 建立 cpp → 0，再變成 1。",
        "第二次累加後，cpp → 2。",
        "加入 lab 後，容器有兩個不同的 key。",
      ],
    },
    mistakes: {
      intro: "map 的 operator[] 會插入元素，這是最容易忽略的副作用。",
      items: [
        "只想查詢是否存在卻使用 count[key]，會不小心新增該 key。",
        "find 找不到時回傳 end，不能直接解引用。",
      ],
    },
    summary: {
      intro: "set 管唯一元素，map 管 key 與 value 的關聯。",
      points: [
        "set 與 map 的常見查找成本是 O(log n)。",
        "count 可直接判斷鍵是否存在並回傳 0 或 1。",
        "需要保持插入順序時，標準 set/map 不是最佳選擇。",
      ],
    },
    quiz: {
      question: "哪個操作可以在不插入新 key 的情況下檢查 map 是否存在？",
      options: ["map[key]++", "find(key)", "map[key] = 0", "map[key]"],
      answer: 1,
      explanation: "find 只查找並回傳 iterator；operator[] 可能建立元素。",
    },
  },
  "custom-sort-pairs": {
    example: {
      intro: "先以分數由高到低排序，分數相同再依名稱排序。",
      code: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> rows = {{"Bob", 80}, {"Ada", 90}, {"Cy", 80}};
    sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    for (const auto& row : rows)
        cout << row.first << " " << row.second << "\\n";
    return 0;
}`,
    },
    trace: {
      intro: "排序規則分成兩層：",
      states: [
        "Ada 的 90 最高，因此排在最前。",
        "Bob 與 Cy 都是 80，主條件相同。",
        "使用名稱升冪，所以 Bob 排在 Cy 前面。",
      ],
    },
    mistakes: {
      intro: "比較器必須形成一致的嚴格弱序。",
      items: [
        "比較器使用 <= 時，相同元素可能被判定為同時前後，造成不合法排序。",
        "只比較第一欄位，分數相同時順序可能不穩定。",
      ],
    },
    summary: {
      intro: "自訂排序是把題目的優先順序翻譯成比較器。",
      points: [
        "先比較主要欄位，不同才比較次要欄位。",
        "比較器回傳 true 代表 a 應排在 b 前面。",
        "排序後應檢查相同主鍵的資料是否符合題目規則。",
      ],
    },
    quiz: {
      question: "哪個比較器條件通常是不合法的？",
      options: ["a.score > b.score", "a.name < b.name", "a.score <= b.score", "a.id < b.id"],
      answer: 2,
      explanation: "對相等元素回傳 true 會違反嚴格弱序的一致要求。",
    },
  },
  "binary-search-stl": {
    example: {
      intro: "用 lower_bound 與 upper_bound 找出重複值範圍。",
      code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {1, 3, 3, 3, 5};
    auto first = lower_bound(values.begin(), values.end(), 3);
    auto last = upper_bound(values.begin(), values.end(), 3);
    cout << distance(values.begin(), first) << " "
         << distance(first, last);
    return 0;
}`,
    },
    trace: {
      intro: "在 [1, 3, 3, 3, 5] 查詢 3：",
      states: [
        "lower_bound 回傳索引 1 的 3。",
        "upper_bound 回傳索引 4 的 5。",
        "distance(first, last) = 3，表示 3 出現三次。",
      ],
    },
    mistakes: {
      intro: "STL 回傳的是 iterator，不是直接索引。",
      items: [
        "把 upper_bound 誤當成最後一個等於 target 的位置，會少算一個元素。",
        "直接對未排序容器呼叫上下界函式，結果沒有意義。",
      ],
    },
    summary: {
      intro: "上下界把二分搜尋整理成兩個可靠且可重用的操作。",
      points: [
        "lower_bound 找第一個 >= target 的位置。",
        "upper_bound 找第一個 > target 的位置。",
        "先檢查 iterator 是否等於 end，再轉成索引或計算距離。",
      ],
    },
    quiz: {
      question: "upper_bound 回傳的第一個元素具有什麼性質？",
      options: ["等於 target", "小於 target", "大於 target", "一定不存在"],
      answer: 2,
      explanation: "upper_bound 會跳過所有等於 target 的元素，停在第一個更大的元素。",
    },
  },
};

export const lessons: Lesson[] = lessonCores.map((lesson) => {
  const enrichment = lessonEnrichments[lesson.slug];
  return {
    ...lesson,
    sections: [
      ...lesson.sections,
      {
        title: "完整範例",
        body: enrichment.example.intro,
        code: enrichment.example.code,
      },
      {
        title: "逐步追蹤",
        body: enrichment.trace.intro,
        trace: enrichment.trace.states,
      },
      {
        title: "常見錯誤與修正",
        body: enrichment.mistakes.intro,
        pitfalls: enrichment.mistakes.items,
      },
      {
        title: "重點整理",
        body: enrichment.summary.intro,
        keyPoints: enrichment.summary.points,
      },
    ],
    quizzes: [lesson.quiz, enrichment.quiz],
  };
});

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
