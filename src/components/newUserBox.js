/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';


class NewUserBox extends Component {
	constructor(props) {
		super(props);
		this.state = {name: "", email: ""}
	}

	newUserName = (e) => {
		this.setState({name: e.target.value})
	}

	newUserEmail = (e) => {
		this.setState({ email: e.target.value })
	}

	closeNewUser = () => {
		document.getElementById('new-user-box').style.display = "none"
		document.getElementById('new-user-name').value = ""
		document.getElementById('new-user-email').value = ""
		this.setState({ name: '' })
		this.setState({ email: ''})
	}

	addNewUser = async () => {
		let obj = {name: this.state.name, email: this.state.email}
		await this.props.addUserFn(obj)
		this.closeNewUser()
	}

	render() {
		return (
			<div id="new-user-box">
				<div className="app-card new-user-card">
					<div className="user-field"><label htmlFor="new-user-name">Name: </label><input type="text" id="new-user-name" onChange={this.newUserName} /></div>
					<div className="user-field"><label htmlFor="new-user-email">Email: </label><input type="text" id="new-user-email" onChange={this.newUserEmail} /></div>
					<div className="new-todo-actions">
						<input type="button" value="Cancel" onClick={this.closeNewUser} />
						<input type="button" value="Add" onClick={this.addNewUser} />
					</div>
				</div>
			</div>
		);
	}

}

export default NewUserBox;
