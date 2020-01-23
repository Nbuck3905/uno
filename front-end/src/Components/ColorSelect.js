import React from 'react'

export default class ColorSelect extends React.Component{
    state = {
        color: ''
    }

    componentDidMount(){
        this.setState({
            color: (this.props.discard.color ? this.props.discard.color : 'red')
        })
    }

    render(){
        return(
            <div className="ui raised very padded text container form">
                <form>
                    <select value={this.state.color}>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                </form>
            </div>
        )
    }
}