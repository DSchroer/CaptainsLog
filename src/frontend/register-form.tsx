import React from "react";
import {UserService} from "./services/user-service";

interface ILoginState {
    email: string;
    password: string;
    confirm: string;
    error?: string;
}

interface ILoginProps {
    userService: UserService;
}

export class RegisterForm extends React.Component<ILoginProps, ILoginState> {
    constructor(props: Readonly<ILoginProps>) {
        super(props);
        this.state = { email: "", password: "", confirm: "" };
    }

    public render() {
        return (
            <>
                <h1>Sign Up</h1>
                <hr></hr>
                <form onSubmit={ev => {
                    ev.preventDefault();
                    this.register();
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

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={this.state.confirm}
                            onChange={ev => this.setConfirmPassword(ev.target.value)} />
                    </div>

                    <div className="clearfix">
                        <input className="btn btn-primary float-left" type="submit" value="Register" />
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
        this.setState({ password: password });
    }

    private setConfirmPassword(password: string) {
        this.setState({ confirm: password });
    }

    private setEmail(email: string) {
        this.setState({ email: email });
    }

    private async register() {
        const email = this.state.email;
        const password = this.state.password;
        const confirm = this.state.confirm;

        try {
            this.setState({ error: undefined });
            await this.props.userService.register(email, password, confirm);
        } catch (e) {
            this.setState({ error: e.message });
        }
    }
}
