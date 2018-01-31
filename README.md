# Just Do It

A To-Do application that uses the StarDOM custom JavaScript library that I built, specializing in DOM manipulation and event handling.

[Live-Demo](http://www.christopheradamlee.com/JustDoIt/)

<div style="text-align: center; display: flex; justify-content: center; align-items: center;">
<img src="./screenshots/justdoit_updated.gif"></img>
</div>

## Demonstrates full CRUD functionality:
### Creating ToDos
The `createTodo` function appends a `todo-item` HTML element into the notepad along with invoking functions to 'Complete', 'Edit', and 'Submit new Todos'.
``` javascript
const createTodo = (e) => {
  e.preventDefault();
  let description = $l('.description');
  $l('.notepad').append(
    `<div class='todo-item'>
      <div class='complete'>
        <i class="far fa-check-square"></i>
      </div>
      <li>${description.val()}</li>
      <div class="edit">
        <i class="fas fa-edit"></i>
      </div>
    </div>`
  );

  complete();
  submitFormButton();
  edit();
};
```
### Updating/Editing ToDos
The `edit` function replaces the current target's parent HTML element with another to edit it's innerHTML via `<input>` tag. It also invokes functions to 'Complete' and 'Submit Changes'.
``` javascript
const edit = () => {
  $l('.edit').on('click', (e) => {
    $l(e.currentTarget).parent().html(`
      <div class='complete'>
        <i class="far fa-check-square"></i>
      </div>
      <input class='edited-changes' type='text' value="${$l($l(e.currentTarget).parent().htmlEls[0]).find('li').htmlEls[0].innerHTML.trim()}"></input>
      <div class="submit-changes">
        <i class="fab fa-telegram-plane"></i>
      </div>
      `);

      complete();
      submitChanges();
    });
};
```
### Deleting ToDos
The `complete` function removes the `todo-item` HTML element from the DOM when clicking its respective checkmark icon.
``` javascript
const complete = () => {
  $l('.complete').on('click', (e) => {
    $l(e.currentTarget).parent().htmlEls[0].remove();
  });
};
```
