// Activity feed data - realistic, rotating messages
export const activityMessages = [
  { city: "TP.HCM", action: "vừa nhận tư vấn", time: "2 phút trước" },
  { city: "Hà Nội", action: "đã xem báo giá gói Nâng cao", time: "5 phút trước" },
  { city: "Đà Nẵng", action: "vừa đăng ký tư vấn", time: "8 phút trước" },
  { city: "TP.HCM", action: "đã nhận phí bảo hiểm gia đình 4 người", time: "12 phút trước" },
  { city: "Bình Dương", action: "vừa hoàn tất hồ sơ", time: "15 phút trước" },
  { city: "Hà Nội", action: "đã so sánh gói Cơ bản và Nâng cao", time: "18 phút trước" },
  { city: "Cần Thơ", action: "vừa nhận tư vấn qua Zalo", time: "22 phút trước" },
  { city: "TP.HCM", action: "đã xem báo giá cho 2 người", time: "25 phút trước" },
  { city: "Hải Phòng", action: "vừa đăng ký tư vấn gói gia đình", time: "30 phút trước" },
  { city: "Nha Trang", action: "đã nhận file hướng dẫn claim", time: "35 phút trước" },
];

// Hospital partner logos
export const hospitalPartners = [
  { name: "Vinmec", logo: "🏥" },
  { name: "FV Hospital", logo: "🏥" },
  { name: "Hoàn Mỹ", logo: "🏥" },
  { name: "Việt Pháp", logo: "🏥" },
  { name: "Thu Cúc", logo: "🏥" },
  { name: "Đại học Y Dược", logo: "🏥" },
  { name: "Bệnh viện 115", logo: "🏥" },
  { name: "Chợ Rẫy", logo: "🏥" },
];

// FAQ data
export const faqData = [
  {
    question: "Bảo lãnh viện phí là gì?",
    answer:
      "Bảo lãnh viện phí là quyền lợi cho phép bạn nhập viện và điều trị mà không cần thanh toán trước. Generali sẽ thanh toán trực tiếp cho bệnh viện theo phạm vi quyền lợi hợp đồng của bạn.",
  },
  {
    question: "Có áp dụng tại mọi bệnh viện không?",
    answer:
      "Bảo lãnh viện phí áp dụng tại hệ thống 460+ bệnh viện và phòng khám liên kết trên toàn quốc, bao gồm Vinmec, FV, Hoàn Mỹ, và nhiều bệnh viện uy tín khác. Danh sách được cập nhật thường xuyên.",
  },
  {
    question: "Khi nào phải tự trả tiền?",
    answer:
      "Bạn chỉ cần tự thanh toán phần chênh lệch (nếu có) vượt quá hạn mức quyền lợi, hoặc các dịch vụ nằm ngoài phạm vi bảo hiểm. Tư vấn viên sẽ giải thích rõ trước khi bạn tham gia.",
  },
  {
    question: "Thủ tục claim (yêu cầu bồi thường) như thế nào?",
    answer:
      "Với bệnh viện bảo lãnh: bạn chỉ cần xuất thẻ bảo hiểm, bệnh viện tự xử lý. Với bệnh viện ngoài hệ thống: bạn thanh toán trước, sau đó nộp hồ sơ claim qua app GenVita hoặc email. Thời gian xử lý trung bình 5–7 ngày làm việc.",
  },
  {
    question: "Bệnh có sẵn (pre-existing) có được chi trả?",
    answer:
      "Tùy từng bệnh và thời gian chờ. Một số bệnh có thời gian chờ 12–24 tháng. Tư vấn viên sẽ trao đổi chi tiết về tình trạng sức khỏe của bạn để xác định quyền lợi chính xác.",
  },
  {
    question: "Phí bảo hiểm có tăng theo thời gian không?",
    answer:
      "Phí bảo hiểm được tính theo nhóm tuổi và có thể điều chỉnh khi bạn chuyển sang nhóm tuổi mới (thường mỗi 5–10 năm). Tuy nhiên, quyền lợi cũng tăng tương ứng.",
  },
  {
    question: "App GenVita có những tính năng gì?",
    answer:
      "App GenVita cho phép bạn: xem thẻ bảo hiểm điện tử, tra cứu bệnh viện liên kết, nộp hồ sơ claim online, theo dõi tiến độ xử lý, và liên hệ hỗ trợ 24/7.",
  },
  {
    question: "Có thể mua cho cả gia đình không?",
    answer:
      "Có. Bạn có thể mua cho vợ/chồng và con cái. Khi mua cho nhiều người (từ 2 người trở lên), bạn sẽ được ưu đãi giảm phí.",
  },
];

// Case study data
export const caseStudies = [
  {
    name: "Chị Lan",
    age: 34,
    city: "TP.HCM",
    procedure: "Sinh mổ",
    totalBill: 78000000,
    covered: 72000000,
    paid: 6000000,
    quote:
      "Lúc sinh mổ mình không nghĩ gì ngoài con. May mà có bảo lãnh, chồng mình chỉ cần ký tên là xong.",
  },
  {
    name: "Anh Minh",
    age: 42,
    city: "Hà Nội",
    procedure: "Phẫu thuật ruột thừa",
    totalBill: 45000000,
    covered: 43500000,
    paid: 1500000,
    quote:
      "Nhập viện cấp cứu lúc 2h sáng. Chỉ cần đưa thẻ, bệnh viện lo hết. Không cần gọi ai mượn tiền.",
  },
];
