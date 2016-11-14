import Helper from './Helper'
import { events } from './Events'

export default class Modal{

    constructor(element){
        this.element = $(element)
        this.options = {
            minWidth: 600,
			minHeight: 600,
            closeOnEscape: true,
        }
    }

    open(id){
        this.element.dialog(this.options)
        this.id = id
    }

    addShortcode(shortcode){
        this.addOption('shortcodes', shortcode)
    }

    addOption(param, value){
        let blockOptions = Helper.getBlock(this.id).find('.block-options')
        let options = {}

        if(blockOptions.val() != '' && blockOptions.val() != 'null'){
            console.log(false || true)
            options = JSON.parse(blockOptions.val())
            if($.inArray(value, options[param]) > -1) return
            options[param].push(value)
        }else{
            options[param] = [value]
        }

        blockOptions.val(JSON.stringify(options, null, ''))
        events.emit('save')
    }

}
