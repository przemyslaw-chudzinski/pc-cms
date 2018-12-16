/**
 * Permission Plugin
 * Author: Przemysław Chudziński
 */
(function ($) {

    const $permissionCheckbox = $('.pc-cms-permission-checkbox');
    const $permissionsInput = $('.pc-cms-permissions');
    let permissions = $permissionsInput.length ? $permissionsInput.val() !== "" ? JSON.parse($permissionsInput.val()) : {} : null;

    $permissionCheckbox.on('change', setValueOnChange);

    setInitialValues();

    function setValueOnChange(e) {
        e.preventDefault();
        const $checkbox = $(e.target);
        const moduleName = $checkbox.data('module-name');
        const route = $checkbox.data('route');
        const permission = {
            route: route,
            allow: $checkbox.filter(':checked').length > 0
        };
        if (typeof permissions[moduleName] !== 'undefined') {
            const modulePermissions = permissions[moduleName].permissions;
            const indexToUpdate = modulePermissions.findIndex(_permission => _permission.route === permission.route);
            indexToUpdate !== -1 ? permissions[moduleName].permissions[indexToUpdate] = permission : permissions[moduleName].permissions.push(permission);
        } else {
            permissions[moduleName] = {};
            permissions[moduleName].permissions = [];
            permissions[moduleName].permissions.push(permission);
        }
        $permissionsInput.val(JSON.stringify(permissions));
    }
    
    function setInitialValues() {
        $permissionCheckbox.each((index, checkbox) => {
            const $checkbox = $(checkbox);
            for (let moduleName in permissions) {
                $checkbox.data('module-name') === moduleName ? permissions[moduleName].permissions && permissions[moduleName].permissions.length ?
                    permissions[moduleName].permissions.forEach(per => $checkbox.data('route') == per.route && per.allow ? $checkbox.attr('checked', true) : null)
                    : null : null;
            }
        });
    }

})(jQuery);