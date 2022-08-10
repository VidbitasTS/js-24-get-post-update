'use strict';
console.log('main.js');

// Taikomes
const postsContainerEl = document.querySelector('.posts-container');
const tagsFilterEl = document.querySelector('.tags_filter');
const searchFormEl = document.forms[0];
let tagsItem = [];

// Eiga

async function init() {
    const postsArr = await getPostsFromApi(baseUrl);
    makePostsList(postsArr);
    mainPostArr = postsArr;

    setTimeout(() => {
        checkPostCreateStatus();
    }, 500);
    // window.location.href = '/';
}
init();

function filterByTag(event) {
    const tagText = event.target.textContent;
    console.log(event.target.textContent);
    makePostsList(filterPosts(tagText));
}

function filterPosts(filterValue) {
    return mainPostArr.filter((postObj) => postObj.tags.includes(filterValue));
}

// Addeventlistenes
searchFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    // pasiimti paieskos reiksme
    const searchValue = searchFormEl.elements.search.value;
    console.log('searchValue ===', searchValue);
    // sukurti nuoroda su pieskos kriterinumi
    const searchURL = `https://dummyjson.com/posts/search?q=${searchValue}`;
    // parsiusti ir atnaujinti sarasa
    const postsArr = await getPostsFromApi(searchURL);
    makePostsList(postsArr);
});

tagsFilterEl.addEventListener('click', (e) => {
    if (e.target.value === '') {
        return;
    }
    let filtArr = [];
    for (let i = 0; i < mainPostArr.length; i++) {
        mainPostArr[i].tags.indexOf(e.target.value) !== -1 ?
            filtArr.push(mainPostArr[i]) :
            '';
        //    console.log('filtArr === ', filtArr);
    }
    makePostsList(filtArr);
});

// Funcitons

async function getPostsFromApi(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const posts = dataBack.posts;
    return posts;
}

function makePostsList(arr) {
    postsContainerEl.innerHTML = '';
    const htmlElArr = arr.map((pObj) => makeOnePostHtml(pObj));
    postsContainerEl.append(...htmlElArr);
    const tagsFilterEl = document.querySelector('.tags_filter');
    tagsFilterEl.innerHTML = '';
    tagsFilterEl.innerHTML = '<option value="" selected>Pasirikite tags</option>';

    tagsFilterEl.innerHTML += tagsItem.sort((a, b) => (a > b ? 1 : -1)).join('');
}

function makeOnePostHtml(postObj) {
    const divEl = document.createElement('div');
    divEl.className = 'post';
    divEl.innerHTML = `
  <ul class="post-tags">
  ${makeTagsHtml(postObj.tags)}  
  </ul>
  <p class="post__reactions"><span>${postObj.reactions}</span> reactions</p>
  <h3>${postObj.title}</h3>
  <p class="post__text">${postObj.body.slice(0, 15)}...</p>
  <a class="post__link" href="single-post.html?postId=${
    postObj.id
  }">Read more > </a>
  `;

    const updateButtonEl = document.createElement('button');
    updateButtonEl.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    updateButtonEl.addEventListener('click', () => editPost(postObj));
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteButtonEl.addEventListener('click', () => deletePost(postObj.id));
    deleteButtonEl.classList = 'tooltip tooltiptext';

    divEl.append(updateButtonEl, deleteButtonEl);

    const arrTags = postObj.tags;
    for (let i = 0, l = arrTags.length; i < l; i++)
        tagsItem.indexOf(`<option>${arrTags[0]}</option>`) === -1 ?
        tagsItem.push(`<option>${arrTags[i]}</option>`) :
        '';
    const tagsArrEl = divEl.querySelectorAll('.tag');
    tagsArrEl.forEach((tag) => tag.addEventListener('click', filterByTag));
    return divEl;
}

function makeTagsHtml(arr) {
    return arr.map((tag) => `<li class="tag">${tag}</li>`).join('');
}

function checkPostCreateStatus() {
    const postCreated = new URLSearchParams(window.location.search).get(
        'postCreated'
    );
    const postUpdated = new URLSearchParams(window.location.search).get(
        'postUpdated'
    );
    console.log('postCreated ===', postCreated);
    console.log('postUpdated ===', postUpdated);
    document.querySelector('.success').style.display = 'block';

    const postParam = window.location.href;
    const result = postParam.replace(/#.*$/, '').replace(/\?.*$/, '');

    if (postCreated !== null) {
        //self.location = result;
        document.querySelector('.success').textContent =
            'post created successfully';
    }
    if (postUpdated !== null) {
        //self.location = result;
        document.querySelector('.success').textContent =
            'post updated successfully';
    }
    setTimeout(() => {
        document.querySelector('.success').style.display = 'none';
        if (postCreated !== null || postUpdated !== null) self.location = result;
    }, 5000);
}

async function deletePost(id) {
    console.log('deleteUser function called', id);
    // nusiusti delete fetch uzklausa ir paziureti rezultata
    const resp = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    console.log('resp ===', resp);
    if (resp.ok) {
        console.log('istrinta sekmingai');
        document.querySelector('.success').style.display = 'block';
        document.querySelector('.success').textContent =
            'post deleted successfully';
        setTimeout(() => {
            document.querySelector('.success').style.display = 'none';
        }, 5000);
        getPostsFromApi(baseUrl);
    }
}

function editPost(postObj) {
    console.log('editpost postObj ===', postObj);
    // supildom formos laukus editinimui
    // editFormEl.elements.name.value = postObj.name;
    // editFormEl.elements.age.value = postObj.age;
    // editFormEl.elements.town.value = postObj.town;
    // editFormEl.elements.id.value = postObj.id;
    // editFormEl.dataset.id = postObj.id;
    // title: title.value,
    // reactions: reactions.valueAsNumber,
    // userId: userId.valueAsNumber,
    // body: body.value,
    // tags: tagsArray,

    window.location.href = `edit-post.html?title=${postObj.title}&react=${postObj.reactions}&userId=${postObj.userId}&body=${postObj.body}&tags=${postObj.tags}`;
}