import NewsTest from "./pages/newsTest"
import NewsSingle from "./pages/newsSingle.js"

const routes = [
    {
        path: '/testing/',
        exact: true,
        component: NewsTest,
    },
    {
        path: '/testing/newstest/:id',
        exact: true,
        component: NewsSingle,
    },
]

export default routes;