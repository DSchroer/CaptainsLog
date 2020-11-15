import React, {FormEvent} from "react";
import {UserService} from "./services/user-service";

interface ILoginState {
    email: string;
    password: string;
    error?: string;
}

interface ILoginProps {
    onRegister: () => void;
    onForgot: () => void;
    userService: UserService;
}

export class LoginForm extends React.Component<ILoginProps, ILoginState> {
    constructor(props: Readonly<ILoginProps>) {
        super(props);
        this.state = {email: "", password: ""};
    }

    public render() {
        return (
            <>
                <h1>Login</h1>
                <hr/>
                <form onSubmit={ev => {
                    ev.preventDefault();
                    this.login();
                }}>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={ev => this.setEmail(ev.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={ev => this.setPassword(ev.target.value)}/>
                    </div>

                    <div className="clearfix">
                        <input className="btn btn-primary float-left" type="submit" value="Login"/>
                        <input className="btn btn-default float-left forgot" type="button" value="Forgot Password" onClick={ev => {
                            ev.preventDefault();
                            this.props.onForgot();
                        }}/>

                        <input className="btn btn-secondary float-right" type="button" value="Register" onClick={ev => {
                            ev.preventDefault();
                            this.props.onRegister();
                        }}/>
                    </div>

                    {this.errorMessage()}
                </form>
            </>
        );
    }

    private errorMessage() {
        if (!this.state.error) {
            return;
        }

        return (
            <div className="alert alert-danger" role="alert">
                {this.state.error}
            </div>
        );
    }

    private setPassword(password: string) {
        this.setState({password: password});
    }

    private setEmail(email: string) {
        this.setState({email: email});
    }

    private async login() {
        const email = this.state.email;
        const password = this.state.password;

        try {
            this.setState({error: undefined});
            await this.props.userService.login(email, password);
        } catch (e) {
            this.setState({error: e.message});
        }
    }
}
