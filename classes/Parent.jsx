'use strict';

import { Counter } from "./Counter.jsx";

export class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { c: 0 }
    }

    render() {
        return <div className="w3-card-2 w3-margin w3-cell">
            <Counter count={this.state.c} />
            <button onClick={() => this.setState({ c: this.state.c + 1 })}>Inc</button>
        </div>;
    }
}
