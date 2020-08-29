/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

class PostCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let post = this.props.post;
		return (
			<div className="app-card post-container">
				Title: {post.title}<br/>
				Body: {post.body}
			</div>
		);
	}

}

export default PostCard;
