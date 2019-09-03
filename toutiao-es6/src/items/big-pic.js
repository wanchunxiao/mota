import {Component} from './component'
export class BigPic extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data} =this.props
        return `<div class="item big-pic">
                <h3>${data.title}</h3>
        <img src="${data.imageList[0]}" />
    </div>`;
    }
}