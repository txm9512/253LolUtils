class Hero {
  constructor(obj) {
    // 英雄称号
    this.title = obj.title
    // 英雄名字
    this.name = obj.name
    // 英雄技能对象
    this.skill = obj.skill
    // 英雄状态(暂无)
    this.state = obj.state
    // 英雄装备(暂无)
    this.equipment = obj.equipment
    // 英雄法术强度(以后考虑添加到属性对象)
    this.spellPower = obj.spellPower
    // 英雄基础攻击力
    this.attackPower = obj.attackPower
    // 英雄总攻击力
    this.totalAttackPower = this.attackPower
    // 英雄CD缩减
    this.cooldown = obj.cooldown
    // 英雄技能的特殊情况(适用于一些技能伤害触发情况特殊的英雄)
    this.heroExceptionalCase = obj.heroExceptionalCase
    // todo:日后添加成长攻击力,血量,护甲,魔抗等属性
  }
  doSkill() {
    // heroExceptionalCase调用后修改技能属性所以优先调用
    this.heroExceptionalCase()
    // 伤害值总和
    let damageSum = 0
    // 按照技能释放顺序来累加(主要用于兼容连招不同伤害不同的英雄)
    combo.forEach(t=>{
      let skill = this.skill[t]
      // 用于兼容多段伤害的技能,两段伤害不一样也可以用
      for (let i = 0; i < skill.multiple; i++) {
        // skill.damage[第几段][技能等级基础伤害] + this.spellPower(法术强度) * skill.spCoefficient[第几段][技能等级法强加成系数]
        damageSum += skill.damage[i][skill.level - 1] + this.spellPower * skill.spCoefficient[i][skill.level - 1]
        // todo:日后添加攻击力加成系数、血量加成系数等计算公式
        // console.log(this.attackPower * skill.apCoefficient[i][skill.level - 1])
      }
    })
    return damageSum
  }
}
const LeBlanc = new Hero({
  title: '诡术妖姬',
  name: '乐芙兰',
  level: 1,
  spellPower: 0,
  attackPower: 0,
  cooldown: 0,
  skill: {
    q: {
      name: '恶意魔印',
      level: 0,
      multiple: 2,
      damage: [[55, 80, 105, 130, 155], [55, 80, 105, 130, 155]],
      spCoefficient: [[0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4]],
      apCoefficient: [],
      cooldown: [6, 6, 6, 6, 6],
      mana: [50, 60, 70, 80, 90]
    },
    w: {
      name: '魔影迷踪',
      level: 0,
      multiple: 1,
      damage: [[75, 115, 155, 195, 235]],
      spCoefficient: [[0.6, 0.6, 0.6, 0.6, 0.6]],
      apCoefficient: [],
      cooldown: [18, 16, 14, 12, 10],
      mana: [70, 80, 90, 100, 110]
    },
    e: {
      name: '幻影锁链',
      level: 0,
      multiple: 2,
      damage: [[40, 60, 80, 100, 120], [40, 60, 80, 100, 120]],
      spCoefficient: [[0.5, 0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5]],
      apCoefficient: [],
      cooldown: [14, 13.3, 12.5, 11.8, 11],
      mana: [70, 70, 70, 70, 70],
    },
    r: {
      name: '故技重施',
      level: 0,
      multiple: 0,
      damage: [],
      spCoefficient: [],
      apCoefficient: [],
      cooldown: [54, 42, 30],
      mana: [0, 0, 0],
      castQR: function() {
        this.multiple = 2
        this.damage = [[70, 140, 210], [70, 140, 210]]
        this.spCoefficient = [[0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4]],
        this.apCoefficient = []
      },
      castWR: function() {
        this.multiple = 1
        this.damage = [[150, 300, 450]]
        this.spCoefficient = [[0.75, 0.75, 0.75, 0.75, 0.75]]
        this.apCoefficient = []
      },
      castER: function() {
        this.multiple = 2
        this.damage = [[70, 140, 210], [70, 140, 210]]
        this.spCoefficient = [[0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4]]
        this.apCoefficient = []
      }
    },
  },
  equipment: {},
  heroExceptionalCase:function() {
    let i = combo.findIndex(t => t === 'r')
    switch (combo[i - 1]) {
      case 'q':
        this.skill.r.castQR()
        break;
      case 'w':
        this.skill.r.castWR()
        break;
      case 'e':
        this.skill.r.castER()
        break;
    }
  },
  state: {}
})
LeBlanc.skill.q.level++
LeBlanc.skill.w.level++
LeBlanc.skill.e.level++
LeBlanc.skill.w.level++
LeBlanc.skill.w.level++
LeBlanc.skill.r.level++
LeBlanc.spellPower = 200
let combo = ['q', 'w', 'e', 'r']
let damageSum = LeBlanc.doSkill()
console.log(damageSum)
