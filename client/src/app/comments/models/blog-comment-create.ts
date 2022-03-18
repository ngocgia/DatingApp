export class BlogCommentCreate {

    constructor(
        public blogCommentId: number,
        public blogsId: number,
        public content: string,
        public parentBlogCommentId?: number
    ) {}

}