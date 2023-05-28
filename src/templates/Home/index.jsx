import { Component } from 'react'

import '../../styles/global-styles.css';
import './styles.css'

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';




class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };



  async componentDidMount() {
    this.loadPosts()
  }

loadPosts = async () => {

  const { page, postsPerPage } = this.state
  const postsAndPhotos = await loadPosts()
  this.setState({
    posts: postsAndPhotos.slice(page,postsPerPage),
    allPosts: postsAndPhotos
  })
}


loadMorePosts = () => {
  const {
    page,
    postsPerPage,
    allPosts,
    posts
  } = this.state

  const nextPage = page + postsPerPage
  const nextPosts = allPosts.slice(nextPage + postsPerPage)
  posts.push(...nextPosts)

  this.setState({posts, page: nextPage})
}

handleChange = (e) => {
  const {value} = e.target
  this.setState({ searchValue: value})
}

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    : 
    posts
    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            
            <h1>Search value: {searchValue}</h1>
          )}
          
            <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
          {filteredPosts.length > 0 && (<Posts posts={filteredPosts}/>)}
        </div>
        
        {filteredPosts.length === 0 && (<p>Não existem posts com esse nome :(</p>)}
        
        <div className='button-container'>
          {!searchValue && (
            <Button onClick={this.loadMorePosts} disabled={noMorePosts}/>
          )}         
        </div>
      </section>
      
    );
  }
}

export default Home;
