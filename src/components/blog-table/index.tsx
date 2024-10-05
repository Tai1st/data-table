import React from 'react' // Import React để sử dụng JSX và các tính năng của React.
import FilterHeading from './filter-heading/index' 
import MainTable from './Table'
// Import component FilterHeading từ thư mục `filter-heading`. Đây có thể là một component dùng để lọc bảng dữ liệu blog.

const BlogTable = () => { 
  return (
    <div
      className='flex flex-col w-full bg-white shadow-md'
      // Một div bao quanh toàn bộ bảng blog với các lớp CSS để định dạng giao diện.
      // flex flex-col: Đặt các phần tử con theo chiều dọc (vertical).
      // w-full: Độ rộng 100%.
      // bg-white: Nền màu trắng.
      // shadow-md: Thêm bóng cho khối này để tạo hiệu ứng nổi.
    > 
      <MainTable/>
      {/* Một đoạn văn bản đơn giản hiển thị từ "Blogtable". Có thể dùng để kiểm tra hoặc hiển thị tiêu đề. */}
    </div>
  )
}

export default BlogTable 
// Xuất component BlogTable để sử dụng ở các phần khác trong ứng dụng.
