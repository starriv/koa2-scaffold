import Router from 'koa-router'
import indexCtl from '../controllers/index'

const router = Router()

router.get('/', indexCtl)

export default router