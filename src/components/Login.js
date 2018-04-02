import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:3000/login', user).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
            // self.props.history.push('/signup');
        });

    }

    render() {
        return (<div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label className="form-control-label">USERNAME</label>
                    <input type="text" name="username" className="form-control" id="username" onChange={this.handleInputChange.bind(this)} value={this.state.username}/>
                </div>
                <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password}/>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="col-xs-6">
                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                        </div>
                        <div className="col-XS-6">
                            {/* <Link to="/signup" className="btn btn-outline-secondary">REGISTER</Link> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>);
    }
};

export default Login;
