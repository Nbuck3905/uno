import React from 'react'
import { io } from '../Socket'

export default class Waiting extends React.Component{
    state = {
        game: {},
        player_ids: []
    }
    
    componentDidMount(){
        io.on('game.joined', (game) => {
            this.setState({
                game: game,
                player_ids: JSON.parse(game.users)
            })
        })
        io.on('game.deleted', () => this.props.handleHome())
        io.on('game.left', (user_id) => this.setState({player_ids: this.state.player_ids.filter(player_id => player_id != user_id)}))
    }

    render(){
        return(
            <div className="ui raised very padded text container segment form">
                <h1>Game: {this.props.game.name}</h1>
                <h3>Players Joined: {this.state.player_ids.length + 1}</h3>
                <h3>Waiting On: {this.props.game.size - (this.state.player_ids.length + 1)}</h3>
                {this.props.user.id == this.state.game.creator_id && this.state.player_ids.length > 0 ? <div className='ui massive fluid green button' onClick={() => this.props.handleStart(this.state.game, this.state.player_ids)}>Start</div> : null}
            </div>
        )
    }
}