(function () {
var print = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('mcePrint', function () {
      editor.getWin().print();
    });
  };
  var $_2z7hqti1jcgfo4uh = { register: register };

  var register$1 = function (editor) {
    editor.addButton('print', {
      title: 'Print',
      cmd: 'mcePrint'
    });
    editor.addMenuItem('print', {
      text: 'Print',
      cmd: 'mcePrint',
      icon: 'print'
    });
  };
  var $_d65llci2jcgfo4uj = { register: register$1 };

  PluginManager.add('print', function (editor) {
    $_2z7hqti1jcgfo4uh.register(editor);
    $_d65llci2jcgfo4uj.register(editor);
    editor.addShortcut('Meta+P', '', 'mcePrint');
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
