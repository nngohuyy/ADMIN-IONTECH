const product_status = [
  { key: "draft", label: "Draft" },
  { key: "published", label: "Published" },
  { key: "archived", label: "Archived" },
  { key: "pending", label: "Pending" },
  { key: "deleted", label: "Deleted" },
];

const product_template = [
  { key: "default", label: "Default" },
  { key: "electronics", label: "Electronics" },
  { key: "clothing", label: "Clothing" },
  { key: "home_appliances", label: "Home Appliances" },
  { key: "books", label: "Books" },
  { key: "toys", label: "Toys" },
];

const product_type = [
  { key: "laptop", label: "Laptop" },
  { key: "pc", label: "PC" },
  { key: "main-cpu-vga", label: "Main, CPU, VGA" },
  { key: "case-nguon-tan", label: "Case, Nguồn, Tản" },
  { key: "o-cung-ram-the-nho", label: "Ổ cứng, RAM, Thẻ nhớ" },
  { key: "loa-micro-webcam", label: "Loa, Micro, Webcam" },
  { key: "man-hinh", label: "Màn hình" },
  { key: "ban-phim", label: "Bàn phím" },
  { key: "chuot-lot-chuot", label: "Chuột + Lót chuột" },
  { key: "tai-nghe", label: "Tai Nghe" },
  { key: "ghe-ban", label: "Ghế - Bàn" },
  { key: "phan-mem-mang", label: "Phần mềm, mạng" },
  { key: "handheld-console", label: "Handheld, Console" },
  { key: "phu-kien", label: "Phụ kiện (Hub, sạc, cáp..)" },
  { key: "dich-vu", label: "Dịch vụ và thông tin khác" },
];

const product_variation = [
  { key: "color", label: "Màu sắc" },
  { key: "size", label: "Kích thước" },
  { key: "storage", label: "Dung lượng" },
  { key: "weight", label: "Trọng lượng" },
  { key: "material", label: "Chất liệu" },
  { key: "style", label: "Kiểu dáng" },
]

const tax_class = [
  { key: "tax-free", label: "Tax free" },
  { key: "taxable-goods", label: "Taxable goods" },
  { key: "taxable-services", label: "Taxable services" },
];

export {
  product_status,
  product_template,
  product_type,
  product_variation,
  tax_class,
};
