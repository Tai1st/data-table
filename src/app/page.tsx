import React from 'react'
import BlogTable from '@/components/blog-table'

const ReactTable = () => {
  return (
    <div className='flex flex-col p-10 bg-gray-300 h-screen w-full'>
      <h2 className='font-semibold'>Blog listing</h2>

      <div className='mt-10'>
        <BlogTable />
      </div>
    </div>
  )
}

export default ReactTable
