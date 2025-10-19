#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
添加開場動畫到網頁
"""

def read_file(filepath):
    """讀取檔案內容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """寫入檔案內容"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def add_intro_animation(html_content):
    """添加開場動畫"""
    
    # 找到 <body> 標籤後的位置
    body_start = html_content.find('<body>')
    if body_start == -1:
        raise ValueError("找不到 <body> 標籤")
    
    body_start += len('<body>')
    
    # 開場動畫 HTML 和 CSS
    intro_html = """
    <!-- 開場動畫 -->
    <div id="introOverlay" class="intro-overlay">
        <video id="introVideo" class="intro-video" autoplay muted playsinline>
            <source src="intro.mp4" type="video/mp4">
        </video>
        <button id="skipIntro" class="skip-intro-btn">跳過 ⏭</button>
    </div>

    <style>
        /* 開場動畫樣式 */
        .intro-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

        .intro-overlay.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        .intro-video {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .skip-intro-btn {
            position: absolute;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 25px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 10000;
        }

        .skip-intro-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        /* 隱藏主內容直到動畫結束 */
        body.intro-playing .container {
            opacity: 0;
        }

        body.intro-finished .container {
            opacity: 1;
            animation: fadeInContent 0.8s ease;
        }

        @keyframes fadeInContent {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>

    <script>
        // 開場動畫控制
        (function() {
            const introOverlay = document.getElementById('introOverlay');
            const introVideo = document.getElementById('introVideo');
            const skipBtn = document.getElementById('skipIntro');
            
            // 標記正在播放
            document.body.classList.add('intro-playing');
            
            // 影片結束後自動關閉
            introVideo.addEventListener('ended', function() {
                endIntro();
            });
            
            // 跳過按鈕
            skipBtn.addEventListener('click', function() {
                endIntro();
            });
            
            // 結束開場動畫
            function endIntro() {
                introOverlay.classList.add('fade-out');
                document.body.classList.remove('intro-playing');
                document.body.classList.add('intro-finished');
                
                setTimeout(function() {
                    introOverlay.style.display = 'none';
                }, 500);
            }
            
            // 如果影片載入失敗,自動跳過
            introVideo.addEventListener('error', function() {
                console.error('開場影片載入失敗');
                endIntro();
            });
        })();
    </script>
"""
    
    # 插入開場動畫
    new_content = html_content[:body_start] + intro_html + html_content[body_start:]
    
    return new_content

def main():
    """主函數"""
    print("開始添加開場動畫...")
    
    # 讀取當前檔案
    html_content = read_file('index.html')
    print(f"✓ 讀取 index.html: {len(html_content)} 字元")
    
    # 添加開場動畫
    new_content = add_intro_animation(html_content)
    print(f"✓ 添加開場動畫: {len(new_content)} 字元")
    
    # 寫入新檔案
    write_file('index.html', new_content)
    print("✓ 寫入 index.html 完成")
    
    print("\n✨ 開場動畫添加完成!")
    print("📹 影片時長: 23 秒")
    print("⏭ 提供跳過按鈕")

if __name__ == '__main__':
    main()

