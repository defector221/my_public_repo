const { UUID } = require('../helper/Utils');

module.exports = class Book {
    constructor(name, description, author, count, bookType, publishedDate, id) {
        this.bookName = name;
        this.bookDescription = description;
        this.author = author;
        this.totalCount = count;
        this.type = bookType;
        this.publishedDate = publishedDate;
        this.id = id || UUID();
    }

    get() {
        return this;
    }

    getDescription() {
        return this.bookDescription;
    }

    setDescription(description) {
        this.bookDescription = description;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(author) {
        this.author = author;
    }

    getCount() {
        return this.totalCount;
    }

    setCount(count) {
        this.totalCount = count;
    }

    getBookType() {
        return this.type;
    }

    setBookType(bookType) {
        this.type = bookType;
    }

    getPublishedDate() {
        return this.publishedDate;
    }

    setPublishedDate(publishedDate) {
        this.publishedDate = publishedDate;
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.bookName;
    }

    setName(bookName){
        this.bookName = bookName;
    }

    toJSON(){
        return {
            name: this.getName(),
            description: this.getDescription(),
            id: this.getID(),
            publishedDate: this.getPublishedDate(),
            author: this.getAuthor(),
            count: this.getCount(),
            bookType: this.getBookType()
        }
    }

    static parse(bookJSON){
        return new Book(bookJSON.name, bookJSON.description, bookJSON.author, bookJSON.count, bookJSON.bookType, bookJSON.publishedDate, bookJSON.id);
    }
}