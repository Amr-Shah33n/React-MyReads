import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css'
import BookShelf from './components/BookShelf'
import Book from './components/Book'
import {getAll,search} from './BooksAPI'

class BooksApp extends React.Component {
  state = { 
    books: [],
    query:'',
    searchedBooksToShow: [],

  }
async componentDidMount () {
   try {
          const booksReturned = await getAll();
          this.setState({books:booksReturned})
        } 
   catch (error){
      console.log(error)
   }

}
changeShelf = (book,shelf) =>{
  if (shelf === 'none'){
    this.setState({
      books: this.state.books.filter( function (stateBook){
        if (stateBook.id === book.id) {
          return    
        } else {
          return stateBook
        }
  })
    })
  } else {
    this.setState({
      books: this.state.books.map( bk => {
        if (bk.id === book.id){
              bk.shelf = shelf
              return bk
        } else {
          return bk
        }
  
      })
    })
  }
}

addNewBookToShelf = (book,shelf) =>{
  let isNotThere = true
  this.state.books.forEach((bk) => {
    if (bk.id === book.id){
      isNotThere = false
      return
    } 
})

if (isNotThere){
  let tempArray = this.state.books
  book.shelf = shelf
  tempArray.push (book)
  this.setState({
    books: tempArray
  })
}
}
async updateSearchQuery(quer){
    try {
      if (quer === '' || quer === undefined){
        this.setState({query: ''})
        this.setState({searchedBooksToShow: []})
        
        return
      }
      this.setState({query: quer})
      const searchedBooks = await search(quer);
      this.state.books.forEach((bk) => {  
        searchedBooks.filter( function (sbook){
          if (sbook.id === bk.id && (sbook.shelf !== 'read'|| sbook.shelf !== 'wantToRead'
           || sbook.shelf !== 'currentlyReading' || sbook.shelf === undefined) ) {
                sbook.shelf = bk.shelf
                return sbook 
          } else {
            if(sbook.shelf === 'read'|| sbook.shelf === 'wantToRead' || sbook.shelf === 'currentlyReading' ){  
            } else {
              sbook.shelf = 'none'
              return sbook
            }  
          }
    }) 
    })
      this.setState({searchedBooksToShow: searchedBooks}) 
    } 
    catch (error){
      console.log(error)
  }
}
  render() {
   let notEmptySearchResult = false
    if (this.state.searchedBooksToShow.length > 0 && this.state.searchedBooksToShow !== undefined 
      && this.state.searchedBooksToShow !== null) 
        {
      notEmptySearchResult = true
    } 
    return (
      <Router>
        <Switch>
          <Route exact path = "/">
          <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <BookShelf title ='Currently Reading' books = {this.state.books} shelfName = 'currentlyReading' changeShelf = {this.changeShelf}/>
              <BookShelf title ='Wanting to Read' books = {this.state.books} shelfName = 'wantToRead' changeShelf = {this.changeShelf}/>
              <BookShelf title ='Read' books = {this.state.books} shelfName = 'read' changeShelf = {this.changeShelf}/>
              <div className="open-search">
              <Link className="open-search" to="/search" >Add a book</Link>
            </div>
              </div>
            </div>
          </div>  
        }
      </div>
          </Route>
          <Route exact path = "/search">
          <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input  type="text" 
                        placeholder="Search by title or author" 
                        value ={this.state.query} 
                        onChange = {(e) => 
                          this.updateSearchQuery(e.target.value)
                        }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">´
              {
                  notEmptySearchResult && (this.state.searchedBooksToShow.map((searchBook) => ( 
                    <li key = {searchBook.id}> 
                    <Book 
                        title ={searchBook.title} 
                        author = {searchBook.authors}
                        img = {searchBook.imageLinks.thumbnail?searchBook.imageLinks.thumbnail:"NA"}
                        category = {searchBook.shelf}
                        changeShelf ={this.addNewBookToShelf}
                        bookObj = {searchBook}
                        />
                   </li>
                    ))
                   )
                     }
              </ol>
            </div>
          </div>
      </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default BooksApp
