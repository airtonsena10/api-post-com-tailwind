import Pagination from "./Pagination"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface BlogPost{
  userId: number,
  id: number,
  title: string,
  body: string,
}

export interface comment{
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

function Posts(){
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const postsPerPage = 6
  const [user, setUser] = useState<any>()

  // Controla a paginação
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

 
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [currentPage])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data)
        setTotalPosts(data.length)
        setHasMore(data.length === postsPerPage)
        const randomUserId = Math.floor(Math.random() * 10) + 1
        fetch(`https://jsonplaceholder.typicode.com/users/${randomUserId}`)
          .then(res => res.json())
          .then(user => setUser(user))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(`error fetching posts: ${error}`))
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

  return(<>
    <div className="flex flex-col m-auto">
    
      <div id='logo' className="w-[100%] h-[100px] bg-[#1f1d1b] justify-center flex gap-[5rem] text-[1.3rem] pt-[.5rem] pb-[.5rem] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] font-semibold">
       
        <p className="text-[#d1d1ce] font-bold text-[1.5rem] uppercase">blog API</p>
       
      </div>
      <div id='posts-section' className="w-[50%] m-auto max-[1359px]:w-[70%] max-[1000px]:w-[85%] max-[750px]:w-[100%]">
     
      {currentPosts.map(post => (
        <div key={post.id} className="p-[2rem] m-[1rem] flex flex-col relative bg-[#363636]">
          <div className="flex flex-col">
            <p className="capitalize text-left mb-[1rem] text-[2rem]"><Link href={`/posts/${post.id}`}>{post.title}</Link></p>
            <p className="mb-[1rem] font-semibold">Author: {user && user.name}</p>
            <p className="text-[1.25rem] mb-[1rem]">{post.body}</p>
          </div>
        <div className="flex gap-4 absolute bottom-3 right-8">
          <Link href={`/posts/${post.id}`} passHref>
            Ler mais
          </Link>
        </div>
        </div>
      ))}
      </div>
      
      <div id='pagination' className="flex justify-center mt-[1rem]">
        {currentPage === 1 ? null : <button className='pr-[.5rem] text-[#686868] font-[500]' onClick={previousPage}>Anterior</button>}
        <p className='font-bold text-[1.1rem] border-[1px] border-gray-500 rounded-[10px] w-[1.5rem] shadow-[0px_8px_24px_rgb(0,0,0,12%)]'><span className='flex justify-center'>{currentPage}</span></p>
        <button className='pl-[.5rem] text-[#525252] font-[500]' onClick={nextPage}>Próximo</button>
      </div>
      <div id='footer' className="w-full place-items-center bg-[#525252] items-center text-[1.3rem] mt-[2rem] pt-[.5rem] pb-[.5rem] font-semibold max-[750px]:w-full">
      
      </div>
    </div>
  </>)
}

export default Posts