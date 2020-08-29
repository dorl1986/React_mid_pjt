/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

class TodoCard extends Component {
	constructor(props) {
		super(props);
		this.state =  { }
	}

	markComplete = (id) => {
		this.props.completeTaskFn(id)
	}

	render() {
		let todo = this.props.todo;
		let completeBtn = !todo.completed ? <input type="button" value="Mark Complete" onClick={() => this.markComplete(todo.id)} /> : ''
		return (
			<div className="app-card todo-container">
				Title: {todo.title}<br/>
				Completed: {todo.completed ? 'True' : 'False'}
				{completeBtn}
			</div>
		);
	}

}

export default TodoCard;
