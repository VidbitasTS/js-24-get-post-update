'use strict';
console.log('add-post.js');

// Taikomes

const formEl = document.forms[0];

// Event Listeners

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, reactions, userId, body, tags } = formEl.elements;
    console.log('tags ===', tags);
    const tagsArray = tags.value.split(',').map((tag) => tag.trim());

    const newPost = {
        title: title.value,
        reactions: reactions.valueAsNumber,
        userId: userId.valueAsNumber,
        body: body.value,
        tags: tagsArray,
    };
    console.log('newPost ===', newPost);
    sendDataToCreatePost(newPost);
    formEl.reset();
});

// siusti post requesta i backend
async function sendDataToCreatePost(newPost) {
    //   const resp = await fetch(`${baseUrl}/add`, {
    const resp = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });
    console.log('resp ===', resp);
    if (resp.status === 200) {
        // redirect to home page
        console.log('success');
        window.location.href = 'index.html?postCreated=1';
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