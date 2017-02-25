import Block from './Block'
import { props } from './Props'

export default class Grid{

    constructor(element, data){
        this.options = {
            cellHeight: 80,
            verticalMargin: 10,
            float: true,
            animate: true,
            alwaysShowResizeHandle: true,
        }

        this.element = $(element)
        this.data = $(data)
        this.grid = this.element.gridstack(this.options).data('gridstack')
        this.blocks = []
    }

    getInstance(){
        return this.grid
    }

    getElement(){
        return this.element
    }

    getBlocks(id){
        return this.blocks
    }

    getBlock(id){
        return $(`div[data-gs-id="${id}"]`)
    }

    getBlockParentId(id){
        let block = this.getBlock(id)
        const parentGrid = block.parent()

        if(!parentGrid.hasClass('grid-stack-nested')) return null

        return parentGrid.parent().parent().data('gs-id')
    }

    addBlock(parent, x = null, y = null, width = 6, height = 3, autoPosition = true, id = null){
        const block = new Block(x, y, width, height, autoPosition, id, this.grid, parent)
        this.blocks.push(block)
    }

    removeBlock(id){
        const block = this.getBlock(id)
        let instance = block.parent().gridstack(this.options).data('gridstack')
        instance.removeWidget(block)
    }

    save(){
        const items = '.grid-stack-item'

        let data = _.map($(items), (el) => {
            let $el = $(el)
            let node = $el.data('_gridstack_node')

            return{
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                id: node.id,
                parent: this.getBlockParentId(node.id),
                props: props.getProps(node.id)
            }
        })

        this.data.val(JSON.stringify(data, null, ''))
    }

    load(){
        if(this.data.val() == '' || this.grid == null) return

        this.grid.removeAll()

        let data = JSON.parse(this.data.val())

        _.each(data, (node) => {
            props.storeProps(node.id, node.props)
            this.addBlock(node.parent, node.x, node.y, node.width, node.height, false, node.id)
        })
    }

}
