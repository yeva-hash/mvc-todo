export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onTodoListChanged(this.model.todos);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.model.bindTodoListChanged(this.onTodoListChanged);
  }
  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };
  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };
  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };
  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  };
  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };
}
