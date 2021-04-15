import React , {Component} from "react"
class Book extends Component {
  constructor(props) {
    super(); 
    this.handleChange = this.handleChange.bind(this); 
  } 
  handleChange(event) {
    this.props.changeShelf(this.props.bookObj,event.target.value)
  } 
 render (){
  const img = this.props.bookObj.imageLinks?this.props.bookObj.imageLinks.thumbnail:'';
        return(
            <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={ 
                              {width: 128,
                               height: 193,
                              backgroundImage: 'url('+img+')' }}
                              >
                              </div>
                            <div className="book-shelf-changer">
                              <select value={this.props.bookObj.shelf} onChange={this.handleChange} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.title}</div>
                          <div className="book-authors">{this.props.author}</div>
                        </div>
        )

    }
}

export default Book
