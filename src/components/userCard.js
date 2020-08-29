/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import UserField from "./userField";
import './CSS/userCard.css'



class UserCard extends Component {
	constructor(props) {
		super(props);
		this.state =  { tempName: this.props.user.name, 
						tempEmail: this.props.user.email, 
						tempStreet: this.props.user.address.street,
						tempCity: this.props.user.address.city,
						tempZipcode: this.props.user.address.zipcode,
					}
	}

	componentDidMount() {
		this.getTodosStatus()
	}

	componentDidUpdate() {
		this.getTodosStatus()
	}

	showOtherData = (e) => {
		e.target.nextSibling.style.display = "block"
	}

	hideOtherData = (e) => {
		let node
		if (e.target.className === "other-data-wrap") {
			node = e.target
		} else if (e.target.parentNode.className === "other-data-wrap") {
			node = e.target.parentNode
		}
		if (node) {
			node.style.display = "none"
		}
	}

	updateName = (val) => {
		this.setState({ tempName: val })
	}

	updateEmail = (val) => {
		this.setState({ tempEmail: val })
	}

	updateStreet = (val) => {
		this.setState({ tempStreet: val })
	}

	updateCity = (val) => {
		this.setState({ tempCity: val })
	}

	updateZipcode = (val) => {
		this.setState({ tempZipcode: val })
	}

	updateUser = (id) => {
		let obj = {
			name: this.state.tempName,
			email: this.state.tempEmail,
			street: this.state.tempStreet,
			city: this.state.tempCity,
			zipcode: this.state.tempZipcode,
		}
		this.props.updateFn(id, obj)
	}

	removeUser = (id) => {
		this.props.deleteFn(id)
	}

	loadUserData = (id) => {
		this.props.displayUserFn(id)
	}
	
	getTodosStatus = () => {
		let todosCompleted = true
		for (let i = 0; i < this.props.userTodos.length; i++) {
			if (!this.props.userTodos[i].completed) {
				todosCompleted = false
			}
		}
		if (todosCompleted) {
			document.getElementById(`user-${this.props.user.id}`).classList.remove('todos-uncompleted')
			document.getElementById(`user-${this.props.user.id}`).classList.add('todos-completed')
		} else {
			document.getElementById(`user-${this.props.user.id}`).classList.remove('todos-completed')
			document.getElementById(`user-${this.props.user.id}`).classList.add('todos-uncompleted')
		}
	}

	render() {
		let user = this.props.user;
		
		return (
			<div id={`user-${user.id}`} className={`app-card user-container`}>
				<div className="user-id" onClick={() => this.loadUserData(user.id)}>ID: {user.id}</div>
				<UserField id={user.id} label="Name" value={user.name} callback={val => this.updateName(val)} />
				<UserField id={user.id} label="Email" value={user.email} callback={val => this.updateEmail(val)} />
				<div className="other-data-trigger" onMouseOver={this.showOtherData}>Other Data</div>
				<div className="other-data-wrap" onClick={this.hideOtherData}>
					<UserField id={user.id} label="Street" value={user.address.street} callback={val => this.updateStreet(val)} />
					<UserField id={user.id} label="City" value={user.address.city} callback={val => this.updateCity(val)} />
					<UserField id={user.id} label="Zip Code" value={user.address.zipcode} callback={val => this.updateZipcode(val)} />
				</div>
				<div className="user-actions">
					<input type="button" value="Update" onClick={() => this.updateUser(user.id)} />
					<input type="button" value="Delete" onClick={() => this.removeUser(user.id)} />
				</div>
			</div>
		);
	}

}

export default UserCard;
