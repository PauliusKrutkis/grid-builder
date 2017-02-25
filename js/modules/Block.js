import Grid from './Grid'
import { props } from './Props'

export default class Block{

    constructor(x, y, width, height, autoPosition, id, grid, parent){
        this.id = (id) ? id : this.getGuid()
        this.parent = parent

        if(parent){
            this.block = this.getBlock(parent)
            this.grid = this.getGrid()
        }else{
            this.grid = grid
        }

        this.grid.addWidget(this.getElement(), x, y, width, height, autoPosition, null, null, null, null, this.id)
    }

    getElement(){
        return `
            <div>
                <div class="grid-stack-item-content">
                    <div class="controls">${this.getBlockControls()}</div>
                </div>
            </div>
        `
    }

    getBlockControls(){
        const blockProps = props.getProps(this.id)
        let shortcodeName = false;

        if (blockProps) {
            shortcodeName = (blockProps.shortcodeName == null) ? false : blockProps.shortcodeName
        }

        let nesting = ''

        // check config if nesting is enabled
        // disable nesting for more then 2 levels
        if (gb.playground.nesting && !this.parent) {
            nesting = `<a href="javascript:void(0);"
                data-gs-id="${this.id}"
                title="${gb.strings.nested}"
                class="ico-file-add add-block">
            </a>`
        }

        return `
            <span class="shortcode-name">${(shortcodeName) ? shortcodeName : ''}</span>

            ${nesting}

            <a href="javascript:void(0);"
                data-gs-id="${this.id}"
                title="${gb.strings.removesc}"
                class="ico-window-delete remove-shortcode ${(!shortcodeName) ? 'hidden' : ''}">
            </a>

            <a href="javascript:void(0);"
                data-gs-id="${this.id}"
                title="${gb.strings.editb}"
                class="ico-pen edit-block">
            </a>

            <a href="javascript:void(0);"
                data-gs-id="${this.id}"
                title="${gb.strings.deleteb}"
                class="ico-trashcan remove-block">
            </a>
        `
    }

    getGrid(){
        if (this.block.find('.grid-stack').length) {

            return new Grid(this.block.find('.grid-stack').selector).getInstance()

        } else {

            const element = this.block
                .find('.grid-stack-item-content')
                .append('<div class="grid-stack"></div>')
                .find('.grid-stack')
                .selector

            return new Grid(element).getInstance()

        }
    }

    getSelector(){
        return this.selector
    }

    getBlock(id){
        return $(`div[data-gs-id="${id}"]`)
    }

    getGuid(){
        const randomStr = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

        return randomStr + randomStr
    }

}
