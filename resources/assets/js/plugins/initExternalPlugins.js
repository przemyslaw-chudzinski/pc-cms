(function () {
    /* TinyMce editor init */
    tinymce.init({
        selector:'.pc-cms-editor',
        plugins: 'code media',
        toolbar: "code undo redo | styleselect | bold italic | link image | alignleft aligncenter alignright alignjustify alignnone | strikethrough blockquote openlink | media",
    });

    /* Select2 init */
    // $('.pc-cms-select2-base').select2({
    //     allowClear: true
    // });

})();