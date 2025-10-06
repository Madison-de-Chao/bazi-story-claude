/**
 * 虹靈御所 v8.2 - 四軍團八字戰場系統（卡片翻面修正版）
 * 完整前後端整合版本，修正卡片翻轉效果並添加豐富背面內容
 * 
 * 注意：請先引入 config.js 配置檔案
 */

class HongLingBaziSystem {
    constructor() {
        // 從配置檔案載入設定
        this.config = typeof HongLingConfig !== 'undefined' ? HongLingConfig : this.getDefaultConfig();
        
        // API配置
        this.API_BASE_URL = this.config.api.baseUrl;
        this.API_ENDPOINT = this.config.api.endpoint;
        
        // 預期驗證目標
        this.TARGET_CASE = this.config.defaults.testCases.target;
        
        // 四軍團配置
        this.legionConfigs = this.config.legions;
        
        // API狀態
        this.apiStatus = 'unknown';
    }
    
    /**
     * 當配置檔案未載入時的預設配置
     */
    getDefaultConfig() {
        console.warn('配置檔案未載入，使用預設配置');
        return {
            api: {
                baseUrl: 'https://rainbow-sanctuary-bazu-production.up.railway.app',
                endpoint: '/api/bazi/compute'
            },
            defaults: {
                testCases: {
                    target: {
                        date: '1981-09-18',
                        time: '10:40',
                        expected: { day: '己亥', hour: '己巳' }
                    }
                }
            },
            legions: {
                family: { name: '家族軍團', icon: '🏰', color: '#8B4513', story: '祖先的智慧如古樹根深，為你的人生奠定堅實基礎。', buff: '傳承加持', element: 'year' },
                growth: { name: '成長軍團', icon: '🌱', color: '#228B22', story: '學習與成長的旅程，每一步都在塑造更好的自己。', buff: '學習天賦', element: 'month' },
                self: { name: '自我軍團', icon: '⭐', color: '#4682B4', story: '你的核心本質，是整個戰場的指揮中心。', buff: '主導力量', element: 'day' },
                future: { name: '未來軍團', icon: '🚀', color: '#FF6347', story: '向未來進發的動力，展現你的潛能與方向。', buff: '前進動能', element: 'hour' }
            }
        };
    }
    
    /**
     * 創建Demo回退資料
     */
    createDemoData() {
        const config = this.config.demoData;
        const systemInfo = this.config.system;
        const calculation = this.config.calculation;
        
        return {
            four_pillars: config.fourPillars,
            ten_gods: config.tenGods,
            five_elements_stats: config.fiveElementsStats,
            spirits: config.spirits,
            calculation_log: [
                `=== 🌟 ${systemInfo.name} v${systemInfo.version} 四軍團八字戰場 ===`,
                `系統版本: v${systemInfo.version} ${systemInfo.description}`,
                '計算時間: ' + new Date().toLocaleString(),
                'API狀態: Demo回退模式',
                '',
                '🎴 === 卡片翻面系統 ===',
                '修正CSS 3D翻轉效果，確保背面內容正確顯示',
                '為每個軍團添加詳細的背面分析內容',
                '優化翻轉動畫，提升用戶體驗',
                '',
                '📊 === 數據整合階段 ===',
                `四柱數據: 年${config.fourPillars.year.pillar} 月${config.fourPillars.month.pillar} 日${config.fourPillars.day.pillar} 時${config.fourPillars.hour.pillar}`,
                `五行統計: 木${config.fiveElementsStats.木} 火${config.fiveElementsStats.火} 土${config.fiveElementsStats.土} 金${config.fiveElementsStats.金} 水${config.fiveElementsStats.水}`,
                `神煞數量: ${config.spirits.length}個`,
                '',
                '🎯 === 軍團分析 ===',
                `家族軍團(年柱): ${config.fourPillars.year.pillar} - 包容與耐心的家風`,
                `成長軍團(月柱): ${config.fourPillars.month.pillar} - 正官格，適合正統發展`,
                `自我軍團(日柱): ${config.fourPillars.day.pillar} - 魁罡日，個性剛強`,
                `未來軍團(時柱): ${config.fourPillars.hour.pillar} - 傷官配印，創意與實務並重`,
                '',
                '✨ === 整合完成 ===',
                '系統狀態: 所有軍團就位，卡片翻轉系統正常 🎯'
            ],
            data_provenance: {
                source: 'Demo數據',
                calculation_method: '傳統算法',
                epoch_base: calculation.epochBase.fullText
            },
            tst_adjustment_log: {
                longitude_correction_minutes: 0,
                equation_of_time_minutes: 0,
                total_adjustment_minutes: 0
            }
        };
    }
    
    /**
     * 調用後端API進行八字計算
     */
    async callBaziAPI(input) {
        const { year, month, day, hour, minute, useTst } = input;
        
        // 構造API請求
        const requestData = {
            datetime_local: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00`,
            timezone: 'Asia/Taipei',
            longitude: 120.0,
            use_true_solar_time: useTst || false
        };
        
        console.log('🌐 API請求:', requestData);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8秒超時
            
            const response = await fetch(`${this.API_BASE_URL}${this.API_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API響應錯誤: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ API響應成功:', data);
            
            this.apiStatus = 'online';
            this.updateApiStatus('🌐 API線上模式', 'api-status-online');
            
            return data;
            
        } catch (error) {
            console.error('❌ API調用失敗:', error);
            
            this.apiStatus = 'offline';
            this.updateApiStatus('🔧 Demo模式 (API離線)', 'api-status-offline');
            
            // 使用Demo數據作為回退
            console.log('🎭 使用Demo回退數據');
            return this.createDemoData();
        }
    }
    
    /**
     * 更新API狀態顯示
     */
    updateApiStatus(text, className) {
        const statusElement = document.getElementById('api-status');
        if (statusElement) {
            statusElement.textContent = text;
            statusElement.className = `status ${className}`;
        }
    }
    
    /**
     * 主計算函數
     */
    async calculate(input) {
        const { name, gender, year, month, day, hour, minute, ziStrategy, useTst } = input;
        const debugLog = [];
        
        debugLog.push(`=== 🌟 虹靈御所 v8.2 四軍團八字戰場 ===`);
        debugLog.push(`系統版本: v8.2 卡片翻面修正版`);
        debugLog.push(`計算時間: ${new Date().toLocaleString()}`);
        debugLog.push(`角色信息: ${name || '未命名'} (${gender === 'male' ? '男' : '女'})`);
        debugLog.push(`出生信息: ${year}-${month}-${day} ${hour}:${String(minute).padStart(2,'0')}`);
        debugLog.push(`TST真太陽時: ${useTst ? '啟用' : '停用'}`);
        debugLog.push(`API端點: ${this.API_BASE_URL}${this.API_ENDPOINT}`);
        debugLog.push('');
        
        // 調用後端API
        debugLog.push('🌐 === API調用階段 ===');
        const apiData = await this.callBaziAPI({ year, month, day, hour, minute, useTst });
        
        if (this.apiStatus === 'online') {
            debugLog.push('✅ API調用成功，使用後端計算結果');
        } else {
            debugLog.push('⚠️ API調用失敗，使用Demo回退數據');
        }
        
        // 整合API數據
        debugLog.push('\n📊 === 數據整合階段 ===');
        const result = this.processApiResponse(apiData, input, debugLog);
        
        // 驗證目標案例
        const verification = this.verifyTargetCase(result.pillars, year, month, day, debugLog);
        result.verification = verification;
        
        // 完成整合
        debugLog.push('\n✨ === 整合完成 ===');
        debugLog.push(`年柱: ${result.pillars.year.pillar} | 月柱: ${result.pillars.month.pillar}`);
        debugLog.push(`日柱: ${result.pillars.day.pillar} | 時柱: ${result.pillars.hour.pillar}`);
        debugLog.push(`驗證狀態: ${verification.status}`);
        debugLog.push(`API狀態: ${this.apiStatus}`);
        debugLog.push(`神煞數量: ${result.spirits.length}個`);
        debugLog.push(`卡片翻轉系統: 已優化，背面內容豐富 🎴`);
        debugLog.push(`系統狀態: 所有軍團就位，戰場準備完畢 🎯`);
        
        result.debugLog = debugLog;
        return result;
    }
    
    /**
     * 處理API響應數據
     */
    processApiResponse(apiData, input, debugLog) {
        const { name, gender, year, month, day, hour, minute, useTst } = input;
        
        // 處理四柱數據
        const pillars = {
            year: apiData.four_pillars?.year || { gan: '乙', zhi: '丑', pillar: '乙丑' },
            month: apiData.four_pillars?.month || { gan: '乙', zhi: '酉', pillar: '乙酉' },
            day: apiData.four_pillars?.day || { gan: '戊', zhi: '寅', pillar: '戊寅' },
            hour: apiData.four_pillars?.hour || { gan: '壬', zhi: '戌', pillar: '壬戌' }
        };
        
        debugLog.push(`四柱數據: 年${pillars.year.pillar} 月${pillars.month.pillar} 日${pillars.day.pillar} 時${pillars.hour.pillar}`);
        
        // 處理五行統計
        const fiveElements = this.processFiveElements(apiData.five_elements_stats, debugLog);
        
        // 處理神煞系統
        const spirits = this.processSpirits(apiData.spirits || [], debugLog);
        
        // 處理TST資訊
        const tstInfo = this.processTstInfo(apiData.tst_adjustment_log, useTst, debugLog);
        
        // 生成軍團分析（包含背面內容）
        const legions = this.generateLegionAnalysis(pillars, fiveElements);
        
        return {
            personal: {
                name: name || '',
                gender: gender || 'male',
                birthDate: `${year}-${month}-${day}`,
                birthTime: `${hour}:${String(minute).padStart(2,'0')}`
            },
            pillars,
            legions,
            fiveElements,
            spirits,
            tstInfo,
            meta: {
                apiStatus: this.apiStatus,
                dataSource: this.apiStatus === 'online' ? 'Production API' : 'Demo Fallback',
                calculationMethod: apiData.data_provenance?.calculation_method || '傳統算法',
                epochBase: apiData.data_provenance?.epoch_base || this.config.calculation.epochBase.fullText,
                version: this.config.system.version,
                tstEnabled: useTst
            },
            rawApiData: apiData
        };
    }
    
    /**
     * 生成軍團分析（包含豐富的背面內容）
     */
    generateLegionAnalysis(pillars, fiveElements) {
        const legions = {};
        
        Object.keys(this.legionConfigs).forEach(legionType => {
            const config = this.legionConfigs[legionType];
            const pillarType = config.element;
            const pillar = pillars[pillarType];
            
            const analysis = this.generateLegionStory(pillar, legionType, fiveElements);
            const backContent = this.generateBackContent(pillar, legionType, fiveElements);
            
            legions[legionType] = {
                ...config,
                pillar: pillar.pillar,
                gan: pillar.gan,
                zhi: pillar.zhi,
                backContent,
                ...analysis
            };
        });
        
        return legions;
    }
    
    /**
     * 生成卡片背面內容
     */
    generateBackContent(pillar, legionType, fiveElements) {
        const { gan, zhi } = pillar;
        const ganElement = this.getStemElement(gan);
        const zhiElement = this.getBranchElement(zhi);
        
        switch (legionType) {
            case 'family':
                return {
                    wisdom: `${gan}${ganElement}柔韌，${zhi}${zhiElement}深厚，家族以${this.getElementTrait(ganElement)}與${this.getElementTrait(zhiElement)}見長`,
                    mission: `傳承${this.getGanTrait(gan)}的家風，化解衝突為和諧`,
                    resources: `穩定的${zhiElement}行基礎，深厚的人際網絡`,
                    advice: `善用家族的${this.getCombinedTrait(gan, zhi)}特質，但要避免過度依賴`
                };
                
            case 'growth':
                return {
                    talent: `${gan}${ganElement}遇${zhi}${zhiElement}，學習需要${this.getLearningStyle(gan, zhi)}`,
                    channels: `通過${this.getPathway(gan)}，走${this.getEducationPath(zhi)}發展`,
                    pattern: `${this.getPattern(gan, zhi)} - 適合${this.getSuitableField(gan, zhi)}`,
                    strategy: `以${this.getStrategy(ganElement, zhiElement)}為基石，在結構中發揮創意`
                };
                
            case 'self':
                return {
                    core: `${gan}干的${this.getCorePersonality(gan)}特質深度分析`,
                    power: `${zhi}支提供的${this.getInnerPower(zhi)}根基力量`,
                    relations: `與其他柱位的${this.getRelationshipMode(gan)}互動模式`,
                    realization: `發揮潛能的關鍵要素：${this.getRealizationKey(gan, zhi)}`
                };
                
            case 'future':
                return {
                    vision: `${gan}干指向的${this.getLifeDirection(gan)}人生方向`,
                    method: `${zhi}支提供的${this.getRealizationMethod(zhi)}實現路徑`,
                    children: `對下一代的影響：${this.getChildrenInfluence(gan, zhi)}`,
                    prospects: `人生後期的發展趨勢：${this.getLateFutureTrend(gan, zhi)}`
                };
                
            default:
                return {};
        }
    }
    
    /**
     * 輔助函數 - 各種特質分析
     */
    getStemElement(stem) {
        const stemElements = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        return stemElements[stem] || '?';
    }
    
    getBranchElement(branch) {
        const branchElements = {
            '子': '水', '亥': '水', '寅': '木', '卯': '木', '巳': '火',
            '午': '火', '申': '金', '酉': '金', '辰': '土', '戌': '土', 
            '丑': '土', '未': '土'
        };
        return branchElements[branch] || '?';
    }
    
    getElementTrait(element) {
        const traits = {
            '木': '生長與包容',
            '火': '熱情與光明',
            '土': '穩重與包容',
            '金': '堅韌與精準',
            '水': '智慧與變通'
        };
        return traits[element] || '平衡';
    }
    
    getGanTrait(gan) {
        const traits = {
            '甲': '剛直不屈', '乙': '柔韌包容', '丙': '熱情奔放', '丁': '細緻溫暖',
            '戊': '厚德載物', '己': '溫和包容', '庚': '果斷堅毅', '辛': '精緻細膩',
            '壬': '智慧流動', '癸': '柔情似水'
        };
        return traits[gan] || '平衡和諧';
    }
    
    getCombinedTrait(gan, zhi) {
        return `${this.getGanTrait(gan)}配${this.getBranchTrait(zhi)}`;
    }
    
    getBranchTrait(zhi) {
        const traits = {
            '子': '機智靈活', '丑': '踏實穩重', '寅': '勇敢進取', '卯': '溫和恬靜',
            '辰': '博學多才', '巳': '智慧深邃', '午': '熱情活力', '未': '溫暖包容',
            '申': '機敏活潑', '酉': '精確細緻', '戌': '忠誠可靠', '亥': '智慧深沉'
        };
        return traits[zhi] || '平衡';
    }
    
    getLearningStyle(gan, zhi) {
        return `${this.getGanTrait(gan)}與${this.getBranchTrait(zhi)}的結合方式`;
    }
    
    getPathway(gan) {
        const pathways = {
            '甲': '正統教育路徑', '乙': '藝術創意途徑', '丙': '領導管理方向',
            '丁': '專業技術領域', '戊': '實務經驗積累', '己': '服務助人之道',
            '庚': '競爭挑戰模式', '辛': '精品專業路線', '壬': '知識創新領域',
            '癸': '感性藝術發展'
        };
        return pathways[gan] || '綜合發展';
    }
    
    getEducationPath(zhi) {
        const paths = {
            '子': '理論研究', '丑': '實用技術', '寅': '管理領導', '卯': '文藝創作',
            '辰': '學術研究', '巳': '智慧哲學', '午': '表演藝術', '未': '服務業',
            '申': '科技創新', '酉': '精密工藝', '戌': '軍警法政', '亥': '教育傳播'
        };
        return paths[zhi] || '多元';
    }
    
    getPattern(gan, zhi) {
        return `${gan}${zhi}格局`;
    }
    
    getSuitableField(gan, zhi) {
        return `${this.getFieldByGan(gan)}、${this.getFieldByZhi(zhi)}`;
    }
    
    getFieldByGan(gan) {
        const fields = {
            '甲': '管理', '乙': '藝術', '丙': '領導', '丁': '技術',
            '戊': '建設', '己': '服務', '庚': '競技', '辛': '設計',
            '壬': '研發', '癸': '創作'
        };
        return fields[gan] || '綜合';
    }
    
    getFieldByZhi(zhi) {
        const fields = {
            '子': '智能', '丑': '農牧', '寅': '林業', '卯': '紡織',
            '辰': '水利', '巳': '能源', '午': '娛樂', '未': '餐飲',
            '申': '科技', '酉': '金融', '戌': '保全', '亥': '運輸'
        };
        return fields[zhi] || '多元';
    }
    
    getStrategy(ganElement, zhiElement) {
        return `${ganElement}行的${this.getElementTrait(ganElement)}配合${zhiElement}行的${this.getElementTrait(zhiElement)}`;
    }
    
    getCorePersonality(gan) {
        return this.getGanTrait(gan);
    }
    
    getInnerPower(zhi) {
        return this.getBranchTrait(zhi);
    }
    
    getRelationshipMode(gan) {
        return this.getGanTrait(gan);
    }
    
    getRealizationKey(gan, zhi) {
        return `結合${this.getGanTrait(gan)}與${this.getBranchTrait(zhi)}的力量`;
    }
    
    getLifeDirection(gan) {
        const directions = {
            '甲': '開創領導', '乙': '藝術美學', '丙': '光明正大', '丁': '精緻專業',
            '戊': '建設穩固', '己': '服務奉獻', '庚': '突破創新', '辛': '精品質感',
            '壬': '智慧流通', '癸': '柔美感性'
        };
        return directions[gan] || '平衡發展';
    }
    
    getRealizationMethod(zhi) {
        const methods = {
            '子': '智慧策略', '丑': '踏實累積', '寅': '勇敢行動', '卯': '和諧協調',
            '辰': '博學廣識', '巳': '深度思考', '午': '熱情投入', '未': '溫暖包容',
            '申': '靈活變通', '酉': '精確執行', '戌': '忠實守護', '亥': '深沉智慧'
        };
        return methods[zhi] || '綜合運用';
    }
    
    getChildrenInfluence(gan, zhi) {
        return `傳承${this.getGanTrait(gan)}精神與${this.getBranchTrait(zhi)}品格`;
    }
    
    getLateFutureTrend(gan, zhi) {
        return `以${this.getGanTrait(gan)}為基調，發揮${this.getBranchTrait(zhi)}智慧`;
    }
    
    // 其他現有的方法保持不變...
    processFiveElements(elementData, debugLog) {
        debugLog.push('\n🌿 === 五行統計處理 ===');
        
        const elements = {
            '木': elementData?.木 || 0,
            '火': elementData?.火 || 0,
            '土': elementData?.土 || 0,
            '金': elementData?.金 || 0,
            '水': elementData?.水 || 0
        };
        
        const total = Object.values(elements).reduce((sum, count) => sum + count, 0);
        const stats = Object.entries(elements).map(([element, count]) => ({
            name: element,
            count: parseFloat(count.toFixed(1)),
            percentage: Math.round((count / total) * 100)
        }));
        
        debugLog.push(stats.map(e => `${e.name}: ${e.count} (${e.percentage}%)`).join(' | '));
        debugLog.push(`總權重: ${total.toFixed(1)} (採用v8.1權重法)`);
        
        return { elements, stats, total: parseFloat(total.toFixed(1)) };
    }
    
    processSpirits(spiritsData, debugLog) {
        debugLog.push('\n⭐ === 神煞系統處理 ===');
        
        const spirits = spiritsData.map(spirit => ({
            name: spirit.name || '未知神煞',
            anchorBasis: spirit.anchor_basis || '無記錄',
            ruleRef: spirit.rule_ref || '無依據',
            whyMatched: spirit.why_matched || '無說明'
        }));
        
        debugLog.push(`處理神煞 ${spirits.length} 個`);
        spirits.slice(0, 5).forEach(spirit => {
            debugLog.push(`  ${spirit.name}: ${spirit.whyMatched}`);
        });
        
        if (spirits.length > 5) {
            debugLog.push(`  ... 及其他 ${spirits.length - 5} 個神煞`);
        }
        
        return spirits;
    }
    
    processTstInfo(tstData, tstEnabled, debugLog) {
        debugLog.push('\n🌍 === TST真太陽時處理 ===');
        
        const tstInfo = {
            enabled: tstEnabled,
            longitudeCorrection: tstData?.longitude_correction_minutes || 0,
            equationTime: tstData?.equation_of_time_minutes || 0,
            totalAdjustment: tstData?.total_adjustment_minutes || 0
        };
        
        if (tstEnabled) {
            debugLog.push(`經度修正: ${tstInfo.longitudeCorrection} 分鐘`);
            debugLog.push(`時差方程: ${tstInfo.equationTime} 分鐘`);
            debugLog.push(`總調整量: ${tstInfo.totalAdjustment} 分鐘`);
        } else {
            debugLog.push('TST真太陽時: 未啟用');
        }
        
        return tstInfo;
    }
    
    generateLegionStory(pillar, legionType, fiveElements) {
        const config = this.legionConfigs[legionType];
        
        // 基礎故事
        let story = config.story;
        
        // 生成Buff/Debuff
        const buffs = [config.buff];
        const debuffs = [];
        
        // 根據五行強弱判斷
        fiveElements.stats.forEach(element => {
            if (element.percentage > 25) {
                buffs.push(`${element.name}行強旺`);
            } else if (element.percentage < 10) {
                debuffs.push(`${element.name}行偏弱`);
            }
        });
        
        return { story, buffs, debuffs };
    }
    
    verifyTargetCase(pillars, year, month, day, debugLog) {
        debugLog.push('\n🎯 === 目標驗證階段 ===');
        
        const isTargetCase = (year === 1981 && month === 9 && day === 18);
        
        if (isTargetCase) {
            const actualDay = pillars.day.pillar;
            const actualHour = pillars.hour.pillar;
            const expectedDay = this.TARGET_CASE.expected.day;
            const expectedHour = this.TARGET_CASE.expected.hour;
            
            const dayCorrect = actualDay === expectedDay;
            const hourCorrect = actualHour === expectedHour;
            const allCorrect = dayCorrect && hourCorrect;
            
            debugLog.push(`目標案例驗證: ${year}-${month}-${day}`);
            debugLog.push(`預期日柱: ${expectedDay} | 實際日柱: ${actualDay} | ${dayCorrect ? '✅' : '❌'}`);
            debugLog.push(`預期時柱: ${expectedHour} | 實際時柱: ${actualHour} | ${hourCorrect ? '✅' : '❌'}`);
            debugLog.push(`總體結果: ${allCorrect ? '✅ 驗證通過' : '❌ 驗證失敗'}`);
            
            return {
                isTarget: true,
                expected: { day: expectedDay, hour: expectedHour },
                actual: { day: actualDay, hour: actualHour },
                results: { day: dayCorrect, hour: hourCorrect },
                status: allCorrect ? '✅ 驗證通過' : '❌ 驗證失敗'
            };
        }
        
        debugLog.push('非目標案例，跳過驗證');
        return { isTarget: false, status: '⚪ 非目標案例' };
    }
}

/**
 * 應用程式主控制器（修正版）
 */
class BaziApp {
    constructor() {
        this.calculator = new HongLingBaziSystem();
        this.elementsChart = null;
        this.currentResult = null;
        this.initializeApp();
    }
    
    initializeApp() {
        // 綁定事件監聽器
        const form = document.getElementById('bazi-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateBazi();
            });
        }
        
        // 載入示例按鈕
        const loadDemoBtn = document.getElementById('load-demo');
        if (loadDemoBtn) {
            loadDemoBtn.addEventListener('click', () => {
                this.loadDemo();
            });
        }
        
        const testTargetBtn = document.getElementById('test-target');
        if (testTargetBtn) {
            testTargetBtn.addEventListener('click', () => {
                this.loadTargetTest();
            });
        }
        
        const testZiBtn = document.getElementById('test-zi');
        if (testZiBtn) {
            testZiBtn.addEventListener('click', () => {
                this.loadZiTest();
            });
        }
        
        const exportBtn = document.getElementById('export-pdf');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToPDF();
            });
        }
        
        // 軍團卡片翻轉事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.legion-card')) {
                const legionCard = e.target.closest('.legion-card');
                // 如果點擊的是證據查看按鈕，不翻轉卡片
                if (!e.target.classList.contains('evidence-toggle')) {
                    this.toggleCardFlip(legionCard);
                }
            }
            
            if (e.target.classList.contains('evidence-toggle')) {
                e.stopPropagation(); // 阻止事件冒泡
                const pillarType = e.target.dataset.pillar;
                this.showEvidenceChain(pillarType);
            }
            
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal__overlay')) {
                this.hideModal();
            }
        });
        
        // 鍵盤支持
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.legion-card') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const legionCard = e.target.closest('.legion-card');
                this.toggleCardFlip(legionCard);
            }
            
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
        
        // 初始化API狀態
        this.calculator.updateApiStatus('🔄 檢測中...', '');
        
        console.log('🎴 虹靈御所 v8.2 卡片翻轉系統已初始化');
    }
    
    /**
     * 載入示例資料並自動計算
     */
    loadDemo() {
        // 設置示例資料
        const nameElement = document.getElementById('name');
        const genderElement = document.getElementById('gender');
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        const strategyElement = document.querySelector('input[name="ziStrategy"][value="split"]');
        const tstElement = document.getElementById('use-tst');
        
        const defaultUser = this.config.defaults.user;
        const targetCase = this.config.defaults.testCases.target;
        
        if (nameElement) nameElement.value = defaultUser.name;
        if (genderElement) genderElement.value = defaultUser.gender;
        if (dateElement) dateElement.value = targetCase.date;
        if (timeElement) timeElement.value = targetCase.time;
        if (strategyElement) strategyElement.checked = true;
        if (tstElement) tstElement.checked = false;
        
        // 自動計算
        setTimeout(() => {
            this.calculateBazi();
        }, 500);
    }
    
    /**
     * 軍團卡片翻轉控制
     */
    toggleCardFlip(cardElement) {
        const isFlipped = cardElement.classList.contains('flipped');
        
        if (isFlipped) {
            cardElement.classList.remove('flipped');
            cardElement.setAttribute('aria-expanded', 'false');
        } else {
            cardElement.classList.add('flipped');
            cardElement.setAttribute('aria-expanded', 'true');
        }
        
        console.log(`🎴 卡片翻轉: ${cardElement.id} ${isFlipped ? '→ 正面' : '→ 背面'}`);
    }
    
    async calculateBazi() {
        console.log('🚀 開始計算八字...');
        
        const form = document.getElementById('bazi-form');
        if (!form) {
            console.error('表單元素未找到');
            return;
        }
        
        const formData = new FormData(form);
        
        const date = new Date(formData.get('date'));
        const time = formData.get('time');
        if (!time) {
            alert('請選擇出生時間');
            return;
        }
        
        const [hour, minute] = time.split(':').map(Number);
        
        const input = {
            name: formData.get('name'),
            gender: formData.get('gender'),
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour,
            minute,
            ziStrategy: formData.get('ziStrategy') || 'split',
            useTst: formData.has('useTst')
        };
        
        console.log('📝 輸入數據:', input);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        try {
            const result = await this.calculator.calculate(input);
            console.log('✅ 計算完成:', result);
            
            this.currentResult = result;
            this.displayResult(result);
            
            const exportBtn = document.getElementById('export-pdf');
            if (exportBtn) {
                exportBtn.classList.remove('hidden');
            }
        } catch (error) {
            console.error('❌ 計算錯誤:', error);
            alert('計算過程發生錯誤: ' + error.message);
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    }
    
    displayResult(result) {
        console.log('🎨 開始顯示結果...');
        
        try {
            // 顯示角色資訊
            this.displayCharacterInfo(result.personal);
            
            // 顯示四軍團（包含背面內容）
            this.displayLegions(result.legions);
            
            // 顯示戰場統計
            this.displayBattlefieldStats(result.fiveElements, result.verification, result.tstInfo);
            
            // 顯示神煞系統
            this.displaySpirits(result.spirits);
            
            // 顯示系統資訊
            this.displaySystemInfo(result.meta);
            
            // 顯示Debug日誌
            const debugElement = document.getElementById('debug-log');
            if (debugElement && result.debugLog) {
                debugElement.textContent = result.debugLog.join('\n');
            }
            
            // 顯示結果區域
            const resultSection = document.getElementById('result-section');
            if (resultSection) {
                resultSection.classList.remove('hidden');
                
                // 滾動到結果
                setTimeout(() => {
                    resultSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
            
            console.log('✅ 結果顯示完成（含背面內容）');
        } catch (error) {
            console.error('❌ 顯示結果錯誤:', error);
        }
    }
    
    displayCharacterInfo(personal) {
        if (personal.name && personal.name.trim() !== '') {
            const nameElement = document.getElementById('display-name');
            if (nameElement) {
                nameElement.textContent = personal.name;
            }
            
            const genderElement = document.getElementById('display-gender');
            if (genderElement) {
                genderElement.textContent = personal.gender === 'male' ? '男性 ♂' : '女性 ♀';
            }
            
            const birthElement = document.getElementById('display-birth');
            if (birthElement) {
                birthElement.textContent = `${personal.birthDate} ${personal.birthTime}`;
            }
        }
    }
    
    displayLegions(legions) {
        Object.entries(legions).forEach(([legionType, legion]) => {
            // 正面內容
            const legionCard = document.getElementById(`${legionType}-legion`);
            if (!legionCard) return;
            
            // 設置軍團柱
            const pillarElement = legionCard.querySelector('.legion-pillar');
            if (pillarElement) {
                pillarElement.textContent = legion.pillar;
            }
            
            // 設置五行標籤
            const elementsContainer = legionCard.querySelector('.element-display');
            if (elementsContainer) {
                const stemElement = this.calculator.getStemElement(legion.gan);
                const branchElement = this.calculator.getBranchElement(legion.zhi);
                elementsContainer.innerHTML = `
                    <span class="element-tag">${legion.gan}(${stemElement})</span>
                    <span class="element-tag">${legion.zhi}(${branchElement})</span>
                `;
            }
            
            // 設置故事
            const storyElement = legionCard.querySelector('.legion-story');
            if (storyElement) {
                storyElement.textContent = legion.story;
            }
            
            // 設置Buff/Debuff
            const buffsContainer = legionCard.querySelector('.buffs-container');
            if (buffsContainer) {
                buffsContainer.innerHTML = '';
                
                legion.buffs.forEach(buff => {
                    const buffEl = document.createElement('span');
                    buffEl.className = 'buff-item';
                    buffEl.textContent = `+${buff}`;
                    buffsContainer.appendChild(buffEl);
                });
                
                legion.debuffs.forEach(debuff => {
                    const debuffEl = document.createElement('span');
                    debuffEl.className = 'debuff-item';
                    debuffEl.textContent = `-${debuff}`;
                    buffsContainer.appendChild(debuffEl);
                });
            }
            
            // 設置背面內容
            this.displayLegionBackContent(legionType, legion.backContent);
        });
    }
    
    /**
     * 顯示軍團卡片背面內容
     */
    displayLegionBackContent(legionType, backContent) {
        const backListElement = document.getElementById(`${legionType}-back`);
        if (!backListElement || !backContent) return;
        
        backListElement.innerHTML = '';
        
        Object.entries(backContent).forEach(([key, value]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${this.getBackContentLabel(key, legionType)}</strong><p>${value}</p>`;
            backListElement.appendChild(listItem);
        });
    }
    
    /**
     * 獲取背面內容標籤
     */
    getBackContentLabel(key, legionType) {
        const labels = {
            family: {
                wisdom: '🧠 祖先智慧',
                mission: '🎯 家族使命',
                resources: '💎 資源基礎',
                advice: '💡 成長建議'
            },
            growth: {
                talent: '🌟 學習天賦',
                channels: '🛤️ 資源管道',
                pattern: '📊 格局分析',
                strategy: '🎲 發展策略'
            },
            self: {
                core: '💫 人格核心',
                power: '⚡ 內在力量',
                relations: '🔗 十神關係',
                realization: '🚀 自我實現'
            },
            future: {
                vision: '🔮 願景方向',
                method: '🛠️ 實現方式',
                children: '👶 子女宮位',
                prospects: '🌅 晚年展望'
            }
        };
        
        return labels[legionType]?.[key] || key;
    }
    
    displayBattlefieldStats(fiveElements, verification, tstInfo) {
        // 驗證徽章
        const badge = document.getElementById('verification-badge');
        if (badge) {
            badge.textContent = verification.status;
            badge.className = `verification-badge ${verification.status.includes('✅') ? 'success' : 'error'}`;
        }
        
        // 五行圖表
        this.createElementsChart(fiveElements);
        
        // 五行摘要
        const summaryContainer = document.getElementById('elements-summary');
        if (summaryContainer) {
            summaryContainer.innerHTML = '';
            
            fiveElements.stats.forEach(element => {
                const item = document.createElement('div');
                item.className = 'element-summary-item';
                item.innerHTML = `
                    <div class="element-name">${element.name}</div>
                    <div class="element-count">${element.count}</div>
                `;
                summaryContainer.appendChild(item);
            });
        }
        
        // 驗證詳情
        const verificationGrid = document.getElementById('verification-grid');
        if (verificationGrid) {
            if (verification.isTarget) {
                verificationGrid.innerHTML = `
                    <div class="verification-item">
                        <span>預期日柱:</span>
                        <span>${verification.expected.day}</span>
                    </div>
                    <div class="verification-item">
                        <span>實際日柱:</span>
                        <span class="verification-value ${verification.results.day ? 'correct' : 'incorrect'}">${verification.actual.day}</span>
                    </div>
                    <div class="verification-item">
                        <span>預期時柱:</span>
                        <span>${verification.expected.hour}</span>
                    </div>
                    <div class="verification-item">
                        <span>實際時柱:</span>
                        <span class="verification-value ${verification.results.hour ? 'correct' : 'incorrect'}">${verification.actual.hour}</span>
                    </div>
                `;
            } else {
                verificationGrid.innerHTML = '<div class="verification-item">非目標驗證案例</div>';
            }
        }
        
        // TST資訊顯示
        const tstDisplay = document.getElementById('tst-display');
        if (tstDisplay && tstInfo) {
            if (tstInfo.enabled) {
                tstDisplay.classList.remove('hidden');
                const longitudeElement = document.getElementById('longitude-correction');
                if (longitudeElement) {
                    longitudeElement.textContent = `${tstInfo.longitudeCorrection} 分鐘`;
                }
                const equationElement = document.getElementById('equation-time');
                if (equationElement) {
                    equationElement.textContent = `${tstInfo.equationTime} 分鐘`;
                }
            } else {
                tstDisplay.classList.add('hidden');
            }
        }
    }
    
    displaySpirits(spirits) {
        const spiritsGrid = document.getElementById('spirits-grid');
        if (!spiritsGrid) return;
        
        spiritsGrid.innerHTML = '';
        
        spirits.forEach(spirit => {
            const item = document.createElement('div');
            item.className = 'spirit-item';
            item.innerHTML = `
                <div class="spirit-name">${spirit.name}</div>
                <div class="spirit-basis">${spirit.anchorBasis}</div>
                <div class="spirit-reason">${spirit.whyMatched}</div>
            `;
            spiritsGrid.appendChild(item);
        });
    }
    
    displaySystemInfo(meta) {
        const dataSourceElement = document.getElementById('data-source');
        if (dataSourceElement) {
            dataSourceElement.textContent = meta.dataSource;
        }
        
        const calcModeElement = document.getElementById('calc-mode');
        if (calcModeElement) {
            calcModeElement.textContent = meta.calculationMethod;
        }
        
        const effectiveDateElement = document.getElementById('effective-date');
        if (effectiveDateElement) {
            effectiveDateElement.textContent = new Date().toLocaleDateString();
        }
    }
    
    createElementsChart(fiveElements) {
        const ctx = document.getElementById('elements-chart');
        if (!ctx) return;
        
        if (this.elementsChart) {
            this.elementsChart.destroy();
        }
        
        const colors = this.config.chart.colors;
        
        this.elementsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: fiveElements.stats.map(e => e.name),
                datasets: [{
                    data: fiveElements.stats.map(e => e.count),
                    backgroundColor: colors,
                    borderWidth: this.config.chart.borderWidth,
                    borderColor: this.config.chart.borderColor
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const percentage = Math.round((value / fiveElements.total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    showEvidenceChain(pillarType) {
        if (!this.currentResult) return;
        
        const legionTypes = { year: 'family', month: 'growth', day: 'self', hour: 'future' };
        const legionType = legionTypes[pillarType];
        const legion = this.currentResult.legions[legionType];
        
        const modal = document.getElementById('evidence-modal');
        const title = document.getElementById('evidence-title');
        const chain = document.getElementById('evidence-chain');
        
        if (modal && title && chain) {
            title.textContent = `${legion.name} - 證據鏈追蹤`;
            
            chain.innerHTML = `
                <div class="evidence-step">
                    <div class="evidence-title">🎯 計算基準 (Anchor Basis)</div>
                    <div class="evidence-content">EPOCH基準: ${this.config.calculation.epochBase.fullText}</div>
                </div>
                <div class="evidence-step">
                    <div class="evidence-title">📚 算法來源 (API Response)</div>
                    <div class="evidence-content">後端API計算結果，採用專業八字算法</div>
                </div>
                <div class="evidence-step">
                    <div class="evidence-title">🔍 資料溯源 (Data Provenance)</div>
                    <div class="evidence-content">資料來源: ${this.currentResult.meta.dataSource}</div>
                </div>
                <div class="evidence-step">
                    <div class="evidence-title">🎴 卡片系統 v8.2</div>
                    <div class="evidence-content">新增豐富背面內容，修正翻轉效果</div>
                </div>
                <div class="evidence-step">
                    <div class="evidence-title">✅ 最終結果</div>
                    <div class="evidence-content">${legion.name}：${legion.pillar} (${legion.gan}干 + ${legion.zhi}支)</div>
                </div>
            `;
            
            modal.classList.remove('hidden');
        }
    }
    
    hideModal() {
        const modal = document.getElementById('evidence-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    exportToPDF() {
        if (!this.currentResult) return;
        
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // 設置字體
            doc.setFont('helvetica');
            
            // 標題
            doc.setFontSize(20);
            doc.text('虹靈御所 v8.2 - 四軍團八字戰場', 20, 30);
            doc.setFontSize(12);
            doc.text('(卡片翻面修正版)', 20, 40);
            
            // 個人資訊
            doc.setFontSize(14);
            const personal = this.currentResult.personal;
            doc.text(`姓名: ${personal.name}`, 20, 60);
            doc.text(`性別: ${personal.gender === 'male' ? '男' : '女'}`, 20, 75);
            doc.text(`出生: ${personal.birthDate} ${personal.birthTime}`, 20, 90);
            
            // 四柱結果
            doc.setFontSize(16);
            doc.text('四柱結果:', 20, 115);
            
            const pillars = this.currentResult.pillars;
            doc.setFontSize(12);
            doc.text(`年柱: ${pillars.year.pillar}`, 20, 135);
            doc.text(`月柱: ${pillars.month.pillar}`, 20, 150);
            doc.text(`日柱: ${pillars.day.pillar}`, 20, 165);
            doc.text(`時柱: ${pillars.hour.pillar}`, 20, 180);
            
            // 五行統計
            doc.setFontSize(16);
            doc.text('五行統計 (v8.1權重法):', 20, 205);
            
            doc.setFontSize(12);
            let yPos = 225;
            this.currentResult.fiveElements.stats.forEach(element => {
                doc.text(`${element.name}: ${element.count} (${element.percentage}%)`, 20, yPos);
                yPos += 15;
            });
            
            // 系統資訊
            doc.setFontSize(16);
            doc.text('系統資訊:', 120, 115);
            
            doc.setFontSize(12);
            doc.text(`資料來源: ${this.currentResult.meta.dataSource}`, 120, 135);
            doc.text(`API狀態: ${this.currentResult.meta.apiStatus}`, 120, 150);
            doc.text(`神煞數量: ${this.currentResult.spirits.length}個`, 120, 165);
            doc.text(`系統版本: v8.2 (卡片翻面修正)`, 120, 180);
            
            // 驗證結果
            if (this.currentResult.verification.isTarget) {
                doc.text(`驗證狀態: ${this.currentResult.verification.status}`, 120, 195);
                doc.text(`預期日柱: ${this.currentResult.verification.expected.day}`, 120, 210);
                doc.text(`實際日柱: ${this.currentResult.verification.actual.day}`, 120, 225);
            }
            
            // 保存
            const fileName = `${personal.name || '八字分析'}_${personal.birthDate.replace(/-/g, '')}_v8.2.pdf`;
            doc.save(fileName);
            
        } catch (error) {
            console.error('PDF導出失敗:', error);
            alert('PDF導出功能暫時不可用，請稍後再試');
        }
    }
    
    loadTargetTest() {
        const nameElement = document.getElementById('name');
        const genderElement = document.getElementById('gender');
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        const strategyElement = document.querySelector('input[name="ziStrategy"][value="split"]');
        const tstElement = document.getElementById('use-tst');
        
        const defaultUser = this.config.defaults.user;
        const targetCase = this.config.defaults.testCases.target;
        
        if (nameElement) nameElement.value = defaultUser.name;
        if (genderElement) genderElement.value = defaultUser.gender;
        if (dateElement) dateElement.value = targetCase.date;
        if (timeElement) timeElement.value = targetCase.time;
        if (strategyElement) strategyElement.checked = true;
        if (tstElement) tstElement.checked = false;
    }
    
    loadZiTest() {
        const nameElement = document.getElementById('name');
        const genderElement = document.getElementById('gender');
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        const strategyElement = document.querySelector('input[name="ziStrategy"][value="split"]');
        const tstElement = document.getElementById('use-tst');
        
        const ziCase = this.config.defaults.testCases.zi;
        
        if (nameElement) nameElement.value = '子時測試';
        if (genderElement) genderElement.value = 'female';
        if (dateElement) dateElement.value = ziCase.date;
        if (timeElement) timeElement.value = ziCase.time;
        if (strategyElement) strategyElement.checked = true;
        if (tstElement) tstElement.checked = true;
    }
}

// 初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 虹靈御所 v8.2 卡片翻轉系統初始化...');
    new BaziApp();
});