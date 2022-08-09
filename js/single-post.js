'use strict';
console.log('single-post.js');

const currentId = new URLSearchParams(window.location.search).get('postId');
console.log('currentId ===', currentId);

// Taikomes
const mainTitleEl = document.querySelector('.main-title');
const postReactionsEl = document.querySelector('.post__reactions span');
const postTextEl = document.querySelector('.post__text');
const postTagsEl = document.querySelector('.post-tags');

async function init() {
    const postData = await getPostData(`${baseUrl}/${currentId}`);

    fillSinglePostHtml(postData);
}
init();

async function getPostData(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const singlePostData = dataBack.posts;
    console.log('singlePostData ===', singlePostData);
    return singlePostData;
}

function fillSinglePostHtml(postDataObj) {
    mainTitleEl.textContent = postDataObj.title;
    postReactionsEl.textContent = postDataObj.reactions;
    postTextEl.textContent = postDataObj.body;
    postTagsEl.innerHTML = '';
    postDataObj.tags.forEach((tag) =>
        postTagsEl.insertAdjacentHTML('afterbegin', `<li>${tag}</li>`)
    );
}