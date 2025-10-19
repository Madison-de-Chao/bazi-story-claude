# API 比較報告

## 測試時間
2025-10-19

## 測試方法
使用相同的請求參數連續調用兩次 API,比較響應差異。

**測試參數:**
```json
{
  "datetime_local": "1985-10-06T19:30:00",
  "timezone": "Asia/Taipei",
  "longitude": 120.0,
  "use_true_solar_time": false
}
```

## 比較結果

### 📊 API 響應一致性
**結論**: ✅ 兩次 API 響應完全相同(除了時間戳記)

這表示後端 API 是穩定的,相同輸入產生相同輸出。

### 📋 API 響應結構

**頂層欄位:**
- `success`: boolean - API 調用成功狀態
- `timestamp`: string - 響應時間戳記 (ISO8601格式)
- `data`: object - 八字計算結果

**data 欄位:**
1. `four_pillars` - 四柱八字
   - `year`: {stem, branch}
   - `month`: {stem, branch}
   - `day`: {stem, branch}
   - `hour`: {stem, branch}

2. `ten_gods` - 十神關係
   - `year_stem`: string
   - `month_stem`: string
   - `day_stem`: string (固定為"日主")
   - `hour_stem`: string

3. `five_elements_stats` - 五行統計
   - `elements_count`: {木, 火, 土, 金, 水}
   - `elements_percentage`: {木, 火, 土, 金, 水}
   - `strongest_element`: string
   - `weakest_element`: string

4. `spirits` - 神煞列表
   - `name`: string - 神煞名稱
   - `category`: string - 類別 (吉神/凶煞/桃花)
   - `anchor_basis`: string - 錨點依據
   - `rule_ref`: string - 規則來源
   - `why_matched`: string - 匹配原因

5. `calculation_log` - 計算日誌
   - `year_pillar_method`: string
   - `month_pillar_method`: string
   - `day_pillar_method`: string
   - `hour_pillar_method`: string
   - `five_tiger_index`: string
   - `five_rat_index`: string
   - `solar_term_hit`: string
   - `month_change`: string
   - `zi_hour_cross_day`: boolean
   - `ten_gods_relation`: string
   - `spirits_hit_basis`: array

6. `data_provenance` - 數據來源
   - `source`: string
   - `version`: string
   - `epoch_name`: string
   - `epoch_date`: string
   - `epoch_source`: string
   - `solar_term_source`: string
   - `timezone_source`: string
   - `retrieved_at`: string

7. `tst_adjustment_log` - TST調整日誌
   - `use_true_solar_time`: boolean
   - `time_standard`: string
   - `longitude`: number
   - `longitude_correction`: number
   - `equation_of_time`: number
   - `total_adjustment`: number
   - `cross_day`: boolean
   - `calculation_chain`: object

8. `input_parameters` - 輸入參數
   - `datetime_local`: string
   - `timezone`: string
   - `longitude`: number
   - `use_true_solar_time`: boolean

### 📊 統計資訊
- **總欄位數**: 72個
- **神煞數量**: 2個 (天乙貴人, 桃花)
- **響應大小**: 約2.5KB

### ❌ 缺少的資料

**1. 納音 (Nayin)**
- 狀態: ❌ 不包含
- 說明: 後端沒有返回60甲子納音資料
- 解決方案: 前端使用 `bazi-supplement-data.js` 補充

**2. 藏干 (Hidden Stems)**
- 狀態: ❌ 不包含
- 說明: 後端沒有返回地支藏干資料
- 解決方案: 前端使用 `bazi-supplement-data.js` 補充

**3. 陰陽屬性**
- 狀態: ❌ 不包含
- 說明: 後端沒有返回天干地支的陰陽屬性
- 解決方案: 前端計算

**4. 大運流年**
- 狀態: ❌ 不包含
- 說明: 後端沒有返回大運和流年資料
- 解決方案: 未來版本考慮

## 前端補充數據策略

由於後端 API 缺少納音、藏干、陰陽平衡度等資料,前端採用以下策略:

### 1. 納音系統
**數據來源**: 虹靈御所-傳統八字集錦0907.pdf

**實作方式**:
```javascript
const NAYIN_MAP = {
  "甲子": { name: "海中金", ... },
  "乙丑": { name: "海中金", ... },
  // ... 60甲子
};

function getNayin(stem, branch) {
  const key = stem + branch;
  return NAYIN_MAP[key];
}
```

### 2. 藏干系統
**數據來源**: 後端倉庫 `earthly_branches.json`

**實作方式**:
```javascript
const HIDDEN_STEMS = {
  "子": { primary: "癸", ... },
  "丑": { primary: "己", secondary: "癸", tertiary: "辛", ... },
  // ... 12地支
};

function getHiddenStems(branch) {
  return HIDDEN_STEMS[branch];
}
```

### 3. 陰陽平衡度
**數據來源**: 傳統八字命理規則

**實作方式**:
```javascript
function calculateYinYangBalance(fourPillars) {
  let yang = 0, yin = 0;
  // 計算天干地支的陰陽屬性
  // ...
  return { yang, yin, percentage, status };
}
```

## 結論

### ✅ 後端 API 優點
1. 穩定可靠,相同輸入產生相同輸出
2. 提供完整的四柱、十神、五行、神煞資料
3. 包含詳細的計算日誌和數據來源
4. 支援真太陽時調整

### ⚠️ 後端 API 限制
1. 缺少納音資料
2. 缺少藏干資料
3. 缺少陰陽平衡度
4. 缺少大運流年

### 🚀 前端補充策略
1. 使用 `bazi-supplement-data.js` 補充納音和藏干
2. 前端計算陰陽平衡度
3. 不修改後端 API,純前端增強
4. 數據來源清晰,易於維護

### 📝 未來建議
1. 後端添加納音和藏干資料
2. 後端添加大運流年計算
3. 前端可選擇使用後端或前端數據
4. 保持數據來源的靈活性

---

**報告日期**: 2025-10-19  
**API 版本**: v8.1  
**前端版本**: v8.4
