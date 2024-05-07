import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

const auth = [
  {
    path: '/',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/Login.vue')
      }
    ]
  }
]

export default auth
