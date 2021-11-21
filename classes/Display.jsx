'use strict';


import { Photo } from './Photo.jsx';

export class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.items.map((item, index) =>
            <Photo Body={item.Body} Key={item.Key} key={index} client={this.props.client} />
        );
    }
}
