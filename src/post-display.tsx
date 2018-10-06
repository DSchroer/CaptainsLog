import React from "react";

export interface IPost {
    id: string;
    date: Date;
    content: string;
}

interface IPostProps {
    previous?: Date;
    post: IPost;
}

export class Post extends React.Component<IPostProps> {
    constructor(props: Readonly<IPostProps>) {
        super(props);
    }

    public render() {
        return (
            <div>
                {this.title()}
                <p>{this.props.post.content}</p>
            </div>
        );
    }

    private title() {
        const myDate = this.formatDate(this.props.post.date);
        if (!this.props.previous || this.formatDate(this.props.previous) !== myDate) {
            return (<strong>{myDate}</strong>);
        }
    }

    private formatDate(date: Date): string {
        return date.toDateString();
    }
}
