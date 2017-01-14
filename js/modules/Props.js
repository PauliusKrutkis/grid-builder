import { events } from './Events'

export const props = {
    storage: {},

    saveProp(args){
        let params = {}
        params[args.group] = args.shortcode
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
