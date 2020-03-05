
export const leftTreeData = [
  {
    title: '首页',
    icon: 'home',
    code: 'Home',
    route: '/Home'
  },
  {
    title: '模块中心',
    icon: 'appstore',
    code: 'ModuleCenter',
    children: [
      {
        title: '模块市场',
        route: '/Market',
        code: 'Market'
      },
      {
        title: '我的模块',
        code: 'MyModule',
        route: '/MyModule'
      }
    ]
  },
  {
    title: '创作中心',
    code: 'StageCenter',
    icon: 'desktop',
    children: [
      {
        title: '创作台',
        route: '/Stage',
        code: 'Stage'
      }
    ]
  }
]

const hiddenTreeData = [
  {
    title: '编辑模块',
    route: '/ModuleEdit',
    code: 'ModuleEdit',
    hidden: true
  }
];

export const allTreeData = leftTreeData.concat(hiddenTreeData);