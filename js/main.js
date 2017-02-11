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
events.on('shortcode-selected', (id) => toggleRemoveShortcode(id, true))
events.on('shortcode-removed', (id) => toggleRemoveShortcode(id, false))

$('body').delegate('.add-block', 'click', function(){
    const vm = $(this)

    new Block(null, null, 6, 3, true, null, grid.getInstance(), vm.data('gs-id'))
    vm.blur()
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

function toggleRemoveShortcode(id, show) {
    const button = $(`.remove-shortcode[data-gs-id="${id}"]`)

    if(show)
        button.removeClass('hidden')
    else
        button.addClass('hidden')
}
