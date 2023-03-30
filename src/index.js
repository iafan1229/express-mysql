import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

//접근 가능한 도메인을 제한, 서버를 배포시에 작동
app.use(
	cors({
		origin: '*',
	})
);

//보안 강화
app.use(helmet());

//날짜 변환
const today = new Date();
const toDayJs = dayjs(today).format('YYYY-MM-DD');
console.log(toDayJs);

//암호화(동기) - 비번만들때
const pw = '1234';
const hashed = bcrypt.hashSync(pw, 10);
console.log({ hashed });

//jwt-만료기한 있고,복호화 할수있어서 비번 만들기엔 적합하지 x
const token = jwt.sign('1234', 'asdfjae;fjlwf');
console.log({ token });

// express에서 res.send() 는 자동으로 utf-8로 인코딩을 함
app.get('/', (req, res) => {
	res.send('3000번 서버에 쓰여질 글');
});

//서버 만들기
app.listen(3000, () => {
	console.log('서버가 시작');
});
