import express, { Router } from 'express';
import cors from 'cors';
import Controllers from './controllers';
import helmet from 'helmet';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from './database';

(async () => {
	await database.$connect();

	const app = express();

	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true, limit: '700mb' }));

	//유저 라우터 등록
	/* app.use('/users', userController.router); */

	//**반복되는 코드를 줄여 설계하기
	Controllers.forEach((controller) => {
		app.use(controller.path, controller.router); //패스 등록
	});

	app.use((err, req, res, next) => {
		console.log(err);
		err.message;

		res
			.status(err.status || 500)
			.json({ message: err.message || '서버에서 에러가 발생하였음' });
	});
	//========================
	app.get('/', (req, res) => {
		res.send('3000번 서버에 쓰여질 글');
	});

	app.listen(3000, () => {
		console.log('서버가 시작');
	});
})();
