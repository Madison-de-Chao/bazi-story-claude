/**
 * 八字補充數據系統
 * 包含納音、藏干、陰陽平衡等前端計算所需數據
 */

// 納音對照表 (60甲子)
const NAYIN_TABLE = {
    "甲子": { nayin: "海中金", element: "金", description: "深藏不露的珍寶，如海底之金", life_theme: "厚積薄發，大器晚成" },
    "乙丑": { nayin: "海中金", element: "金", description: "深藏不露的珍寶，如海底之金", life_theme: "厚積薄發，大器晚成" },
    "丙寅": { nayin: "爐中火", element: "火", description: "爐中烈火，能煉金成器", life_theme: "燃燒自己，照亮他人" },
    "丁卯": { nayin: "爐中火", element: "火", description: "爐中烈火，能煉金成器", life_theme: "燃燒自己，照亮他人" },
    "戊辰": { nayin: "大林木", element: "木", description: "參天大樹，枝繁葉茂", life_theme: "成長茁壯，庇護眾生" },
    "己巳": { nayin: "大林木", element: "木", description: "參天大樹，枝繁葉茂", life_theme: "成長茁壯，庇護眾生" },
    "庚午": { nayin: "路旁土", element: "土", description: "道路兩旁的土壤，承載萬物", life_theme: "甘於平凡，成就不凡" },
    "辛未": { nayin: "路旁土", element: "土", description: "道路兩旁的土壤，承載萬物", life_theme: "甘於平凡，成就不凡" },
    "壬申": { nayin: "劍鋒金", element: "金", description: "鋒利的寶劍，能斬斷一切", life_theme: "披荊斬棘，勇往直前" },
    "癸酉": { nayin: "劍鋒金", element: "金", description: "鋒利的寶劍，能斬斷一切", life_theme: "披荊斬棘，勇往直前" },
    "甲戌": { nayin: "山頭火", element: "火", description: "山頂的烽火，能照亮遠方", life_theme: "登高望遠，指引迷津" },
    "乙亥": { nayin: "山頭火", element: "火", description: "山頂的烽火，能照亮遠方", life_theme: "登高望遠，指引迷津" },
    "丙子": { nayin: "澗下水", element: "水", description: "山澗清流，細水長流", life_theme: "細水長流，潤物無聲" },
    "丁丑": { nayin: "澗下水", element: "水", description: "山澗清流，細水長流", life_theme: "細水長流，潤物無聲" },
    "戊寅": { nayin: "城頭土", element: "土", description: "城牆上的土，堅固防禦", life_theme: "堅守崗位，保家衛國" },
    "己卯": { nayin: "城頭土", element: "土", description: "城牆上的土，堅固防禦", life_theme: "堅守崗位，保家衛國" },
    "庚辰": { nayin: "白蠟金", element: "金", description: "精煉的白金，純淨無瑕", life_theme: "追求完美，品質至上" },
    "辛巳": { nayin: "白蠟金", element: "金", description: "精煉的白金，純淨無瑕", life_theme: "追求完美，品質至上" },
    "壬午": { nayin: "楊柳木", element: "木", description: "柔軟的楊柳，隨風搖擺", life_theme: "柔中帶剛，適應環境" },
    "癸未": { nayin: "楊柳木", element: "木", description: "柔軟的楊柳，隨風搖擺", life_theme: "柔中帶剛，適應環境" },
    "甲申": { nayin: "泉中水", element: "水", description: "清泉之水，源源不絕", life_theme: "源源不絕，滋養眾生" },
    "乙酉": { nayin: "泉中水", element: "水", description: "清泉之水，源源不絕", life_theme: "源源不絕，滋養眾生" },
    "丙戌": { nayin: "屋上土", element: "土", description: "屋頂的土，遮風擋雨", life_theme: "遮風擋雨，保護家園" },
    "丁亥": { nayin: "屋上土", element: "土", description: "屋頂的土，遮風擋雨", life_theme: "遮風擋雨，保護家園" },
    "戊子": { nayin: "霹靂火", element: "火", description: "雷電之火，威力巨大", life_theme: "一鳴驚人，震撼四方" },
    "己丑": { nayin: "霹靂火", element: "火", description: "雷電之火，威力巨大", life_theme: "一鳴驚人，震撼四方" },
    "庚寅": { nayin: "松柏木", element: "木", description: "堅韌的松柏，四季常青", life_theme: "堅韌不拔，長青不老" },
    "辛卯": { nayin: "松柏木", element: "木", description: "堅韌的松柏，四季常青", life_theme: "堅韌不拔，長青不老" },
    "壬辰": { nayin: "長流水", element: "水", description: "長江大河，奔流不息", life_theme: "奔流不息，勇往直前" },
    "癸巳": { nayin: "長流水", element: "水", description: "長江大河，奔流不息", life_theme: "奔流不息，勇往直前" },
    "甲午": { nayin: "砂中金", element: "金", description: "沙中的金子，需要淘洗", life_theme: "沙裡淘金，終成正果" },
    "乙未": { nayin: "砂中金", element: "金", description: "沙中的金子，需要淘洗", life_theme: "沙裡淘金，終成正果" },
    "丙申": { nayin: "山下火", element: "火", description: "山腳的火光，溫暖人間", life_theme: "溫暖人間，照亮身邊" },
    "丁酉": { nayin: "山下火", element: "火", description: "山腳的火光，溫暖人間", life_theme: "溫暖人間，照亮身邊" },
    "戊戌": { nayin: "平地木", element: "木", description: "平原上的樹木，廣闊無邊", life_theme: "胸懷廣闊，包容天下" },
    "己亥": { nayin: "平地木", element: "木", description: "平原上的樹木，廣闊無邊", life_theme: "胸懷廣闊，包容天下" },
    "庚子": { nayin: "壁上土", element: "土", description: "牆壁上的土，裝飾美化", life_theme: "美化環境，裝點人生" },
    "辛丑": { nayin: "壁上土", element: "土", description: "牆壁上的土，裝飾美化", life_theme: "美化環境，裝點人生" },
    "壬寅": { nayin: "金箔金", element: "金", description: "薄薄的金箔，華麗精美", life_theme: "華麗精美，裝點世界" },
    "癸卯": { nayin: "金箔金", element: "金", description: "薄薄的金箔，華麗精美", life_theme: "華麗精美，裝點世界" },
    "甲辰": { nayin: "佛燈火", element: "火", description: "佛前的明燈，神聖莊嚴", life_theme: "神聖莊嚴，普度眾生" },
    "乙巳": { nayin: "佛燈火", element: "火", description: "佛前的明燈，神聖莊嚴", life_theme: "神聖莊嚴，普度眾生" },
    "丙午": { nayin: "天河水", element: "水", description: "天上的銀河，浩瀚無邊", life_theme: "浩瀚無邊，神秘高遠" },
    "丁未": { nayin: "天河水", element: "水", description: "天上的銀河，浩瀚無邊", life_theme: "浩瀚無邊，神秘高遠" },
    "戊申": { nayin: "大驛土", element: "土", description: "大道上的土，承載行旅", life_theme: "承載眾人，服務天下" },
    "己酉": { nayin: "大驛土", element: "土", description: "大道上的土，承載行旅", life_theme: "承載眾人，服務天下" },
    "庚戌": { nayin: "釵釧金", element: "金", description: "精美的首飾，裝飾用金", life_theme: "精美華麗，裝點生活" },
    "辛亥": { nayin: "釵釧金", element: "金", description: "精美的首飾，裝飾用金", life_theme: "精美華麗，裝點生活" },
    "壬子": { nayin: "桑柘木", element: "木", description: "桑樹柘樹，養蠶織絲", life_theme: "默默奉獻，成就美好" },
    "癸丑": { nayin: "桑柘木", element: "木", description: "桑樹柘樹，養蠶織絲", life_theme: "默默奉獻，成就美好" },
    "甲寅": { nayin: "大溪水", element: "水", description: "大溪流水，清澈奔流", life_theme: "清澈透明，永不停歇" },
    "乙卯": { nayin: "大溪水", element: "水", description: "大溪流水，清澈奔流", life_theme: "清澈透明，永不停歇" },
    "丙辰": { nayin: "沙中土", element: "土", description: "沙漠中的土，乾燥堅硬", life_theme: "堅韌不拔，適應環境" },
    "丁巳": { nayin: "沙中土", element: "土", description: "沙漠中的土，乾燥堅硬", life_theme: "堅韌不拔，適應環境" },
    "戊午": { nayin: "天上火", element: "火", description: "太陽之火，普照大地", life_theme: "光明正大，普照天下" },
    "己未": { nayin: "天上火", element: "火", description: "太陽之火，普照大地", life_theme: "光明正大，普照天下" },
    "庚申": { nayin: "石榴木", element: "木", description: "石榴樹木，果實累累", life_theme: "多子多福，收穫豐盛" },
    "辛酉": { nayin: "石榴木", element: "木", description: "石榴樹木，果實累累", life_theme: "多子多福，收穫豐盛" },
    "壬戌": { nayin: "大海水", element: "水", description: "浩瀚大海，包容萬物", life_theme: "包容萬物，氣度恢宏" },
    "癸亥": { nayin: "大海水", element: "水", description: "浩瀚大海，包容萬物", life_theme: "包容萬物，氣度恢宏" }
};

// 地支藏干表
const HIDDEN_STEMS = {
    "子": { primary: { stem: "癸", element: "水", weight: 1.0 } },
    "丑": { 
        primary: { stem: "己", element: "土", weight: 0.6 },
        secondary: { stem: "癸", element: "水", weight: 0.3 },
        tertiary: { stem: "辛", element: "金", weight: 0.3 }
    },
    "寅": {
        primary: { stem: "甲", element: "木", weight: 0.6 },
        secondary: { stem: "丙", element: "火", weight: 0.3 },
        tertiary: { stem: "戊", element: "土", weight: 0.3 }
    },
    "卯": { primary: { stem: "乙", element: "木", weight: 1.0 } },
    "辰": {
        primary: { stem: "戊", element: "土", weight: 0.6 },
        secondary: { stem: "乙", element: "木", weight: 0.3 },
        tertiary: { stem: "癸", element: "水", weight: 0.3 }
    },
    "巳": {
        primary: { stem: "丙", element: "火", weight: 0.6 },
        secondary: { stem: "戊", element: "土", weight: 0.3 },
        tertiary: { stem: "庚", element: "金", weight: 0.3 }
    },
    "午": {
        primary: { stem: "丁", element: "火", weight: 0.6 },
        secondary: { stem: "己", element: "土", weight: 0.3 }
    },
    "未": {
        primary: { stem: "己", element: "土", weight: 0.6 },
        secondary: { stem: "丁", element: "火", weight: 0.3 },
        tertiary: { stem: "乙", element: "木", weight: 0.3 }
    },
    "申": {
        primary: { stem: "庚", element: "金", weight: 0.6 },
        secondary: { stem: "壬", element: "水", weight: 0.3 },
        tertiary: { stem: "戊", element: "土", weight: 0.3 }
    },
    "酉": { primary: { stem: "辛", element: "金", weight: 1.0 } },
    "戌": {
        primary: { stem: "戊", element: "土", weight: 0.6 },
        secondary: { stem: "辛", element: "金", weight: 0.3 },
        tertiary: { stem: "丁", element: "火", weight: 0.3 }
    },
    "亥": {
        primary: { stem: "壬", element: "水", weight: 0.6 },
        secondary: { stem: "甲", element: "木", weight: 0.3 }
    }
};

// 天干陰陽屬性
const STEM_POLARITY = {
    "甲": "陽", "乙": "陰",
    "丙": "陽", "丁": "陰",
    "戊": "陽", "己": "陰",
    "庚": "陽", "辛": "陰",
    "壬": "陽", "癸": "陰"
};

// 地支陰陽屬性
const BRANCH_POLARITY = {
    "子": "陽", "丑": "陰",
    "寅": "陽", "卯": "陰",
    "辰": "陽", "巳": "陰",
    "午": "陽", "未": "陰",
    "申": "陽", "酉": "陰",
    "戌": "陽", "亥": "陰"
};

/**
 * 獲取納音資訊
 */
function getNayin(stem, branch) {
    const key = stem + branch;
    return NAYIN_TABLE[key] || { nayin: "未知", element: "未知", description: "", life_theme: "" };
}

/**
 * 獲取藏干資訊
 */
function getHiddenStems(branch) {
    return HIDDEN_STEMS[branch] || { primary: { stem: "未知", element: "未知", weight: 0 } };
}

/**
 * 計算陰陽平衡度
 */
function calculateYinYangBalance(fourPillars) {
    let yang = 0;
    let yin = 0;
    
    // 計算天干
    Object.values(fourPillars).forEach(pillar => {
        if (STEM_POLARITY[pillar.stem] === "陽") yang++;
        else yin++;
        
        if (BRANCH_POLARITY[pillar.branch] === "陽") yang++;
        else yin++;
    });
    
    const total = yang + yin;
    return {
        yang: yang,
        yin: yin,
        yang_percentage: Math.round((yang / total) * 100),
        yin_percentage: Math.round((yin / total) * 100),
        balance_status: Math.abs(yang - yin) <= 2 ? "平衡" : (yang > yin ? "偏陽" : "偏陰")
    };
}

/**
 * 生成詳細分析
 */
function generateDetailedAnalysis(apiResult) {
    const { five_elements_stats, ten_gods } = apiResult.data;
    
    // 五行分析
    const elements = five_elements_stats.elements_percentage;
    const strongest = five_elements_stats.strongest_element;
    const weakest = five_elements_stats.weakest_element;
    
    // 個性分析
    let personality = "";
    if (elements["火"] > 30) personality += "熱情開朗，善於表達。";
    if (elements["水"] > 30) personality += "聰明靈活，善於思考。";
    if (elements["木"] > 30) personality += "仁慈善良，富有創意。";
    if (elements["金"] > 30) personality += "果斷堅定，注重原則。";
    if (elements["土"] > 30) personality += "穩重可靠，值得信賴。";
    
    // 事業分析
    let career = "";
    if (ten_gods.day_stem === "日主") {
        if (ten_gods.month_stem === "正官" || ten_gods.month_stem === "偏官") {
            career = "適合從事管理、領導相關工作，具有權威性和影響力。";
        } else if (ten_gods.month_stem === "正財" || ten_gods.month_stem === "偏財") {
            career = "適合從事商業、金融相關工作，財運亨通。";
        } else if (ten_gods.month_stem === "食神" || ten_gods.month_stem === "傷官") {
            career = "適合從事創意、表達相關工作，才華橫溢。";
        }
    }
    
    return {
        personality: personality || "性格多元，需綜合分析。",
        career: career || "事業方向廣泛，可依興趣發展。",
        relationships: "人際關係和諧，善於與人相處。",
        wealth: "財運穩定，量入為出。",
        health: "注意身體平衡，保持良好作息。"
    };
}

