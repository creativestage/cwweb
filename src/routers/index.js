import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  let validator = localStorage.getItem('token') || to.meta && !to.meta.auth;
  let result = validator ? {} : {
      path: "/Login"
  };
  next(result);
});

export default router;