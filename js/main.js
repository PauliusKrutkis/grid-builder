$ = jQuery

import { events } from './modules/Events'
import { props } from './modules/Props'
import Grid from './modules/Grid'
import Modal from './modules/Modal'

const grid = new Grid(`.${gb.playground.grid}`, `input[name="${gb.playground.data}"]`)
const modal = new Modal(`.${gb.playground.modal}`)

grid.load()
grid.getElement().on('change', () => grid.save())
events.on('save', () => grid.save())
events.on('shortcode-selected', (id) => toggleShortcode(id, true))
events.on('shortcode-removed', (id) => toggleShortcode(id, false))

// add a block
$('body').delegate('.add-block', 'click', function(){
    const button = $(this)
    grid.addBlock(button.data('gs-id'))
    button.blur()
})

// remove the block
$('body').delegate('.remove-block', 'click', function(){
    grid.removeBlock($(this).data('gs-id'))
})

// prompt edit block modal
$('body').delegate('.edit-block', 'click', function(){
    modal.open($(this).data('gs-id'))
})

// select which shortcode to add to the block
$('body').delegate('.shortcode-tree button', 'click', function(){
    modal.addShortcode($(this))
})

// remove block shortcode
$('body').delegate('.remove-shortcode', 'click', function(){
    const id = $(this).data('gs-id')

    props.removeProp('shortcode', id)
    props.removeProp('shortcodeArgs', id)
    props.removeProp('shortcodeName', id)
    props.removeProp('content', id)

    events.emit('shortcode-removed', id)
    events.emit('save')
})

function toggleShortcode(id, selected) {
    const block = grid.getBlock(id)
    const name = block.find('.shortcode-name').first()
    const button = block.find('.remove-shortcode').first()
    const blockProps = props.getProps(id)

    if (selected) {
        button.removeClass('hidden')
        name.text(blockProps.shortcodeName)
    } else {
        button.addClass('hidden')
        name.empty()
    }
}
