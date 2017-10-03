

export const menuItems = [
  {
    parent: "weapon", children: [
      { key: "dagger", name: "匕首" }, { key: "sword", name: "单手剑" }, { key: "tohandsword", name: "双手剑" }, { key: "edoryu", name: "双刀" },
      { key: "spear", name: "矛" }, { key: "singlespear", name: "单手矛" }, { key: "staff", name: "魔杖" }, { key: "blunt", name: "钝器" },
      { key: "tohandstaff", name: "双手魔杖" }, { key: "tohandblunt", name: "双手钝器" }, { key: "claw", name: "钢爪" }, { key: "bow", name: "弓" },
      { key: "singlebow", name: "单手弓" }, { key: "gauntlet", name: "铁手甲" }, { key: "kiringku", name: "奇古兽" }, { key: "chainsword", name: "锁链剑" }, { key: "sting", name: "飞刀" }, { key: "arrow", name: "弓箭" }
    ]
  },
  {
    parent: "armor", children: [
      { key: "cloak", name: "斗篷" }, { key: "T", name: "T恤" }, { key: "armor", name: "盔甲" }, { key: "glove", name: "手套" },
      { key: "boots", name: "靴子" }, { key: "shield", name: "盾牌" }, { key: "amulet", name: "项链" }, { key: "ring", name: "指环" },
      { key: "belt", name: "腰带" }, { key: "helm", name: "帽子" }, { key: "earring", name: "耳环" }, { key: "guarder", name: "臂甲" },
    ]
  },
  {
    parent: "etcitem", children: [
      { key: "light", name: "照明" }, { key: "wand", name: "魔术棒" }, { key: "potion", name: "药水" }, { key: "treasure_box", name: "宝箱" },
      { key: "gem", name: "宝石" }, { key: "food", name: "食物" }, { key: "scroll", name: "卷轴" }, { key: "totem", name: "图腾" },
      { key: "firecracker", name: "烟火" }, { key: "material", name: "材料" }, { key: "questitem", name: "任务道具" }, { key: "event", name: "活动道具" },
      { key: "petitem", name: "宠物装备" }, { key: "spellbook", name: "技能书" }, { key: "magic_doll", name: "魔法娃娃" }, { key: "other", name: "其他" }
    ]
  },
  { parent: "armor_set", children: [{}] },
  { parent: "npc", children: [{ key: "monster", name: "怪物" }] },
]
export const weaponDetail = {
  ex: {
    dmg_large: '最大攻击',
    dmg_small: '最小攻击',
  },
  show: {
    // weight: '重量',
    add_cha: '魅力值',//+ -
    add_con: '体质',//+- 
    add_dex: '敏捷',//+-
    add_hp: '血量',//+-
    add_hpr: '血量恢复',//+-
    add_int: '智力',//+-
    add_mp: '蓝量',//+-
    add_mpr: '蓝量恢复',//+-
    add_sp: '魔攻',//+-
    add_str: '力量',//+-
    add_wis: '精神',//+-
    dmgmodifier: '额外攻击',//+-
    double_dmg_chance: '暴击率',//：
    haste_item: '永久加速效果',//判断1显示
    hitmodifier: '攻击成功',//+-
    magicdmgmodifier: '魔法暴击',//+-
    // material: '材质',
    max_lvl: '最大等级',//:
    min_lvl: '最小等级',//:
    weight_reduction: '增加负重',
    damage_reduction: '伤害减免',
    hit_modifier: '攻击成功',
    dmg_modifier: '额外攻击点数',
    bow_hit_modifier: '弓的命中率',
    bow_dmg_modifier: '弓打击值',
    max_use_time: '使用期限',
    delay_effect: '使用间隔',
    defense_water: '水属性防御',
    defense_wind: '风属性防御',
    defense_earth: '土属性防御',
    defense_fire: '火属性防御',
    regist_stun: '昏迷耐性',
    regist_stone: '石化耐性',
    regist_sleep: '睡眠耐性',
    regist_freeze: '寒冰耐性',
    regist_sustain: '支撑耐性',
    regist_blind: '致盲耐性',
    grade: '强度',
    food_volume: '饱食度',         //(3为特 2为低 1为中 0为高 -1不显示)
    hpr: '血量恢复',
    mpr: '蓝量恢复',
    mr: '魔法防御',
    sp: '魔攻',
    str: '力量',
    con: '体质',
    dex: '敏捷',
    intl: '智力',
    wis: '精神',
    cha: '魅力',
    ac: '防御',
    m_def: '魔法防御',
    // hpr: '血量恢复',
    // hpr_time: '每分钟',//
    // mpr: '蓝量回复',
    // mpr_time: '每分钟',

    dmg: '5',//额外伤害
    // dmg_chance: "2",//概率打出额外伤害，如果0 100

    dmg_reduction: "6",
    // dmg_reduction_chance: "20",

    effect: '8',
    // effect_chance: '8',
    exp: '',
    // exp_chance: '8',
    maxhp: '最大血量',
    maxmp: '最大蓝量',
    hit: '攻击成功',//攻击成功
    bow_hit: "弓的命中率",
    bow_dmg: "弓的打击值",
    dmg_evasion_chance: "回避概率",//回避概率
    weight_reduction: "负重增加",

    // mr: '6',
    // sp: '6',
    str: '力量',
    con: '体质',
    dex: '敏捷',
    int: '智力',
    wis: '精神',
    // cha: '8',
    water: '水属性防御',
    fire: '火属性防御',
    wind: '风属性防御',
    earth: '土属性防御',
    regist_stun: '昏迷耐性',
    regist_stone: '石化抗性',
    regist_sleep: '昏睡抗性',
    regist_freeze: '混乱抗性',
    regist_sustain: '支撑抗性',
    regist_blind: '致盲抗性',
    makename: '每10分钟奖励物品',
  },

  orNot: {
    canbedmg: '损坏',
    cant_delete: '删除',
    trade: '交易',
    stackable: '堆叠',
    can_seal: '封印',
    polyid: '变身',
  },
  whoUse: {
    use_knight: '骑士',
    use_elf: '精灵',
    use_mage: '法师',
    use_royal: '王族',
    use_darkelf: '黑暗精灵',
    use_dragonknight: '龙骑',
    use_illusionist: '幻术师',
  },
  npc: {
    // "ac": "防御",
    "mr": "魔抗",//抗魔
    "hp": "血量",
    "mp": "蓝量",
    "str": "力量",
    "dex": "敏捷",
    "con": "体质",
    "intel": "智力",
    "wis": "精神",
  },
  npcEx: {
    "agrocoi": "看穿隐身",//看穿隐身
    "agrososc": "看穿变身",//看穿变身
    "tamble": "可以迷魅"
  }
}