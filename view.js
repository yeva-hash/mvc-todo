export class View {
  constructor() {
    this.app = this.getElement("#app-root");
    this.title = this.createElement("h1");
    this.title.textContent = "Todos";
    this.form = this.createElement("form");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todos";
    this.input.name = "todo";
    this.submitButton = this.createElement("button", "submit");
    this.submitButton.textContent = "Submit";
    this.todoList = this.createElement("ul", "todo-list");
    this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.todoList);
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  get _todoText() {
    return this.input.value;
  }
  _resetInput() {
    this.input.value = "";
  }
  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do, create maybe?";
      this.todoList.append(p);
    } else {
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;
        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;
        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");
        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }
        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        li.append(checkbox, span, deleteButton);
        this.todoList.append(li);
      });
    }
  }
  bindAddTodo(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }
  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className === "delete") {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }
  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }
}
