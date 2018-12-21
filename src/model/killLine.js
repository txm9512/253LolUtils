let yj = {};
yj = {
  level: 1,
  fq: 0,
  cd: 0,
  q: {
    name: 'Q',
    level: 0,
    d: [
      55 + 0.5 * yj.fq,
      90 + 0.5 * yj.fq,
      125 + 0.5 * yj.fq,
      160 + 0.5 * yj.fq,
      195 + 0.5 * yj.fq,
    ],
    cd: [6, 6, 6, 6, 6],
    mp: [50, 60, 70, 80, 90],
    sjcd() {
      return yj.cd / 100 * this.cd[this.level];
    },
    sjd() {
      console.log(this.d);
      return this.d[this.level];
    },
  },
  w: {},
  e: {},
  r: {},
}
yj.cd = 40;
yj.q.level += 1;
yj.fq = 100;
yj.r.qrd = [];
yj.r.sjd = function () {
  const index = yj.jnsx.findIndex(t => t === yj.r);
  switch (yj.jnsx[index - 1]) {
    case yj.q:
      console.log('this is q');
      return 100;
      break;
    case yj.w:
      console.log('this is w');
      return 200;
      break;
    case yj.e:
      console.log('this is e');
      return 300;
      break;
  }
};
yj.jnsx = [yj.q, yj.r];
yj.sjd = () => {
  let sjd = 0;
  yj.jnsx.forEach(item => {
    console.log(item.sjd());
    sjd += item.sjd();
  });
  return sjd;
}
const sjd = yj.sjd()
console.log(sjd);
