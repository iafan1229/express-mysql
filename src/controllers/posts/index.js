import { Router } from 'express';

class PostController {
	//1.라우터를 가져온다.
	router = Router();
	path = '/post';
	postList = [
		{
			id: 1,
			title: '제목',
			content: '테스트입니다',
		},
	];
	constructor() {
		this.router;
		this.init();
	}
	init() {
		//2.라우터에 메서드를 연결한다.
		this.router.get('/', this.getPosts.bind(this));
		this.router.get('/:id', this.getPost.bind(this));
		this.router.post('/', this.createPost.bind(this));
		this.router.patch('/:id', this.updatePost.bind(this));
		this.router.delete('/:id', this.deletePost.bind(this));
	}
	getPosts(req, res) {
		res.status(200).json({ postList: this.postList });
	}
	getPost(req, res) {
		const { id } = req.params;
		const onePost = this.postList.filter((el) => el.id === Number(id));
		res.status(201).json({ onePost });
	}
	createPost(req, res) {
		const { title, content } = req.body;
		const id = new Date().getTime();
		this.postList.push({
			id,
			title,
			content,
		});
		res.status(201).json({ postList: this.post });
	}
	updatePost(req, res) {
		const { id } = req.params;
		const { title = '', content = '' } = req.body;
		const thePost = this.postList.find((post) => post.id === Number(id));

		if (title) thePost.title = title;
		if (content) thePost.content = content;

		res.status(201).json({ postList: this.postList });
	}
	deletePost(req, res) {
		const { id } = req.params;
		const thePost = this.postList.filter((post) => post.id !== Number(id));

		this.postList = thePost;

		res.status(201).json({ postList: this.postList });
	}
}

const postController = new PostController();

export default postController;
