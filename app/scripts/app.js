import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Cookies from 'js-cookie';

$(() => {
    svg4everybody();
});

// const username = 'root';
// const password = 'VCyZn7mLi6Jk';

// Прелоадер
const preloaderClass = '.preloader';
$(document).ready(function () {
    if (!$('#loginform').length && !Cookies.get('sessionid')) {
        return location.replace('/login.html');
    }
    else {
        $(preloaderClass).remove()
    }
});

// Авторизовываемся на странице /login.html, после чего нас редиректнет в корень.
$('#login-submit').on('click', function (event) {
    event.preventDefault();
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            func: 'auth',
            username: $('#loginusername').val(),
            password: $('#loginpassword').val()
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            // если имя пользователя или пароль неверные, выводим ошибку
            if (res.doc.error) {
                $('#loginform').append($(`
				<div class="group">
					<div class="error-message">${res.doc.error.msg.$}</div>
				</div>
				`));
            } else {
                // если авторизация прошла успешно, редиректим в корень и сохраняем данные в куки
                Cookies.set('sessionid', res.doc.auth.$id);
                location.replace('/');
            }
        },
        error(error) {
            console.error(error);
        }
    });
});

function updateDomainList(res) {
    // в случае успешной авторизации выводим список созданных веб серверов
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'webdomain'
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            const serverList = res.doc.elem;

            // если имя список пуст, выводим ошибку
            if (!serverList) {
                $('#domain-success-response').prepend($(`
					<div class="domain__wrap">
						<div class="error-message">Список пуст</div>
					</div>
					`));
            } else {
                // если содержится хотя бы 1 элемент, выводим списком
                for (let i = 0; i < serverList.length; i++) {
                    const domainName = Object.values(serverList[i].name).toString();
                    const domainOwner = Object.values(serverList[i].owner).toString();
                    const domainIp = Object.values(serverList[i].ipaddr).toString();
                    const domainRoot = Object.values(serverList[i].docroot).toString();

                    $('#domain-success-response').prepend($(`
						<div class="domain__wrap">
							<div class="domain__col">
								<div class="domain__row">
									<div class="domain__name">Имя домена</div>
									<div class="domain__value">${domainName}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">Владелец домена</div>
									<div class="domain__value">${domainOwner}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">IP-адрес</div>
									<div class="domain__value">${domainIp}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">Корневая папка</div>
									<div class="domain__value">${domainRoot}</div>
								</div>
							</div>
							<div class="domain__col">
								<div class="domain__btn material__btn material--blue" data-name="${domainName}"> Удалить </div>
							</div>
						</div>`));
                }
            }
        }
    });
}

function updateDBList(res) {
    // в случае успешной авторизации выводим список созданных веб серверов
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'db'
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            const serverList = res.doc.elem;

            // если список пуст, выводим ошибку
            if (!serverList) {
                $('#db-success-response').prepend($(`
					<div class="domain__wrap">
						<div class="error-message">Список пуст</div>
					</div>
					`));
            } else {

                // если в списке хотя бы 1 элемент, выводим данные
                for (let i = 0; i < serverList.length; i++) {
                    const dbName = Object.values(serverList[i].name).toString();
                    const dbOwner = Object.values(serverList[i].owner).toString();
                    const dbIp = Object.values(serverList[i].server_host).toString();
                    const dbVersion = Object.values(serverList[i].version).toString();
                    const dbPair = Object.values(serverList[i].pair).toString();

                    $('#db-success-response').prepend($(`
						<div class="domain__wrap">
							<div class="domain__col">
								<div class="domain__row">
									<div class="domain__name">Название БД</div>
									<div class="domain__value">${dbName}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">Имя пользователя</div>
									<div class="domain__value">${dbOwner}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">Адрес сервера</div>
									<div class="domain__value">${dbIp}</div>
								</div>
								<div class="domain__row">
									<div class="domain__name">Корневая папка</div>
									<div class="domain__value">${dbVersion}</div>
								</div>
							</div>
							<div class="domain__col">
								<div class="domain__btn material__btn material--blue" data-name="${dbPair}"> Удалить </div>
							</div>
						</div>`));
                }
            }
        }
    });
}

// в случае успешной авторизации выводим список созданных веб-серверов
$.ajax({
    url: 'https://82.146.48.90:1500/ispmgr',
    data: {
        out: 'json',
        auth: Cookies.get('sessionid'),
        func: 'webdomain'
    },
    dataType: 'jsonp',

    contentType: 'application/json',
    success(res) {
        // если путь содержит НЕ login.html и отсутствуют Куки с sessionid, то редиректим на login.html
        if (Cookies.get('sessionid')) {
            updateDomainList(res);
        }
    },
    error(res) {
        console.error(res);
    }
});

// в случае успешной авторизации выводим список созданных баз данных
$.ajax({
    url: 'https://82.146.48.90:1500/ispmgr',
    data: {
        out: 'json',
        auth: Cookies.get('sessionid'),
        func: 'db'
    },
    dataType: 'jsonp',

    contentType: 'application/json',
    success(res) {
        updateDBList(res);
    },
    error(res) {
        console.error(res);
    }
});

// По нажатию на кнопку удаляем доменное имя. Чтобы удалить, нужно отправить запрос с полем name
$(document).on('click', '#domain-success-response [data-name]', function () {
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'webdomain.delete',
            elid: $(this).attr('data-name')
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            // обновляем список
            if (Cookies.get('sessionid')) {
                updateDomainList(res);
            }
        },
        error(res) {
            console.error(res);
        }
    });
    $('#domain-success-response').load(location.href + ' #domain-success-response');
});

// По нажатию на кнопку создаем новое доменное имя и выводим данные в нужное поле
$('#domain-create').on('click', function (event) {
    event.preventDefault();
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'webdomain.edit',
            name: $('#domainname').val(),
            email: $('#domainemail').val(),
            sok: 'ok'
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            // обновляем список
            updateDomainList(res);
        },
        error(res) {
            console.error(res);
        }
    });
    $('#domain-success-response').load(location.href + ' #domain-success-response');
});

// По нажатию на кнопку удаляем Базу данных. Чтобы удалить, нужно отправить запрос с полем name
$(document).on('click', '#db-success-response [data-name]', function () {
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'db.delete',
            elid: $(this).attr('data-name')
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            // обновляем список
            updateDBList(res);
        },
        error(res) {
            console.error(res);
        }
    });
    $('#db-success-response').load(location.href + ' #db-success-response');
});

// По нажатию на кнопку создаем Базу данных и выводим данные в нужное поле
$('#db-create').on('click', function (event) {
    event.preventDefault();
    $.ajax({
        url: 'https://82.146.48.90:1500/ispmgr',
        data: {
            out: 'json',
            auth: Cookies.get('sessionid'),
            func: 'db.edit',
            name: $('#dbname').val(),
            username: $('#dbusername').val(),
            password: $('#dbpassword').val(),
            confirm: $('#dbconfirm').val(),
            sok: 'ok'
        },
        dataType: 'jsonp',

        contentType: 'application/json',
        success(res) {
            // обновляем список
            updateDBList(res);
        },
        error(res) {
            console.error(res);
        }
    });
    $('#db-success-response').load(location.href + ' #db-success-response');
});

// Кнопка Logout
$(document).on('click', '[data-logout]', function () {
    Cookies.remove('sessionid');
});
