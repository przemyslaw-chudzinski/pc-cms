(function () {

    /* TinyMce editor init */
    if ($('.pc-cms-editor').length) {
        tinymce.init({
            selector:'.pc-cms-editor',
            plugins: 'code filemanager media advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking table contextmenu directionality emoticons paste textcolor responsivefilemanager',
            toolbar1: "code undo redo | styleselect | bold italic | link image filemanager | alignleft aligncenter alignright alignjustify alignnone | strikethrough blockquote openlink | media | bullist numlist outdent indent",
            toolbar2: "| link unlink anchor | forecolor backcolor | print preview | caption",

            image_caption: true,
            image_advtab: true,
            external_filemanager_path:"/filemanager/",
            filemanager_title:"Insert files" ,
            external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},


            visualblocks_default_state: true,
            style_formats_autohide: true,
            style_formats_merge: true,

            relative_urls: false,

            height: '400',

        });
    }

})();