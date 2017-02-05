import Helper from './Helper'
import Grid from './Grid'
import { events } from './Events'
import { props } from './Props'

export default class Block{

    constructor(x, y, width, height, autoPosition, id, grid, parent){
        this.id = (id) ? id : Helper.guid()

        let blockProps = props.getProps(this.id)
        let hasShortcode = (blockProps) ? blockProps.shortcode : false

        let addBlockTemplate = `<a href="javascript:void(0);" data-gs-id="${this.id}" class="ico-file-add add-block"></a>`
        let editBlockTemplate = `<a href="javascript:void(0);" data-gs-id="${this.id}" class="ico-pen edit-block"></a>`
        let removeBlockTemplate = `<a href="javascript:void(0);" data-gs-id="${this.id}" class="ico-trashcan remove-block"></a>`
        let removeShorcodeTemplate = `
            <a href="javascript:void(0);"
                data-gs-id="${this.id}"
                class="ico-window-delete remove-shortcode ${(hasShortcode == '') ? 'hidden' : ''}">
            </a>
            `

        if(parent){
            this.block = Helper.getBlock(parent)
            this.grid = this.getGrid()

            // disable nesting for more then 2 levels
            addBlockTemplate = ''
        }else{
            this.grid = grid
        }

        const element = `
            <div>
                <div class="grid-stack-item-content">
                    <div class="controls">
                        ${removeShorcodeTemplate}
                        ${addBlockTemplate}
                        ${editBlockTemplate}
                        ${removeBlockTemplate}
                    </div>
                </div>
            </div>
        `

        this.grid.addWidget(element, x, y, width, height, autoPosition, null, null, null, null, this.id)
    }

    getGrid(){
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
