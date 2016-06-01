jQuery(document).ready(function($){
    var options = {
        cellHeight: 80,
        verticalMargin: 10,
        //float: true, // experimental
        resizable: {
            handles: 'e, se, s, sw, w'
        }
    };

    var gridClass = $('.grid-stack');

    gridClass.gridstack(options);

    new function (){

        if(!$('.grid-stack').length) return;

        this.grid = $('.grid-stack').data('gridstack');

        saveGrid = function () {
            this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    id: el.attr('data-gs-id'),
                    src: el.attr('data-gs-src'),
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height
                };
            }, this);
            $('#saved-data').val(JSON.stringify(this.serializedData, null, ''));
            return false;
        }

        this.loadGrid = function () {
            if($('#saved-data').val() == '') return;
            this.grid.removeAll();
            this.gridData = JSON.parse($('#saved-data').val());
            var items = GridStackUI.Utils.sort(this.gridData);

            _.each(items, function (node){
                // Remaking the grid
                var el = $.parseHTML("<div><div class=\"grid-stack-item-content\"><div/>");
                $(el).attr("data-gs-src", node.src);
                this.grid.addWidget(el, node.x, node.y, node.width, node.height, false, null, null, null, null, node.id);

                addContent(node.id, node.src);
            }, this);

            return false;
        }.bind(this);

        this.addWidget = function(){

            // Refractor the id part so it is incremented each time
            var id = getRandomInt(1111,9999);

            var el = $.parseHTML("<div><div class=\"grid-stack-item-content\"><div/>");

            // The position, size of the block is defined in the addWidget function (x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id)
            this.grid.addWidget(el, 0, 0, 2, 2, true, null, null, null, null, id);

            addContent(id);

            return false;
        }.bind(this);

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function addContent(id, src){
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content').append('<button type="button" class="remove-widget" name="button">Remove widget</button>');
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content').append('<button type="button" class="add-image" name="button">Add image</button>');
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content').append('<button type="button" class="remove-image hidden" name="button">Remove image</button>');

            if(src){
                $('div[data-gs-id="'+id+'"] .grid-stack-item-content').css('background-image', "url("+src+")");

                // Change add image button to edit image here
                imageAdded(id);
            }

        }

        // Maybe refractor imageAdded, imageRemoved functions to a single function

        function imageAdded(id){
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content .add-image').text('Edit image');
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content .remove-image').toggleClass('hidden');
        }

        function imageRemoved(id){
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content .add-image').text('Add image');
            $('div[data-gs-id="'+id+'"] .grid-stack-item-content .remove-image').toggleClass('hidden');
        }

        gridClass.on('change', saveGrid);

        $('#add-widget').click(this.addWidget);

        this.loadGrid();

        // Remove widget button event

        $('body').on('click', '.remove-widget', function(event){
            event.preventDefault();

            var grid = $('.grid-stack').data('gridstack');
            grid.removeWidget($(this).parent().parent());
        });

        var frame;

        // Add image button event

        $('body').on('click', '.add-image', function(event){
            event.preventDefault();

            var thisWidgetId = $(this).parent().parent().attr('data-gs-id');

            // Commented because thisWidgetId doesn't change if frame is open
            // if(frame){
            //     frame.open();
            //     return;
            // }

            frame = wp.media({
                title: 'Select or Upload Media Of Your Chosen Persuasion',
                button:{
                    text: 'Use this media'
                },
                multiple: false
            });

            frame.on('select', function() {

                var attachment = frame.state().get('selection').first().toJSON();
                $('div[data-gs-id="'+thisWidgetId+'"]').attr('data-gs-src', attachment.url);
                $('div[data-gs-id="'+thisWidgetId+'"] .grid-stack-item-content').css('background-image', "url("+attachment.url+")");

                // Change add image button to edit image here
                imageAdded(thisWidgetId);

                saveGrid();
            });

            frame.open();

        });

        $('body').on('click', '.remove-image', function(event){
            event.preventDefault();

            var thisWidgetId = $(this).parent().parent().attr('data-gs-id');
            $('div[data-gs-id="'+thisWidgetId+'"]').removeAttr("data-gs-src");
            $('div[data-gs-id="'+thisWidgetId+'"] .grid-stack-item-content').css('background-image', "none");

            // Change edit image button to add image here
            imageRemoved(thisWidgetId);

            saveGrid();
        });

    };

});
