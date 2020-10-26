console.log ("*** API QUIEN ES QUIEN JS *** ");

	let usuarios = [];
	let usuariosGuardados = [];
	let exist;
	let usuariosSistema = [];
	let validateUser;
	let validateUserLogin;
	
	const buttonRegister = document.getElementById("buttonRegister");
	const loginButton = document.getElementById("loginButton");

	if (buttonRegister == null) 
	{
		console.log("estas en login");
	}else{
		buttonRegister.addEventListener('click', ()=> 
	{	
		register();
	});
			const register = () =>
			{

				//recogida de datos en variables js
				let name 	 = document.getElementById("name");
				let lastName = document.getElementById("lastName");
				let nickName = document.getElementById("nickName");
				let password = document.getElementById("password");

				//Guardamos datos en localStorage 
				let registerUsu = {
					name: 	  name.value,
					lastName: lastName.value,
					nickName: nickName.value,
					password: password.value
				 };

				 
				 if (registerUsu.name == "" && registerUsu.lastName == "" &&
				 	 registerUsu.nickName == "" && registerUsu.password == "")
				 {
					alert("llena los campos");
				 }
				 else if (registerUsu.name == "") {
				 	alert("llena el campo de nombres");
				 }
				 else if (registerUsu.lastName == "") {
				 	alert("Llena el campo de apellidos");
				 }
				 else if (registerUsu.nickName == "") {
				 	alert("Llena el campo de nick");
				 }
				 else if (registerUsu.password == "") {
				 	alert("Llena el campo de Contraseña");
				 }else {
				 	validate = validateUserExist(registerUsu);
				 	if (validate == true) {
				 		alert("Usuario existente");
				 	}else{
				 		console.log(registerUsu);
					 	localStorageSaveData(registerUsu);
				 	}
					 	
				 }
			};

			const validateUserExist = (registerUsu) => 
			{
				usuariosGuardados = JSON.parse(localStorage.getItem('registro') );
				exist = false;
				
				if (usuariosGuardados != null) 
				{
					usuariosGuardados.forEach(usuariosGuardado => 
					{
						if (usuariosGuardado.nickName == registerUsu.nickName) 
						{
							exist = true;
						}

					});
				}
				return exist;
			};

			const localStorageSaveData = (registerUsu) =>
			{
				usuarios.push(registerUsu);
				localStorage.setItem("registro", JSON.stringify(usuarios) );
			}
	}

			// ---------------------INICIO DE SESIÓN---------------------------

			if (loginButton == null) {
				console.log("Estas en registrar");
			}else 
			{
				loginButton.addEventListener('click', ()=> 
				{	
					login();
				});


				const login = () => 
				{
					nickLogin = document.getElementById('nickName');
					passLogin = document.getElementById('password');

					usuLogin = 
					{
						nick: 		nickName.value,
						passLogin: 	passLogin.value
					}

					if (usuLogin.nick == "" && usuLogin.passLogin == "")
				 	{
						alert("llena los campos");
					 }
					 else if (usuLogin.nick == "") {
					 	alert("llena el campo de nick");
					 }
					 else if (usuLogin.passLogin == "") {
					 	alert("Llena el campo de contraseña");
					 }
					 else {
					 	validateUserLogin = validateLogin(usuLogin);
					 	if (validateUserLogin == true) {
					 		alert("Felicidades Has iniciado sesión");
					 		location.href = "home.html";
					 		porfileSession(usuLogin);
					 	}else{
					 		alert("Error de autenticación verifica campos");
					 	}

					
				}
			}

				const validateLogin = (usuLogin) =>
				{
					usuariosSistema = JSON.parse(localStorage.getItem('registro') );
					validateUser = false;

					if (usuariosSistema != null) 
					{
						usuariosSistema.forEach(usuariosS => 
						{
							if (usuariosS.nickName == usuLogin.nick
								&& usuariosS.password == usuLogin.passLogin) 
							{
								validateUser = true;
								
							}

						});
					}
					return validateUser;
				}

				const porfileSession = (usuLogin) =>
				{
					localStorage.setItem("porfile", JSON.stringify(usuLogin) );
					porfileUser = JSON.parse(localStorage.getItem("registro") );
					if (porfileUser != null) 
					{
						porfileUser.forEach(porfile => 
						{
							if (porfile.nickName == usuLogin.nick
								&& porfile.password == usuLogin.passLogin) 
							{
								
								document.write("<h1>Bienvenido al Sistema:" + porfile.name + " " + porfile.lastName + " </h1> <h1>su nick es: " + porfile.nickName + "<button><a href=login.html>Cerrar sesion</button>");
								
								SessionClose(usuLogin);
							}

						});
					}


				}

			// 	-------------------------------CERRAR SESION------------------------

			const SessionClose = (usuLogin) => 
			{

				Session = JSON.parse(localStorage.getItem('porfile'));

				if (Session !=null) 
				{
					delete usuLogin.nick;
					delete usuLogin.passLogin;

				}
			}	
	}
		