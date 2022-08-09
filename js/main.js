'use strict';
console.log('main.js');

const postCreated = new URLSearchParams(window.location.search).get(
    'postCreated'
);

// Taikomes
const postsContainerEl = document.querySelector('.posts-container');

// Eiga
async function init() {
    const postsArr = await getPostsFromApi(baseUrl);
    await makePostsList(postsArr);
    setTimeout(checkPostCreateStatus();, 500)

}
init();

// Addeventlistenes

// Funcitons

async function getPostsFromApi(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const posts = dataBack.posts;
    console.log('posts ===', posts);
    return posts;
}

async function makePostsList(arr) {
    return new Promise((resolve, reject) => {
        postsContainerEl.innerHTML = '';
        // generate one post in a loop
        const htmlElArr = arr.map((pObj) => makeOnePostHtml(pObj));
        postsContainerEl.append(...htmlElArr);
        resolve();
        // spread operator
        // ...[1, 2, 4] => 1, 2 ,3
    });
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
    return divEl;
}

function makeTagsHtml(arr) {
    return arr.map((tag) => `<li>${tag}</li>`).join('');
}

function checkPostCreateStatus() {
    if (postCreated !== null) {
        alert('Post create succesfully');
    }
}