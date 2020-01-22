import React from 'react'
import { io } from '../Socket'

export default class JoinGame extends React.Component{
    state = {
        games: []
    }
    componentDidMount(){
        io.emit('games.get')
        io.on('games', (games) => {
            this.setState({games: games})
        })
        io.on('game.created', games => {
            this.setState({games: games})
        })
    }

    render(){
        console.log(this.state.games)
        return(
            <div className="ui raised very padded text container segment form">
                <h1>Join Game</h1>
                {this.state.games.map(game => {
                    if(JSON.parse(game.users).length + 1 < game.size){
                        return (
                            <div key={game.id}>
                                <div
                                    className='ui red fluid button'
                                    onClick={() => this.props.handleJoinSubmit(game)}
                                >
                                    {game.name}
                                </div>
                                <div style={{height: '1vh'}}></div>
                            </div>
                        )
                    }
                    return () => this.props.handleCreateGame()
                })}
            </div>
        )
    }
}