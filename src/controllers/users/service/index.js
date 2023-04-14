import database from '../../../database';

/**
 * 실제로 DB와 통신하는 서비스를 담는 로직
 */
export class UserService {
	// findById, findMany, create, update, delete
	async findByid(id) {
		const user = await database.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) throw { status: 404, message: 'not found user' };
		return user;
	}
	//임의로 몇 개만 select하고 싶을때는, args
	async findMany({ skip, take }) {
		const users = await database.user.findMany({
			skip,
			take,
		});
		const count = await database.user.count();
		return {
			users,
			count,
		};
	}
	async createUser(props) {
		const newUser = await database.user.create({
			data: {
				name: props.name,
				age: props.age,
				email: props.email,
				phoneNumber: props.phoneNumber,
			},
		});

		return newUser.id;
	}
	async update(id, props) {
		const isExist = await database.user.findUnique({
			where: {
				id,
			},
		});
		if (!isExist) throw { status: 404, message: '유저를 찾을수 없습니다' };

		await database.user.update({
			where: {
				id: isExist.id,
			},
			//값이 없으면 undefined가 된다. 업데이트를 수행하지 않겠다고 인식함.
			data: {
				name: props.name,
				age: props.age,
				email: props.email,
				phoneNumber: props.phoneNumber,
			},
		});
	}
	//204 status로 return하기때문에 따로 return 없이 작성.
	async delete(id) {
		const isExist = await database.user.findUnique({
			where: {
				id,
			},
		});
		if (!isExist) throw { status: 404, message: '유저를 찾을수 없습니다' };

		await database.user.delete({
			where: {
				id: isExist.id,
			},
		});
	}
}
