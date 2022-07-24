// const input = document.querySelector('input');
// const form = document.querySelector('form');
// const mainContainer = document.querySelector('.grocery-container');
// const alert = document.querySelector('.alert');
// const submitBtn = document.querySelector('.submit-btn');
// const deleteAllBtn = document.querySelector('.clear-items');


// window.addEventListener('load', () => {
//     input.focus();
// })
// //form:::
// form.addEventListener('submit', addItem);

// function addItem(e) {
//     e.preventDefault();
//     let value = input.value;
//     if (value === '') {
//         displayAlert('Write Your Task', 'danger');
//     } else {
//         displayAlert('success', 'success');
//         const containerList = document.createElement('div');
//         containerList.className = 'grocery-list';
//         mainContainer.appendChild(containerList);
//         const containerItem = document.createElement('article');
//         containerItem.className = 'grocery-item';
//         containerList.appendChild(containerItem);

//         containerItem.innerHTML = `<p class="title">${value}</p>
//                     <div class="btn-container">
//                         <button class="edit-btn" type="button">
//                             <i class="fas fa-edit"></i>
//                         </button>
//                         <button class="delete-btn" type="button">
//                             <i class="fas fa-trash"></i>
//                         </button>
//                     </div>`;
//     };
//     input.value = '';
//     input.focus();
//     // const childrenNum = containerList.childElementCount;
//     // console.log(childrenNum)
//     // if (childrenNum == 0) {
//     //     deleteAllBtn.classList.remove('active');
//     // } else {
//     //     deleteAllBtn.classList.add('active');
//     // }
// };
// document.addEventListener('click', (e) => {
//     const element = e.target
//     const parent = element.parentElement.parentElement;
//     if (element.classList.contains('delete-btn')) {
//         parent.classList.add('move');
//         setTimeout(() => {
//             parent.remove();
//         }, 800);
//         displayAlert('Item Deleted', 'danger');
//     };
//     // if (element.classList.contains('edit-btn')) {
//     //     const text = element.parentElement.previousElementSibling;
//     //     submitBtn.innerHTML = 'edit';
//     //     input.value = text.textContent;
//     //     submitBtn.addEventListener('click', () => {
//     //         text.textContent = input.value;

//     //     });
//     // };
// })

// function displayAlert(text, type) {
//     alert.classList.remove(`alert-danger`);
//     alert.classList.remove(`alert-success`);
//     alert.innerHTML = '';
//     alert.classList.add(`alert-${type}`);
//     alert.innerHTML = text;

//     setTimeout(() => {
//         alert.classList.remove(`alert-${type}`);
//         alert.innerHTML = '';
//     }, 1000);
// }
// // deleteAllBtn.addEventListener('click', () => {
// //     console.log(containerList);
// //     containerList.remove();
// // })

// =============================================================
// =============================================================
// =============================================================

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submit = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//edit option
let editElement;
let editFlag = false;
let editID = '';
let element;

//======== Event Listener: =========
window.addEventListener('load', () => {
    grocery.focus();
})
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
container.addEventListener('click', deleteItem);
//=============== functions: ==========
function addItem(e) {
    container.classList.add('show-container');
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        displayAlert('item added to list', 'success');
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        element.setAttribute('data-id', id);
        element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button class="edit-btn" type="button">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" type="button">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', editItem);
        list.appendChild(element);
        // add item To local storage
        addItemToLocalStorage(id, value);
        // set back default
        setBackDefault();
    } else if (value && editFlag) {
        displayAlert('edit item', 'success');

        // element.querySelector('.title').textContent = value; // target =>p , 
        editElement.textContent = value;  // target =>p ,
        displayAlert('value changed', 'success');

        setBackDefault();
    } else {
        displayAlert('empty value', 'danger');
    };
};
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    items.forEach(item => {
        list.removeChild(item);
    })
    container.classList.remove("show-container");
    displayAlert('empty list', 'danger');
    setBackDefault();
}

function addItemToLocalStorage(id, value) {
    console.log('add item to local storage');
}
function setBackDefault() {
    grocery.value = '';
    grocery.focus();
    submit.textContent = 'submit';
    editFlag = false;
    editID = '';

}

function displayAlert(text, action) {
    alert.classList.add(`alert-${action}`);
    alert.textContent = text

    setTimeout(() => {
        alert.classList.remove(`alert-${action}`);
        alert.textContent = ''
    }, 1000)
}
function deleteItem(e) {
    const element = e.target;
    if (element.classList.contains('delete-btn')) {
        const parent = element.parentElement.parentElement;
        parent.classList.add('move');
        displayAlert('item deleted', 'danger');
        setTimeout(() => {
            parent.remove();
        }, 1700);
        if (list.childElementCount == 1) {
            setTimeout(() => {
                container.classList.remove('show-container');
            }, 2000);
        };
    };
};
function editItem(e) {
    element = e.currentTarget.parentElement.parentElement;
    editElement = element.querySelector('.title'); // use this to target element // حدد فاريابل ف البدلية وخما اديته قيمة = العنصر الى عايز اضيف فيه البقيمة بعد م عدلتها عشان يعدل ويضيف فى نفس العنصر
    editFlag = true; // to use second if condition ===> value !== "" ,editFlag = true;
    grocery.value = element.textContent.trimRight();
    submit.textContent = 'edit';
    console.log(editElement);

}