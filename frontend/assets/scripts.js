jQuery(document).ready(function($){
    var options = {
        cellHeight: 80,
        verticalMargin: 10,
        staticGrid: true,
        //float: true, // experimental
    };

    var gridClass = $('.grid-stack');

    gridClass.gridstack(options);

    new function (){

        if(!$('.grid-stack').length) return;

        var grid = $('.grid-stack').data('gridstack');

        loadGrid = function (grid) {
            if($('#saved-data').val() == '') return;
            grid.removeAll();
            var gridData = JSON.parse($('#saved-data').val());
            var items = GridStackUI.Utils.sort(gridData);

            _.each(items, function (node){
                // Remaking the grid
                var el = $.parseHTML("<div><div class=\"grid-stack-item-content\"><div/>");

                $(el).attr("data-gs-src", node.src);
                grid.addWidget(el, node.x, node.y, node.width, node.height, false, null, null, null, null, node.id);

                addContent(node.id, node.src);
            }, grid);

            return false;
        };

        function addContent(id, src){
            if(src){
                $('div[data-gs-id="'+id+'"] .grid-stack-item-content').css('background-image', "url("+src+")");
            }
        }

        loadGrid(grid);

    };

});
