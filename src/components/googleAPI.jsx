import React, { Component } from 'react';

class TrendTopic extends Component {
  render() {
    return (
        <ul>
        {this.props.trends.map(function(item,i) { 
             return <TrendTopic key={i} trend={item}/>
        })}
        </ul>
    )
  }
}

export default TrendTopic;