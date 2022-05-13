const socket = io("http://localhost:3030");

socket.on("chat_iniciado", data => {
  console.log(data);
})