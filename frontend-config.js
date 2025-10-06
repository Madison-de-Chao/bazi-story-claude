/**
 * 虹靈御所 v8.1 - 前端配置檔案
 * 集中管理前端所有可配置參數
 */

const HongLingConfig = {
    // ==================== 系統資訊 ====================
    system: {
        name: '虹靈御所',
        fullName: '虹靈御所八字軍團系統',
        version: '8.1',
        subtitle: '八字人生兵法系統',
        tagline: '精準節氣 · 查表計算 · 可追溯日誌',
        description: 'v8.1 - 完整前後端整合系統'
    },

    // ==================== API 配置 ====================
    api: {
        // 生產環境
        production: {
            baseUrl: 'https://rainbow-sanctuary-bazu-production.up.railway.app',
            endpoint: '/api/bazi/compute',
            timeout: 60000
        },
        // 開發環境（可選）
        development: {
            baseUrl: 'http://localhost:8000',
            endpoint: '/api/bazi/compute',
            timeout: 60000
        },
        // 當前使用的環境
        current: 'production', // 'production' 或 'development'
        
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

    // ==================== 預設請求參數 ====================
    defaults: {
        timezone: 'Asia/Taipei',
        longitude: 120,
        useTrueSolarTime: false,
        zishiMethod: 'traditional'
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

    // ==================== 輔助方法 ====================
    helpers: {
        getApiUrl() {
            return HongLingConfig.api.fullUrl;
        },
        
        log(...args) {
            if (HongLingConfig.features && HongLingConfig.features.enableConsoleLog) {
                console.log('[虹靈御所]', ...args);
            }
        },
        
        error(...args) {
            console.error('[虹靈御所 ERROR]', ...args);
        }
    },

    // ==================== 功能開關 ====================
    features: {
        enableDebugMode: false,
        enableConsoleLog: true
    }
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HongLingConfig;
}
if (typeof window !== 'undefined') {
    window.HongLingConfig = HongLingConfig;
}
