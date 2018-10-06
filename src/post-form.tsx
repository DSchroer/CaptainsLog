import firebase from "firebase/app";
import React from "react";

interface IFormState {
    userId: string;
}

interface IPostState {
    content: string;
    date: Date;
    posting: boolean;
    error?: string;
}

export class PostForm extends React.Component<IFormState, IPostState> {
    constructor(props: Readonly<IFormState>) {
        super(props);
        this.state = { content: "", date: new Date(), posting: false };
    }

    public render() {
        return (
            <form onSubmit={ev => {
                ev.preventDefault();
                this.submitPost();
            }}>

                <div className="form-group">
                    <label>{this.formatDate(this.state.date)}</label>
                    <textarea
                        className="col-12 form-control"
                        placeholder=""
                        value={this.state.content}
                        onChange={ev => this.updatePost(ev.target.value)} />
                </div>

                <div className="row justify-content-sm-center justify-content-md-right">
                    <div className="col-sm-12 col-md-4">
                        <input type="submit"
                            value="Post"
                            className="btn btn-primary btn-block"
                            disabled={this.state.posting} />
                    </div>
                </div>

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

    private async submitPost() {
        if (!this.state.content) {
            this.setState({ error: "Cannot post empty log" });
            return;
        }

        this.setState({ posting: true, date: new Date(), error: undefined });

        try {
            await firebase.database().ref(`${this.props.userId}/posts`).push({
                date: this.state.date.toISOString(),
                content: this.state.content,
            });

            this.setState({ posting: false, content: "" });
        } catch (e) {
            this.setState({ posting: false, error: e.message });
        }
    }

    private updatePost(content: string) {
        this.setState({ content: content });
    }

    private formatDate(date: Date): string {
        return date.toDateString();
    }
}
