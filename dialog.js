var dialog = (function($) {
    'use strict';

    var dialogOptions, editorOpen, editorId, $editor, $module, $dialogTabs,

    setVars = function(){
        $module = $('#tetris-dialog');
        $editor = $module.find('.tetris-editor');
        $dialogTabs = $module.find('#dialogTabs').tabs();
        editorOpen = false;
        editorId = 'tetris_wp_editor';

        dialogOptions = {
			minWidth: 600,
			minHeight: 600,
			closeOnEscape: true,
			dialogClass: "tetris-dialog",
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					saveWidgetContent(getActiveWidgetDialogId());
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			},
			open: function(){
				if(!editorOpen){
					loadEditor();
					editorOpen = true;
				}else{
					setEditorContent();
				}
			},
    	};
    },

    // Bind events

    bindEvents = function(){
        events.on('editWidget', openEditDialog)
    },

    // Methods

    openEditDialog = function(id){
		$module.attr('data-widget', id);
		$module.dialog(dialogOptions);
	},

    loadEditor = function(){

		changeEditorLoadStatus();

		$.ajax({
			url : editor.ajax_url,
			type : 'post',
			data : {
				action : 'load_wp_editor',
			},
			success:function(response){
			    $editor.html(response.replace(/\\/g, ""));
				setEditorContent();
				changeEditorLoadStatus();
			}
		});

		return false;
	},

    setEditorContent = function(){
        var content = tetris.getWidget(getActiveWidgetDialogId()).find('input[name="widget-content"]').val();
		var editor = tinyMCE.get(editorId);

		if(editor){
			editor.setContent(content);
		}else{
			$('#'+editorId).val(content);
		}
	},

    saveWidgetContent = function(id){
		var content;
		var editor = tinyMCE.get(editorId);

		if(editor){
			content = editor.getContent();
		}else{
			content = $('#'+editorId).val();
		}

		$('div[data-gs-id="'+id+'"] > .grid-stack-item-content > input[name="widget-content"]').val(content);
		events.emit('gridChanged');
	},

    // Helpers

	changeEditorLoadStatus = function(){
		$editor.toggle();
		$module.find('.spinner').toggleClass('active');
	},

    getActiveWidgetDialogId = function(){
        return $module.attr('data-widget');
    },

    // Initialize

    ready = function() {
        setVars();
        bindEvents();
	};

	return{
		ready: ready,
	}

})(jQuery);

jQuery(dialog.ready);
