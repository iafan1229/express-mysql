import { Router } from 'express';
import { UserService } from '../service';
import { pagination } from '../../../middleware/pagination';

/**
 * User Router, 싱글톤 패턴으로 설계하여 한번에 묶기
 * controller = res.status를 작성하는 곳
 */
class UserController {
	router;
	path = '/users';
	users = [{ id: 1, name: 'hydev', age: 28 }];
	userService;

	constructor() {
		this.users;
		this.router = Router();
		this.init();
		this.userService = new UserService();
	}
	init() {
		//중간에 pagination을 넣으면 된다.
		this.router.get('/', pagination, this.getUsers.bind(this));
		this.router.get('/detail/:id', this.getUser.bind(this));
		this.router.post('/', this.createUser.bind(this));
	}

	/*
	request -> application middleware(app.use) -> Router Middleware -> API;
	getSkipTake(req.query.page, req.query.limit)으로 해야되는데 단축시킴
	*/

	//DB와 비동기로 데이터통신을 하기때문에 async await를 붙여 동기식으로 바꾸어야 함.

	async getUsers(req, res, next) {
		try {
			const { users, count } = await this.userService.findMany({
				skip: req.skip,
				take: req.take,
			});
			res.status(200).json({ users, count });
		} catch (err) {
			next(err);
		}
	}
	async getUser(req, res, next) {
		try {
			const { id } = req.params;
			const user = await this.userService.findByid(id);

			res.status(200).json({ user });
		} catch (err) {
			next(err);
		}
	}
	async createUser(req, res, next) {
		try {
			await this.userService.createUser(req.body);
			res.status(201).json({ message: '성공적으로 생성됨' });
		} catch (err) {
			next(err);
		}
	}

	async updateUser(req, res, next) {
		try {
			const { id } = req.params;
			const user = await this.userService.update(id, req.body);
			res.status(204).json({});
		} catch (err) {
			next(err);
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { id } = req.params;

			await this.userService.delete(id);

			res.status(204).json({});
		} catch (err) {
			next(err);
		}
	}
}

const userController = new UserController();

export default userController;
