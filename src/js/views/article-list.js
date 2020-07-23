import { elements } from './base';
import * as articleListController from '../controllers/article-list.controller'

articleListController.getArticleList().then(articleList => {
    articleListController.buildFilterList(articleList, elements.filterList);
    articleListController.buildCardList(articleList, elements.articleList)
});

elements.filterList.addEventListener('click', (e) => {
    const button = e.target.closest('li');
    articleListController.filterArticles(button, elements.articleList)
});