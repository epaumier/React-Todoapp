import React from 'react';
import { ListGroupItem} from 'reactstrap';

class DeletedItem extends React.Component {


    render(){
        return(
            <div>
                    <ListGroupItem
                    style={{
                        textDecoration: 'line-through'
                    }}
                        value={this.props.value}
                        onClick={this.props.RestoreTask}>
                        {this.props.itemText}
                    </ListGroupItem>
            </div>
        )
    }
}

export default DeletedItem