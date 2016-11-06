import Block from './modules/Block'
import { gridClass, gridMain, modalMain } from './modules/Helper'

$(document).ready(() => gridMain.loadBlocks())

$('body').delegate('.add-block', 'click', function(){
    new Block(null, null, 6, 3, true, $(this).data('gs-id'))
})

$('body').delegate('.remove-block', 'click', function(){
    gridMain.removeBlock($(this).data('gs-id'))
})

$('body').delegate('.edit-block', 'click', function(){
    modalMain.open($(this).data('gs-id'))
})

$('body').delegate('.shortcode-tree button', 'click', function(){
    modalMain.addShortcode($(this).data('shortcode'))
})

gridClass.on('change', () => gridMain.saveBlocks())
