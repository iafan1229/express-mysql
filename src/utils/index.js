/**
 * skip:생략할 개수, take: 가져올 개수
 *
 * 프론트에서는
 * /posts?page=1&limit=20 이런식으로
 *
 * 1.페이지번호 2.가져올 개수를 만들어야 한다.
 * req.query // {page: 1, limit: 20}
 * take === limit
 *
 * ex)
 *
 * page:1,limit:20->skip:0,take:20
 * page:2,limit:20->skip:20,take:20
 *
 *
 * skip = (page - 1) * limit;
 */
