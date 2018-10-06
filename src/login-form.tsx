import firebase from "firebase/app";
import React, { FormEvent } from "react";

interface ILoginState {
    email: string;
    password: string;
    error?: string;
}

export class LoginForm extends React.Component<{}, ILoginState> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { email: "", password: "" };
    }

    public render() {
        return (
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
                        onChange={ev => this.setEmail(ev.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={ev => this.setPassword(ev.target.value)} />
                </div>

                <input type="submit" value="Login" />
                <hr></hr>
                {this.errorMessage()}
            </form>
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
        this.setState({ password: password });
    }

    private setEmail(email: string) {
        this.setState({ email: email });
    }

    private async login() {
        const email = this.state.email;
        const password = this.state.password;

        try {
            this.setState({ error: undefined });
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            this.setState({ error: e.message });
        }
    }
}
