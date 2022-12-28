module.exports = () => {
  return async function responseTime(ctx, next) {
    const startDate = new Date();
    await next();
    const time = new Date() - startDate;
    ctx.set('response-time', time);
  };
};
