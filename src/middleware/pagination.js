/**
 * 라우터 단위로 미들웨어를 넣는다.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const pagination = (req, res, next) => {
	const page = req.query.page ?? '1';
	const limit = req.query.limit ?? '20';
	const take = Number(limit) || 20;
	const skip = (Number(page) - 1) * take;

	//req 객체 안에 take와 skip을 집어넣는다.
	//req.body, req.header 말고 req.take를 추가해주겠다는 뜻
	req.take = take;
	req.skip = skip;

	next();
};

/*
app.use((req,res,next)=>{
 기본적으로 미들웨어가 들어가고, 미들웨어는 함수다.
})
*/
