
// import {request} from './utils'
// import {Component} from './items/component'
import components from './items'
import{List} from './mock'
class Manager{
    constructor(){
        this.$container=$container
    }
    static getInstance($container){
        return new Manager()
    }
    init(){
        console.log('init')

        const items=List.data
        items.forEach(item=>{
            const componentName=item.type.replace(/^\w/g,w=>w.toUpperCase())
            
            const Component=components[componentName]
            console.log(Component,components,componentName)
            const currentComponent =new Component(item)
           
            const element=currentComponent.constructElement()
            this.$container.appendChild(element)
        })
    }
}

const $container=document.getElementById('container')
const manager=Manager.getInstance($container)
manager.init()