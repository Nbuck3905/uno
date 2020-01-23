import React from'react'

export default class PlayNavBar extends React.Component{
    render(){
        return(
            <div className="ui red borderless inverted menu">
                <div className="item">
        <div className="ui yellow massive button">{this.props.user.username}</div>
                </div>
            </div>
        )
    }
}