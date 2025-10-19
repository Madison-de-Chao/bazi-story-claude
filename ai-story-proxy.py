#!/usr/bin/env python3.11
"""
AI 故事生成代理服務
安全地調用 OpenAI API,不暴露 API Key 給前端
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import openai

# 從環境變量讀取 API Key
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    print("警告: 未找到 OPENAI_API_KEY 環境變量")

# 創建 OpenAI 客戶端
client = openai.OpenAI()

def build_story_prompt(bazi_data):
    """構建故事生成的 Prompt"""
    # 嘗試多種數據格式
    if 'data' in bazi_data:
        data = bazi_data['data']
    else:
        data = bazi_data
    
    four_pillars = data.get('four_pillars', {})
    ten_gods = data.get('ten_gods', {})
    spirits = data.get('spirits', [])
    five_elements = data.get('five_elements_stats', {})
    
    prompt = f"""你是一位精通八字命理的軍事策略大師,請根據以下八字資料,以「軍團兵法」的風格,為用戶撰寫一篇生動的命運故事。

## 八字資料

**四柱八字**:
- 年柱: {four_pillars['year']['stem']}{four_pillars['year']['branch']}
- 月柱: {four_pillars['month']['stem']}{four_pillars['month']['branch']}
- 日柱: {four_pillars['day']['stem']}{four_pillars['day']['branch']}
- 時柱: {four_pillars['hour']['stem']}{four_pillars['hour']['branch']}

**十神關係**: {', '.join([f"{k}: {v.get('weight', 0):.1f}分" for k, v in ten_gods.items()])}

**神煞兵符**: {', '.join([s['name'] for s in spirits]) if spirits else '無特殊神煞'}

**五行平衡**: {', '.join([f"{k}: {v}個" for k, v in five_elements.items()])}

## 撰寫要求

1. **風格**: 使用軍事、戰略的比喻,將八字元素比喻為軍團、將領、戰場
2. **結構**: 分為四個部分,對應四個軍團:
   - 👑 家族兵團 (年柱)
   - 🌱 成長兵團 (月柱)
   - ⭐ 本我兵團 (日柱)
   - 🚀 未來兵團 (時柱)
3. **長度**: 每個軍團約100-150字,總共400-600字
4. **內容**: 
   - 必須提到具體的天干地支
   - 必須提到十神關係帶來的影響
   - 必須提到神煞兵符的作用(如果有)
   - 必須提到五行平衡狀況
5. **語氣**: 激勵、正面、富有詩意,但不失專業
6. **格式**: 使用簡潔的段落,每個軍團一段

請開始撰寫這個人的軍團傳奇故事,直接輸出故事內容,不要有其他說明。"""

    return prompt

def generate_story(bazi_data):
    """調用 OpenAI API 生成故事"""
    try:
        prompt = build_story_prompt(bazi_data)
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": "你是一位精通八字命理和軍事策略的大師,擅長用生動的軍事比喻來解讀命運。"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=2000,
            temperature=0.8
        )
        
        story = response.choices[0].message.content
        return {"success": True, "story": story}
        
    except Exception as e:
        print(f"AI 故事生成失敗: {e}")
        return {"success": False, "error": str(e)}

class StoryProxyHandler(BaseHTTPRequestHandler):
    """處理 AI 故事生成請求"""
    
    def do_OPTIONS(self):
        """處理 CORS 預檢請求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """處理 POST 請求"""
        if self.path == '/generate-story':
            try:
                # 讀取請求數據
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                bazi_data = json.loads(post_data.decode('utf-8'))
                
                # 生成故事
                result = generate_story(bazi_data)
                
                # 返回結果
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": str(e)
                }).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        """自定義日誌格式"""
        print(f"[AI Story Proxy] {format % args}")

def run_server(port=8081):
    """啟動代理服務"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, StoryProxyHandler)
    print(f"AI 故事生成代理服務已啟動,監聽端口 {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()

