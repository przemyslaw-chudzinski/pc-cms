import toastr from "toastr";

(function () {

    const domenuConfig = {
        event: {
            onItemDrop: [updateMenuTree]
        }
    };
    const $menuBuilderTree = $('#menuBuilderTree');
    const domenu = $menuBuilderTree.domenu(domenuConfig);
    const menuId = parseInt($menuBuilderTree.data('menu-id'));

    $menuBuilderTree.find('.item-remove').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        onItemRemovedCallback($(this).closest('li.dd-item'));
    });


    function updateMenuTree($item) {
        $.ajax({
            method: 'put',
            url: `/api/menus/${menuId}/updateTree`,
            data: {
                items: domenu.toJson()
            },
            success: function (response) {
                toastr.success(response.message);
                console.log(response);
            },
            error: function () {
                toastr.error('Failed to update menu tree');
                console.log('Wystąpił błąd podczas aktuazlizacji drzewa');
            }
        });
    }

    function onItemRemovedCallback($item) {
        const itemId = parseInt($item.data('id'));
        let agreement = confirm('Are you sure to remove this item?');
        if (!agreement) {
            return;
        }
        $.ajax({
            url: `/api/menus/${menuId}/items/${itemId}`,
            method: 'delete',
            success: function (response) {
                toastr.success(response.message);
                window.location.reload();
            },
            error: function () {
                toastr.error('Failed to remove menu item');
                console.log('Wystąpił błąd podczas usuwania danych - domenu');
            }
        });
    }

})();