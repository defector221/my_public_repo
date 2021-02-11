const BaseService = require('./BaseService');
const BookModel =  require('../model/Book');
const BOOK_CONTAINER = require('../Books.Container');

module.exports = class Service extends BaseService{
    constructor(request){
        super(request);
    }

    async getAll(){
        return {
            status: true,
            books:BOOK_CONTAINER.toJSON()
        }
    }

    async addNewBookRecord(){
        let bookJSON = {
            name: this.props.name || "",
            description: this.props.description || "",
            publishedDate: this.props.publishedDate || "",
            author: this.props.author || "",
            count: this.props.count || "" ,
            bookType: this.props.bookType || ""
        }
        let book = BookModel.parse(bookJSON);
        BOOK_CONTAINER.addBook(book.getID(), book);
        return book.getID();
    }

    async getBooksDeatilsByID(bookID){
        try{
            return {
                status: true,
                books:BOOK_CONTAINER.getBook(bookID).toJSON()
            }
        }catch(err){}
        return {
            status: false
        }
    }

    async deleteBooksByID(bookID){
        console.log(bookID + " for Delete");
        BOOK_CONTAINER.removeBook(bookID);
        return {
            status: true
        }
    }

    async updateBooks(bookID){
        var book = BOOK_CONTAINER.getBook(bookID)
        var update_field_mapping = this.props;

        if(update_field_mapping['name']){
            book.setName(update_field_mapping['name']);
        }

        if(update_field_mapping['description']){
            book.setDescription(update_field_mapping['description']);
        }

        if(update_field_mapping['publishedDate']){
            book.setPublishedDate(update_field_mapping['publishedDate']);
        }

        if(update_field_mapping['author']){
            book.setAuthor(update_field_mapping['author']);
        }

        if(update_field_mapping['count']){
            book.setCount(update_field_mapping['count']);
        }

        if(update_field_mapping['bookType']){
            book.setBookType(update_field_mapping['bookType']);
        }

    }
}

