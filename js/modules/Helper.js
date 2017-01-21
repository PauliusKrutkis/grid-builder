import Modal from './Modal'

export default class Helper{

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
