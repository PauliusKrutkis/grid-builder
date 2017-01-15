import Helper from './Helper'
import { events } from './Events'
import { props } from './Props'

export default class Modal{

    constructor(element){
        this.editor = null;
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
        let shortcodeArgsString = ''

        $.each(shortcodeFields, function(){
            let vm = $(this)
            let name = vm.attr('name')
            let value = vm.val()

            if(value != '') shortcodeArgs[name] = value
        })

        shortcodeArgsString = Helper.objArgsToString(shortcodeArgs)

        const propArgs = {
            id: this.id,
            group: 'content',
            value: '['+shortcode+' '+shortcodeArgsString+']'
        }

        props.saveProp(propArgs)
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

    open(id){
        this.element.dialog(this.options)
        this.id = id

        const blockProps = props.getProps(this.id)

        if(blockProps){
            // if id has props - empty the fields, call edit on that shortcode
            this.empty()
            this.edit(blockProps.shortcode)
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
        this.edit(shortcode)
    }

    edit(shortcode){
        this.shortcode = shortcode
        this.hideTree()
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
