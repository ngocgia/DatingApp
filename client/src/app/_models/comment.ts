export interface Comment {
    blogCommentId: number,
    ParentBlogCommentId: number,
    blogsId: number,
    content: string,
    appUserId: number,
    userName: string,
    publishDate: Date,
    updateDate: Date,
}