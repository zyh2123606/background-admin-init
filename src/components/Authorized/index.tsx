import Authorized from './Authorized'
import check from './CheckPermissions'
import RenderAuthorized from './renderAuthorized'

Authorized.check = check
const renderAuthorized = RenderAuthorized(Authorized)

export default renderAuthorized
