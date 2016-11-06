$ = jQuery

import Grid from './Grid'
import Modal from './Modal'

export const modalClass = $('.block-modal')
export const modalMain = new Modal()
export const gridClass = $('.grid-stack-main')
export const gridData = $('.grid-data')
export const gridMain = new Grid(gridClass)

export class Helper{

    static guid(){
        return this.s4() + this.s4()
    }

    static s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    static getBlock(id){
        return $(`div[data-gs-id="${id}"]`)
    }

}
