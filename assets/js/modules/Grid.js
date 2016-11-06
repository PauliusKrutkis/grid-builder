import { Helper, gridClass, gridData, gridMain } from './Helper'
import Block from './Block'

export default class Grid{

    constructor(target, id){
        this.target = target
        this.id = id
        this.options = {
            cellHeight: 80,
            verticalMargin: 10,
            float: true,
            animate: true,
            resizable: {
                handles: 'e, se, s, sw, w'
            }
        }
    }

    init(){
        if(this.target) return this.$grid = this.target.gridstack(this.options).data('gridstack')
        else if(this.id){
            if(Helper.getBlock(this.id).find('.grid-stack').length)
                return this.$grid = Helper.getBlock(this.id).
                    find('.grid-stack')
                    .gridstack(this.options)
                    .data('gridstack')
            else
                return this.$grid = Helper.getBlock(this.id)
                    .find('.grid-stack-item-content')
                    .append('<div class="grid-stack"></div>')
                    .find('.grid-stack')
                    .gridstack(this.options)
                    .data('gridstack')
        }
    }

    removeBlock(id){
        this.$grid.removeWidget(Helper.getBlock(id))
    }

    saveBlocks(){
        const items = gridClass.children()

        let data = _.map(items, (el) => {
            let $el = $(el)
            let node = $el.data('_gridstack_node')
            let nested = $el.find('.grid-stack').children()
            let options = ($el.find('.block-options').val()) ? JSON.parse($el.find('.block-options').val()) : undefined

            if(nested.length){
                var data = _.map(nested, (el) => {
                    let $el = $(el)
                    let node = $el.data('_gridstack_node')
                    let options = ($el.find('.block-options').val()) ? JSON.parse($el.find('.block-options').val()) : undefined

                    return{
                        x: node.x,
                        y: node.y,
                        width: node.width,
                        height: node.height,
                        id: node.id,
                        options: options
                    }
                })
            }

            return{
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                id: node.id,
                options: options,
                nested: data
            }
        })

        gridData.val(JSON.stringify(data, null, ''))
    }

    loadBlocks(){

        if(gridData.val() == '' || gridMain.init() == null) return

        gridMain.init().removeAll()

        let data = JSON.parse(gridData.val())
        let items = GridStackUI.Utils.sort(data)

        _.each(items, (node) => {
            new Block(node.x, node.y, node.width, node.height, false, node.id, node.options)

            if(node.nested){
                let blockId = node.id
                let items = GridStackUI.Utils.sort(node.nested)

                _.each(items, (node) => {
                    new Block(node.x, node.y, node.width, node.height, false, blockId, node.options)
                })
            }
        })

    }

}
