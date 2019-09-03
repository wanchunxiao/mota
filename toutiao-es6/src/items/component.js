/**
 * @file所有模板文件的基类
 */
export class Component{
    constructor(props){
        this.props=props
    }
    render(){
        return '<div>我是基类不要直接使用我</div>'
    }
    constructElement(){
        const html=this.render()
        const $content=document.createElement('div')
        $content.innerHTML=html
        this.el=$content
        return this.el
    }
}
