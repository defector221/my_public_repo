const initState = {
    isLoading : true,
    books: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RESOLVED_BOOK':
            return {
                ... state,
                books: action.books,
                isLoading: false
            };
        case 'ADD_BOOK':
            let books = state.books;
            books.push(action.data)
            return {
                ... state,
                books: books,
            }
        case 'DELETE_BOOK':
            return {
                ... state,
                books: state.books.filter(function(book){
                    return book.id != action.id
                })
            }
        case 'UPDATE_BOOK':
            let newBooks = [];
            state.books.forEach(function(book){
                if(book.id == action.data.id){
                    newBooks.push({...action.data.bookData, id:action.data.id});
                }else{
                    newBooks.push(book);
                }
            });
            return {
                ...state,
                books: newBooks
            }
        default:
            break;
    }
    return state
}

export default rootReducer;