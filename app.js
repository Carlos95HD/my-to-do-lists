//Variables
const ulTodos = document.querySelector(".todos"),
  addForm = document.querySelector(".add"),
  searchForm = document.querySelector(".search"),
  alert = document.querySelector("#alert-no-encontrado"),
  btnBack = document.querySelector("#back"),
  btnList = document.querySelector("#btn-list");
let todos = [];

eventListener();
//Eventos
function eventListener() {
  document.addEventListener("DOMContentLoaded", inicio);

  addForm.campo.addEventListener("click", () => {
    addForm.campo.placeholder = "";
  });
  addForm.campo.addEventListener("blur", () => {
    addForm.campo.placeholder = "Agregar una nueva tarea";
  });

  addForm.addEventListener("submit", añadirTodo);
  ulTodos.addEventListener("click", deleteElement);
  searchForm.addEventListener("submit", buscarElemento);
  btnBack.addEventListener("click", cargarLista);
}

function inicio() {
  //Verificar LocalStorage
  todos = JSON.parse(localStorage.getItem("lista")) || [];

  //Creando Html del storage
  if (todos.length > 0) {
    for (const i in todos) {
      crearHtml(todos[i]);
    }
  }
  activeBtn();
}

//Funciones
function deleteElement(e) {
  if (e.target.classList.value === "delete") {
    let newArray = todos.filter((element) => element.id != e.target.id);
    todos = newArray;
    limpiarHtml();

    todos.forEach((element) => {
      crearHtml(element);
    });

    sincronizarLocalStorage();
    activeBtn();
  }
}

//Añadiendo a la lista
function añadirTodo(e) {
  e.preventDefault();
  const todo = addForm.campo.value;

  if (todo.length > 0) {
    let objTodo = {
      id: Date.now(),
      todo,
    };

    alert.style.display = "none";
    todos.push(objTodo);
    crearHtml(objTodo);

    sincronizarLocalStorage();
    addForm.reset();
    activeBtn();
  }
}

//Buscar Elemento
function buscarElemento(e) {
  e.preventDefault();

  const search = searchForm.search.value;
  let noEncontrado = true;
  limpiarHtml();
  searchForm.reset();

  //Filtra la busqueda si hay mas de 1
  for (const index in todos) {
    if (todos[index].todo === search) {
      crearHtml(todos[index]);
      noEncontrado = false;
      alert.style.display = "none";
    }
  }

  //Al no econtrar una busqueda
  if (noEncontrado) {
    alerta("No se encuentra " + "'" + search + "'");
  }

  //Busqueda Vacia
  if (search == "") {
    alerta("Busqueda vacia");
    cargarLista();
  }
}

//Limpiando Html
function limpiarHtml() {
  while (ulTodos.firstChild) {
    ulTodos.removeChild(ulTodos.firstChild);
  }
}
//Creando Lista Html
function crearHtml(todo) {
  const element = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo.todo}</span>
        <span class="delete" id=${todo.id}>×</span>
      </li>`;
  ulTodos.innerHTML += element;
}

//Desactivar btn Lista
function activeBtn() {
  const todoList = document.querySelector("#todo-list");
  if (todos.length > 0) {
    btnList.disabled = false;
    todoList.classList.add("show");
  } else {
    btnList.disabled = true;
    todoList.classList.remove("show");
  }
}

//Sincroniza el LocalStorage
function sincronizarLocalStorage() {
  localStorage.setItem("lista", JSON.stringify(todos));
}

//Alerta No encontrado
function alerta(text) {
  alert.innerHTML = `${text}`;
  alert.style.display = "grid";
  for (const i in todos) {
    crearHtml(todos[i]);
  }
}
//Recarga la lista
function cargarLista() {
  limpiarHtml();
  todos.forEach((element) => {
    crearHtml(element);
  });
}
