(function () {
var autosave = (function () {
  'use strict';

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var LocalStorage = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var fireRestoreDraft = function (editor) {
    return editor.fire('RestoreDraft');
  };
  var fireStoreDraft = function (editor) {
    return editor.fire('StoreDraft');
  };
  var fireRemoveDraft = function (editor) {
    return editor.fire('RemoveDraft');
  };
  var $_5spi218ajcgfo3gv = {
    fireRestoreDraft: fireRestoreDraft,
    fireStoreDraft: fireStoreDraft,
    fireRemoveDraft: fireRemoveDraft
  };

  var parse = function (time, defaultTime) {
    var multiples = {
      s: 1000,
      m: 60000
    };
    time = /^(\d+)([ms]?)$/.exec('' + (time || defaultTime));
    return (time[2] ? multiples[time[2]] : 1) * parseInt(time, 10);
  };
  var $_1kxg2g8cjcgfo3h0 = { parse: parse };

  var shouldAskBeforeUnload = function (editor) {
    return editor.getParam('autosave_ask_before_unload', true);
  };
  var getAutoSavePrefix = function (editor) {
    var prefix = editor.getParam('autosave_prefix', 'tinymce-autosave-{path}{query}{hash}-{id}-');
    prefix = prefix.replace(/\{path\}/g, document.location.pathname);
    prefix = prefix.replace(/\{query\}/g, document.location.search);
    prefix = prefix.replace(/\{hash\}/g, document.location.hash);
    prefix = prefix.replace(/\{id\}/g, editor.id);
    return prefix;
  };
  var shouldRestoreWhenEmpty = function (editor) {
    return editor.getParam('autosave_restore_when_empty', false);
  };
  var getAutoSaveInterval = function (editor) {
    return $_1kxg2g8cjcgfo3h0.parse(editor.settings.autosave_interval, '30s');
  };
  var getAutoSaveRetention = function (editor) {
    return $_1kxg2g8cjcgfo3h0.parse(editor.settings.autosave_retention, '20m');
  };
  var $_84tr5k8bjcgfo3gx = {
    shouldAskBeforeUnload: shouldAskBeforeUnload,
    getAutoSavePrefix: getAutoSavePrefix,
    shouldRestoreWhenEmpty: shouldRestoreWhenEmpty,
    getAutoSaveInterval: getAutoSaveInterval,
    getAutoSaveRetention: getAutoSaveRetention
  };

  var isEmpty = function (editor, html) {
    var forcedRootBlockName = editor.settings.forced_root_block;
    html = Tools.trim(typeof html === 'undefined' ? editor.getBody().innerHTML : html);
    return html === '' || new RegExp('^<' + forcedRootBlockName + '[^>]*>((\xA0|&nbsp;|[ \t]|<br[^>]*>)+?|)</' + forcedRootBlockName + '>|<br>$', 'i').test(html);
  };
  var hasDraft = function (editor) {
    var time = parseInt(LocalStorage.getItem($_84tr5k8bjcgfo3gx.getAutoSavePrefix(editor) + 'time'), 10) || 0;
    if (new Date().getTime() - time > $_84tr5k8bjcgfo3gx.getAutoSaveRetention(editor)) {
      removeDraft(editor, false);
      return false;
    }
    return true;
  };
  var removeDraft = function (editor, fire) {
    var prefix = $_84tr5k8bjcgfo3gx.getAutoSavePrefix(editor);
    LocalStorage.removeItem(prefix + 'draft');
    LocalStorage.removeItem(prefix + 'time');
    if (fire !== false) {
      $_5spi218ajcgfo3gv.fireRemoveDraft(editor);
    }
  };
  var storeDraft = function (editor) {
    var prefix = $_84tr5k8bjcgfo3gx.getAutoSavePrefix(editor);
    if (!isEmpty(editor) && editor.isDirty()) {
      LocalStorage.setItem(prefix + 'draft', editor.getContent({
        format: 'raw',
        no_events: true
      }));
      LocalStorage.setItem(prefix + 'time', new Date().getTime().toString());
      $_5spi218ajcgfo3gv.fireStoreDraft(editor);
    }
  };
  var restoreDraft = function (editor) {
    var prefix = $_84tr5k8bjcgfo3gx.getAutoSavePrefix(editor);
    if (hasDraft(editor)) {
      editor.setContent(LocalStorage.getItem(prefix + 'draft'), { format: 'raw' });
      $_5spi218ajcgfo3gv.fireRestoreDraft(editor);
    }
  };
  var startStoreDraft = function (editor, started) {
    var interval = $_84tr5k8bjcgfo3gx.getAutoSaveInterval(editor);
    if (!started.get()) {
      setInterval(function () {
        if (!editor.removed) {
          storeDraft(editor);
        }
      }, interval);
      started.set(true);
    }
  };
  var restoreLastDraft = function (editor) {
    editor.undoManager.transact(function () {
      restoreDraft(editor);
      removeDraft(editor);
    });
    editor.focus();
  };
  var $_b5v5bv87jcgfo3gr = {
    isEmpty: isEmpty,
    hasDraft: hasDraft,
    removeDraft: removeDraft,
    storeDraft: storeDraft,
    restoreDraft: restoreDraft,
    startStoreDraft: startStoreDraft,
    restoreLastDraft: restoreLastDraft
  };

  var curry = function (f, editor) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      return f.apply(null, [editor].concat(args));
    };
  };
  var get = function (editor) {
    return {
      hasDraft: curry($_b5v5bv87jcgfo3gr.hasDraft, editor),
      storeDraft: curry($_b5v5bv87jcgfo3gr.storeDraft, editor),
      restoreDraft: curry($_b5v5bv87jcgfo3gr.restoreDraft, editor),
      removeDraft: curry($_b5v5bv87jcgfo3gr.removeDraft, editor),
      isEmpty: curry($_b5v5bv87jcgfo3gr.isEmpty, editor)
    };
  };
  var $_3pw0in86jcgfo3go = { get: get };

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  EditorManager._beforeUnloadHandler = function () {
    var msg;
    Tools.each(EditorManager.get(), function (editor) {
      if (editor.plugins.autosave) {
        editor.plugins.autosave.storeDraft();
      }
      if (!msg && editor.isDirty() && $_84tr5k8bjcgfo3gx.shouldAskBeforeUnload(editor)) {
        msg = editor.translate('You have unsaved changes are you sure you want to navigate away?');
      }
    });
    return msg;
  };
  var setup = function (editor) {
    window.onbeforeunload = EditorManager._beforeUnloadHandler;
  };
  var $_dhrcdg8djcgfo3h3 = { setup: setup };

  var postRender = function (editor, started) {
    return function (e) {
      var ctrl = e.control;
      ctrl.disabled(!$_b5v5bv87jcgfo3gr.hasDraft(editor));
      editor.on('StoreDraft RestoreDraft RemoveDraft', function () {
        ctrl.disabled(!$_b5v5bv87jcgfo3gr.hasDraft(editor));
      });
      $_b5v5bv87jcgfo3gr.startStoreDraft(editor, started);
    };
  };
  var register = function (editor, started) {
    editor.addButton('restoredraft', {
      title: 'Restore last draft',
      onclick: function () {
        $_b5v5bv87jcgfo3gr.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started)
    });
    editor.addMenuItem('restoredraft', {
      text: 'Restore last draft',
      onclick: function () {
        $_b5v5bv87jcgfo3gr.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started),
      context: 'file'
    });
  };
  var $_1wubh88fjcgfo3h5 = { register: register };

  PluginManager.add('autosave', function (editor) {
    var started = Cell(false);
    $_dhrcdg8djcgfo3h3.setup(editor);
    $_1wubh88fjcgfo3h5.register(editor, started);
    return $_3pw0in86jcgfo3go.get(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
