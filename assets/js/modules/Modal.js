import { Helper, modalClass, gridMain } from './Helper'

export default class Modal{

    constructor(){
        this.options = {
            minWidth: 600,
			minHeight: 600,
            closeOnEscape: true,
        }
    }

    open(id){
        modalClass.dialog(this.options)
        this.id = id
    }

    addShortcode(shortcode){
        let blockOptions = Helper.getBlock(this.id).find('.block-options')
        let options = {}

        if(blockOptions.val()){
            options = JSON.parse(blockOptions.val())
            if($.inArray(shortcode, options.shortcodes) > -1) return
            options.shortcodes.push(shortcode)
        }else{
            options.shortcodes = [shortcode]
        }

        blockOptions.val(JSON.stringify(options, null, ''))
        gridMain.saveBlocks()
    }

}
