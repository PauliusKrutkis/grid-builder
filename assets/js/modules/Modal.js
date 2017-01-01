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
        const args = {
            id: this.id,
            group: 'shortcode',
            shortcode: shortcode
        }

        events.emit('saveProp', args)
    }

}
