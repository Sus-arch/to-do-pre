let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const updateTasks = () => {
	const items = getTasksFromDOM();
	saveTasks(items);
};

const loadTasks = () => {
	const tasks = localStorage.getItem("tasks");
	return tasks ? JSON.parse(tasks) : items;
};

const createItem = (item) => {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener("click", () => {
		clone.remove();
		updateTasks();
	})

	duplicateButton.addEventListener("click", () => {
		const newItem = createItem(textElement.textContent);
		listElement.prepend(newItem);
		updateTasks();
	})

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", true);
		textElement.focus();
	})

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", false);
		updateTasks();
	})

	textElement.textContent = item;

	return clone;
}

const getTasksFromDOM = () => {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];

	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	})

	return tasks;
}

const saveTasks = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

items = loadTasks();
items.forEach(item => {
	listElement.append(createItem(item));
})

formElement.addEventListener("submit", (event) => {
	event.preventDefault();

	const taskText = inputElement.value.trim();
	if (!taskText) return;

	const newItem = createItem(taskText);
	listElement.prepend(newItem);

	updateTasks();
	formElement.reset();
})
