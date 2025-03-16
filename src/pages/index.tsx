// pages/index.tsx
import { useRef } from "react";
import Head from "next/head";

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Hàm lấy vị trí qua Geolocation của trình duyệt
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const googleMapLink = `https://www.google.com/maps?q=${lat},${lon}`;
          if (locationInputRef.current) {
            locationInputRef.current.value = googleMapLink;
          }
        },
        (error) => {
          alert("Không thể lấy vị trí: " + error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      alert("Trình duyệt của bạn không hỗ trợ Geolocation.");
    }
  };

  // Hàm mở link vị trí từ ô VỊ TRÍ MAP
  const openLocationLink = () => {
    const link = locationInputRef.current?.value;
    if (link && link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      alert("Không có link hợp lệ để truy cập!");
    }
  };

  // Hàm chuyển đổi FormData thành chuỗi URL-encoded
  const formDataToQueryString = (formData: FormData): string => {
    const keyValuePairs: string[] = [];
    for (let pair of formData.entries()) {
      keyValuePairs.push(
        encodeURIComponent(pair[0]) +
          "=" +
          encodeURIComponent(String(pair[1]))
      );
    }
    return keyValuePairs.join("&");
  };

  // Hàm tìm kiếm bản ghi dựa trên SỐ CĂN CƯỚC
  const searchRecord = () => {
    if (!formRef.current) return;
    const form = formRef.current;
    const soCanCuoc = (form.elements["SỐ CĂN CƯỚC"] as HTMLInputElement).value;
    if (!soCanCuoc) {
      alert("Vui lòng nhập SỐ CĂN CƯỚC để tìm kiếm.");
      return;
    }
    // Cập nhật endpointUrlSearch theo dịch vụ của bạn
    const endpointUrlSearch =
      "https://script.google.com/macros/s/AKfycbxQRQgb2DGZpOly9_wV1jHK_I8U0g_p2n_r8WkX7DsSyrabRDNPx1C7eQyDS-v2OPVZCg/exec";
    const params =
      "SỐ+CĂN+CƯỚC=" + encodeURIComponent(soCanCuoc) + "&mode=search";
    fetch(endpointUrlSearch + "?" + params, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Điền dữ liệu vào form, chuyển đổi "NĂM SINH" sang định dạng YYYY-MM-DD nếu cần
          for (let key in data) {
            if (data.hasOwnProperty(key) && form.elements[key]) {
              const element = form.elements[key] as HTMLInputElement | HTMLSelectElement;
              if (key === "NĂM SINH") {
                const dateObj = new Date(data[key]);
                if (!isNaN(dateObj.getTime())) {
                  const month = (dateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const day = dateObj.getDate().toString().padStart(2, "0");
                  const formattedDate = dateObj.getFullYear() + "-" + month + "-" + day;
                  element.value = formattedDate;
                } else {
                  element.value = "";
                }
              } else {
                element.value = data[key];
              }
            }
          }
          if (messageRef.current) {
            messageRef.current.style.display = "block";
            messageRef.current.textContent = "Tìm thấy bản ghi.";
            setTimeout(() => {
              if (messageRef.current) {
                messageRef.current.style.display = "none";
              }
            }, 2000);
          }
        } else {
          alert("Không tìm thấy bản ghi.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi tìm kiếm.");
      });
  };

  // Hàm cập nhật bản ghi sau khi chỉnh sửa
  const updateRecord = () => {
    if (!formRef.current) return;
    const form = formRef.current;
    const formData = new FormData(form);
    formData.append("mode", "update");
    const formDataString = formDataToQueryString(formData);
    // Cập nhật endpointUrlUpdate theo dịch vụ của bạn
    const endpointUrlUpdate =
      "https://script.google.com/macros/s/AKfycbxQRQgb2DGZpOly9_wV1jHK_I8U0g_p2n_r8WkX7DsSyrabRDNPx1C7eQyDS-v2OPVZCg/exec";
    fetch(endpointUrlUpdate, {
      method: "POST",
      body: formDataString,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    })
      .then((response) => response.text())
      .then((data) => {
        if (messageRef.current) {
          messageRef.current.style.display = "block";
          messageRef.current.textContent = "Cập nhật dữ liệu thành công!";
          setTimeout(() => {
            if (messageRef.current) {
              messageRef.current.style.display = "none";
            }
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi cập nhật dữ liệu!");
      });
  };

  // Hàm tạo bản ghi mới (Create) – gửi dữ liệu với mode=create
  const createRecord = () => {
    if (!formRef.current) return;
    const form = formRef.current;
    const formData = new FormData(form);
    formData.append("mode", "create");
    const formDataString = formDataToQueryString(formData);
    // Cập nhật endpointUrlCreate theo dịch vụ của bạn (ở đây dùng cùng URL với appendRow)
    const endpointUrlCreate =
      "https://script.google.com/macros/s/AKfycbxQRQgb2DGZpOly9_wV1jHK_I8U0g_p2n_r8WkX7DsSyrabRDNPx1C7eQyDS-v2OPVZCg/exec";
    fetch(endpointUrlCreate, {
      method: "POST",
      body: formDataString,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    })
      .then((response) => response.text())
      .then((data) => {
        if (messageRef.current) {
          messageRef.current.style.display = "block";
          messageRef.current.textContent = "Tạo bản ghi thành công!";
          setTimeout(() => {
            if (messageRef.current) {
              messageRef.current.style.display = "none";
            }
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi tạo bản ghi!");
      });
  };

  return (
    <>
      <Head>
        <title>ĐĂNG KÝ THÔNG TIN - Tìm kiếm & Cập nhật</title>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        />
      </Head>
      <section className="hero is-primary is-bold">
        <div className="hero-body has-text-centered">
          <h1 className="title">ĐĂNG KÝ THÔNG TIN</h1>
        </div>
      </section>
      <div
        className="container"
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #00a779",
          borderRadius: "10px",
        }}
      >
        <form id="registration-form" ref={formRef}>
          {/* SỐ CĂN CƯỚC */}
          <div className="field">
            <label className="label">SỐ CĂN CƯỚC</label>
            <div className="control input-container">
              <input
                className="input"
                type="text"
                name="SỐ CĂN CƯỚC"
                placeholder="Nhập SỐ CĂN CƯỚC"
              />
              <button
                type="button"
                className="button is-small action-button"
                onClick={searchRecord}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          {/* HỌ VÀ TÊN */}
          <div className="field">
            <label className="label">HỌ VÀ TÊN</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="HỌ VÀ TÊN"
                placeholder="Nhập HỌ VÀ TÊN"
              />
            </div>
          </div>
          {/* NĂM SINH */}
          <div className="field">
            <label className="label">NĂM SINH</label>
            <div className="control">
              <input className="input" type="date" name="NĂM SINH" />
            </div>
          </div>
          {/* GIỚI TÍNH */}
          <div className="field">
            <label className="label">GIỚI TÍNH</label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="GIỚI TÍNH" value="Nam" /> Nam
              </label>
              <label className="radio">
                <input type="radio" name="GIỚI TÍNH" value="Nữ" /> Nữ
              </label>
            </div>
          </div>
          {/* HỌ VÀ TÊN (CHỦ HỘ) */}
          <div className="field">
            <label className="label">HỌ VÀ TÊN (CHỦ HỘ)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="HỌ VÀ TÊN (CHỦ HỘ)"
                placeholder="Nhập HỌ VÀ TÊN (CHỦ HỘ)"
              />
            </div>
          </div>
          {/* SHK */}
          <div className="field">
            <label className="label">SHK</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="SHK"
                placeholder="Nhập SHK"
              />
            </div>
          </div>
          {/* THÔN */}
          <div className="field">
            <label className="label">THÔN</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="THÔN">
                  <option value="">Chọn THÔN</option>
                  <option value="THÔN BUÔN ĐÉT">THÔN BUÔN ĐÉT</option>
                  <option value="THÔN EA HEO">THÔN EA HEO</option>
                  <option value="THÔN BẮC TRUNG">THÔN BẮC TRUNG</option>
                  <option value="THÔN ĐOÀN KẾT">THÔN ĐOÀN KẾT</option>
                  <option value="THÔN EA BLÔNG">THÔN EA BLÔNG</option>
                  <option value="THÔN EA CHĂM">THÔN EA CHĂM</option>
                  <option value="THÔN EA CHIÊU 1">THÔN EA CHIÊU 1</option>
                  <option value="THÔN EA ĐINH">THÔN EA ĐINH</option>
                  <option value="THÔN EA CHIÊU">THÔN EA CHIÊU</option>
                  <option value="THÔN HẢI HÀ">THÔN HẢI HÀ</option>
                  <option value="THÔN LIÊN KẾT">THÔN LIÊN KẾT</option>
                  <option value="THÔN QUANG TRUNG">THÔN QUANG TRUNG</option>
                  <option value="THÔN QUYẾT TÂM">THÔN QUYẾT TÂM</option>
                  <option value="THÔN THANH CAO">THÔN THANH CAO</option>
                  <option value="THÔN THỐNG NHẤT">THÔN THỐNG NHẤT</option>
                  <option value="THÔN YÊN KHÁNH">THÔN YÊN KHÁNH</option>
                </select>
              </div>
            </div>
          </div>
          {/* HỌ VÀ TÊN (CHA) */}
          <div className="field">
            <label className="label">HỌ VÀ TÊN (CHA)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="HỌ VÀ TÊN (CHA)"
                placeholder="Nhập HỌ VÀ TÊN (CHA)"
              />
            </div>
          </div>
          {/* HỌ VÀ TÊN (MẸ) */}
          <div className="field">
            <label className="label">HỌ VÀ TÊN (MẸ)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="HỌ VÀ TÊN (MẸ)"
                placeholder="Nhập HỌ VÀ TÊN (MẸ)"
              />
            </div>
          </div>
          {/* VỊ TRÍ MAP */}
          <div className="field">
            <label className="label">VỊ TRÍ MAP</label>
            <div className="control input-container">
              <input
                id="locationInput"
                ref={locationInputRef}
                className="input"
                type="text"
                name="VỊ TRÍ MAP"
                placeholder="Nhấn nút để lấy vị trí"
                readOnly
              />
              <button
                type="button"
                className="button is-small action-button"
                onClick={getLocation}
              >
                <i className="bi bi-geo-alt"></i>
              </button>
            </div>
            <p className="help">Nhấn nút để lấy vị trí và tạo link Google Maps</p>
            <div className="control">
              <button
                type="button"
                className="button is-link link-button"
                onClick={openLocationLink}
              >
                TRUY CẬP LINK
              </button>
            </div>
          </div>
          {/* NÚT CREATE, UPDATE & CANCEL */}
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-success"
                type="button"
                onClick={createRecord}
              >
                Create
              </button>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                type="button"
                id="update-button"
                onClick={updateRecord}
              >
                Update
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={() => formRef.current?.reset()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div
          id="message"
          ref={messageRef}
          style={{ display: "none", marginTop: "20px", fontWeight: "bold" }}
        ></div>
      </div>
    </>
  );
}
