import React from "react";
import {UserService} from "./services/user-service";

interface ILoginState {
    email: string;
    error?: string;
}

interface IForgotProps {
    onSend: () => void;
    userService: UserService;
}

export class ForgotForm extends React.Component<IForgotProps, ILoginState> {
    constructor(props: Readonly<IForgotProps>) {
        super(props);
        this.state = { email: "" };
    }

    public render() {
        return (
            <>
                <h1>Forgot Password</h1>
                <hr></hr>
                <form onSubmit={ev => {
                    ev.preventDefault();
                    this.resetPassword();
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

                    <div className="clearfix">
                        <input className="btn btn-primary float-left" type="submit" value="Sent Password Reset" />
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

    private setEmail(email: string) {
        this.setState({ email: email });
    }

    private async resetPassword() {
        const email = this.state.email;

        try {
            this.setState({ error: undefined });
            await this.props.userService.resetPassword(email);
            this.props.onSend();
        } catch (e) {
            this.setState({ error: e.message });
        }
    }
}
