export default async(ctx, next) => {
    const title = 'koa2 title',
        content = 'Welcome use Koa2'
    await ctx.render('index', {
        title, content
    })
}
