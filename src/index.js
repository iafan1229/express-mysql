import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
//app.use는 미들웨어, 또는 라우터에만 쓴다.
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '700mb' }));

//use의 엔드포인트들은 get으로 통일되기 때문이다.
/*
app.use("/users", (req,res, next)=>{
	next(); //다음으로 넘어간다.
})
*/

let users = [
	{
		id: 1,
		name: 'hayounglee',
		age: 28,
	},
];

//정보 가져오기(200)
app.get('/users', (req, res) => {
	res.status(200).json({ users });
});

//생성(201)
app.post('/users', (req, res) => {
	//요청을 body로 받는다. <-> get는 query/path로
	const { name, age } = req.body;
	console.log(req.body);
	const id = new Date().getTime();
	users.push({ id, name, age });
	res.status(201).json({ users });
});

//수정(204) : path variable
app.patch('/users/:id', (req, res) => {
	const id = req.params.id;
	const { name, age } = req.body;

	const target = users.findIndex((user) => user.id === Number(id));
	users[target] = {
		id: users[target].id,
		name: name ?? users[target].name,
		age: age ?? users[target].age,
	};

	//수정 성공이라는 뜻. *아무것도 안 뜬다.
	res.status(204).json({});
});

//삭제(204)
app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	const deleted = users.filter((user) => user.id !== Number(id));
	//객체의 얕은 복사(users와 deleted는 같은 메모리 위치를 공유한다.)
	users = deleted;
	console.log(users, deleted);

	res.status(200).json({ users });
});

app.get('/', (req, res) => {
	//send는 text도,json도 다 보낼수 있음.
	res.send('3000번 서버에 쓰여질 글');
});

app.listen(3000, () => {
	console.log('서버가 시작');
});
