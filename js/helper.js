'use strict';
console.log('helper.js');

//const baseUrl = 'https://dummyjson.com/posts';
const baseUrl = ' http://localhost:8001/posts';

async function initHeader() {
    const resp = await fetch('layout/header.html');
    const htmlHeader = await resp.text();
    document.body.insertAdjacentHTML('afterbegin', htmlHeader);
}

initHeader();