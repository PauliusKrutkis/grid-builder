var tetris = (function($) {
	'use strict';

    var $module, $addWidgetButton, $mainGrid, $savedData, $dialog, $editor, $dialogTabs, mainGridstack, gridOptions,
	removeWidgetHTML, updateImageHTML, removeImageHTML,textBoxInputDataHTML, editWidgetButtonHTML,
	addNestedWidgetButtonHTML, staticGrid, dialogOptions, editorId, editorOpen,

    setVars = function(){
		$module = $('.tetris-module');
		$addWidgetButton = $($module.find('#add-widget').selector);
		staticGrid = ($addWidgetButton.length) ? false : true;

		gridOptions = {
            cellHeight: 80,
            verticalMargin: 10,
            float: true,
            staticGrid: staticGrid,
            resizable: {
                handles: 'e, se, s, sw, w'
            }
        };

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

		$editor = $module.find('.tetris-editor');
        $mainGrid = $module.find('.grid-stack').gridstack(gridOptions);
        mainGridstack = $mainGrid.data('gridstack');
        $savedData = $module.find('.saved-data');
		$dialog = $module.find('#tetris-dialog');
		$dialogTabs = $module.find('#dialogTabs').tabs();
		editorId = 'tetris_wp_editor';
		editorOpen = false;

        removeWidgetHTML = '<button type="button" class="remove-widget" name="button">Remove widget</button>';
        updateImageHTML = '<button type="button" class="update-image" name="button">Add image</button>';
        removeImageHTML = '<button type="button" class="remove-image hidden" name="button">Remove image</button>';
		textBoxInputDataHTML = '<input type="hidden" name="widget-content">';
		editWidgetButtonHTML = '<button type="button" class="edit-widget" name="button">Edit widget</button>';
		addNestedWidgetButtonHTML = '<button type="button" class="add-nested-widget" name="button">Add widget</button>';
    },

    // Bind events

    bindEvents = function(){
        $addWidgetButton.on('click', function(){
            addNewWidget(null, null, 2, 2, true, guid(), null, null, mainGridstack);
        });

        $module.delegate('.remove-widget', 'click', removeWidget);
        $module.delegate('.update-image', 'click', updateImage);
        $module.delegate('.remove-image', 'click', removeImage);
		$module.delegate('.widget-text-content', 'blur', updateWidgetDataContent);
		$module.delegate('.edit-widget', 'click', openEditDialog);

		$module.delegate('.add-nested-widget', 'click', function(){
			if($mainGrid.children().length) addNestedWidget(null, null, 2, 2, true, guid(), null, null, getWidgetId($(this)))
		});

        $mainGrid.on('change', saveGrid);
    },

    // Methods

	addNewWidget = function(x, y, width, height, autoPosition, id, src, content, grid){
        var $el = $($.parseHTML("<div><div class=\"grid-stack-item-content\"><div/>"));
        grid.addWidget($el, x, y, width, height, autoPosition, null, null, null, null, id);
        addContent(id, src, content);
        saveGrid();
    },

	addNestedWidget = function(x, y, width, height, autoPosition, id, src, content, gridId){
		var itemContent = $('div[data-gs-id="'+gridId+'"] .grid-stack-item-content');

		if(!itemContent.find('.grid-stack-nested').length) itemContent.append('<div class="grid-stack"></div>');

		var $newGrid = $('div[data-gs-id="'+gridId+'"] .grid-stack').gridstack(gridOptions);
		var newGridstack = $newGrid.data('gridstack');

		addNewWidget(x, y, width, height, autoPosition, id, src, content, newGridstack);
	},

    removeWidget = function(){
		var widget = $(this).parent().parent()
		var thisGridstack = widget.parent().data('gridstack')
		thisGridstack.removeWidget(widget)
    },

    saveGrid = function(){
        var $mainGridItems = $mainGrid.children();
        var data = _.map($mainGridItems, function(el){
            var $el = $(el);
            var node = $el.data('_gridstack_node');
			var $childGridItems = $el.find('.grid-stack').children();

			if($childGridItems.length){
				var data = _.map($childGridItems, function(el){
					var $el = $(el);
		            var node = $el.data('_gridstack_node');

					return{
		                x: node.x,
		                y: node.y,
		                width: node.width,
		                height: node.height,
						id: $el.attr('data-gs-id'),
		                src: $el.attr('data-gs-src'),
						content: $el.find('input[name="widget-content"]').val(),
		            };
				});
			}

            return{
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
				id: $el.attr('data-gs-id'),
                src: $el.attr('data-gs-src'),
				content: $el.find('input[name="widget-content"]').val(),
				childGrid: data,
            };
        });

        $savedData.val(JSON.stringify(data, null, ''));
    },

    loadGrid = function(){
        if($savedData.val() == '') return;

        mainGridstack.removeAll();
        var data = JSON.parse($savedData.val());
        var items = GridStackUI.Utils.sort(data);

        _.each(items, function(node){
            addNewWidget(node.x, node.y, node.width, node.height, false, node.id, node.src, node.content, mainGridstack);

			if(node.childGrid){
				var gridId = node.id;
				var items = GridStackUI.Utils.sort(node.childGrid);
				_.each(items, function(node){
					addNestedWidget(node.x, node.y, node.width, node.height, false, node.id, node.src, node.content, gridId)
				});
			}
        });
    },

    addContent = function(id, src, content){

		if(!staticGrid){
			if(getWidget(id).parent().hasClass('grid-stack-nested')){
				getWidget(id, true)
					.append(removeWidgetHTML, updateImageHTML, removeImageHTML, editWidgetButtonHTML, textBoxInputDataHTML);
			}else{
				getWidget(id, true)
					.append(removeWidgetHTML, updateImageHTML, removeImageHTML, editWidgetButtonHTML, textBoxInputDataHTML, addNestedWidgetButtonHTML);
			}
		}

        if(src) updateWidgetDataImage(id, src);
		if(content) getWidget(id).find('input[name="widget-content"]').val(content);
    },

    updateImage = function(){
        var id = getWidgetId(this);
        var frame = wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button:{
                text: 'Use this media'
            },
            multiple: false
        });

        frame.on('select', function() {
            var attachment = frame.state().get('selection').first().toJSON();
            updateWidgetDataImage(id, attachment.url);
            saveGrid();
        });

        frame.open();
    },

    removeImage = function(){
        var id = getWidgetId(this);

        getWidget(id).removeAttr('data-gs-src');
        getWidget(id, true).css('background-image', "none");

        changeButtonStatus(id);
        saveGrid();
    },

	openEditDialog = function(){
		var id = getWidgetId(this);
		$dialog.attr('data-widget', id);
		$dialog.dialog(dialogOptions);
	},

	loadEditor = function(id){

		changeEditorLoadStatus();

		$.ajax({
			url : editor.ajax_url,
			type : 'post',
			data : {
				action : 'load_wp_editor',
			},
			success:function(data){
			    $editor.html(data.replace(/\\/g, ""));
				setEditorContent();
				changeEditorLoadStatus();
			}
		});

		return false;
	},

	setEditorContent = function(){
		var content = getWidget(getActiveWidgetDialogId()).find('input[name="widget-content"]').val();
		var editor = tinyMCE.get(editorId);

		if(editor){
			editor.setContent(content);
		}else{
			$('#'+editorId+'').val(content);
		}
	},

	saveWidgetContent = function(id){
		var content;
		var editor = tinyMCE.get(editorId);

		if(editor){
			content = editor.getContent();
		}else{
			content = $('#'+editorId+'').val();
		}

		$('div[data-gs-id="'+id+'"] > .grid-stack-item-content > input[name="widget-content"]').val(content);
		saveGrid();
	},

    // Helpers

	changeEditorLoadStatus = function(){
		$editor.toggle();
		$dialog.find('.spinner').toggleClass('active');
	},

	getActiveWidgetDialogId = function(){
		return $dialog.attr('data-widget');
	},

    updateWidgetDataImage = function(id, src){
        getWidget(id).attr('data-gs-src', src);
        getWidget(id, true).css('background-image', "url("+src+")");
        changeButtonStatus(id, src);
    },

	updateWidgetDataContent = function(){
		var id = getWidgetId(this);
		getWidget(id).find('input[name="widget-content"]').val(getWidget(id).find('textarea').val());
		saveGrid();
	},

    changeButtonStatus = function(id, src){
        if(src){
            getWidget(id, true).children('.update-image').text('Edit image');
        }else{
            getWidget(id, true).children('.update-image').text('Add image');
        }

        getWidget(id, true).children('.remove-image').toggleClass('hidden');
    },

	getWidgetId = function(el){
		return $(el).parent().parent().attr('data-gs-id');
	},

    getWidget = function(id, content){
        if(content){
            return $('div[data-gs-id="'+id+'"] .grid-stack-item-content');
        }else{
            return $('div[data-gs-id="'+id+'"]');
        }
    },

    guid = function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4();
    },

    // Initialize

	ready = function() {
        setVars();

        if(!$module.length) return;

        bindEvents();

		if(!$savedData.length) return;

        loadGrid();
	};

	return{
		ready: ready,
	}

})(jQuery);

jQuery(tetris.ready);
