import { Helper, gridMain } from './Helper'
import Grid from './Grid'

export default class Block{

    constructor(x, y, width, height, autoPosition, id, options){
        let blockId = (id) ? id : Helper.guid()
        let grid = gridMain.init()
        let addBlockTemplate = `<button data-gs-id="${blockId}" type="button" class="btn add-block">Add</button>`

        if(Helper.getBlock(blockId).length){
            grid = new Grid(null, blockId).init()
            blockId = Helper.guid()
            addBlockTemplate = ''
        }

        let editBlockTemplate = `<button data-gs-id="${blockId}" type="button" class="btn edit-block">Edit</button>`
        let removeBlockTemplate = `<button data-gs-id="${blockId}" type="button" class="btn remove-block">Remove</button>`

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

        grid.addWidget(element, x, y, width, height, autoPosition, null, null, null, null, blockId)
        this.addOptions(blockId, options)
    }

    addOptions(id, options){
        Helper.getBlock(id).find('.block-options').val(JSON.stringify(options, null, ''))
        gridMain.saveBlocks()
    }

}
