'use strict';

export class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Count = {this.props.count}</p>
    }
}