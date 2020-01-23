import React from 'react'

export default class ColorSelect extends React.Component{
    
    render(){
        return(
            <div>
                <div style={{height: '40vh'}}></div>
                <div className="ui four item menu">
                    <div onClick={() => this.props.handleColorSelect('red')} className='ui massive red button'>Red</div>
                    <div onClick={() => this.props.handleColorSelect('yellow')} className='ui massive yellow button'>Yellow</div>
                    <div onClick={() => this.props.handleColorSelect('blue')} className='ui massive blue button'>Blue</div>
                    <div onClick={() => this.props.handleColorSelect('green')} className='ui massive green button'>Green</div>
                </div>
            </div>
        )
    }
}