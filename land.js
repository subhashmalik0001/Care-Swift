const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})


Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});
// Handle message sending
function sendMessage() {
    let input = document.getElementById("user-input").value;
    if(input.trim() !== "") {
        displayMessage(input, "user");
        document.getElementById("user-input").value = ""; // Clear the input field
        
        // Send message to the backend
        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.reply, "bot"); // Display bot's reply
        })
        .catch(error => console.log(error));
    }
}

// Display messages
function displayMessage(message, sender) {
    let messages = document.getElementById("messages");
    let messageElement = document.createElement("div");
    messageElement.textContent = `${sender === "user" ? "You" : "Bot"}: ${message}`;
    messageElement.className = sender;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}