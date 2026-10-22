import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    editedTitle: this.props.todoDetails.title,
  }

  onToggleComplete = () => {
    this.setState(prevState => ({isCompleted: !prevState.isCompleted}))
  }

  onChangeTitle = event => {
    this.setState({editedTitle: event.target.value})
  }

  onEdit = () => {
    const {todoDetails} = this.props
    this.setState({isEditing: true, editedTitle: todoDetails.title})
  }

  onSave = () => {
    const {todoDetails, onUpdateTitle} = this.props
    const {editedTitle} = this.state
    onUpdateTitle(todoDetails.id, editedTitle)
    this.setState({isEditing: false})
  }

  render() {
    const {todoDetails, onDeleteTodo} = this.props
    const {id, title} = todoDetails
    const {isEditing, isCompleted, editedTitle} = this.state

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onChange={this.onToggleComplete}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editedTitle}
            onChange={this.onChangeTitle}
          />
        ) : (
          <p className={isCompleted ? 'todo-title completed' : 'todo-title'}>
            {title}
          </p>
        )}
        {isEditing ? (
          <button type="button" className="action-btn" onClick={this.onSave}>
            Save
          </button>
        ) : (
          <button type="button" className="action-btn" onClick={this.onEdit}>
            Edit
          </button>
        )}
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDeleteTodo(id)}
        >
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
