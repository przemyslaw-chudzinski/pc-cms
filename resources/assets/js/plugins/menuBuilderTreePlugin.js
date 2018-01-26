(function () {

    const $menuBuilderTree = $('#menuBuilderTree');

    function getMenuItems() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/menus/1/items',
                method: 'get',
                success: function (response) {
                    resolve(JSON.stringify(response));
                }
            });
        });
    }


    function onItemDropCallback($item) {
        console.log('onItemDropCallback', $item);
    }

    function onItemRemovedCallback($item) {
        console.log('onItemRemovedCallback', $item);
    }

    if ($menuBuilderTree.length) {
        getMenuItems().then(function (data) {
            $menuBuilderTree.domenu({
                data: data,
                event: {
                    onItemDrop: [onItemDropCallback],
                    onItemRemoved: [onItemRemovedCallback]
                }
            }).parseJson();
        });
    }

})();