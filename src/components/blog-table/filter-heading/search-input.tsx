import { Input } from '@/components/ui/input'
import React from 'react'

const SearchInput = () => {
  return (
    <div
    className='w-full'
    >
      <Input type="text" placeholder="Nhập từ tìm kiếm" 
      className=' bg-gray-300 w-full '
      />
    </div>
  )
}

export default SearchInput
