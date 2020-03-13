const Home = () => import('../pages/Home');
const Guide = () => import('../pages/Guide');
const Stage = () => import('../pages/StageCenter/Stage');
const Market = () => import('../pages/ModuleCenter/Market');
const MyModule = () => import('../pages/ModuleCenter/MyModule');
const ModuleEdit = () => import('../pages/ModuleCenter/ModuleEdit');

const routes = [
  {path: '/', redirect: '/Home'},
  {path: '/Home', component: Home},
  {path: '/Guide', component: Guide},
  {path: '/Stage', component: Stage},
  {path: '/Market', component: Market},
  {path: '/MyModule', component: MyModule},
  {path: '/ModuleEdit', component: ModuleEdit}
];

export default routes;