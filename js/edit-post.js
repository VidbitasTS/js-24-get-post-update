'use strict';
console.log('edit-post.js');

// Taikomes

const qParams = new URLSearchParams(window.location.search);
const title = qParams.get('title');
const react = qParams.get('react');
const userId = qParams.get('userId');
const body = qParams.get('body');
const tags = qParams.get('tags');
//console.log(qParams, title, react, userId, body, tags);
const formEl = document.forms[0];

formEl.elements.title.value = title;
formEl.elements.reactions.value = react;
formEl.elements.userId.value = userId;
formEl.elements.body.value = body;
formEl.elements.tags.value = tags;

// Event Listeners

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, reactions, userId, body, tags } = formEl.elements;
    console.log('tags ===', tags);
    const tagsArray = tags.value.split(',').map((tag) => tag.trim());

    const editPost = {
        title: title.value,
        reactions: reactions.valueAsNumber,
        userId: userId.valueAsNumber,
        body: body.value,
        tags: tagsArray,
    };
    console.log('newPost ===', editPost);
    sendDataToCreatePost(editPost);
    formEl.reset();
});

// siusti post requesta i backend
async function sendDataToCreatePost(editPost) {
    const resp = await fetch(`${baseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPost),
    });
    console.log('resp ===', resp);
    if (resp.status === 200) {
        // redirect to home page
        console.log('success');
        window.location.href = 'index.html?postUpdated=1';
    } else {
        console.log('error');
        const dataInJs = await resp.json();
        alert(dataInJs.message);
    }
    const dataInJs = await resp.json();
    console.log('dataInJs ===', dataInJs);
}
// sekmes atveju keliaujam i index.html ir pranesam kad pavyko
// nesekmes atveju iskonsolinam klaida ir parodom ja su alert