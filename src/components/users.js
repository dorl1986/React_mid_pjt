/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import UserCard from "./userCard";
import './CSS/users.css'



class Users extends Component {
	constructor(props) {
		super(props);
	}

	removeUser = (id) => {
		this.props.deleteFn(id)
	}

	loadUserData = (id) => {
		this.props.displayUserFn(id)
	}

	updateUser = (id,obj) => {
		this.props.updateFn(id,obj)
	}

	render() {
		let users = this.props.usersData.map(user => 
			<UserCard 
			key={user.id} 
			user={user} 
			deleteFn={id => this.removeUser(id)} 
			updateFn={(id, obj) => this.updateUser(id, obj)} 
			displayUserFn={id => this.loadUserData(id)} 
			userTodos = {this.props.todos.filter(item => item.userId === user.id)}
			/>
		)
		return (
			<div className="users-wrap">
				{ users }
			</div>
		);
	}

}

export default Users;
