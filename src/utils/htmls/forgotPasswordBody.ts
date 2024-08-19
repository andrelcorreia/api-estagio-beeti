async function ForgotPasswordBody(link: string): Promise<string> {
  return `
 <!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notificação de Alteração de Senha</title>
<style>
body {
  background-color: #181818;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #282828;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.img-container {
  width: 100%; 
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

img {
  max-width: 300px; 
  height: auto;
  display: block;
}
</style>
</head>
<body>
<div class="container">
  <div class="img-container">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4W7wxRbnYIOMjNoFjsTNb-yvAy4XRC1h-A&s" alt="Beeti Atendimento">
  </div>
  <h1>Notificação de alteração da senha</h1>
  <p>Clique no botão abaixo para continuar.</p>
  <a href="${link}"><button>Recuperar sua conta</button></a> <p>Esse link expira 15 minutos após ser enviado.</p>
  <p>Essa mensagem de email foi enviada de um endereço somente para envio. Não responda a essa mensagem.</p>
</div>
</body>
</html>
`;
}

export { ForgotPasswordBody };
