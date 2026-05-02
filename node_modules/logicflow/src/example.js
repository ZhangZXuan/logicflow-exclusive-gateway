const LogicFlow = require('./LogicFlow');


const LF = new LogicFlow();

LF.register(async (store, ctx) => {
  console.log(1);
  ctx.next();
  console.log(1.1);
});
LF.register(async (store, ctx) => {
  console.log(2);
  ctx.next();
  console.log(2.1);
});
LF.register(async (store, ctx) => {
  console.log(3);
  await ctx.next();
  console.log(3.1);
});

LF.registerErr(async (store, ctx) => {
  console.log(store.error);
  ctx.next();
});

LF.start({
  msg: 'hello world',
});
