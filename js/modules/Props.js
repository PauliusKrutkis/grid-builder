import { events } from './Events'

export const props = {
    storage: {},

    saveProp(args){
        const blockProps = this.getProps(args.id)
        let params = (blockProps) ? blockProps : {}

        params[args.group] = args.value
        this.storage[args.id] = params
        events.emit('save')
    },

    storeProps(id, props){
        this.storage[id] = props
    },

    getProps(id){
        return this.storage[id]
    },

    removeProp(group, id){
        const blockProps = this.getProps(id)
        delete blockProps[group]
    }
}
