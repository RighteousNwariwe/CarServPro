// Your Firebase configuration from the Firebase console
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Send message to chat
function sendMessage() {
    const userName = document.getElementById('userName').value;
    const messageText = document.getElementById('message').value;
    const userRole = document.getElementById('userRole').value;
    const timeStamp = new Date().toLocaleTimeString();

    if (userName && messageText) {
        db.ref('chatMessages').push({
            userName: userName,
            userRole: userRole,
            messageText: messageText,
            timeStamp: timeStamp
        });
        document.getElementById('message').value = ''; // Clear input
    }
}

// Post message to the board
function postToBoard() {
    const userName = document.getElementById('boardUserName').value;
    const messageText = document.getElementById('boardMessage').value;
    const userRole = document.getElementById('boardUserRole').value;
    const timeStamp = new Date().toLocaleTimeString();

    if (userName && messageText) {
        db.ref('messageBoard').push({
            userName: userName,
            userRole: userRole,
            messageText: messageText,
            timeStamp: timeStamp
        });
        document.getElementById('boardMessage').value = ''; // Clear input
    }
}

// Display chat messages
db.ref('chatMessages').on('child_added', function(snapshot) {
    const chatBox = document.getElementById('chatBox');
    const data = snapshot.val();
    const messageElement = `<div class="chat-message"><strong>${data.userRole} ${data.userName}:</strong> ${data.messageText} <span class="message-time">(${data.timeStamp})</span></div>`;
    chatBox.innerHTML += messageElement;
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Display message board posts
db.ref('messageBoard').on('child_added', function(snapshot) {
    const messageBoard = document.getElementById('messageBoard');
    const data = snapshot.val();
    const messageElement = `<div class="chat-message"><strong>${data.userRole} ${data.userName}:</strong> ${data.messageText} <span class="message-time">(${data.timeStamp})</span></div>`;
    messageBoard.innerHTML += messageElement;
});
