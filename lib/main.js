const DOMNodeCollection = require('./dom_node_collection.js');

const queue = [];

function $l(selector) {

  if (selector instanceof Function) {
    queue.push(selector);
  } else if (selector instanceof HTMLElement) {
    let element = selector;
    return new DOMNodeCollection([element]);
  } else {
    let element = document.querySelectorAll(selector);
    const elementArray = Array.from(element);
    return new DOMNodeCollection(elementArray);
  }
}

window.$l = $l;

$l.extend = function(...objects) {
  return Object.assign(...objects);
};

$l.ajax = function(options) {
  let defaults = {
    success(data) { JSON.parse('Success'); },
    error() { JSON.parse("An error occurred");},
    url: 'https://dog.ceo/api/breeds/image/random',
    method: 'GET',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const mergedCall = Object.assign(defaults, options);

  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(mergedCall.method, mergedCall.url);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        console.log(xhr.response);
      } else {
        console.log(xhr.status);
        console.log(xhr.responseType);
      }
    };

    xhr.send(mergedCall.data);
  }).then( () => console.log('this was promised'));
};

// To-Do methods
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

const submitChanges = () => {
  $l('.submit-changes').on('click', (e) => {
    const todoValue = $l(e.currentTarget).parent().find('input').val();
    $l(e.currentTarget).parent().html(
      `<div class='complete'>
        <i class="far fa-check-square"></i>
      </div>
      <li class='edited-changes'>
        ${todoValue}
      </li>
      <div class="edit">
        <i class="fas fa-edit"></i>
      </div>`
    );
    complete();
    edit();
  });

  $l('.edited-changes').on('keydown', (e) => {
    if (e.keyCode == 13) {
      const todoValue = $l(e.currentTarget).parent().find('input').val();
      $l(e.currentTarget).parent().html(
        `<div class='complete'>
        <i class="far fa-check-square"></i>
      </div>
      <li class='edited-changes'>
        ${todoValue}
      </li>
      <div class="edit">
        <i class="fas fa-edit"></i>
      </div>`
    );
    complete();
    edit();
    }
  });
};

const complete = () => {
  $l('.complete').on('click', (e) => {
    $l(e.currentTarget).parent().htmlEls[0].remove();
  });
};

const submitFormButton = () => {
  $l('.submit-button').on('click', (e) => {
    createTodo(e);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  $l('.submit-button').on('click', (e) => {
    createTodo(e);
  });
  $l('.todo-form').on('submit', (e) => {
    createTodo(e);
  });

  edit();
});


module.exports = $l;
