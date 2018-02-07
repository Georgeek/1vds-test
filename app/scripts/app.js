import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	svg4everybody();
});

const username = 'root';
const password = 'VCyZn7mLi6Jk';

const url = `https://82.146.48.90:1500/ispmgr?out=json&func=auth&username=${username}&password=${password}`;

fetch(url)
	.then((data) => console.log(data));

console.log(url);
