export const getSkipTake = (page, limit) => {
	const page = page ?? '1'; //req.query는 기본적으로 string이므로, 없으면 undefined
	const limit = limit ?? '20';
	const take = Number(limit) || 20;
	const skip = (Number(page) - 1) * take;

	return { skip, take };
};
