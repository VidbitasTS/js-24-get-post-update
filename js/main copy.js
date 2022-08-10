'use strict';
console.log('main.js');

// const postCreated = new URLSearchParams(window.location.search).get(
//     'postCreated'
// );

// Taikomes
const postsContainerEl = document.querySelector('.posts-container');
const tagsFilterEl = document.querySelector('.tags_filter');
let tagsItem = [];

// Eiga

async function init() {
    const postsArr = await getPostsFromApi(baseUrl);
    await makePostsList(postsArr);
    mainPostArr = postsArr;
    // console.log('init============', postsArr);
    // await makePostsList(postsArr);
    // const tagsArrEl = document.querySelectorAll('.tag');
    // console.log(tagsArrEl);
    // tagsArrEl.forEach((tag) => tag.addEventListener('click', filterByTag));
    setTimeout(() => {
        checkPostCreateStatus();
    }, 500);
    // window.location.href = '/';
}
//window.location.href = '/';
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

tagsFilterEl.addEventListener('click', (e) => {
    if (e.target.value === '') {
        return;
    }
    //console.log(e.target.value, mainPostArr);
    //debugger;
    //    const filtArr = mainPostArr.indexOf(e.target.value) === 1 ? 'geras' : '';
    //const filtArr = mainPostArr.filter((el) => el.tags === e.target.value);
    let filtArr = [];
    for (let i = 0; i < mainPostArr.length; i++) {
        //console.log(mainPostArr[i].tags);

        mainPostArr[i].tags.indexOf(e.target.value) !== -1 ?
            filtArr.push(mainPostArr[i]) :
            '';
        // //        console.log(mainPostArr[i].tags.indexOf(e.target.value) !== -1 ? mainPostArr[i] : '');

        // makePostsList(
        //     mainPostArr[i].tags.indexOf(e.target.value) !== -1 ? mainPostArr[i] : ''
        // );
        console.log('filtArr === ', filtArr);
    }

    makePostsList(filtArr);
});

// Funcitons

async function getPostsFromApi(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const posts = dataBack.posts;
    //   console.log('posts ===', posts);
    return posts;
}

async function makePostsList(arr) {
    //mainPostArr = arr;
    //console.log('makePostList ==========', arr, mainPostArr);
    return new Promise((resolve, reject) => {
        postsContainerEl.innerHTML = '';
        // generate one post in a loop
        const htmlElArr = arr.map((pObj) => makeOnePostHtml(pObj));
        postsContainerEl.append(...htmlElArr);

        // const arrTags = arr;
        // for (var i = 0, l = arrTags.length; i < l; i++) {
        //     if (
        //         tagsItem.indexOf(arrTags[0].tags[i]) === -1 &&
        //         arrTags[0].tags[i] !== ''
        //     ) {
        //         tagsItem.push(arrTags[0].tags[i]);
        //     }
        // }
        // console.log('tagsitemmmm =====', tagsItem);
        //console.log('full =========', tagsItem);
        const tagsFilterEl = document.querySelector('.tags_filter');
        // tagsItem = tagsItem
        //     .map((el) => `<option>${el}</option>`)
        //     .sort((a, b) => (a > b ? 1 : -1))
        //     .join('');

        //        console.log('tagsfilterEl =', tagsItem);
        //tagsItem = tagsItem.sort((a, b) => (a > b ? 1 : -1)).join('');
        //console.log('full =========', tagsItem);
        tagsFilterEl.innerHTML = '';
        tagsFilterEl.innerHTML += tagsItem
            .sort((a, b) => (a > b ? 1 : -1))
            .join('');
        resolve();
    });

    // spread operator
    // ...[1, 2, 4] => 1, 2 ,3
}

function makeOnePostHtml(postObj) {
    //   console.log('main.js makeOnePostHtml ====', postObj.tags[0]);
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

    const arrTags = postObj.tags;
    for (let i = 0, l = arrTags.length; i < l; i++)
    // if (tagsItem.indexOf(`<option>${arrTags[0]}</option>`) === -1)
    //     tagsItem.push(`<option>${arrTags[i]}</option>`);
        tagsItem.indexOf(`<option>${arrTags[0]}</option>`) === -1 ?
        tagsItem.push(`<option>${arrTags[i]}</option>`) :
        '';
    const tagsArrEl = divEl.querySelectorAll('.tag');
    //   console.log(tagsArrEl);
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
    console.log('postCreated ===', postCreated);
    if (postCreated !== null) {
        //alert('post created successfully');
        document.querySelector('.success').style.display = 'block';
        document.querySelector('.success').textContent =
            'post created successfully';
    }
}