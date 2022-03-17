export interface Comment {
    blogCommentId: number,
    parentBlogCommentId?: number,
    blogsId: number,
    content: string,
    appUserId: number,
    username: string,
    publishDate: Date,
    updateDate: Date,
}