import axios from "axios";

const url = "https://5eed24da4cbc340016330f0d.mockapi.io/api/articles";

export const getArticleList = async () => {
    const response = await axios.get(url);
    try {
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw new Error();
    }
};

const filterArticleList = async filter => {
    if (filter === undefined) {
        filter = ''
    }
    const response = await axios.get(`${url}/?filter=${filter}`);
    try {
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw new Error()
    }
};

export const buildFilterList = (list, el) => {
    const filterList = list
        .map(inList => {
            return inList.category;
        })
        .filter((category, index, self) => self.indexOf(category) === index);

    filterList.forEach(inList => {
        const template = `<li data-filter="${inList}">${inList}</li>`;
        el.insertAdjacentHTML("beforeend", template);
    });
};

export const buildCardList = (list, el) => {
    const cardList = list;
    el.innerHTML = '';
    cardList.forEach(inList => {
        const template = `
        <div class="column--colspan-4-lg column--colspan-6-md" style="position:relative">
            <div class="card-fix"></div>
            <div class="card article-card">
                <div class="card-image">
                    <img src="${inList.image}" alt="${inList.title}">
                </div>
                <div class="card-title">
                    ${inList.title}
                </div>
                <div class="card-body">
                    <p>${inList.content}</p>
                </div>
                <div class="card-actions">
                    <a href="${inList.url}" class="card-link" target="_blank">VER MÁS</a>
                </div>
            </div>
        </div>`;
        el.insertAdjacentHTML("beforeend", template);
    });
};

export const filterArticles = async (el, container) => {
    Array.from(el.parentNode.children).forEach(child => {
        if (child.classList.contains("active")) {
            child.classList.remove("active");
        }
    });
    el.classList.add("active");
    const list = await filterArticleList(el.dataset.filter);
    buildCardList(list, container)
};
