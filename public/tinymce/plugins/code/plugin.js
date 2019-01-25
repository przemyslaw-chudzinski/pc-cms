(function () {
var code = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(DOMUtils.DOM.getViewPort().h - 200, 500));
  };
  var $_cu3ec590jcgfo3js = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_5hga592jcgfo3ju = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_cu3ec590jcgfo3js.getMinWidth(editor);
    var minHeight = $_cu3ec590jcgfo3js.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_5hga592jcgfo3ju.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_5hga592jcgfo3ju.getContent(editor));
  };
  var $_5a6zbh8zjcgfo3jq = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_5a6zbh8zjcgfo3jq.open(editor);
    });
  };
  var $_7xip5k8yjcgfo3jo = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_5a6zbh8zjcgfo3jq.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_5a6zbh8zjcgfo3jq.open(editor);
      }
    });
  };
  var $_d6bi6393jcgfo3jw = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_7xip5k8yjcgfo3jo.register(editor);
    $_d6bi6393jcgfo3jw.register(editor);
    return {};
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
