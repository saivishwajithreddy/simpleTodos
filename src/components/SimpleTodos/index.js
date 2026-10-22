import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    userInput: '',
  }

  nextId = initialTodosList.length + 1

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onAddTodo = () => {
    const {userInput} = this.state
    const parts = userInput.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const isCount = parts.length > 1 && /^\d+$/.test(lastPart)

    const count = isCount ? parseInt(lastPart, 10) : 1
    const title = isCount ? parts.slice(0, -1).join(' ') : userInput.trim()

    if (title === '') return

    const newTodos = Array.from({length: count}, () => {
      this.nextId += 1
      return {id: this.nextId, title}
    })

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      userInput: '',
    }))
  }

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  onUpdateTitle = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  render() {
    const {todosList, userInput} = this.state
    return (
      <div className="app-container">
        <div className="todos-card">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-container">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a todo, e.g. Buy milk 3"
              value={userInput}
              onChange={this.onChangeInput}
            />
            <button type="button" className="add-btn" onClick={this.onAddTodo}>
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                onDeleteTodo={this.onDeleteTodo}
                onUpdateTitle={this.onUpdateTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
