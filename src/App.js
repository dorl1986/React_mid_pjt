/* eslint-disable no-useless-constructor */
import React, {Component} from 'react';
import utils from './components/utils'
import './App.css'
import Users from "./components/users";
import SearchBox from "./components/searchBox";
import UserTodos from "./components/userTodos";
import UserPosts from "./components/userPosts";
import NewUserBox from "./components/newUserBox";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [], 
			todos: [], 
			posts: [], 
			filteredUsers: [],
			userTodos: [],
			userPosts: [],
			selectedUser: {},
		}
	}

	async componentDidMount() {
		let resp1 = await utils.getAll("https://jsonplaceholder.typicode.com/users")
		let resp2 = await utils.getAll("https://jsonplaceholder.typicode.com/todos")
		let resp3 = await utils.getAll("https://jsonplaceholder.typicode.com/posts")
		this.setState({ users: resp1.data, todos: resp2.data, posts: resp3.data, filteredUsers: resp1.data })
	}

	removeUser = async (id) => {
		let usersList = this.state.users;
		console.log(usersList)
		usersList = usersList.filter(function (obj) {
			return obj.id !== id;
		});
		console.log(usersList)
		await this.setState({ users: usersList, filteredUsers: usersList })
		alert('User Deleted');
	}

	updateUser = async (id, obj) => {
		let usersList = this.state.users 
		let userIndex = usersList.map(function (e) { return e.id; }).indexOf(id);
		usersList[userIndex].name = obj.name;
		usersList[userIndex].email = obj.email;
		usersList[userIndex].address.street = obj.street;
		usersList[userIndex].address.city = obj.city;
		usersList[userIndex].address.zipcode = obj.zipcode;
		await this.setState({ users: usersList, filteredUsers: usersList })
		alert('User Updated');
	}

	filterUsers = (term) => {
		term = term.toLowerCase()
		let tempUsers = this.state.users
		let filteredUsers = tempUsers.filter(user => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term))
		this.setState({ filteredUsers: filteredUsers })
	}

	loadUserData = async (id) => {
		let userTodos = this.state.todos.filter(item => item.userId === id)
		let userPosts = this.state.posts.filter(item => item.userId === id)
		await this.setState({ userTodos: userTodos })
		await this.setState({ userPosts: userPosts })
		await this.setState({ selectedUser: this.state.users.reduce((x,y) => y.id === id ? y : x) })
		document.getElementById('user-items').style.display = "block"
		for (let i = 0; i < document.getElementsByClassName('selected-user').length; i++) {
			document.getElementsByClassName('selected-user')[i].classList.remove("selected-user");
		}
		document.getElementById(`user-${id}`).classList.add("selected-user")
		document.getElementById('new-user-box').style.display = "none";
	}

	markComplete = async (id) => {
		let todosList = this.state.todos
		let todoIndex = todosList.map(function (e) { return e.id; }).indexOf(id);
		todosList[todoIndex].completed = true;
		await this.setState({ todos: todosList })
	}

	addNewTodo = async (title,userId) => {
		let largestIdObj = this.state.todos.reduce((x,y) => y.id > x.id ? y : x)
		let nextId = largestIdObj.id + 1;
		let obj = {completed: false,userId: userId, title:title,id: nextId}
		this.setState({ todos: [...this.state.todos, obj] })
		this.setState({ userTodos: [...this.state.userTodos, obj]})
	}

	addNewPost = async (title, body, userId) => {
		let largestIdObj = this.state.posts.reduce((x, y) => y.id > x.id ? y : x)
		let nextId = largestIdObj.id + 1;
		let obj = { userId: userId, title: title, id: nextId, body: body }
		this.setState({ posts: [...this.state.posts, obj] })
		this.setState({ userPosts: [...this.state.userPosts, obj] })
	}

	openNewUserBox = () => {
		document.getElementById('user-items').style.display = "none"
		document.getElementById('new-user-box').style.display = "block"
		for (let i = 0; i < document.getElementsByClassName('selected-user').length; i++) {
			document.getElementsByClassName('selected-user')[i].classList.remove("selected-user");
		}
	}

	addNewUser = async (obj) => {
		let largestIdObj = this.state.users.reduce((x, y) => y.id > x.id ? y : x)
		let nextId = largestIdObj.id + 1;
		let newUser = {
			id: nextId,
			name: obj.name,
			email: obj.email,
			address: {
				street: '',
				zipcode: '',
				city: ''
			}
		}
		this.setState({ users: [...this.state.users, newUser] })
		await this.setState({ filteredUsers: [...this.state.filteredUsers, newUser] })
		alert('User Added')
	}

	render() {
		return (
			<div className="app-wrap app-card">
				<div id="app-users">
					<div className="app-users-top">
						<SearchBox callback={term => this.filterUsers(term)} />
						<input type="button" value="Add" onClick={this.openNewUserBox} />
					</div>
					<Users usersData={this.state.filteredUsers} todos={this.state.todos} deleteFn={id => this.removeUser(id)} updateFn={(id, obj) => this.updateUser(id, obj)} displayUserFn={id => this.loadUserData(id)} />
				</div>
				<NewUserBox addUserFn={obj => this.addNewUser(obj)} />
				<div id="user-items">
					<UserTodos todos={this.state.userTodos} user={this.state.selectedUser} completeTaskFn={id => this.markComplete(id)} addNewFn={(title, userId) => this.addNewTodo(title, userId)} />
					<UserPosts posts={this.state.userPosts} user={this.state.selectedUser} addNewFn={(title, body, userId) => this.addNewPost(title, body, userId)} />
				</div>
			</div>
		);
	}
  
}

export default App;
