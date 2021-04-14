import React , {Component} from "react"
import Book from './Book.js'
class BookShelf extends Component {

  constructor(props) {
    super(props);
  }
    render (){
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.map((book) => (
                       
                        (book.shelf === this.props.shelfName) && (<li key = {book.id}> 
                        <Book 
                            title ={book.title} 
                            author = {book.authors}
                            img = {book.imageLinks.thumbnail}
                            category = {book.shelf} 
                            changeShelf ={this.props.changeShelf}
                            bookObj = {book}
                            />
                       </li>)
                      ))
                      }
                    </ol>
                  </div>
                </div>
        )

    }
}
export default BookShelf

