'use strict';

import { approvePic, deletePic } from "./functions.jsx";

export class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        var ext = this.props.Key.substr(this.props.Key.length - 4, 4);
        console.log(ext);
        var src, tag;
        if (ext == '.mp4') {
            src = 'data:video/mp4;base64,' + this.props.Body.toString('base64');
            tag = <video
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
                controls
            />
        } else if (ext.toLowerCase() == '.jpg') {
            src = 'data:image/jpg;base64,' + this.props.Body.toString('base64');
            tag = <img
                onClick={() => this.setState({ liked: true })}
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
            />
        } else {
            src = 'data:image/png;base64,' + this.props.Body.toString('base64');
            tag = <img
                onClick={() => this.setState({ liked: true })}
                src={src}
                style={{ height: '100px', display: 'block', margin: '5px', border: 'solid 1px #ffffff' }}
            />
        }

        return (
            <div style={{ background: '#d2ffc9', display: 'inline-block', padding: '5px', margin: '10px' }}>
                <h5>{this.props.Key}</h5>
                {tag}
                <a href={src} target='__blank' style={{ margin: '5px' }}>View Full Size</a>
                <a href={src} download={this.props.Key} style={{ margin: '5px' }}>Download</a>
                <br />
                <button onClick={() => approvePic(this.props.client, this.props.Key)}>Approve</button>
                <button onClick={() => deletePic(this.props.client, this.props.Key)}>Delete</button>
            </div>
        );
    }
}