/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import TodoCard from './todoCard'


class UserTodos extends Component {
	constructor(props) {
		super(props);
		this.state = {todoTitle: ""}
	}

	markComplete = (id) => {
		this.props.completeTaskFn(id)
	}

	openNewTodoBox = () => {
		document.getElementById('todos-list').style.display = "none"
		document.getElementById('new-todo-box').style.display = "block"
	}

	newTodoTitle = (e) => {
		this.setState({todoTitle: e.target.value})
	}

	closeNewTodo = () => {
		document.getElementById('todos-list').style.display = "block"
		document.getElementById('new-todo-box').style.display = "none"
		document.getElementById('new-todo-title').value = ""
		this.setState({todoTitle: ''})
	}

	addNewTodo = async () => {
		await this.props.addNewFn(this.state.todoTitle, this.props.user.id)
		this.closeNewTodo()
	}

	render() {
		let todos = this.props.todos.map(item => <TodoCard key={item.id} todo={item} completeTaskFn={id => this.markComplete(id)} />)
		return (
			<div className="user-todos app-card">
				<div className="user-items-title-block">
					<h2>Todos - {this.props.user.name}</h2>
					<input type="button" value="Add" onClick={this.openNewTodoBox} />
				</div>
				<div id="todos-list">
					{todos}
				</div>
				<div id="new-todo-box" className="new-item-box">
					<div className="app-card new-todo-card">
						<div className="todo-field"><label htmlFor="new-todo-title">Title: </label><input type="text" id="new-todo-title" onChange={this.newTodoTitle} /></div>
						<div className="new-todo-actions">
							<input type="button" value="Cancel" onClick={this.closeNewTodo} />
							<input type="button" value="Add" onClick={this.addNewTodo} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default UserTodos;
