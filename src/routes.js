import NewsTest from "./pages/newsTest"
import NewsSingle from "./pages/newsSingle.js"
import ResearchDirectory from "./pages/ResearchDirectory";
import Research from "./pages/Research";

const routes = [
    // {
    //     path: '/testing/',
    //     exact: true,
    //     component: NewsTest,
    // },
    // {
    //     path: '/testing/newstest/:id',
    //     exact: true,
    //     component: NewsSingle,
    // },
    {
        path: '/research',
        exact: true,
        component: ResearchDirectory,
    },
    {
        path: '/research/:slug',
        exact: true,
        component: Research,
    },
]

export default routes;