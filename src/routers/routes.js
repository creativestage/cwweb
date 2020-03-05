const Home = () => import('../pages/Home');
const Guide = () => import('../pages/Guide');
const Stage = () => import('../pages/StageCenter/Stage');
const Market = () => import('../pages/ModuleCenter/Market');

const routes = [
  {path: '/', redirect: '/Home'},
  {path: '/Home', component: Home},
  {path: '/Guide', component: Guide},
  {path: '/Stage', component: Stage},
  {path: '/Market', component: Market}
];

export default routes;