/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

class SearchBox extends Component {
	constructor(props) {
		super(props);
	}

	updateSearchTerm = (e) => {
		this.props.callback(e.target.value)
	}

	render() {
		return (
			<div className="search-users">
				<label htmlFor="search-box">Search:</label>
				<input id="search-box" type="text" onChange={this.updateSearchTerm} />
			</div>
		);
	}

}

export default SearchBox;
