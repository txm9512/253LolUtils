class Hero {
  constructor(obj) {
    this.title = obj.title
    this.name = obj.name
    this.skill = obj.skill
    this.state = obj.state
    this.spellPower = obj.spellPower
    this.heroExceptionalCase = obj.heroExceptionalCase
  }
  doSkill() {
    this.heroExceptionalCase()
    let damageSum = 0
    lzsx.forEach(t=>{
      let skill = this.skill[t]
      damageSum += skill.damage[skill.level - 1] + this.spellPower * skill.coefficient
    })
    return damageSum
  }
}
const LeBlanc = new Hero({
  title: '诡术妖姬',
  name: '乐芙兰',
  level: 1,
  spellPower: 0,
  skill: {
    q: {
      name: '恶意魔印',
      level: 0,
      damage: [55, 80, 105, 130, 155],
      coefficient: 0.4,
      damage2: [55, 80, 105, 130, 155],
      coefficient2: 0.4,
      cooldown: 6,
      mana: [50, 60, 70, 80, 90]
    },
    w: {
      name: '魔影迷踪',
      level: 0,
      damage: [75, 115, 155, 195, 235],
      coefficient: 0.6,
      cooldown: [18, 16, 14, 12, 10],
      mana: [70, 80, 90, 100, 110]
    },
    e: {
      name: '幻影锁链',
      level: 0,
      damage: [40, 60, 80, 100, 120],
      coefficient: 0.5,
      damage2: [40, 60, 80, 100, 120],
      coefficient2: 0.5,
      cooldown: [14, 13.3, 12.5, 11.8, 11],
      mana: 70,
    },
    r: {
      name: '故技重施',
      level: 0,
      damage: [],
      coefficient: 0,
      cooldown: [54, 42, 30],
      mana: 0,
      castQR: function() {
        this.damage = [70, 140, 210]
        this.coefficient = 0.4
        this.damage2 = [70, 140, 210]
        this.coefficient2 = 0.4
      },
      castWR: function() {
        this.damage = [150, 300, 450]
        this.coefficient = 0.75
      },
      castER: function() {
        this.damage = [70, 140, 210]
        this.coefficient = 0.4
        this.damage2 = [70, 140, 210]
        this.coefficient2 = 0.4
      }
    },
  },
  heroExceptionalCase:function() {
    let i = lzsx.findIndex(t => t === 'r')
    switch (lzsx[i - 1]) {
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
let lzsx = ['q', 'w', 'e', 'r']
let damageSum = LeBlanc.doSkill()
console.log(damageSum)