import { Router } from 'express';

/*
controller = res.status를 작성하는 곳
*/

/**
 * User Router, 싱글톤 패턴으로 설계하여 한번에 묶기
 */
class UserController {
	router; //컨트롤러의 이점을 이용하기 위함
	path = '/users'; //반복되는 코드를 줄이기 위해 사용함
	users = [{ id: 1, name: 'hydev', age: 28 }];
	constructor() {
		this.router = Router();
		this.init();
	}
	//라우터의 엔드포인트를 등록
	init() {
		//함수를 실행하지도 않았고, 함수안의 this는 window객체, bind해주어야함
		this.router.get('/', this.getUsers.bind(this));
		this.router.get('/detail/:id', this.getUser.bind(this));
		this.router.post('/', this.createUser.bind(this));
	}

	getUsers(req, res) {
		res.status(200).json({ users: this.users });
	}
	getUser(req, res) {
		const { id } = req.params;
		const user = users.find((user) => user.id === id);

		res.status(200).json({ user });
	}
	createUser(req, res) {
		const { name, age } = req.body;
		this.users.push({
			id: new Date().getTime(),
			name,
			age,
		});

		req.status(201).json({ users: this.users });
	}
}

const userController = new UserController();

export default userController;
