'use strict';
console.log('helper.js');

const baseUrl = 'https://dummyjson.com/posts';
//const baseUrl = ' http://localhost:8001/posts';
let mainPostArr = [];

async function initHeader() {
    const resp = await fetch('layout/header.html');
    const htmlHeader = await resp.text();
    document.body.insertAdjacentHTML('afterbegin', htmlHeader);
}

async function initFooter() {
    const resp = await fetch('layout/footer.html');
    const htmlHeader = await resp.text();
    document.body.insertAdjacentHTML('afterend', htmlHeader);
}

initHeader();
initFooter();