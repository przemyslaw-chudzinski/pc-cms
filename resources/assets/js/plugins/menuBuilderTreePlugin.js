(function () {

    function getMenuItems() {
        return new Promise(function (resolve, reject) {
            // const data = '[{"id":11,"title":"Another list","http":"","superselect":"2","customSelect":"select something...","children":[{"id":10,"title":"News","http":"","superselect":"1","customSelect":"select something...","__domenu_params":{}},{"id":9,"title":"Categories","http":"","superselect":"1","customSelect":"2","__domenu_params":{}}],"__domenu_params":{}},{"title":"Check","customSelect":"select something...","id":12,"__domenu_params":{}},{"title":"New","customSelect":"select something...","id":13,"__domenu_params":{}}]';
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

    getMenuItems().then(function (data) {
        $('#menuBuilderTree').domenu({
            data: data,
            event: {
                onItemDrop: [onItemDropCallback],
                onItemRemove: [onItemRemovedCallback]
            }
        }).parseJson();
    });

})();