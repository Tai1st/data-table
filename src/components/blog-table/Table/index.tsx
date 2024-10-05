import { Resident, columns } from "./columns"
import { DataTable } from "../../ui/data-table"


  async function getData(): Promise<Resident[]> {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_4qwludY84qEOxKLYYQnAFlmG2o8BW9SjJO-eWdBd_8OxBKbtFzNku4jJXuLLyS7Vhg/exec');
      const data = await response.json();
      console.log(data);
      return data; // Chuyển đổi dữ liệu từ API thành danh sách Resident nếu cần
    } catch (error) {
      console.error('Error:', error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }
  

async function MainTable() {
  const data = await getData()

  return (
    <div className="container mx-auto w-full py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
export default MainTable
