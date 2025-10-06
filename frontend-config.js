/**
 * 虹靈御所 v8.2 - 增強版前端配置檔案
 * 合併 v8.1 FINAL 和 v8.2 Cards 的配置系統
 * 集中管理所有可配置參數，徹底消除硬編碼
 */

const HongLingConfig = {
    // ==================== 系統資訊 ====================
    system: {
        name: '虹靈御所',
        fullName: '虹靈御所八字軍團系統',
        version: '8.2',
        subtitle: '人生不是宿命，是軍團戰場',
        tagline: '精準節氣 · 查表計算 · 可追溯日誌',
        description: 'v8.2 - 完整前後端整合系統 + 卡片翻面功能'
    },

    // ==================== API 配置 ====================
    api: {
        // 生產環境
        production: {
            baseUrl: 'https://rainbow-sanctuary-bazu-production.up.railway.app',
            endpoint: '/api/bazi/compute',
            timeout: 60000
        },
        // 開發環境
        development: {
            baseUrl: 'http://localhost:8000',
            endpoint: '/api/bazi/compute',
            timeout: 60000
        },
        // 當前使用的環境
        current: 'production', // 'production' 或 'development'
        
        // 重試配置
        retryAttempts: 3,
        retryDelay: 1000,
        
        // 獲取當前 API 配置的輔助方法
        get currentConfig() {
            return this[this.current];
        },
        
        // 獲取完整 API URL
        get fullUrl() {
            const config = this.currentConfig;
            return config.baseUrl + config.endpoint;
        }
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
            early: { 
                value: 'early', 
                label: '傳統策略 (23:00-00:59次日)',
                description: '子時全部算次日'
            },
            late: { 
                value: 'late', 
                label: '現代策略 (23:00-00:59當日)',
                description: '子時全部算當日'
            },
            split: { 
                value: 'split', 
                label: '中分策略 (23:00-23:59當日，00:00-00:59次日)', 
                default: true,
                description: '23點前算當日，0點後算次日'
            }
        }
    },

    // ==================== 預設請求參數 ====================
    defaults: {
        timezone: 'Asia/Taipei',
        longitude: 120,
        useTrueSolarTime: false,
        zishiMethod: 'split', // 預設使用中分策略
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
            order: 1,
            description: '血脈傳承，根基所在'
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
            order: 2,
            description: '學習歷程，能力養成'
        },
        self: {
            key: 'self',
            name: '本我軍團',
            icon: '⭐',
            color: '#4682B4',
            colorRgb: '70, 130, 180',
            story: '你的核心本質，是整個戰場的指揮中心。',
            buff: '主導力量',
            element: 'day',
            order: 3,
            description: '核心自我，真實本性'
        },
        future: {
            key: 'future',
            name: '未來軍團',
            icon: '🚀',
            color: '#FF6347',
            colorRgb: '255, 99, 71',
            story: '未來的可能性在此展開，每個選擇都創造新的命運。',
            buff: '願景驅動',
            element: 'hour',
            order: 4,
            description: '發展方向，潛能展現'
        }
    },

    // ==================== 五行配置 ====================
    elements: {
        wood: {
            name: '木',
            color: '#1FB8CD',
            colorRgb: '31, 184, 205',
            icon: '🌳',
            traits: ['生長', '向上', '仁慈'],
            description: '生發之氣，代表成長與仁愛'
        },
        fire: {
            name: '火',
            color: '#FFC185',
            colorRgb: '255, 193, 133',
            icon: '🔥',
            traits: ['熱情', '光明', '禮儀'],
            description: '炎上之氣，代表熱情與禮節'
        },
        earth: {
            name: '土',
            color: '#B4413C',
            colorRgb: '180, 65, 60',
            icon: '⛰️',
            traits: ['穩定', '承載', '信用'],
            description: '中和之氣，代表穩定與信實'
        },
        metal: {
            name: '金',
            color: '#ECEBD5',
            colorRgb: '236, 235, 213',
            icon: '⚔️',
            traits: ['堅硬', '收斂', '義氣'],
            description: '從革之氣，代表堅毅與正義'
        },
        water: {
            name: '水',
            color: '#5D878F',
            colorRgb: '93, 135, 143',
            icon: '💧',
            traits: ['流動', '智慧', '適應'],
            description: '潤下之氣，代表智慧與靈活'
        }
    },

    // ==================== 圖表配置 ====================
    chart: {
        colors: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
        borderColor: '#ffffff',
        borderWidth: 2,
        font: {
            family: "'Microsoft JhengHei', 'PingFang TC', sans-serif",
            size: 14,
            weight: 'bold'
        },
        legend: {
            position: 'bottom',
            labels: {
                padding: 15,
                usePointStyle: true
            }
        }
    },

    // ==================== UI 元素 ====================
    ui: {
        icons: {
            loading: '⏳',
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        },
        buttons: {
            submit: '🎯 開始分析',
            reset: '🔄 重新輸入',
            export: '📥 匯出報告',
            demo: '🎮 載入範例'
        },
        status: {
            ready: 'API整合模式',
            loading: '分析中...',
            success: '分析完成',
            error: 'API連線失敗'
        }
    },

    // ==================== CDN 資源 ====================
    cdn: {
        chartJs: 'https://cdn.jsdelivr.net/npm/chart.js',
        jsPdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    },

    // ==================== 驗證規則 ====================
    validation: {
        patterns: {
            date: /^\d{4}-\d{2}-\d{2}$/,
            time: /^\d{2}:\d{2}$/,
            name: /^.{1,50}$/
        },
        messages: {
            required: '請填寫所有必要欄位',
            invalidDate: '日期格式錯誤，請使用 YYYY-MM-DD 格式',
            invalidTime: '時間格式錯誤，請使用 HH:MM 格式',
            invalidName: '姓名長度應在1-50字之間',
            apiError: '分析失敗，請稍後再試'
        }
    },

    // ==================== 載入狀態文字 ====================
    loadingTexts: {
        analyzing: '啟動命運分析...',
        computing: '星雲能量聚合中...',
        processing: '正在計算您的四柱八字',
        generating: '分析四時軍團',
        finalizing: '生成神煞兵符...'
    },

    // ==================== Demo 資料 ====================
    demoData: {
        enabled: true,
        cases: [
            {
                name: '測試案例1',
                date: '1981-09-18',
                time: '10:40',
                gender: 'male'
            },
            {
                name: '子時測試',
                date: '1981-09-18',
                time: '23:30',
                gender: 'female'
            }
        ]
    },

    // ==================== 輔助方法 ====================
    helpers: {
        // 獲取 API URL
        getApiUrl() {
            return HongLingConfig.api.fullUrl;
        },
        
        // 獲取軍團配置
        getLegion(key) {
            return HongLingConfig.legions[key];
        },
        
        // 獲取五行配置
        getElement(name) {
            const elementMap = {
                '木': 'wood',
                '火': 'fire',
                '土': 'earth',
                '金': 'metal',
                '水': 'water'
            };
            return HongLingConfig.elements[elementMap[name]];
        },
        
        // 獲取子時策略
        getZiStrategy(value) {
            return Object.values(HongLingConfig.calculation.ziStrategies)
                .find(s => s.value === value);
        },
        
        // 日誌輸出
        log(...args) {
            if (HongLingConfig.features && HongLingConfig.features.enableConsoleLog) {
                console.log('[虹靈御所]', ...args);
            }
        },
        
        // 錯誤輸出
        error(...args) {
            console.error('[虹靈御所 ERROR]', ...args);
        },
        
        // 格式化日期時間
        formatDateTime(date, time) {
            return `${date}T${time}:00`;
        },
        
        // 獲取 EPOCH 完整文字
        getEpochText() {
            const epoch = HongLingConfig.calculation.epochBase;
            return `EPOCH基準：${epoch.fullText}`;
        }
    },

    // ==================== 功能開關 ====================
    features: {
        enableDebugMode: false,
        enableConsoleLog: true,
        enableCardFlip: true,        // 啟用卡片翻面功能
        enableChartVisualization: true, // 啟用圖表視覺化
        enablePdfExport: false,      // PDF 匯出功能（待實作）
        enableDemoMode: true         // Demo 模式
    }
};

// 凍結配置物件，防止意外修改
if (typeof Object.freeze === 'function') {
    Object.freeze(HongLingConfig.system);
    Object.freeze(HongLingConfig.calculation.epochBase);
}

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HongLingConfig;
}
if (typeof window !== 'undefined') {
    window.HongLingConfig = HongLingConfig;
}
