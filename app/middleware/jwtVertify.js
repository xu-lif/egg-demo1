module.exports = secret => {
  return async function jwtVertify(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        console.log('secret', secret);
        const decode = ctx.app.jwt.verify(token, secret);
        ctx.state.user = decode;
        await next();
      } catch (err) {
        ctx.body = {
          code: 401,
          msg: 'token失效',
          err,
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
    }
  };
};
