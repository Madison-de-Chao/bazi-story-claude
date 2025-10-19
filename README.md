# 虹靈御所 八字軍團系統 🏰

[![Version](https://img.shields.io/badge/version-v8.3-brightgreen.svg)](https://github.com/Madison-de-Chao/bazi-story-claude)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-web-orange.svg)](https://github.com/Madison-de-Chao/bazi-story-claude)

<div align="center">
  <h3>✨ 精準節氣 · 查表計算 · 可追溯日誌 ✨</h3>
  <p>將傳統八字命理與現代 RPG 遊戲完美結合的創新系統</p>
</div>

---

## 📖 目錄

- [簡介](#簡介)
- [核心特色](#核心特色)
- [系統架構](#系統架構)
- [快速開始](#快速開始)
- [功能詳解](#功能詳解)
- [技術細節](#技術細節)
- [開發路線](#開發路線)
- [更新日誌](#更新日誌)
- [貢獻指南](#貢獻指南)
- [授權協議](#授權協議)

---

## 🎯 簡介

**虹靈御所八字軍團系統** 是一個創新的八字命理分析平台，將傳統的四柱八字推算與現代 RPG 遊戲概念相結合。系統以「四時軍團」為核心概念，將天干地支轉化為生動的角色（主將、軍師），並搭配神煞兵符系統，為使用者創造獨特的命理故事體驗。

### 🌟 設計理念

- **傳統與創新融合**: 保留傳統八字推算的精準性，同時以 RPG 概念重新詮釋
- **視覺化體驗**: 絢麗的動畫效果和互動設計，讓命理分析不再枯燥
- **可追溯性**: 完整的計算日誌，讓每一步推算都清晰透明
- **教育意義**: 通過故事化的呈現，幫助使用者理解八字命理的深層含義

---

## ✨ 核心特色

### 🎮 四時軍團系統

將四柱（年、月、日、時）轉化為四支軍團：

- **🏰 家族兵團** (年柱): 血脈傳承，根基所在
- **🌱 成長兵團** (月柱): 學習歷程，能力養成
- **⭐ 本我兵團** (日柱): 核心自我，真實本性
- **🚀 未來兵團** (時柱): 發展方向，潛能展現

### 👥 角色化系統

- **天干主將**: 10 位主將，各具特色（如甲木-森林統帥、丙火-烈日戰神）
- **地支軍師**: 12 位軍師，提供戰略支援（如子鼠-智慧鼠師、午馬-烈馬先鋒）
- **RPG 職業**: 先鋒者、協調者、激勵者、智慧者、防禦者等 20+ 種職業
- **能力屬性**: 每個角色都有獨特的 Buff（優勢）和 Debuff（劣勢）

### 🎴 神煞兵符

基於傳統神煞查表系統，將吉神凶煞轉化為：
- **兵符卡片**: 視覺化呈現神煞屬性
- **能力加成**: 為軍團提供特殊能力
- **命運提示**: 解讀人生重要轉折點

### 🎨 視覺效果

- **星空背景**: 100+ 顆動態星星，營造神秘氛圍
- **彩虹流光**: 5 色漸層動態標題
- **3D 卡片翻轉**: 軍團卡片可翻轉查看詳細資訊
- **粒子系統**: 載入時的星雲粒子聚合效果
- **毛玻璃質感**: backdrop-filter 模糊效果
- **流暢動畫**: 30+ 種精心設計的 CSS3 動畫

### 📊 傳統命盤

完整保留傳統八字分析功能：
- **四柱顯示**: 天干地支、納音五行
- **十神分析**: 比肩、劫財、食神、傷官等
- **五行統計**: 精確計算五行強弱分佈
- **節氣定位**: 基於精準節氣邊界計算月柱
- **真太陽時**: 可選擇使用真太陽時修正

### 🤖 AI 故事生成

- 基於八字數據自動生成個性化軍團故事
- 融合 RPG 元素與傳統命理智慧
- 提供人生建議和未來展望

### 📋 計算日誌

完整記錄推算過程：
- 時間計算（時區、經度、真太陽時）
- 節氣定位（當前節氣、下個節氣）
- 四柱推算（年月日時柱計算依據）
- 神煞查詢（查表依據和結果）
- 驗證完成狀態

---

## 🏗️ 系統架構

```
┌─────────────────────────────────────────┐
│           前端 (Frontend)                │
│  ┌─────────────────────────────────┐   │
│  │  index.html                      │   │
│  │  - 使用者介面                     │   │
│  │  - CSS3 動畫                     │   │
│  │  - 表單驗證                       │   │
│  │  - 結果展示                       │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  frontend-config.js              │   │
│  │  - API 配置                      │   │
│  │  - 系統參數                       │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  honglin-bazi-transformer.js    │   │
│  │  - 軍團轉換邏輯                   │   │
│  │  - 角色映射                       │   │
│  │  - 故事化轉換                     │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                   ⬇️ HTTPS
┌─────────────────────────────────────────┐
│     後端 API (Railway Backend)           │
│  - 精準節氣計算                          │
│  - 四柱推算（查表法）                     │
│  - 十神分析                              │
│  - 神煞查表                              │
│  - 五行統計                              │
│  - 納音查詢                              │
└─────────────────────────────────────────┘
```

### 技術棧

**前端**:
- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- CSS Animation / Transform
- Flexbox / Grid Layout
- Responsive Design

**後端**:
- Railway 託管
- RESTful API
- JSON 數據格式

**動畫技術**:
- CSS3 @keyframes
- GPU 硬體加速 (transform, opacity)
- Backdrop Filter (毛玻璃)
- 3D Transform (卡片翻轉)

---

## 🚀 快速開始

### 線上體驗

直接訪問線上版本（請向開發者索取最新部署 URL）

### 本地部署

1. **克隆倉庫**

```bash
git clone https://github.com/Madison-de-Chao/bazi-story-claude.git
cd bazi-story-claude
```

2. **開啟網頁**

```bash
# 使用簡單的 HTTP 伺服器
python -m http.server 8080
# 或
npx serve
```

3. **訪問應用**

在瀏覽器中訪問 `http://localhost:8080`

### 配置 API

如需修改後端 API 地址，編輯 `frontend-config.js`:

```javascript
api: {
    production: {
        baseUrl: 'YOUR_API_URL',
        endpoint: '/api/bazi/compute',
        timeout: 60000
    },
    current: 'production'
}
```

---

## 📱 功能詳解

### 1. 資料輸入

- **姓名**: 支援中英文及特殊字元
- **性別**: 男/女選擇（影響十神分析）
- **出生日期**: 年月日選擇器
- **出生時間**: 時分選擇器（支援子時換日策略）

### 子時換日策略

- **傳統派換日**: 23:00 開始即為新日（無子夜之分）
- **現代派區分**: 晚子 23:00-23:59 當日，早子 00:00-00:59 翌日

### 2. 四柱命盤

**顯示內容**:
- 年柱、月柱、日柱、時柱
- 天干地支組合
- 納音五行
- 十神關係

**五行統計**:
- 木、火、土、金、水
- 精確數值與百分比
- 視覺化色彩標示

### 3. 軍團戰報

**軍團卡片**:
- 正面: 基本資訊、主將軍師、優勢能力、神煞兵符
- 背面: 戰場環境、人生智慧、兵符詳解
- 點擊翻轉: 流暢的 3D 翻轉動畫（0.8 秒）

**四支軍團**:
1. 家族兵團（金色發光）
2. 成長兵團（綠色發光）
3. 本我兵團（藍色發光）
4. 未來兵團（紅色發光）

### 4. AI 故事

- 基於八字數據自動生成
- RPG 風格敘事
- 包含人生建議
- 正面積極的內容導向

### 5. 計算日誌

**日誌類別**:
- 🕐 時間計算
- 📅 節氣定位
- 🔢 四柱推算
- ⭐ 神煞查詢
- ✅ 驗證完成

---

## 🔧 技術細節

### 動畫性能優化

```css
/* 使用 transform 和 opacity 觸發 GPU 加速 */
.animation {
    transform: translateY(-5px);
    opacity: 0.9;
    will-change: transform, opacity;
}
```

### 3D 卡片翻轉實現

```css
.legion-card {
    transform-style: preserve-3d;
    transition: transform 0.8s;
}

.legion-card.flipped {
    transform: rotateY(180deg);
}
```

### 星空粒子系統

- 100 顆星星隨機分佈
- 3 種尺寸 (2px, 3px, 4px)
- 閃爍動畫 (3s 週期)
- 漂浮動畫 (6s 週期)

### 響應式設計

```css
/* 桌面版: 4 列佈局 */
@media (min-width: 1024px) {
    .pillars-display {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* 平板版: 2 列佈局 */
@media (max-width: 768px) {
    .pillars-display {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 手機版: 單列佈局 */
@media (max-width: 480px) {
    .pillars-display {
        grid-template-columns: 1fr;
    }
}
```

### API 調用流程

```javascript
// 1. 收集表單數據
const formData = collectFormData();

// 2. 構建 API 請求
const requestData = {
    datetime_local: `${formData.birthDate}T${formData.birthTime}:00`,
    timezone: "Asia/Taipei",
    longitude: 120.0,
    use_true_solar_time: false
};

// 3. 發送請求
const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
});

// 4. 解析結果
const apiResult = await response.json();

// 5. 轉換為軍團格式
const storyResult = convertToStoryLegions(apiResult);

// 6. 顯示結果
displayResults(userName, storyResult, apiResult);
```

---

## 🌐 瀏覽器支援

| 瀏覽器 | 版本 | 支援狀態 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支援 |
| Edge | 90+ | ✅ 完全支援 |
| Firefox | 88+ | ✅ 完全支援 |
| Safari | 14+ | ✅ 完全支援 |
| iOS Safari | 14+ | ✅ 完全支援 |
| Chrome Mobile | 最新 | ✅ 完全支援 |

**注意事項**:
- 舊版瀏覽器可能不支援 `backdrop-filter`（毛玻璃效果）
- 建議使用現代瀏覽器以獲得最佳體驗

---

## 📂 檔案結構

```
bazi-story-claude/
├── index.html                          # 主頁面
├── frontend-config.js                  # 前端配置
├── honglin-bazi-transformer.js         # 軍團轉換器
├── intro.mp4                           # 開場動畫影片 (21MB)
├── CHANGELOG.md                        # 更新日誌
├── UPDATE_SUMMARY.md                   # 更新總結
└── README.md                           # 本文件
```

---

## 🗺️ 開發路線

### v8.3 (當前版本) ✅
- [x] 開場動畫系統
- [x] CSS 動畫大幅增強
- [x] 3D 卡片翻轉
- [x] 星空粒子系統
- [x] 完整計算日誌

### v8.4 (規劃中) 🚧
- [ ] 打字機效果 AI 故事
- [ ] 五行圖表動態填充
- [ ] 音效支援（按鈕點擊、卡片翻轉）
- [ ] 主題色切換系統
- [ ] 稀有兵符彩蛋動畫

### v9.0 (長期計劃) 🔮
- [ ] Three.js 3D 效果
- [ ] 互動式教學提示
- [ ] 移動端手勢操作
- [ ] 歷史記錄保存
- [ ] 社交分享功能
- [ ] 多語言支援（English）

---

## 📝 更新日誌

詳細更新記錄請查看 [CHANGELOG.md](CHANGELOG.md)

### 最新更新 (v8.3)
- ✨ 添加開場動畫影片
- 🎨 大幅增強視覺效果
- 🃏 實現軍團卡片 3D 翻轉
- ⭐ 增強星空背景動畫
- 🔧 優化動畫性能

---

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 貢獻流程

1. Fork 本倉庫
2. 創建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 開發規範

- **代碼風格**: 遵循現有代碼風格
- **註釋**: 重要邏輯需添加清晰註釋
- **測試**: 確保修改不破壞現有功能
- **文檔**: 更新相關文檔

---

## 📄 授權協議

本項目採用 MIT 協議開源 - 詳見 [LICENSE](LICENSE) 文件

---

## 👥 開發團隊

- **項目創建者**: 默默超 (Madison-de-Chao)
- **主要開發**: AI Assistant (Manus)
- **技術支援**: Railway Platform

---

## 📞 聯繫方式

- **GitHub**: [@Madison-de-Chao](https://github.com/Madison-de-Chao)
- **Issues**: [提交問題](https://github.com/Madison-de-Chao/bazi-story-claude/issues)

---

## 🙏 致謝

- 感謝 Railway 提供穩定的後端 API 服務
- 感謝所有貢獻者和使用者的支持
- 感謝傳統命理文化的智慧傳承

---

## 📚 參考資料

- [八字命理基礎知識](https://zh.wikipedia.org/wiki/八字)
- [干支紀年法](https://zh.wikipedia.org/wiki/干支)
- [CSS Animation 指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations)
- [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API)

---

<div align="center">
  <p>⭐ 如果這個項目對您有幫助，請給它一個星星！⭐</p>
  <p>Made with ❤️ by 虹靈御所團隊</p>
</div>

---

## 📖 English Version

# Hongling Imperial Palace - Bazi Legion System 🏰

**Hongling Imperial Palace Bazi Legion System** is an innovative Chinese fortune-telling (Bazi) analysis platform that combines traditional four-pillar calculation with modern RPG game concepts.

### ✨ Key Features

- **Four Seasons Legion System**: Transforms the four pillars (Year, Month, Day, Hour) into four legions
- **Character System**: 10 Heavenly Stem commanders and 12 Earthly Branch strategists with RPG classes
- **Spirit Sigils**: Traditional Shen Sha (spirits and demons) visualized as ability cards
- **Stunning Visuals**: 100+ animated stars, rainbow gradients, 3D card flips, and particle effects
- **Traditional Chart**: Complete display of four pillars, ten gods, and five elements
- **AI Story Generation**: Personalized legion stories based on Bazi data
- **Calculation Logs**: Complete traceability of every calculation step

### 🚀 Quick Start

1. Clone the repository
2. Open `index.html` in a modern browser
3. Or use a local server: `python -m http.server 8080`

### 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

**Version**: v8.3  
**Last Updated**: 2025-10-19
