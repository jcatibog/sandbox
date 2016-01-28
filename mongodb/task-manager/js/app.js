var apiKey = '?apiKey=IYpTpg1XgJ2F5a2VodSy-8qoSBkAETig';
var urlBase = 'https://api.mongolab.com/api/1/databases/task-manager/collections';
var categoriesCollection = '/categories';
var tasksCollection = '/tasks';


function addCategory() {
    var categoryName = $('input#category_name').val();
    $.ajax({
        url: urlBase + categoriesCollection + apiKey,
        data: JSON.stringify({ "category_name" : categoryName }),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            window.location.href = 'categories.html';
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    return false;
}

function addTask() {
    var taskName = $('input#task_name').val();
    var category = $('select#category').val();
    var dueDate = $('input#due_date').val();
    var urgent = $('input#is_urgent:checked').val() || 'N';
    $.ajax({
        url: urlBase + tasksCollection + apiKey,
        data: JSON.stringify({
            "task_name": taskName,
            "category": category,
            "due_date": dueDate,
            "is_urgent": urgent
        }),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            window.location.href = "index.html";
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    })
    return false;
}

function deleteCategory() {
    var categoryId = $(this).data('category-id');
    $.ajax({
        url: urlBase + categoriesCollection + '/' + categoryId + apiKey,
        type: "DELETE",
        async: true,
        timeout: 1000,
        success: function (data) {
            window.location.href = 'categories.html';
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    return false;
}

function deleteTask() {
    var taskId = $(this).data('task-id');
    $.ajax({
        url: urlBase + tasksCollection + '/' + taskId + apiKey,
        type: "DELETE",
        async: true,
        timeout: 1000,
        success: function (data) {
            window.location.href = 'index.html';
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    return false;
}

function editCategory() {
    var categoryId = sessionStorage.getItem('currentCategoryId');
    var categoryName = $('input#category_name').val();
    $.ajax({
        url: urlBase + '/' + categoryId + apiKey,
        data: JSON.stringify({ "category_name" : categoryName }),
        type: "PUT",
        contentType: "application/json",
        success: function (data) {
            window.location.href = 'categories.html';
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    return false;
}

function editTask() {
    var taskName = $('input#task_name').val();
    var category = $('select#category').val();
    var dueDate = $('input#due_date').val();
    var urgent = $('input#is_urgent:checked').val() || 'N';
    $.ajax({
        url: urlBase + tasksCollection + apiKey,
        data: JSON.stringify({
            "task_name": taskName,
            "category": category,
            "due_date": dueDate,
            "is_urgent": urgent
        }),
        type: "PUT",
        contentType: "application/json",
        success: function (data) {
            window.location.href = "index.html";
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    })
    return false;
}

function getCategories() {
    $.get(urlBase + categoriesCollection + apiKey, function (data) {
        $.each(data, function (key, data) {
            var btnEdit = '<a class="btn btn-primary btn-edit-category" data-category-id="' + data._id.$oid + '" role="button">Edit</a>';
            var btnDelete = '<a class="btn btn-danger btn-delete-category" data-category-id="' + data._id.$oid + '" role="button">Delete</a>';
            var btnGroup = '<div class="btn-group pull-right">' + btnEdit + btnDelete + '</div>';

            var output = '<li class="col-xs-12 list-group-item category">' + data.category_name + btnGroup + '</li>';
            $('ul.list-group').append(output);
        });
    });
}

function getCategory() {
    var categoryId = sessionStorage.getItem('currentCategoryId');
    var url = urlBase + categoriesCollection + '/' + categoryId + apiKey;
    $.get(url, function (data) {
        $('input#category_name').val(data.category_name);
    });
}

function getCategoryOptions() {
    $.get(urlBase + categoriesCollection + apiKey, function (data) {
        $.each(data, function (key, data) {
            var optionCategory = '<option value="' + data.category_name + '">' + data.category_name + '</option>';
            $('select#category').append(optionCategory);
        });
    });
}

function getTasks() {
    $.get(urlBase + tasksCollection + apiKey, function (data) {
        $.each(data, function (key, data) {
            var btnEdit = '<a class="btn btn-primary btn-edit-task" data-task-id="' + data._id.$oid + '" role="button">Edit</a>';
            var btnDelete = '<a class="btn btn-danger btn-delete-task" data-task-id="' + data._id.$oid + '" role="button">Delete</a>';
            var btnGroup = '<div class="btn-group pull-right">' + btnEdit + btnDelete + '</div>';

            var output = '<li class="col-xs-12 task list-group-item">';
            output += data.task_name + ' <span class="due_on">[Due: ' + data.due_date + ']</span>';
            if (data.is_urgent == 'Y') {
                output += ' <span class="label label-danger">Urgent</span>';
            }
            output += btnGroup + '</li>';
            $('ul#tasks').append(output);
        })
    });
}

function getTask() {
    var taskId = sessionStorage.getItem('currentTaskId');
    var url = urlBase + tasksCollection + '/' + taskId + apiKey;
    $.get(url, function (data) {
        console.log(data);
        $('input#task_name').val(data.task_name);
        $('select#category').val(data.category);
        $('input#due_date').val(data.due_date);
        if (data.is_urgent == 'Y') {
            $('input#is_urgent').prop('checked', true);
        }
    });
}

function setCategoryForEdit() {
    var categoryId = $(this).data('category-id');
    sessionStorage.setItem('currentCategoryId', categoryId);
    window.location.href = 'editcategory.html';
    return false;
}

function setTaskForEdit() {
    var taskId = $(this).data('task-id');
    sessionStorage.setItem('currentTaskId', taskId);
    window.location.href = 'edittask.html';
    return false;
}

$(document).ready(function () {
    switch (document.location.pathname) {
        case '/addcategory.html':
            $('form#add_category').submit(addCategory);
            break;
        case '/addtask.html':
            getCategoryOptions();
            $('form#add_task').submit(addTask);
            break;
        case '/categories.html':
            getCategories();
            $('body').on('click', '.btn-edit-category', setCategoryForEdit);
            $('body').on('click', '.btn-delete-category', deleteCategory);
            break;
        case '/editcategory.html':
            getCategory();
            $('form#edit_category').submit(editCategory);
            break;
        case '/edittask.html':
            getCategoryOptions();
            getTask();
            $('form#edit_task').submit(editTask);
            break;
        case '/index.html':
        default:
            getTasks();
            $('body').on('click', '.btn-edit-task', setTaskForEdit);
            $('body').on('click', '.btn-delete-task', deleteTask);
            break;
    }
});
