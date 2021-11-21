'use strict';

import { auth } from "../objects/auth.js";
import { getApproved, getUnapproved, uploadPic } from "./functions.jsx";
var s3 = require('../objects/s3');

export class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: auth.isUserSignedIn(),
            user: auth.getCurrentUser(),
            localStorage: auth.getCachedSession().isValid(),
            client: null,
            display: 'none'
        }
    }

    componentDidMount() {
        if (this.state.signIn) {
            this.setState( {client: s3(auth.getCachedSession())} );
        } else {
            this.setState( {client: s3('unauthenticated')});
        }
    }

    refresh = () => {
        this.setState({
            signIn: auth.isUserSignedIn(),
            user: auth.getCurrentUser(),
            localStorage: auth.getCachedSession().isValid()
        })
    }

    render() {
        return <div>
            <div className="w3-card-4 w3-panel w3-cyan">
                <header className="w3-bar w3-cyan">
                    <h3 className="w3-bar-item">Hello <b>{this.state.user || ('Guest ' + auth.getClientId())}</b>!</h3>
                    <button className="w3-bar-item w3-btn w3-teal w3-margin" onClick={() => { auth.getSession(); this.refresh() }}>Sign In</button>
                    <button className="w3-bar-item w3-btn w3-teal w3-margin" onClick={() => { auth.signOut(); this.refresh() }}>Sign Out</button>
                </header>

                <div className="w3-container w3-white">
                    <p>Status: {this.state.signIn ? 'Signed In' : 'Signed Out'}</p>
                    <p>Cached: {this.state.localStorage ? 'true' : 'false'}</p>
                    <p>Authorized: {this.state.client ? 'true' : 'false'}</p>
                </div>

                <div className="w3-cyan">
                    <button className="w3-button w3-margin w3-aqua" onClick={this.refresh}>Refresh</button>
                    <button className="w3-button w3-margin w3-aqua" onClick={() => { this.state.display == 'none' ? this.setState({ display: 'inherit' }) : this.setState({ display: 'none' }) }}>{this.state.display == 'none' ? 'Open' : 'Close'} Advanced Tools</button>
                    <button className="w3-button w3-margin w3-aqua" onClick={() => { alert('Anything uploaded is initially set as unapproved.\nGuests can upload and view approved items without signing in.\nRegistrants can upload and view approved items.\nApprovers are registrants who are promoted by the owner.\nApprovers can upload, view, approve, and delete all items.')}}>Information</button>
                </div>
            </div>

            <div id="toolbar" style={{display: this.state.display}} className="w3-panel w3-pale-blue w3-border w3-border-blue">
                <button onClick={() => { console.log(auth); this.refresh() }}>Log Auth</button>
                <button onClick={() => { alert(auth.getState()); this.refresh() }}>Get State</button>
                <button onClick={() => { alert(document.cookie); this.refresh() }}>Get Cookie</button>
                <button onClick={() => { console.log(localStorage); this.refresh() }}>Log Local Storage</button>
                <button onClick={() => { auth.cacheTokensScopes(); this.refresh() }}>Cache Tokens</button>
                <button onClick={() => { auth.clearCachedTokensScopes(); this.refresh() }}>Clear Cache</button>
                <button onClick={() => { console.log(auth.getCachedSession()); this.refresh() }}>Log Cached Session</button>
                <button onClick={() => { console.log(auth.getSignInUserSession()); this.refresh(); }}>Get Sign In User Session</button>
                <button onClick={() => { console.log(auth.getCurrentUser()); this.refresh() }}>Get Current User</button>
                <button onClick={() => { console.log(auth.isUserSignedIn()); this.refresh() }}>Is User Signed In?</button>
                <button onClick={() => { alert(location.href); this.refresh() }}>Get Href</button>
                <button onClick={() => { auth.parseCognitoWebResponse(location.href); this.refresh() }}>Parse Web Response</button>
                <button onClick={() => this.setState( {client: s3(auth.getCachedSession())} )}>Authorize</button>
            </div>

            <h2>Upload Your Media</h2>

            <form className="w3-panel w3-pale-green w3-padding-16 w3-border w3-border-green">
                <label htmlFor="newPic">Select</label>
                <input type="file" name="newPic" />
                <label htmlFor="title">Name your file</label>
                <input type="text" name="title" />
                <button type="button" onClick={() => uploadPic(this.state.client)}>Submit</button>
            </form>

            <button onClick={() =>  getUnapproved(this.state.client)}>Get Unapproved Pictures</button>
            <button onClick={() => getApproved(this.state.client)}>Get Approved Pictures</button>
        </div>
    }
}