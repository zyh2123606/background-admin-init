let CURRENT_AUTHORITY: string | string[] = 'NULL'
type CurrentAuthorityType = | string | string[] | (() => typeof CURRENT_AUTHORITY)

const renderAuthorized = <T>(Authorized: T): ((currentAuthority: CurrentAuthorityType) => T) => (currentAuthority: CurrentAuthorityType): T => {
		if (currentAuthority) {
			if (typeof currentAuthority === 'function') {
				CURRENT_AUTHORITY = currentAuthority()
			} else if (
				Object.prototype.toString.call(currentAuthority) === '[object String' ||
				Array.isArray(currentAuthority)
			) {
				CURRENT_AUTHORITY = currentAuthority as string[]
			} else if (typeof currentAuthority === 'string') {
				CURRENT_AUTHORITY = [currentAuthority]
			} else {
				CURRENT_AUTHORITY = 'NULL'
			}
		}
		return Authorized
	}

export { CURRENT_AUTHORITY }
export default <T>(Authorized: T) => renderAuthorized<T>(Authorized)
