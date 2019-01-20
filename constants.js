export const HOST_NAME = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000': 'http://127.0.0.1:8000';


export const routes = {
  'register': '/rest-auth/registration/',
  'login': '/rest-auth/login/',
  'logout': '/rest-auth/logout/',
  'columns': '/todo/lists/',
  'create_task': '/tasks/create/',
  'archive_task': id => `/tasks/archive/${id}/`,
  'move_task': id => `/tasks/move/${id}/`,
  'edit_task': id => `/tasks/edit/${id}/`,
};
