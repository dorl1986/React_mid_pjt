/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';


class UserField extends Component {
	constructor(props) {
		super(props);
	}

	updateState = (e) => {
		this.props.callback(e.target.value)
	}

	render() {
		let label = this.props.label.toLowerCase().replace(' ', '');
		return (
			<div className={`user-field user-${label}`}>
				<label htmlFor={`user-${this.props.id}-${label}`}>{this.props.label}:</label>
				<input id={`user-${this.props.id}-${label}`} type="text" defaultValue={this.props.value} onChange={e => this.updateState(e)} />
			</div>
		);
	}

}

export default UserField;
