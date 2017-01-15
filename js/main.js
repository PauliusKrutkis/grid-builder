$ = jQuery

import { events } from './modules/Events'
import Block from './modules/Block'
import Grid from './modules/Grid'
import Modal from './modules/Modal'

const grid = new Grid('.grid-stack-main', '.grid-data')
const modal = new Modal('.block-modal')

grid.load()
grid.getElement().on('change', () => grid.save())
events.on('save', () => grid.save())
events.on('saveProp', (args) => grid.saveProp(args))

$('body').delegate('.add-block', 'click', function(){
    new Block(null, null, 6, 3, true, null, grid.getInstance(), $(this).data('gs-id'))
})

$('body').delegate('.remove-block', 'click', function(){
    grid.remove($(this).data('gs-id'))
})

$('body').delegate('.edit-block', 'click', function(){
    modal.open($(this).data('gs-id'))
})

// Select which shortcode to add to the block
$('body').delegate('.shortcode-tree button', 'click', function(){
    modal.addShortcode($(this).data('shortcode'))
})