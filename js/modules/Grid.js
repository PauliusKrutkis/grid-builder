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
        this.props = []
    }

    getInstance(){
        return this.grid
    }

    getElement(){
        return this.element
    }

    getBlockParentId(id){
        const block = Helper.getBlock(id)
        const parentGrid = block.parent()

        if(!parentGrid.hasClass('grid-stack-nested')) return null

        return parentGrid.parent().parent().data('gs-id')
    }

    remove(id){
        const block = Helper.getBlock(id)
        let instance = block.parent().gridstack(this.options).data('gridstack')
        instance.removeWidget(block)
    }

    saveProp(args){
        let params = {}
        params[args.group] = args.shortcode
        this.props[args.id] = params

        this.save()
    }

    saveAllProps(id, props){
        this.props[id] = props
    }

    getProps(id){
        return this.props[id]
    }

    save(){

        const items = '.grid-stack-item'

        let data = _.map($(items), (el) => {
            let $el = $(el)
            let node = $el.data('_gridstack_node')
            let options = ($el.find('.block-options').val()) ? JSON.parse($el.find('.block-options').val()) : null

            return{
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                id: node.id,
                parent: this.getBlockParentId(node.id),
                props: this.getProps(node.id)
            }
        })

        this.data.val(JSON.stringify(data, null, ''))
    }

    load(){
        if(this.data.val() == '' || this.grid == null) return

        this.grid.removeAll()

        let data = JSON.parse(this.data.val())

        _.each(data, (node) => {
            new Block(node.x, node.y, node.width, node.height, false, node.id, node.options, this.grid, node.parent)
            this.saveAllProps(node.id, node.props)
        })
    }
}
