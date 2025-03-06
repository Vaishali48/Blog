import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '@/components/ui/avatar'
import { decode } from 'entities'


const SingleBlogDetails = () => {
  const { blog } = useParams()
  const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
    method: 'get',
    credentials: 'include',
  })


  if (loading) return <Loading />
  return (

    <div className='flex justify-between gap-20'>
      {data && data.blog &&
        <>
          <div className='border rounded w-[70%] p-5'>
            <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center gap-5'>
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <span>{data.blog.author.name}</span>
              </div>
            </div>
            <div className="my-5">
                <img src={data.blog.featuredImage} className="rounded"/>
            </div>
            <div dangerouslySetInnerHTML={{__html:decode(data.blog.blogContent) || ''}}>

            </div>
          </div>

        </>

      }

      <div className='border rounded w-[30%]'></div>
    </div >
  )
}

export default SingleBlogDetails