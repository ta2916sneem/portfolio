
export interface IHomeBlogState{
    homeBlogLoading: boolean,
    homeBlogError: false | string,
    homeBlogSuccess: boolean,
    homeBlogs: IBlog[]
}


export interface IBlogEditState {
    isUpdating: boolean,
    updateSuccess: boolean,
    updateError: boolean | string,
}

export interface IBlog{
    _id?: string,
    title: string,
    description: string,
    publishedOn?: string,
    content?: string,
    applauds?: number,
    tags: string[],
    level: string,
    isPublished?: boolean
}

export interface IBlogState{
    allBlogs: IBlog[],
    readBlog: IBlog | null,
    loading?: boolean,
    error?: boolean | string,
    success?: boolean
}

export interface ISearchState {
    searchedBlogs: IBlog[],
    searching: boolean,
    searchSuccess: boolean,
    searchError: boolean,
    isInSearchMode: boolean
}

export interface IBlogReadState{
    loading: boolean,
    blog?: IBlog,
    fetchSuccess: boolean,
    fetchError: boolean | string,
    isApplauding: boolean,
    applaudError: boolean | string,
    publishError: boolean | string,
    isPublishing: boolean,
    isDeleting: boolean,
    toBeDeleted: boolean,
    deleteSuccess: boolean,
    deleteError: boolean
}

export enum Success {
    IDLE,
    SAVED,
    Submitted
}

export interface IBlogCreateState{
    isSubmitting: boolean,
    createSuccess: Success,
    createError: boolean | string
}

