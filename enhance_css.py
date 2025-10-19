#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
精確替換 CSS 樣式,保留所有 JavaScript 邏輯
"""

def read_file(filepath):
    """讀取檔案內容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """寫入檔案內容"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def enhance_css(original_content):
    """增強 CSS 樣式,保留所有其他內容"""
    
    # 找到 <style> 和 </style> 的位置
    style_start = original_content.find('<style>')
    style_end = original_content.find('</style>') + len('</style>')
    
    if style_start == -1 or style_end == -1:
        raise ValueError("找不到 <style> 標籤")
    
    # 提取前後部分
    before_style = original_content[:style_start]
    after_style = original_content[style_end:]
    
    # 新的增強 CSS
    enhanced_css = """<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Microsoft JhengHei', sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
            background-size: 400% 400%;
            animation: gradientFlow 15s ease infinite;
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }

        @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        /* 增強星空背景動畫 */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite, float 6s ease-in-out infinite;
        }

        .star.small {
            width: 2px;
            height: 2px;
        }

        .star.medium {
            width: 3px;
            height: 3px;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }

        .star.large {
            width: 4px;
            height: 4px;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px 0;
        }

        .title {
            font-size: 3rem;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffd700, #ff6b6b);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            animation: rainbowFlow 5s linear infinite, glow 2s ease-in-out infinite;
        }

        @keyframes rainbowFlow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
        }

        @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)); }
        }

        .subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            margin-bottom: 10px;
            animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }

        .version {
            font-size: 1rem;
            opacity: 0.7;
            color: #4ecdc4;
        }

        /* 表單樣式增強 */
        .form-section {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(78, 205, 196, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        .form-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(78, 205, 196, 0.2);
        }

        .form-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: #4ecdc4;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-label {
            font-size: 1rem;
            margin-bottom: 8px;
            color: #ffd700;
            font-weight: 500;
        }

        .form-input, .form-select {
            padding: 12px 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: #4ecdc4;
            box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
            transform: translateY(-2px);
        }

        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        .gender-options {
            display: flex;
            gap: 15px;
        }

        .gender-option {
            flex: 1;
            padding: 12px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s ease;
        }

        .gender-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
        }

        .gender-option.selected {
            border-color: #4ecdc4;
            background: rgba(78, 205, 196, 0.3);
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }

        .midnight-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .midnight-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .midnight-option:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
        }

        .midnight-option.selected {
            border-color: #4ecdc4;
            background: rgba(78, 205, 196, 0.3);
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }

        .midnight-option input[type="radio"] {
            margin: 0;
        }

        .midnight-description {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-top: 5px;
        }

        .submit-button {
            width: 100%;
            padding: 18px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            background-size: 200% auto;
            border: none;
            border-radius: 15px;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            position: relative;
            overflow: hidden;
            animation: buttonPulse 2s ease-in-out infinite;
        }

        .submit-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }

        .submit-button:hover::before {
            left: 100%;
        }

        .submit-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
            background-position: right center;
        }

        @keyframes buttonPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            animation: none;
        }

        /* 載入動畫增強 */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.95));
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .loading-content {
            text-align: center;
            color: white;
        }

        .loading-spinner {
            width: 80px;
            height: 80px;
            border: 4px solid transparent;
            border-top: 4px solid #4ecdc4;
            border-right: 4px solid #ff6b6b;
            border-bottom: 4px solid #ffd700;
            border-left: 4px solid #45b7d1;
            border-radius: 50%;
            animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
            margin: 0 auto 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }

        .loading-text {
            font-size: 1.5rem;
            margin-bottom: 10px;
            animation: glow 2s ease-in-out infinite;
        }

        .loading-subtext {
            font-size: 1rem;
            opacity: 0.8;
        }

        /* 結果展示 */
        .result-section {
            display: none;
            margin-top: 30px;
        }

        .result-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .result-title {
            font-size: 2rem;
            color: #ffd700;
            margin-bottom: 10px;
            animation: glow 2s ease-in-out infinite;
        }

        .result-subtitle {
            font-size: 1.1rem;
            opacity: 0.8;
        }

        /* 標籤頁系統增強 */
        .tabs-container {
            margin-bottom: 30px;
        }

        .tabs-nav {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .tab-button {
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            position: relative;
            overflow: hidden;
        }

        .tab-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(78, 205, 196, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }

        .tab-button:hover::before {
            width: 100%;
            height: 100%;
        }

        .tab-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
        }

        .tab-button.active {
            background: rgba(78, 205, 196, 0.3);
            border-color: #4ecdc4;
            color: #4ecdc4;
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.5s ease-in;
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* 傳統命盤增強 */
        .traditional-chart {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(78, 205, 196, 0.2);
        }

        .chart-title {
            text-align: center;
            font-size: 1.5rem;
            color: #ffd700;
            margin-bottom: 20px;
        }

        .pillars-display {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .pillar-column {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            transition: all 0.3s ease;
            animation: slideInUp 0.5s ease-out;
            animation-fill-mode: both;
        }

        .pillar-column:nth-child(1) { animation-delay: 0.1s; }
        .pillar-column:nth-child(2) { animation-delay: 0.2s; }
        .pillar-column:nth-child(3) { animation-delay: 0.3s; }
        .pillar-column:nth-child(4) { animation-delay: 0.4s; }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .pillar-column:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(78, 205, 196, 0.3);
            border: 1px solid rgba(78, 205, 196, 0.5);
        }

        .pillar-header {
            font-size: 1rem;
            color: #4ecdc4;
            margin-bottom: 10px;
        }

        .pillar-stem {
            font-size: 2rem;
            font-weight: bold;
            color: #ffd700;
            margin-bottom: 5px;
            animation: glow 3s ease-in-out infinite;
        }

        .pillar-branch {
            font-size: 2rem;
            font-weight: bold;
            color: #ff6b6b;
            animation: glow 3s ease-in-out infinite 0.5s;
        }

        .pillar-nayin {
            font-size: 0.9rem;
            color: #45b7d1;
            margin-top: 10px;
            opacity: 0.9;
        }

        .pillar-shishen {
            font-size: 0.9rem;
            color: #4ecdc4;
            margin-top: 5px;
            opacity: 0.9;
        }

        .elements-display {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-top: 20px;
        }

        .element-item {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px 10px;
            transition: all 0.3s ease;
            animation: slideInUp 0.5s ease-out;
            animation-fill-mode: both;
        }

        .element-item:nth-child(1) { animation-delay: 0.5s; }
        .element-item:nth-child(2) { animation-delay: 0.6s; }
        .element-item:nth-child(3) { animation-delay: 0.7s; }
        .element-item:nth-child(4) { animation-delay: 0.8s; }
        .element-item:nth-child(5) { animation-delay: 0.9s; }

        .element-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .element-name {
            font-size: 1.1rem;
            font-weight: bold;
            color: #ffd700;
            margin-bottom: 5px;
        }

        .element-count {
            font-size: 1.5rem;
            color: #4ecdc4;
            animation: pulse 2s ease-in-out infinite;
        }

        /* 軍團卡片增強 - 保留原有結構 */
        .legions-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .legion-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            animation: slideInUp 0.6s ease-out;
            animation-fill-mode: both;
        }

        .legion-card:nth-child(1) { 
            animation-delay: 0.2s;
            border-color: rgba(255, 215, 0, 0.5);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        }
        .legion-card:nth-child(2) { 
            animation-delay: 0.4s;
            border-color: rgba(76, 175, 80, 0.5);
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.2);
        }
        .legion-card:nth-child(3) { 
            animation-delay: 0.6s;
            border-color: rgba(33, 150, 243, 0.5);
            box-shadow: 0 0 20px rgba(33, 150, 243, 0.2);
        }
        .legion-card:nth-child(4) { 
            animation-delay: 0.8s;
            border-color: rgba(244, 67, 54, 0.5);
            box-shadow: 0 0 20px rgba(244, 67, 54, 0.2);
        }

        .legion-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(78, 205, 196, 0.3);
        }

        .legion-header {
            text-align: center;
            margin-bottom: 15px;
        }

        .legion-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .legion-name {
            font-size: 1.3rem;
            font-weight: bold;
            color: #ffd700;
            margin-bottom: 5px;
        }

        .legion-description {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .legion-characters {
            margin: 15px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .character-role {
            margin-bottom: 10px;
        }

        .role-label {
            font-size: 0.9rem;
            color: #4ecdc4;
            margin-bottom: 5px;
        }

        .role-name {
            font-size: 1.1rem;
            font-weight: bold;
            color: white;
        }

        .role-class {
            font-size: 0.9rem;
            color: #45b7d1;
            font-style: italic;
        }

        .legion-battlefield {
            text-align: center;
            padding: 10px;
            background: rgba(255, 107, 107, 0.2);
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .battlefield-label {
            font-size: 0.8rem;
            color: #ff6b6b;
            margin-bottom: 5px;
        }

        .battlefield-name {
            font-size: 1.1rem;
            font-weight: bold;
            color: #ffd700;
        }

        .legion-advantages {
            margin-bottom: 15px;
        }

        .advantages-title {
            font-size: 0.9rem;
            color: #4ecdc4;
            margin-bottom: 8px;
        }

        .advantages-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .advantage-tag {
            padding: 5px 10px;
            background: rgba(76, 175, 80, 0.3);
            border-radius: 15px;
            font-size: 0.85rem;
            color: #4caf50;
            border: 1px solid rgba(76, 175, 80, 0.5);
        }

        .legion-talismans {
            margin-top: 15px;
        }

        .talismans-title {
            font-size: 0.9rem;
            color: #ffd700;
            margin-bottom: 8px;
        }

        .talismans-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .talisman-tag {
            padding: 5px 10px;
            background: rgba(255, 215, 0, 0.2);
            border-radius: 15px;
            font-size: 0.85rem;
            color: #ffd700;
            border: 1px solid rgba(255, 215, 0, 0.5);
            animation: float 3s ease-in-out infinite;
            transition: all 0.3s ease;
        }

        .talisman-tag:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.5);
        }

        /* 日誌系統增強 */
        .log-container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(10px);
            max-height: 500px;
            overflow-y: auto;
        }

        .log-item {
            padding: 12px;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border-left: 3px solid #4ecdc4;
            transition: all 0.3s ease;
            animation: slideInLeft 0.5s ease-out;
            animation-fill-mode: both;
        }

        .log-item:nth-child(1) { animation-delay: 0.1s; }
        .log-item:nth-child(2) { animation-delay: 0.2s; }
        .log-item:nth-child(3) { animation-delay: 0.3s; }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .log-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }

        .log-item.info {
            border-left-color: #45b7d1;
        }

        .log-item.warning {
            border-left-color: #ffd700;
        }

        .log-label {
            font-size: 0.85rem;
            color: #4ecdc4;
            margin-bottom: 5px;
        }

        .log-value {
            font-size: 0.95rem;
            color: white;
        }

        /* AI故事區域 */
        .story-container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
            line-height: 1.8;
        }

        .story-container p {
            margin-bottom: 15px;
        }

        .story-container strong {
            color: #ffd700;
        }

        /* 重置按鈕 */
        .reset-button {
            width: 100%;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }

        .reset-button:hover {
            background: rgba(255, 107, 107, 0.3);
            border-color: #ff6b6b;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
        }

        /* 響應式設計 */
        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }

            .pillars-display {
                grid-template-columns: repeat(2, 1fr);
            }

            .elements-display {
                grid-template-columns: repeat(2, 1fr);
            }

            .legions-container {
                grid-template-columns: 1fr;
            }
        }
    </style>"""
    
    # 組合新內容
    new_content = before_style + enhanced_css + after_style
    
    return new_content

def main():
    """主函數"""
    print("開始增強 CSS 樣式...")
    
    # 讀取原始檔案
    original_content = read_file('index.html.original')
    print(f"✓ 讀取原始檔案: {len(original_content)} 字元")
    
    # 增強 CSS
    enhanced_content = enhance_css(original_content)
    print(f"✓ CSS 增強完成: {len(enhanced_content)} 字元")
    
    # 寫入新檔案
    write_file('index.html', enhanced_content)
    print("✓ 寫入新檔案完成")
    
    print("\n✨ CSS 美化完成!所有 JavaScript 邏輯已保留。")

if __name__ == '__main__':
    main()

