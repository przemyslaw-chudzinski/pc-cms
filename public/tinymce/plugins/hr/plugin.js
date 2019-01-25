(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_bzz7xqbijcgfo3wc = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_3woyj1bjjcgfo3we = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_bzz7xqbijcgfo3wc.register(editor);
    $_3woyj1bjjcgfo3we.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
