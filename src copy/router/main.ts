 import { authStore } from '@/stores/auth-store.js';

 const authMiddleware = (to: any, from: any, next: any) => {
  if (!authStore().isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};


const main = [
  {
    path: '/to_do_list',
    component: () => import('../layout/ToDoList.vue'),
    beforeEnter: authMiddleware,
    children: [
      {
        path: 'list_task',
        name: 'listTask',
        component: () => import('../views/to_do_list/list_task.vue')
      },
      {
        path: 'add_task',
        name: 'addTask',
        component: () => import('../views/to_do_list/add_task.vue')
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('../views/to_do_list/edit_task.vue')
      }
    ]
  }
]

export default main
