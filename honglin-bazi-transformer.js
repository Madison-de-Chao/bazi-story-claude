/**
 * 虹靈御所 v8.1 - 四時軍團故事轉換器
 * Railway API → 故事版 JSON 標準實作
 * JavaScript 版本
 */

// 角色詞庫與映射表
class HongLingCharacterDict {
  constructor() {
    // 天干主將詞庫
    this.HEAVENLY_STEM_COMMANDERS = {
      '甲': { name: '青龍統帥', rpg_class: '先鋒領袖', buff: ['開創先鋒', '勇往直前'], debuff: ['衝動躁進', '缺乏耐心'] },
      '乙': { name: '花草軍師', rpg_class: '協調者', buff: ['靈活應變', '柔韌生長'], debuff: ['優柔寡斷', '依賴他人'] },
      '丙': { name: '烈日戰將', rpg_class: '激勵者', buff: ['熱情感染', '光明磊落'], debuff: ['急躁暴烈', '過度消耗'] },
      '丁': { name: '燭光法師', rpg_class: '智謀者', buff: ['細緻洞察', '溫暖人心'], debuff: ['敏感脆弱', '力量有限'] },
      '戊': { name: '山岳守護', rpg_class: '防禦者', buff: ['穩定承擔', '厚重可靠'], debuff: ['固執僵化', '行動遲緩'] },
      '己': { name: '大地母親', rpg_class: '養護者', buff: ['包容滋養', '耐心培育'], debuff: ['被動依賴', '缺乏主見'] },
      '庚': { name: '鋼鐵騎士', rpg_class: '執行者', buff: ['果斷行動', '堅硬不屈'], debuff: ['剛硬無情', '缺乏彈性'] },
      '辛': { name: '珠寶工匠', rpg_class: '精煉者', buff: ['精緻品味', '細節完美'], debuff: ['挑剔完美', '脆弱易傷'] },
      '壬': { name: '江河船長', rpg_class: '流動顧問', buff: ['靈活創新', '智慧流動'], debuff: ['善變無定', '難以掌控'] },
      '癸': { name: '甘露賢者', rpg_class: '智慧導師', buff: ['深度思考', '滋潤萬物'], debuff: ['過度內省', '行動不足'] }
    };

    // 地支軍師詞庫
    this.EARTHLY_BRANCH_STRATEGISTS = {
      '子': { name: '機智鼠謀', rpg_class: '敏捷謀士', buff: ['靈活應變', '夜間行動'], debuff: ['狡猾多疑', '貪小便宜'] },
      '丑': { name: '忠誠牛衛', rpg_class: '穩重參謀', buff: ['勤勞耐苦', '後勤補給'], debuff: ['遲疑不決', '固執守舊'] },
      '寅': { name: '森林虎將', rpg_class: '突擊指導', buff: ['勇猛先鋒', '領導魅力'], debuff: ['草率行事', '獨斷專行'] },
      '卯': { name: '春兔使者', rpg_class: '協調專家', buff: ['和諧調解', '敏捷靈動'], debuff: ['缺乏決斷', '過於溫和'] },
      '辰': { name: '龍脈智庫', rpg_class: '戰略分析', buff: ['深度規劃', '變化莫測'], debuff: ['猶豫複雜', '想太多'] },
      '巳': { name: '靈蛇軍師', rpg_class: '洞察專家', buff: ['精準判斷', '冷靜分析'], debuff: ['過度謹慎', '疑心重'] },
      '午': { name: '烈馬先鋒', rpg_class: '衝鋒隊長', buff: ['快速行動', '熱情奔放'], debuff: ['缺乏持久', '衝動魯莽'] },
      '未': { name: '溫羊護衛', rpg_class: '支援專家', buff: ['團隊和諧', '溫柔體貼'], debuff: ['依賴群體', '缺乏主見'] },
      '申': { name: '靈猴參謀', rpg_class: '機動顧問', buff: ['多變策略', '機智靈活'], debuff: ['缺乏專注', '三心二意'] },
      '酉': { name: '金雞報曉', rpg_class: '時機專家', buff: ['精準時機', '一絲不苟'], debuff: ['過度挑剔', '缺乏包容'] },
      '戌': { name: '戰犬統領', rpg_class: '忠誠守護', buff: ['守護堡壘', '忠誠護主'], debuff: ['迂腐頑固', '缺乏變通'] },
      '亥': { name: '智豬賢者', rpg_class: '深謀遠慮', buff: ['包容智慧', '純真善良'], debuff: ['行動遲緩', '容易受騙'] }
    };

    // 十神技能映射
    this.TEN_GODS_SKILLS = {
      '比肩': { name: '堅毅自持', main_skill: '意志鋼鐵', buff: ['自主獨立', '堅持不懈'], debuff: ['競爭內耗', '固執己見'] },
      '劫財': { name: '破局重組', main_skill: '突圍爆發', buff: ['危機突破', '勇於改變'], debuff: ['衝動破壞', '不計後果'] },
      '食神': { name: '福祿綻放', main_skill: '創意恢復', buff: ['療癒創新', '享受生活'], debuff: ['安逸懶散', '缺乏進取'] },
      '傷官': { name: '才華橫溢', main_skill: '表達爆發', buff: ['創造革新', '才華洋溢'], debuff: ['叛逆刻薄', '傷人傷己'] },
      '正財': { name: '穩健經營', main_skill: '資源管理', buff: ['累積財富', '穩定收入'], debuff: ['保守固化', '缺乏冒險'] },
      '偏財': { name: '機會獵手', main_skill: '投機獲利', buff: ['敏銳商機', '靈活應變'], debuff: ['投機冒險', '不夠穩定'] },
      '正官': { name: '秩序之盾', main_skill: '威信建立', buff: ['權威公正', '責任擔當'], debuff: ['僵化守舊', '壓力過大'] },
      '七殺': { name: '破敵先鋒', main_skill: '強勢突破', buff: ['果斷執行', '威嚴震懾'], debuff: ['專制暴力', '壓力沉重'] },
      '正印': { name: '智慧傳承', main_skill: '學識累積', buff: ['知識權威', '庇護支持'], debuff: ['依賴守舊', '缺乏創新'] },
      '偏印': { name: '靈感閃現', main_skill: '直觀洞察', buff: ['創意靈感', '獨特視角'], debuff: ['不切實際', '孤僻怪異'] },
      '日主': { name: '核心本我', main_skill: '自我認知', buff: ['自我覺察', '核心力量'], debuff: ['自我中心', '忽略他人'] }
    };

    // 納音戰場映射
    this.NAYIN_BATTLEFIELDS = {
      '海中金': { scene: '深海遺跡', buff: ['厚積薄發'], debuff: ['行動受阻'], lesson: '耐心等待時機' },
      '爐中火': { scene: '熔鑄工坊', buff: ['精煉淬鍊'], debuff: ['過度集中'], lesson: '專注但不失靈活' },
      '大林木': { scene: '原始森林', buff: ['根深蒂固'], debuff: ['成長緩慢'], lesson: '穩扎穩打的智慧' },
      '路旁土': { scene: '大道通衢', buff: ['承載包容'], debuff: ['被動承受'], lesson: '在承擔中找到價值' },
      '劍鋒金': { scene: '刀山劍海', buff: ['鋒利決斷'], debuff: ['過於鋒利'], lesson: '力量需要適度控制' },
      '山頭火': { scene: '烽火台頂', buff: ['照亮指引'], debuff: ['孤立高處'], lesson: '領導者的孤獨與責任' },
      '澗下水': { scene: '山澗清泉', buff: ['清澈靈動'], debuff: ['力量微小'], lesson: '小而美的影響力' },
      '城頭土': { scene: '堡壘要塞', buff: ['防禦堅固'], debuff: ['缺乏彈性'], lesson: '穩固與靈活的平衡' },
      '白蠟金': { scene: '精工坊室', buff: ['細緻精美'], debuff: ['易受損傷'], lesson: '精緻需要保護' },
      '楊柳木': { scene: '河岸柳蔭', buff: ['柔韌適應'], debuff: ['缺乏主見'], lesson: '在柔軟中保持堅持' },
      '井泉水': { scene: '深井清泉', buff: ['源源不絕'], debuff: ['深藏不露'], lesson: '內在資源的發掘' },
      '屋上土': { scene: '建築屋宇', buff: ['實用穩固'], debuff: ['框架限制'], lesson: '在結構中創造空間' },
      '霹靂火': { scene: '雷電戰場', buff: ['爆發威力'], debuff: ['瞬間消散'], lesson: '把握關鍵時機' },
      '松柏木': { scene: '高山松林', buff: ['堅韌不屈'], debuff: ['孤傲難親'], lesson: '堅持中的溫暖人心' },
      '長流水': { scene: '大江東流', buff: ['持續不斷'], debuff: ['難以控制'], lesson: '在流動中找到方向' },
      '沙中金': { scene: '沙漠寶藏', buff: ['珍貴難得'], debuff: ['隱而不顯'], lesson: '價值需要被發現' },
      '山下火': { scene: '山谷營火', buff: ['溫暖聚集'], debuff: ['範圍有限'], lesson: '小圈子的深度連接' },
      '平地木': { scene: '廣闊平原', buff: ['延展包容'], debuff: ['缺乏特色'], lesson: '在平凡中創造不凡' },
      '壁上土': { scene: '城牆護壁', buff: ['保護屏障'], debuff: ['被動守護'], lesson: '守護的主動價值' },
      '金箔金': { scene: '宮廷華室', buff: ['華麗裝飾'], debuff: ['表面功夫'], lesson: '內在美比外表更重要' },
      '覆燈火': { scene: '室內燈火', buff: ['照亮內在'], debuff: ['光芒有限'], lesson: '內在光明的培養' },
      '天河水': { scene: '銀河星海', buff: ['無垠廣闊'], debuff: ['高而不實'], lesson: '理想與現實的結合' },
      '大驛土': { scene: '驛站大道', buff: ['溝通橋樑'], debuff: ['中介依賴'], lesson: '連接者的價值' },
      '釵釧金': { scene: '珠寶首飾', buff: ['精美裝飾'], debuff: ['依附他人'], lesson: '獨立美麗的重要' },
      '桑柘木': { scene: '桑田農莊', buff: ['實用養蠶'], debuff: ['用途單一'], lesson: '專業深度的價值' },
      '大溪水': { scene: '湍急溪流', buff: ['活力充沛'], debuff: ['變化太快'], lesson: '在變化中保持方向' },
      '沙中土': { scene: '海邊沙灘', buff: ['包容吸收'], debuff: ['結構鬆散'], lesson: '柔軟力量的堅持' },
      '天上火': { scene: '太陽天空', buff: ['普照大地'], debuff: ['高不可攀'], lesson: '大愛需要接地氣' },
      '石榴木': { scene: '果園豐收', buff: ['結實累累'], debuff: ['季節限制'], lesson: '把握豐收的時機' },
      '大海水': { scene: '浩瀚海洋', buff: ['包容萬象'], debuff: ['深不可測'], lesson: '在包容中保持界限' }
    };
  }

  // 獲取天干主將資訊
  getCommander(stem) {
    const base = this.HEAVENLY_STEM_COMMANDERS[stem] || this.HEAVENLY_STEM_COMMANDERS['甲'];
    return {
      code: stem,
      name: base.name,
      rpg_class: base.rpg_class,
      buff: base.buff,
      debuff: base.debuff,
      role_type: 'primary',
      bazi_attr: 'heavenly_stem'
    };
  }

  // 獲取地支軍師資訊
  getStrategist(branch) {
    const base = this.EARTHLY_BRANCH_STRATEGISTS[branch] || this.EARTHLY_BRANCH_STRATEGISTS['子'];
    return {
      code: branch,
      name: base.name,
      rpg_class: base.rpg_class,
      buff: base.buff,
      debuff: base.debuff,
      role_type: 'strategist',
      bazi_attr: 'earthly_branch'
    };
  }

  // 獲取十神技能資訊
  getTenGodSkill(tenGod) {
    return this.TEN_GODS_SKILLS[tenGod] || this.TEN_GODS_SKILLS['比肩'];
  }

  // 獲取納音戰場資訊
  getBattlefield(nayin) {
    const base = this.NAYIN_BATTLEFIELDS[nayin] || {
      scene: '未知戰場',
      buff: ['神秘力量'],
      debuff: ['未知風險'],
      lesson: '探索未知的勇氣'
    };
    
    return {
      nayin: nayin,
      scene: base.scene,
      buff: base.buff,
      debuff: base.debuff,
      lesson: base.lesson
    };
  }
}

// 主轉換器類別
class HongLingBaziTransformer {
  constructor() {
    this.dict = new HongLingCharacterDict();
  }

  // 主轉換函式
  transform(apiData) {
    const legions = this.buildLegions(apiData);
    const skills = this.buildSkillSystem(apiData);
    const battlefield = this.buildBattlefield(apiData);
    const provenance = this.buildProvenance(apiData);

    return {
      legions,
      skills,
      battlefield,
      provenance
    };
  }

  // 建構四軍團
  buildLegions(apiData) {
    const legions = [];
    const pillars = apiData.four_pillars;
    const spirits = apiData.spirits || [];
    const tenGods = apiData.ten_gods || {};

    // 家族兵團 (年柱)
    legions.push({
      type: '家族兵團',
      pillar: { stem: pillars.year.stem, branch: pillars.year.branch },
      commander: this.dict.getCommander(pillars.year.stem),
      strategist: this.dict.getStrategist(pillars.year.branch),
      sigils: this.findSigilsForPillar(spirits, 'year'),
      personality_core: { ten_god: tenGods.year_stem || '未知', highlight: '家族傳承的根基' },
      one_line_advice: this.generateAdvice('家族', pillars.year.stem, pillars.year.branch)
    });

    // 成長兵團 (月柱)
    legions.push({
      type: '成長兵團',
      pillar: { stem: pillars.month.stem, branch: pillars.month.branch },
      commander: this.dict.getCommander(pillars.month.stem),
      strategist: this.dict.getStrategist(pillars.month.branch),
      sigils: this.findSigilsForPillar(spirits, 'month'),
      personality_core: { ten_god: tenGods.month_stem || '未知', highlight: '成長發展的核心策略' },
      one_line_advice: this.generateAdvice('成長', pillars.month.stem, pillars.month.branch)
    });

    // 本我兵團 (日柱)
    legions.push({
      type: '本我兵團',
      pillar: { stem: pillars.day.stem, branch: pillars.day.branch },
      commander: this.dict.getCommander(pillars.day.stem),
      strategist: this.dict.getStrategist(pillars.day.branch),
      sigils: this.findSigilsForPillar(spirits, 'day'),
      personality_core: { ten_god: '日主', highlight: '自我本質的中心軍團' },
      one_line_advice: this.generateAdvice('本我', pillars.day.stem, pillars.day.branch)
    });

    // 未來兵團 (時柱)
    legions.push({
      type: '未來兵團',
      pillar: { stem: pillars.hour.stem, branch: pillars.hour.branch },
      commander: this.dict.getCommander(pillars.hour.stem),
      strategist: this.dict.getStrategist(pillars.hour.branch),
      sigils: this.findSigilsForPillar(spirits, 'hour'),
      personality_core: { ten_god: tenGods.hour_stem || '未知', highlight: '未來願景的前進動力' },
      one_line_advice: this.generateAdvice('未來', pillars.hour.stem, pillars.hour.branch)
    });

    return legions;
  }

  // 建構技能系統
  buildSkillSystem(apiData) {
    const skills = [];
    const tenGods = apiData.ten_gods || {};

    // 處理各柱位的十神技能
    ['year', 'month', 'hour'].forEach(pillar => {
      const tenGodKey = `${pillar}_stem`;
      const tenGodName = tenGods[tenGodKey];
      
      if (tenGodName && tenGodName !== '日主') {
        const skillInfo = this.dict.getTenGodSkill(tenGodName);
        skills.push({
          slot: pillar,
          name: tenGodName,
          main_skill: skillInfo.main_skill,
          buff: skillInfo.buff,
          debuff: skillInfo.debuff
        });
      }
    });

    // 添加日主技能
    const dayTenGod = tenGods.day_stem || '日主';
    const daySkillInfo = this.dict.getTenGodSkill(dayTenGod);
    skills.push({
      slot: 'day',
      name: dayTenGod,
      main_skill: daySkillInfo.main_skill,
      buff: daySkillInfo.buff,
      debuff: daySkillInfo.debuff
    });

    const fiveElements = apiData.five_elements_stats || {};
    
    return {
      ten_gods: skills,
      tuning: {
        strongest: fiveElements.strongest_element || '未知',
        weakest: fiveElements.weakest_element || '未知',
        advice: this.generateTuningAdvice(
          fiveElements.strongest_element,
          fiveElements.weakest_element
        )
      }
    };
  }

  // 建構戰場資訊
  buildBattlefield(apiData) {
    const nayin = apiData.nayin || '未知納音';
    return this.dict.getBattlefield(nayin);
  }

  // 建構來源資訊
  buildProvenance(apiData) {
    return {
      tst: apiData.tst_adjustment_log,
      calc_log: apiData.calculation_log,
      epoch: '1985-09-22 甲子',
      api_source: 'Rainbow Sanctuary Railway API v8.1',
      conversion_time: new Date().toISOString()
    };
  }

  // 輔助函式：找出對應柱位的神煞
  findSigilsForPillar(spirits, pillar) {
    return spirits
      .filter(spirit => {
        const anchor = spirit.anchor_basis || '';
        return anchor.includes(pillar) || anchor.includes('柱');
      })
      .map(spirit => ({
        name: spirit.name,
        category: spirit.category,
        anchor_basis: spirit.anchor_basis,
        why: spirit.why_matched,
        rule_ref: spirit.rule_ref
      }));
  }

  // 輔助函式：生成建議
  generateAdvice(legionType, stem, branch) {
    const adviceTemplates = {
      '家族': `以${stem}的特質整合${branch}的資源，但別被情感牽絆。`,
      '成長': `運用${stem}的主導力，讓${branch}成為你的成長基石。`,
      '本我': `堅持${stem}的核心價值，在${branch}中找到平衡點。`,
      '未來': `將${stem}的願景，通過${branch}的方式落地實現。`
    };
    return adviceTemplates[legionType] || '保持專注，穩步前進。';
  }

  // 輔助函式：生成五行調整建議
  generateTuningAdvice(strongest, weakest) {
    if (!strongest || !weakest) {
      return '保持五行平衡，順應自然規律。';
    }
    return `你的${strongest}最強，${weakest}較弱。建議在生活中適度補充${weakest}元素，平衡${strongest}的過盛。`;
  }
}

// 導出到全域
if (typeof window !== 'undefined') {
  window.HongLingBaziTransformer = HongLingBaziTransformer;
  window.HongLingCharacterDict = HongLingCharacterDict;
}
