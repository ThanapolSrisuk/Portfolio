// --- ระบบตะกร้าสินค้าแบบมินิมอล + ระบบลบสินค้า ---
let cartItems = [];
let totalPrice = 0;

// ฟังก์ชัน 1: กดเพิ่มสินค้าลงตะกร้า
function addToCart(itemName, itemPrice) {
    // เก็บสินค้าลง Array
    cartItems.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice; // บวกยอดรวม
    
    // อัปเดตตัวเลขตะกร้าด้านบน
    document.getElementById('cart-count').innerText = cartItems.length;
    
    // แสดงแจ้งเตือนเบาๆ
    alert(`เพิ่ม "${itemName}" ลงตะกร้าเรียบร้อยแล้ว`);
    
    // อัปเดตข้อมูลใน Popup
    updateCartPopup();
}

// ฟังก์ชัน 2: อัปเดตข้อมูลในหน้าต่าง Popup (เพิ่มปุ่มลบสินค้า)
function updateCartPopup() {
    const cartDiv = document.getElementById('cart-items');
    
    if (cartItems.length === 0) {
        cartDiv.innerHTML = '<p style="color: #666; text-align: center; font-size: 13px;">ยังไม่มีสินค้าในตะกร้า</p>';
    } else {
        let html = '';
        // วนลูปสร้างรายการสินค้า โดยส่งลำดับ (index) ไปให้ฟังก์ชันลบด้วย
        cartItems.forEach((item, index) => {
            html += `
                <div class="cart-item-row" style="align-items: center;">
                    <div>
                        <span>${item.name}</span>
                        <button class="btn-remove-item" onclick="removeFromCart(${index})" title="ลบสินค้านี้">❌</button>
                    </div>
                    <span>${item.price} ฿</span>
                </div>
            `;
        });
        cartDiv.innerHTML = html;
    }
    
    // อัปเดตยอดเงินรวม
    document.getElementById('total-price').innerText = totalPrice;
}

// ฟังก์ชัน 3: ลบสินค้าออกจากตะกร้า (ฟีเจอร์ใหม่)
function removeFromCart(index) {
    // 1. หักราคาสินค้าชิ้นที่จะลบออกจากยอดรวม
    totalPrice -= cartItems[index].price;
    
    // 2. ลบข้อมูลสินค้าออกจาก Array ตามตำแหน่ง index
    cartItems.splice(index, 1);
    
    // 3. อัปเดตตัวเลขจำนวนสินค้าบนตะกร้าด้านบน Navbar
    document.getElementById('cart-count').innerText = cartItems.length;
    
    // 4. สั่งให้ Popup วาดรายการสินค้าใหม่ทันทีหลังลบ
    updateCartPopup();
}

// ฟังก์ชัน 4: เปิด Popup ตะกร้า
function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
}

// ฟังก์ชัน 5: ปิด Popup ตะกร้า
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';

}

// --- ฟังก์ชันเพิ่มเติมสำหรับ Checkout ---

// 1. เปิดหน้า Checkout
function openCheckout() {
    if (cartItems.length === 0) {
        alert("กรุณาเลือกสินค้าลงตะกร้าก่อนชำระเงินค่ะ");
        return;
    }
    // ปิดตะกร้าก่อน แล้วค่อยเปิด Checkout
    closeCart();
    document.getElementById('checkout-modal').style.display = 'flex';
    document.getElementById('checkout-total').innerText = totalPrice;
}

// 2. ปิดหน้า Checkout
function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// 3. ยืนยันการสั่งซื้อ (จำลองการส่งข้อมูล)
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    if (!name || !phone || !address) {
        alert("กรุณากรอกข้อมูลที่อยู่จัดส่งให้ครบถ้วนค่ะ");
        return;
    }

    alert(`ขอบคุณคุณ ${name} ที่อุดหนุนค่ะ!\nเราได้รับคำสั่งซื้อยอด ${totalPrice} บาท เรียบร้อยแล้ว`);
    
    // รีเซ็ตตะกร้าหลังจากสั่งซื้อสำเร็จ
    cartItems = [];
    totalPrice = 0;
    document.getElementById('cart-count').innerText = 0;
    updateCartPopup();
    
    // ปิดหน้าต่าง
    closeCheckout();
}

// (เพิ่มฟังก์ชันดั้งเดิมด้านล่างนี้ด้วยเพื่อให้ระบบลบสินค้าและแชททำงานต่อได้)

// =========================================
// ระบบเดิม (การยกเลิกออเดอร์ที่ชำระเงินแล้ว และ แชท)
// =========================================
function cancelOrder(orderId) {
    const confirmCancel = confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำสั่งซื้อนี้?");
    if (confirmCancel) {
        const orderCard = document.getElementById(orderId);
        orderCard.innerHTML = `
            <div class="order-info">
                <p><strong>หมายเลขคำสั่งซื้อ:</strong> #ORD-123</p>
                <p style="color: #d9534f; font-weight: 500;">❌ คำสั่งซื้อนี้ถูกยกเลิกแล้ว</p>
            </div>
        `;
        orderCard.style.borderColor = "#eaeaea";
        orderCard.style.backgroundColor = "#fafafa";
    }
}

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
    } else {
        chatBox.style.display = 'none';
    }
}