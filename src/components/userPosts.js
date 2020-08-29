/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import PostCard from './postCard'

class UserPosts extends Component {
	constructor(props) {
		super(props);
		this.state = { postTitle: "", postBody: ""}
	}

	openNewPostBox = () => {
		document.getElementById('posts-list').style.display = "none"
		document.getElementById('new-post-box').style.display = "block"
	}

	newPostTitle = (e) => {
		this.setState({ postTitle: e.target.value})
	}

	newPostBody = (e) => {
		this.setState({ postBody: e.target.value })
	}

	closeNewPost = () => {
		document.getElementById('posts-list').style.display = "block"
		document.getElementById('new-post-box').style.display = "none"
		document.getElementById('new-post-title').value = ""
		document.getElementById('new-post-body').value = ""
		this.setState({ postTitle: '' })
		this.setState({ postBody: ''})
	}

	addNewPost = async () => {
		await this.props.addNewFn(this.state.postTitle, this.state.postBody, this.props.user.id)
		this.closeNewPost()
	}

	render() {
		let posts = this.props.posts.map(item => <PostCard key={item.id} post={item} />)
		return (
			<div className="user-posts app-card">
				<div className="user-items-title-block">
					<h2>Posts - {this.props.user.name}</h2>
					<input type="button" value="Add" onClick={this.openNewPostBox} />
				</div>
				<div id="posts-list">
					{posts}
				</div>
				<div id="new-post-box" className="new-item-box">
					<div className="app-card new-post-card">
						<div className="post-field"><label htmlFor="new-post-title">Title: </label><input type="text" id="new-post-title" onChange={this.newPostTitle} /></div>
						<div className="post-field"><label htmlFor="new-post-body">Body: </label><input type="text" id="new-post-body" onChange={this.newPostBody} /></div>
						<div className="new-post-actions">
							<input type="button" value="Cancel" onClick={this.closeNewPost} />
							<input type="button" value="Add" onClick={this.addNewPost} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default UserPosts;
