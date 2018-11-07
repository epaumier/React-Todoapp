import React from 'react';
import { ListGroupItem } from 'reactstrap';

class TodoItem extends React.Component {
    
    render(){
        return(
            
                <ListGroupItem
                  value={this.props.value}
                  onClick={this.props.deleteTask}>
                  {this.props.itemText}
                  </ListGroupItem>
        )
    }
}

export default TodoItem