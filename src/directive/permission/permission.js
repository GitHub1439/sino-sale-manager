export default {
    inserted(el, binding) {
        const {value} = binding
        const roles = JSON.parse(sessionStorage.getItem('permissions') || [])

        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value

            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
        }
    }
}
