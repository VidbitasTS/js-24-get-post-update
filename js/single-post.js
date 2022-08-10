'use strict';
//console.log('single-post.js');

const currentId = new URLSearchParams(window.location.search).get('postId');

// Taikomes
const formEl = document.forms[0];
const mainTitleEl = document.querySelector('.main-title');
const postReactionsEl = document.querySelector('.post__reactions span');
const postTextEl = document.querySelector('.post__text');
const postTagsEl = document.querySelector('.post-tags');
const commentsEl = document.querySelector('.comments');
const totalCommentsEl = document.querySelector('.total');
const commentsListEl = document.querySelector('.comments_list');
const btnFormEl = document.querySelector('.btn-form');

const userIdEl = document.querySelector('.userId');
const textEl = document.querySelector('.tex');
let newCommArr = [];

// postTagsEl.addEventListener('click', (e) => {
//     console.log(e.target.textContent);
//     newCommArr = {};
// });

async function init() {
    const postData = await getPostData(`${baseUrl}/${currentId}`);

    fillSinglePostHtml(postData);
    // const postComments = await getComments(
    //     `https://dummyjson.com/post/${currentId}/comments`
    // );
    const postComments = await getComments(
        `https://dummyjson.com/comments/post/${currentId}`
    );
    //fetch('https://dummyjson.com/posts/1/comments')
    fillCommentsHtml(postComments);
}
init();

btnFormEl.addEventListener('click', (e) => {
    e.preventDefault();
    const { userId, text } = formEl.elements;
    //   console.log('tags ===', tags);
    //   const tagsArray = tags.value.split(',').map((tag) => tag.trim());
    console.log(userId, text);
    const newComm = {
        userId: userId.value,
        postId: currentId,
        body: text.value,
    };
    console.log('newComm ===', newComm);
    //sendDataToCreatePost(newComm);
    sendDataToCreateComm(newComm);
    setTimeout((document.querySelector('.succ').textContent = ''), 5000);
    //formEl.reset();
});

async function getPostData(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const singlePostData = dataBack;
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

async function getComments(url) {
    const resp = await fetch(url);
    const dataBack = await resp.json();
    const singleCommData = dataBack;
    console.log(' comments ===', singleCommData);
    totalCommentsEl.innerHTML = `Comments <span>(${singleCommData.total})</span>`;
    return singleCommData;
}

function fillCommentsHtml(commDataObj) {
    console.log('commtDataObj comments ===', commDataObj.comments);
    const commentList = document.querySelector('.comments_list');
    console.log(commentList);
    const commArr = commDataObj.comments
        .map(
            (el) =>
            `<div class="comment_item"><p class="u_name"><span>User:</span> ${el.user.username}</p><p>${el.body}</p></div>`
        )
        .join('');
    commentList.innerHTML = commArr;
}

async function sendDataToCreateComm(newComment) {
    const resp = await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
    });
    console.log('resp ===', resp);
    if (resp.status === 200) {
        // redirect to home page
        //console.log('success');
        document.querySelector('.succ').textContent = 'new comment created';

        setTimeout(() => {
            //document.querySelector('.succ').style.display = 'none';
            document.querySelector('.succ').textContent = '';
        }, 5000);
        //setTimeout((document.querySelector('.succ').textContent = ''), 5000);
        //       window.location.href = 'index.html?postCreated=1';
    } else {
        console.log('error');
        const dataInJs = await resp.json();
        alert(dataInJs.message);
    }
    const dataInJs = await resp.json();
    console.log('dataInJs ===', dataInJs);
}