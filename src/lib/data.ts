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
  { name: "Vinmec", logo: "/logos/vinmec.png" },
  { name: "FV Hospital", logo: "/logos/fv.png" },
  { name: "Hoàn Mỹ", logo: "/logos/hoan-my.png" },
  { name: "Việt Pháp", logo: "/logos/viet-phap.png" },
  { name: "Thu Cúc", logo: "/logos/thu-cuc.png" },
  { name: "Đại học Y Dược", logo: "/logos/y-duoc.jpg" },
  { name: "Bệnh viện 115", logo: "/logos/bv-115.png" },
  { name: "Chợ Rẫy", logo: "/logos/cho-ray.png" },
];

// FAQ data
export const faqData = [
  {
    question: "Bảo lãnh viện phí là gì?",
    answer:
      "Bảo lãnh viện phí là hình thức mà công ty bảo hiểm thanh toán trực tiếp chi phí điều trị cho bệnh viện trong phạm vi quyền lợi của hợp đồng, giúp bạn không cần tạm ứng tiền trước tại các cơ sở y tế liên kết.",
  },
  {
    question: "Có áp dụng tại mọi bệnh viện không?",
    answer:
      "Không. Bảo lãnh viện phí áp dụng tại các bệnh viện và phòng khám nằm trong hệ thống liên kết của Generali (hiện có 460+ cơ sở). Với các bệnh viện ngoài hệ thống, bạn có thể thanh toán trước và thực hiện yêu cầu bồi thường (claim) sau.",
  },
  {
    question: "Khi nào phải tự trả tiền?",
    answer:
      "Bạn sẽ cần tự thanh toán trong các trường hợp: chi phí vượt quá hạn mức quyền lợi của gói bảo hiểm, dịch vụ không thuộc phạm vi chi trả, hoặc điều trị tại cơ sở không áp dụng bảo lãnh. Tư vấn viên sẽ giải thích rõ trước khi tham gia để bạn hiểu quyền lợi của mình.",
  },
  {
    question: "Thủ tục claim (yêu cầu bồi thường) như thế nào?",
    answer:
      "Có 2 hình thức: Bảo lãnh – bạn chỉ cần xuất trình thẻ bảo hiểm, bệnh viện sẽ phối hợp với công ty bảo hiểm xử lý. Hoàn trả – bạn thanh toán trước, sau đó nộp hồ sơ qua app GenVita hoặc email để được xem xét chi trả theo quy định. Thời gian xử lý tùy thuộc vào hồ sơ và quy trình thẩm định.",
  },
  {
    question: "Bệnh có sẵn (pre-existing) có được chi trả không?",
    answer:
      "Các bệnh có sẵn thường áp dụng thời gian chờ theo quy định của sản phẩm (có thể từ 12–24 tháng tùy trường hợp). Sau thời gian này, quyền lợi sẽ được xem xét chi trả theo điều khoản hợp đồng.",
  },
  {
    question: "Phí bảo hiểm có thay đổi theo thời gian không?",
    answer:
      "Phí bảo hiểm được tính theo độ tuổi, giới tính và quyền lợi tham gia. Phí có thể điều chỉnh khi bạn chuyển sang nhóm tuổi mới hoặc theo chính sách của công ty tại từng thời điểm.",
  },
  {
    question: "App GenVita có những tính năng gì?",
    answer:
      "App GenVita hỗ trợ: xem thẻ bảo hiểm điện tử, tra cứu bệnh viện liên kết, nộp hồ sơ yêu cầu bồi thường, theo dõi tiến độ xử lý và liên hệ hỗ trợ.",
  },
  {
    question: "Có thể mua cho cả gia đình không?",
    answer:
      "Có. Bạn có thể tham gia cho bản thân, vợ/chồng và con cái. Tùy theo chương trình tại từng thời điểm, có thể có chính sách ưu đãi khi tham gia nhiều người.",
  },
  {
    question: "Bảo hiểm có chi trả 100% chi phí không?",
    answer:
      "Không phải mọi trường hợp đều được chi trả 100%. Mức chi trả phụ thuộc vào hạn mức quyền lợi, phạm vi bảo hiểm và điều khoản hợp đồng. Một số chi phí có thể không được chi trả hoặc chỉ chi trả một phần.",
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
