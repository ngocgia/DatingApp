export class BlogComment {

    constructor(
        public blogCommentId: number,
        public blogsId: number,
        public content: string,
        public username: string,
        public appUserId: number,
        public publishDate: Date,
        public updateDate: Date,
        public parentBlogCommentId?: number
    ) {}

}