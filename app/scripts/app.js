import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	svg4everybody();
});

const username = 'root';
const password = 'VCyZn7mLi6Jk';
<<<<<<< HEAD
let data;

$(document).ready(function(){
	$.ajax({
		url: 'https://82.146.48.90:1500/ispmgr',
		data: {out:'json',func:'auth',username:username,password:password},
		dataType: 'jsonp',

		/* Very important */
		contentType: 'application/json',
		success: (res) => testFunc(res)
	});
});

const url = `https://82.146.48.90:1500/ispmgr?func=auth&username=${username}&password=${password}&out=json`;

function testFunc(data) {
	console.log(data.doc.auth.$id);
}
=======

const url = `https://82.146.48.90:1500/ispmgr?out=json&func=auth&username=${username}&password=${password}`;

fetch(url)
	.then((data) => console.log(data));

console.log(url);
>>>>>>> 38a6e93533fee3394e88c5c4ad54abe742fd04ba
