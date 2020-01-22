import React from 'react'

export default class UserHome extends React.Component{

    render(){
        return(
            <div className="ui raised very padded text container segment form">
                <h1>{this.props.user.username}</h1>
                <div className='ui three item borderless red inverted menu'>
                    <div className='item'>
                        <div className='ui massive blue button' onClick={this.props.handleCreateGame} >Create a game</div>
                    </div>
                    <div className='item'>
                        <div className='ui massive green button' onClick={this.props.handleJoinGame} >Join a game</div>
                    </div>
                </div>
            </div>
        )
    }
}