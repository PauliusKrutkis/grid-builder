import Helper from './Helper'
import { events } from './Events'
import { props } from './Props'

export default class Modal{

    constructor(element){
        this.element = $(element)
        this.tree = this.element.find('.shortcode-tree')
        this.fields = this.element.find('.fields')
        this.argument = '.argument'
        this.shortcode = null
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

        let shortcodeFields = this.fields.find(this.argument)
        let shortcode = this.shortcode
        let shortcodeArgs = {}

        $.each(shortcodeFields, function(){
            let vm = $(this)
            let name = vm.attr('name')
            let value = (vm.val()) ? vm.val() : null

            if(value != '') shortcodeArgs[name] = value
        })

        // save shortcode args

        const blockShortcodeArgs = {
            id: this.id,
            group: 'shortcodeArgs',
            value: shortcodeArgs
        }

        props.saveProp(blockShortcodeArgs)

    }

    open(id){
        this.element.dialog(this.options)
        this.id = id

        const blockProps = props.getProps(this.id)

        if(blockProps){
            // if id has props - empty the fields, call edit on that shortcode
            this.empty()
            this.edit(blockProps.shortcode, blockProps.shortcodeArgs)
        }else{
            // if it doesnt - empty the fields and show the tree.
            this.empty()
            this.showTree()
        }

    }

    addShortcode(shortcode){
        const args = {
            id: this.id,
            group: 'shortcode',
            value: shortcode
        }

        props.saveProp(args)
        this.edit(shortcode, null)
    }

    edit(shortcode, args){
        this.shortcode = shortcode
        this.hideTree()
        $.get({
            url: wp.ajax_url,
            data: {
                action: 'get_shortcode',
                type: shortcode,
                args: args
            },
            success: response => this.fields.append(response)
        })
    }

    close(){
        this.element.dialog('close')
    }

    empty(){
        this.fields.empty()
    }

    hideTree(){
        this.tree.hide()
        this.element.parent().addClass('buttons-active')
    }

    showTree(){
        this.tree.show()
        this.element.parent().removeClass('buttons-active')
    }

}
