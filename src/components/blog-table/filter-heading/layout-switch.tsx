"use client" // Chỉ ra rằng component này sẽ được render trên client-side (trong trình duyệt).

import React, { useState } from 'react' // Import React và hook useState để quản lý trạng thái.
import { AlignJustify, LayoutGrid } from "lucide-react" // Import các icon từ thư viện lucide-react.
import { Button } from '@/components/ui/button' // Import component Button từ thư mục giao diện của bạn.

const LayoutSwitch = () => { // Định nghĩa component chức năng LayoutSwitch.

    // Khai báo trạng thái activeView, với giá trị mặc định là "list" (chế độ danh sách).
    // Hàm setActiveView được sử dụng để cập nhật trạng thái khi người dùng chuyển chế độ.
    const [activeView, setActiveView] = useState<"list" | "card">("list")

    return (
        <div> {/* Bọc hai nút trong một thẻ div */}
            {/* Nút để chuyển sang chế độ danh sách */}
            <Button
                // Nếu activeView là "list", biến thể của nút sẽ là "default" (được chọn). Nếu không, sẽ là "outline".
                variant={activeView === "list" ? "default" : "outline"}
                size="icon" // Kích thước của nút là "icon" (kích thước nhỏ).
                className='rounded-r-none' // Gỡ bỏ góc bo tròn bên phải của nút này để nó ghép với nút kế tiếp.
                onClick={() => setActiveView("list")} // Khi nhấn vào nút này, đặt chế độ hiển thị thành "list".
            >
                <AlignJustify className="h-4 w-4" /> {/* Hiển thị icon AlignJustify (biểu tượng danh sách) */}
            </Button>

            {/* Nút để chuyển sang chế độ lưới */}
            <Button
                // Nếu activeView là "card", biến thể của nút sẽ là "default" (được chọn). Nếu không, sẽ là "outline".
                variant={activeView === "card" ? "default" : "outline"}
                size="icon" // Kích thước của nút là "icon" (kích thước nhỏ).
                className='rounded-l-none' // Gỡ bỏ góc bo tròn bên trái của nút này để ghép với nút trước đó.
                onClick={() => setActiveView("card")} // Khi nhấn vào nút này, đặt chế độ hiển thị thành "card".
            >
                <LayoutGrid className="h-4 w-4" /> {/* Hiển thị icon LayoutGrid (biểu tượng lưới) */}
            </Button>
        </div>
    )
}

export default LayoutSwitch // Xuất component LayoutSwitch để sử dụng ở nơi khác.
