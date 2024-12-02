
const express = require('express');
const http = require('http');
const WebSocket = require('ws'); 

const app = express();
const server = http.createServer(app);

// Cung cấp tệp index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Khởi tạo WebSocket Server
const wss = new WebSocket.Server({ server }); 

// Lắng nghe sự kiện 'connection' khi có client kết nối
wss.on('connection', (ws) => {
    console.log("User connected via WebSocket");

    // Lắng nghe sự kiện nhận dữ liệu từ client
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log("Received:", message);

        // Gửi lại tin nhắn cho tất cả các client
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));  // Gửi tin nhắn đến tất cả client
            }
        });
    });

    // Lắng nghe sự kiện đóng kết nối
    ws.on('close', () => {
        console.log("User disconnected");
    });

    // Lắng nghe sự kiện lỗi
    ws.on('error', (error) => {
        console.log("WebSocket error: ", error);
    });
});

// Bắt đầu lắng nghe tại cổng 3001
server.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
