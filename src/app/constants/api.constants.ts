export const AuthApis = {
    login: `book-barter-platform/api/login`,
    register: `book-barter-platform/api/register`,
    loggedInUser: `book-barter-platform/api/getLoggedInUser`,
    forgotPassword: `book-barter-platform/api/forgotPassword`,
    resetPassword: (resetToken: any) => `book-barter-platform/api/resetPassword/${resetToken}`,
};

export const BookApis = {
    createBook: `book-barter-platform/api/addBook`,
    getBook:(bookId: any) =>  `book-barter-platform/api/getBook/${bookId}`,
    getBooks:(limit=10, page=1, searchTerm='') =>  `book-barter-platform/api/getBooks?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    updateBook: (bookId: any) => `book-barter-platform/api/updateBook/${bookId}`,
    removeBook: (bookId: any) => `book-barter-platform/api/removeBook/${bookId}`,
};