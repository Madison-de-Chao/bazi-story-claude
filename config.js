/**
 * 虹靈御所 v8.2 - 配置檔案
 * 集中管理所有可配置參數，避免硬編碼
 */

const HongLingConfig = {
    // ==================== 系統資訊 ====================
    system: {
        name: '虹靈御所',
        version: '8.2',
        subtitle: '人生不是宿命，是軍團戰場',
        description: '四軍團八字戰場系統（卡片翻面修正版）'
    },

    // ==================== API 配置 ====================
    api: {
        baseUrl: 'https://rainbow-sanctuary-bazu-production.up.railway.app',
        endpoint: '/api/bazi/compute',
        timeout: 30000, // 30秒超時
        retryAttempts: 3,
        retryDelay: 1000 // 1秒
    },

    // ==================== 計算基準 ====================
    calculation: {
        epochBase: {
            date: '1985-09-22',
            description: '甲子日',
            fullText: '1985-09-22甲子日'
        },
        defaultLongitude: 120.0, // 台灣標準經度
        ziStrategies: {
            early: { value: 'early', label: '傳統策略 (23:00-00:59次日)' },
            late: { value: 'late', label: '現代策略 (23:00-00:59當日)' },
            split: { value: 'split', label: '中分策略 (23:00-23:59當日，00:00-00:59次日)', default: true }
        }
    },

    // ==================== 預設資料 ====================
    defaults: {
        user: {
            name: '橘子',
            gender: 'male'
        },
        testCases: {
            target: {
                date: '1981-09-18',
                time: '10:40',
                expected: {
                    day: '己亥',
                    hour: '己巳'
                }
            },
            zi: {
                date: '1981-09-18',
                time: '23:30'
            }
        }
    },

    // ==================== 四軍團配置 ====================
    legions: {
        family: {
            key: 'family',
            name: '家族軍團',
            icon: '🏰',
            color: '#8B4513',
            colorRgb: '139, 69, 19',
            story: '祖先的智慧如古樹根深，為你的人生奠定堅實基礎。',
            buff: '傳承加持',
            element: 'year',
            order: 1
        },
        growth: {
            key: 'growth',
            name: '成長軍團',
            icon: '🌱',
            color: '#228B22',
            colorRgb: '34, 139, 34',
            story: '學習與成長的旅程，每一步都在塑造更好的自己。',
            buff: '學習天賦',
            element: 'month',
            order: 2
        },
        self: {
            key: 'self',
            name: '自我軍團',
            icon: '⭐',
            color: '#4682B4',
            colorRgb: '70, 130, 180',
            story: '你的核心本質，是整個戰場的指揮中心。',
            buff: '主導力量',
            element: 'day',
            order: 3
        },
        future: {
            key: 'future',
            name: '未來軍團',
            icon: '🚀',
            color: '#FF6347',
            colorRgb: '255, 99, 71',
            story: '向未來進發的動力，展現你的潛能與方向。',
            buff: '前進動能',
            element: 'hour',
            order: 4
        }
    },

    // ==================== 五行配置 ====================
    elements: {
        wood: { 
            name: '木', 
            color: '#1FB8CD',
            colorRgb: '31, 184, 205',
            icon: '🌳',
            traits: ['生長', '向上', '仁慈']
        },
        fire: { 
            name: '火', 
            color: '#FFC185',
            colorRgb: '255, 193, 133',
            icon: '🔥',
            traits: ['熱情', '光明', '禮儀']
        },
        earth: { 
            name: '土', 
            color: '#B4413C',
            colorRgb: '180, 65, 60',
            icon: '⛰️',
            traits: ['穩定', '包容', '信用']
        },
        metal: { 
            name: '金', 
            color: '#ECEBD5',
            colorRgb: '236, 235, 213',
            icon: '⚔️',
            traits: ['堅韌', '決斷', '義理']
        },
        water: { 
            name: '水', 
            color: '#5D878F',
            colorRgb: '93, 135, 143',
            icon: '💧',
            traits: ['智慧', '流動', '適應']
        }
    },

    // ==================== Chart.js 配置 ====================
    chart: {
        colors: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
        borderColor: '#ffffff',
        borderWidth: 2,
        font: {
            size: 13,
            family: 'Noto Sans TC, sans-serif'
        }
    },

    // ==================== UI 元素 ====================
    ui: {
        icons: {
            loading: '⏳',
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            user: '👤',
            male: '♂',
            female: '♀'
        },
        buttons: {
            loadDemo: { icon: '📦', text: '載入示例' },
            analyze: { icon: '🚀', text: '開始戰場分析' },
            testTarget: { icon: '🎯', text: '目標測試' },
            testZi: { icon: '🌙', text: '子時測試' },
            exportPdf: { icon: '📁', text: '匯出PDF' }
        }
    },

    // ==================== 外部資源 ====================
    cdn: {
        chartjs: 'https://cdn.jsdelivr.net/npm/chart.js',
        jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    },

    // ==================== Demo 資料 ====================
    demoData: {
        fourPillars: {
            year: { gan: '乙', zhi: '丑', pillar: '乙丑' },
            month: { gan: '乙', zhi: '酉', pillar: '乙酉' },
            day: { gan: '戊', zhi: '寅', pillar: '戊寅' },
            hour: { gan: '壬', zhi: '戌', pillar: '壬戌' }
        },
        tenGods: {
            year: '偏印',
            month: '正官',
            day: '日主',
            hour: '傷官'
        },
        fiveElementsStats: {
            木: 2.3,
            火: 1.8,
            土: 3.2,
            金: 2.4,
            水: 1.3
        },
        spirits: [
            {
                name: '天乙貴人',
                anchor_basis: '日干戊土查貴人',
                rule_ref: '《三命通會》貴人歌訣',
                why_matched: '戊土見丑未為天乙貴人，年支丑土在位'
            },
            {
                name: '正官格',
                anchor_basis: '月干乙木為正官',
                rule_ref: '《滴天髓》格局論',
                why_matched: '日主戊土見月干乙木正官透出'
            }
        ]
    }
};

// 導出配置（支援多種模組系統）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HongLingConfig;
}
if (typeof window !== 'undefined') {
    window.HongLingConfig = HongLingConfig;
}
