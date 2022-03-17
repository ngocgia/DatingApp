export interface Comment {
    blogCommentId: number,
    blogsId: number,
    content: string,
    appUserId: number,
    username: string,
    publishDate: Date,
    updateDate: Date,
    userPhotoUrl: string
}