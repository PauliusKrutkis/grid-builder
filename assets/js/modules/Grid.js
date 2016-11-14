import Helper from './Helper'
import Block from './Block'

export default class Grid{

    constructor(element, data){
        this.options = {
            cellHeight: 80,
            verticalMargin: 10,
            float: true,
            animate: true,
            resizable: {
                handles: 'e, se, s, sw, w'
            }
        }

        this.element = $(element)
        this.data = $(data)
        this.grid = this.element.gridstack(this.options).data('gridstack')
    }

    getInstance(){
        return this.grid
    }

    getElement(){
        return this.element
    }

    remove(id){
        let block = Helper.getBlock(id)
        let instance = block.parent().gridstack(this.options).data('gridstack')
        instance.removeWidget(block)
    }

    save(){
        const items = this.element.children()

        let data = _.map(items, (el) => {
            let $el = $(el)
            let node = $el.data('_gridstack_node')
            let nested = $el.find('.grid-stack').children()
            let options = ($el.find('.block-options').val()) ? JSON.parse($el.find('.block-options').val()) : null

            if(nested.length){
                var data = _.map(nested, (el) => {
                    let $el = $(el)
                    let node = $el.data('_gridstack_node')
                    let options = ($el.find('.block-options').val()) ? JSON.parse($el.find('.block-options').val()) : null

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

        this.data.val(JSON.stringify(data, null, ''))
    }

    load(){
        if(this.data.val() == '' || this.grid == null) return

        this.grid.removeAll()

        let data = JSON.parse(this.data.val())
        let items = GridStackUI.Utils.sort(data)

        _.each(items, (node) => {
            new Block(node.x, node.y, node.width, node.height, false, node.id, node.options, this.grid)

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
