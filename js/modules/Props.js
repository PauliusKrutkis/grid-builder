import { events } from './Events'

export const props = {
    storage: {},

    saveProp(args){
        let params = (this.getProps(args.id)) ? this.getProps(args.id) : {}
        params[args.group] = args.value
        this.storage[args.id] = params
        events.emit('save')
    },

    saveAllProps(id, props){
        this.storage[id] = props
    },

    getProps(id){
        return this.storage[id]
    },
}
