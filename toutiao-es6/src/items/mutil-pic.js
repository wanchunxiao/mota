import {Component} from './component'
export class MultiplePic extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data} =this.props;
        const imageList =data.imageList.map(image=>{
            return `<img src=${image} />`
        }).join()
        return `<div class="item multiple-image" on:click="aa">
        <h3>
            ${data.title}
        </h3>
        <div class="image-list">
            ${imageList}
        </div>
    </div>`
    }
}