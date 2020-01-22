import React from 'react'
import socketIO from "socket.io-client"

const io = socketIO('http://localhost:3001')

export default class CreateGame extends React.Component{

    state = {
        name: '',
        size: ''
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleSizeChange = (e) => {
        if(e.target.value > 10){
            return this.setState({size: 10})
        }
        if(e.target.value < 2){
            return this.setState({size: 2})
        }
        return this.setState({size: e.target.value})  
    }

    handleCreateGame = () => {

        this.props.handleCreateSubmit(this.state)
    }

    render(){
        return(
            <div className="ui raised very padded text container segment form">
                <h1>Create Game</h1>
                <div className="field">
                <label>Name</label>
                <input
                className=''
                onChange={this.handleNameChange}
                placeholder="Name" />
                </div>
                <div className="field">
                <label>Size</label>
                <input
                type="number"
                onChange={this.handleSizeChange}
                placeholder="2" />
                </div>
                <div className='ui massive green button' onClick={this.handleCreateGame}>Create Game</div>
            </div>
        )
    }
}