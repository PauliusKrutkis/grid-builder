import Helper from './Helper'
import Grid from './Grid'
import { events } from './Events'

export default class Block{

    constructor(x, y, width, height, autoPosition, id, options, grid){
        this.id = (id) ? id : Helper.guid()
        this.block = Helper.getBlock(this.id)
        this.options = options

        let addBlockTemplate = `<button data-gs-id="${this.id}" type="button" class="btn add-block">Add</button>`

        if(this.getGrid()){
            this.grid = this.getGrid()
            this.id = Helper.guid()
            this.block = Helper.getBlock(this.id)
            addBlockTemplate = ''
        }else{
            this.grid = grid
        }

        let editBlockTemplate = `<button data-gs-id="${this.id}" type="button" class="btn edit-block">Edit</button>`
        let removeBlockTemplate = `<button data-gs-id="${this.id}" type="button" class="btn remove-block">Remove</button>`

        const element = `
            <div>
                <div class="grid-stack-item-content">
                    ${removeBlockTemplate}
                    ${editBlockTemplate}
                    ${addBlockTemplate}
                    <input type="hidden" name="options" class="block-options">
                </div>
            </div>
        `

        this.grid.addWidget(element, x, y, width, height, autoPosition, null, null, null, null, this.id)
        this.saveOptions()
    }

    saveOptions(){
        this.block.find('.block-options').val(JSON.stringify(this.options, null, ''))
        events.emit('save')
    }

    getGrid(block){
        if(this.block.length){
            if(this.block.find('.grid-stack').length){
                return new Grid(this.block.find('.grid-stack').selector).getInstance()
            }else{
                let element = this.block.find('.grid-stack-item-content').append('<div class="grid-stack"></div>').find('.grid-stack').selector
                return new Grid(element).getInstance()
            }
        }
    }

}
