import Helper from './Helper'
import { events } from './Events'
import { props } from './Props'

export default class Modal{

    constructor(element){
        this.editor = null;
        this.element = $(element)
        this.tree = this.element.find('.shortcode-tree')
        this.fields = this.element.find('.fields')
        this.options = {
            minWidth: 600,
			minHeight: 600,
            closeOnEscape: true,
            dialogClass: "block-modal-window",
            buttons: {
                // TODO localization
                "Save": () => this.save(),
                "Cancel": () => this.close()
            }
        }
    }

    save(){
        this.close()
    }

    close(){
        this.element.dialog('close')
    }

    showButtons(){
        this.element.parent().addClass('buttons-active')
    }

    open(id){
        this.element.dialog(this.options)
        this.id = id

        // if id has props - empty the fields, call edit on that shortcode
        // if it doesnt - empty the fields and show the tree.
        console.log(props.getProps(this.id))
    }

    addShortcode(shortcode){
        this.showButtons()

        const args = {
            id: this.id,
            group: 'shortcode',
            shortcode: shortcode
        }

        props.saveProp(args)
        
        this.edit(shortcode)
    }

    edit(shortcode){
        this.tree.hide()
        this.editor = tinyMCEPreInit.mceInit.content;
        $.get({
            url: wp.ajax_url,
            data: {
                action: 'get_shortcode',
                type: shortcode
            },
            success: response => this.fields.append(response)
        })
    }

}
