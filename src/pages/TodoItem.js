import React from 'react';
import { ListGroupItem } from 'reactstrap';

class TodoItem extends React.Component {
    
    render(){
        return(
            
                <ListGroupItem
                  key={this.props.i}
                  id={this.props.i}
                  onClick={this.props.deleteTask}>
                  {this.props.itemText}
                  </ListGroupItem>
        )
    }
}

export default TodoItem