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
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
