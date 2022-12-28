module.exports = () => {
  return async function responseData(ctx, next) {
    next();
    console.log('ctx.body', ctx);
    ctx.body = {
      code: ctx.response.body.code || 0,
      data: ctx.response.body.data,
      msg: ctx.response.body.msg || 'ok',
    };
  };
};
