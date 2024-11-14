const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  try {
    // Tạo transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Tạo danh sách sản phẩm và hình ảnh đính kèm
    let listItem = '';
    const attachments = orderItems.map((order, index) => {
      listItem += `
        <div>
          <p>Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></p>
          <img src="cid:image${index}" alt="${order.name}" style="width: 200px; height: auto;"/>
        </div>`;
      return {
        filename: `image${index}.jpg`,
        path: order.image, // Đường dẫn đến ảnh
        cid: `image${index}` // Content-ID để nhúng ảnh vào email
      };
    });

    // Gửi email
    let info = await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "Bạn đã đặt hàng tại Hoang System Education",
      html: `<div><b>Bạn đã đặt hàng thành công tại shop Hoang System Education</b></div> ${listItem}`,
      attachments: attachments,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendEmailCreateOrder,
};
