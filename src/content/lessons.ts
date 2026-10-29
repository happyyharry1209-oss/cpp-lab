export interface LessonSection {
  title: string;
  body: string;
  code?: string;
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
  objectives: string[];
  sections: LessonSection[];
  quiz: LessonQuiz;
}

export const lessons: Lesson[] = [
  {
    slug: "input-output-types",
    number: 1,
    stage: 1,
    title: "輸入、輸出與資料型別",
    summary: "先看懂程式的入口，再學會讓資料進入程式、顯示結果。",
    duration: "25 分鐘",
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

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
