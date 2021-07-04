module.exports = () => {
  return async (ctx, next) => {
    const start = process.hrtime.bigint()
    await next()
    const end = process.hrtime.bigint()
    const ms = Number(end - start) / 10e5
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms} ms`);
  }
}