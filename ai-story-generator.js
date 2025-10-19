// AI 故事生成模組 - 使用 OpenAI API 生成個性化八字軍團故事

const AI_STORY_CONFIG = {
    API_KEY: 'OPENAI_API_KEY', // 將從環境變量或配置中讀取
    MODEL: 'gpt-4.1-mini',
    MAX_TOKENS: 2000,
    TEMPERATURE: 0.8
};

// 生成 AI 故事的 Prompt
function buildStoryPrompt(baziData) {
    const { four_pillars, ten_gods, spirits, five_elements_stats } = baziData.data;
    
    // 提取納音資訊
    const nayinInfo = [
        { pillar: '年柱', nayin: getNayin(four_pillars.year.stem, four_pillars.year.branch) },
        { pillar: '月柱', nayin: getNayin(four_pillars.month.stem, four_pillars.month.branch) },
        { pillar: '日柱', nayin: getNayin(four_pillars.day.stem, four_pillars.day.branch) },
        { pillar: '時柱', nayin: getNayin(four_pillars.hour.stem, four_pillars.hour.branch) }
    ];
    
    const prompt = `你是一位精通八字命理的軍事策略大師,請根據以下八字資料,以「軍團兵法」的風格,為用戶撰寫一篇生動的命運故事。

## 八字資料

**四柱八字**:
- 年柱: ${four_pillars.year.stem}${four_pillars.year.branch} (${nayinInfo[0].nayin.name} - ${nayinInfo[0].nayin.theme})
- 月柱: ${four_pillars.month.stem}${four_pillars.month.branch} (${nayinInfo[1].nayin.name} - ${nayinInfo[1].nayin.theme})
- 日柱: ${four_pillars.day.stem}${four_pillars.day.branch} (${nayinInfo[2].nayin.name} - ${nayinInfo[2].nayin.theme})
- 時柱: ${four_pillars.hour.stem}${four_pillars.hour.branch} (${nayinInfo[3].nayin.name} - ${nayinInfo[3].nayin.theme})

**十神關係**:
${Object.entries(ten_gods).map(([god, data]) => `- ${god}: ${data.weight.toFixed(1)}分`).join('\n')}

**神煞兵符**:
${spirits.length > 0 ? spirits.map(s => `- ${s.name} (${s.category})`).join('\n') : '- 無特殊神煞'}

**五行平衡**:
${Object.entries(five_elements_stats).map(([element, count]) => `- ${element}: ${count}個`).join('\n')}

## 撰寫要求

1. **風格**: 使用軍事、戰略的比喻,將八字元素比喻為軍團、將領、戰場
2. **結構**: 分為四個部分,對應四個軍團(家族兵團、成長兵團、本我兵團、未來兵團)
3. **長度**: 每個軍團約150-200字,總共600-800字
4. **內容**: 
   - 必須提到具體的天干地支
   - 必須提到納音戰場的意義
   - 必須提到十神關係帶來的影響
   - 必須提到神煞兵符的作用
   - 必須提到五行平衡狀況
5. **語氣**: 激勵、正面、富有詩意,但不失專業
6. **格式**: 使用 Markdown 格式,包含適當的標題和分段

請開始撰寫這個人的軍團傳奇故事。`;

    return prompt;
}

// 調用 OpenAI API 生成故事
async function generateAIStory(baziData) {
    try {
        const prompt = buildStoryPrompt(baziData);
        
        console.log('正在調用 OpenAI API 生成故事...');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_STORY_CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: AI_STORY_CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: '你是一位精通八字命理和軍事策略的大師,擅長用生動的軍事比喻來解讀命運。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: AI_STORY_CONFIG.MAX_TOKENS,
                temperature: AI_STORY_CONFIG.TEMPERATURE
            })
        });
        
        if (!response.ok) {
            throw new Error(`OpenAI API 錯誤: ${response.status}`);
        }
        
        const result = await response.json();
        const story = result.choices[0].message.content;
        
        console.log('AI 故事生成成功');
        return story;
        
    } catch (error) {
        console.error('AI 故事生成失敗:', error);
        // 返回降級故事
        return generateFallbackStory(baziData);
    }
}

// 降級故事(當 AI API 失敗時使用)
function generateFallbackStory(baziData) {
    const { four_pillars } = baziData.data;
    
    return `## 🌟 您的軍團傳奇

在紅塵御所的星空之下,測試用戶的命運軍團正式覺醒...

### 👑 家族兵團傳奇
年柱 **${four_pillars.year.stem}${four_pillars.year.branch}** 統領著家族的根基,這是血脈傳承的力量源泉。

### 🌱 成長兵團
月柱 **${four_pillars.month.stem}${four_pillars.month.branch}** 見證著成長的軌跡,塑造著獨特的能力與性格。

### ⭐ 本我兵團
日柱 **${four_pillars.day.stem}${four_pillars.day.branch}** 是最真實的自我,展現著核心的戰鬥力量。

### 🚀 未來兵團
時柱 **${four_pillars.hour.stem}${four_pillars.hour.branch}** 指向無限可能的未來,預示著發展的方向。

四時軍團在神煞兵符的加持下,形成了完美的戰略平衡。每一個兵團都擁有獨特的使命,為軍團提供獨特的能力加成。

*註: AI 故事生成服務暫時不可用,這是系統自動生成的降級版本。*`;
}

// 打字機效果顯示故事
async function displayStoryWithTypingEffect(story, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 將 Markdown 轉換為 HTML (簡單版本)
    const html = markdownToHtml(story);
    
    // 創建臨時容器來解析 HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // 逐字顯示
    const text = temp.textContent;
    let index = 0;
    
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            container.textContent += text[index];
            index++;
        } else {
            clearInterval(typingInterval);
            // 打字完成後,替換為完整的 HTML 版本
            container.innerHTML = html;
        }
    }, 20); // 每20ms顯示一個字
}

// 簡單的 Markdown 轉 HTML
function markdownToHtml(markdown) {
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// 導出給全局使用
window.generateAIStory = generateAIStory;
window.displayStoryWithTypingEffect = displayStoryWithTypingEffect;

