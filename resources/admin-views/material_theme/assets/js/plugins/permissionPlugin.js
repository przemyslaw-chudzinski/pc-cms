(function () {

    const $permissionCheckbox = $('.pc-cms-permission-checkbox');
    const $permissionsInput = $('.pc-cms-permissions');
    let permissions = {};

    if ($permissionsInput.length) {
        permissions = $permissionsInput.val() !== "" ? JSON.parse($permissionsInput.val()) : {};
    }

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
            const indexToUpdate = modulePermissions.findIndex(function (_permission) {
                return _permission.route === permission.route;
            });
            if (indexToUpdate !== -1) {
                permissions[moduleName].permissions[indexToUpdate] = permission;
            } else {
                permissions[moduleName].permissions.push(permission);
            }

        } else {
            permissions[moduleName] = {};
            permissions[moduleName].permissions = [];
            permissions[moduleName].permissions.push(permission);
        }

        $permissionsInput.val(JSON.stringify(permissions));
    }
    
    function setInitialValues() {
        $permissionCheckbox.each(function (index, checkbox) {
            const $checkbox = $(checkbox);
            for (let moduleName in permissions) {
                if ($checkbox.data('module-name') === moduleName) {
                    if (permissions[moduleName].permissions && permissions[moduleName].permissions.length) {
                        permissions[moduleName].permissions.forEach(function (per) {
                            if ($checkbox.data('route') == per.route && per.allow) {
                                $checkbox.attr('checked', true);
                            }
                        });
                    }
                }
            }
        });
    }

})();