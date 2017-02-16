$ = jQuery

import { events } from './modules/Events'
import { props } from './modules/Props'
import Block from './modules/Block'
import Grid from './modules/Grid'
import Modal from './modules/Modal'

const grid = new Grid(`.${wp.playground.grid}`, `input[name="${wp.playground.data}"]`)
const modal = new Modal(`.${wp.playground.modal}`)

grid.load()
grid.getElement().on('change', () => grid.save())
events.on('save', () => grid.save())
events.on('shortcode-selected', (id) => toggleShortcode(id, true))
events.on('shortcode-removed', (id) => toggleShortcode(id, false))

$('body').delegate('.add-block', 'click', function(){
    const button = $(this)

    new Block(null, null, 6, 3, true, null, grid.getInstance(), button.data('gs-id'))
    button.blur()
})

// remove the block
$('body').delegate('.remove-block', 'click', function(){
    grid.remove($(this).data('gs-id'))
})

// Prompt edit block modal
$('body').delegate('.edit-block', 'click', function(){
    modal.open($(this).data('gs-id'))
})

// Select which shortcode to add to the block
$('body').delegate('.shortcode-tree button', 'click', function(){
    modal.addShortcode($(this).data('shortcode'))
})

$('body').delegate('.remove-shortcode', 'click', function(){
    const id = $(this).data('gs-id')

    props.removeProp('shortcode', id)
    props.removeProp('shortcodeArgs', id)
    props.removeProp('content', id)
    events.emit('shortcode-removed', id)
    events.emit('save')
})

function toggleShortcode(id, selected) {
    const block = $(`div[data-gs-id="${id}"]`)
    const name = block.find('.shortcode-name')
    const button = block.find('.remove-shortcode')
    const blockProps = props.getProps(id)

    if (selected) {
        button.removeClass('hidden')
        name.text(blockProps.shortcode)
    } else {
        button.addClass('hidden')
        name.empty()
    }
}
