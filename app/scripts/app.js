import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	svg4everybody();
});

const username = 'root';
const password = 'VCyZn7mLi6Jk';
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
