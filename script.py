import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import os

# Define los detalles del correo electrónico del remitente
# Reemplaza los valores con tu propia información
from_address = 'renacer258o@gmail.com'
from_password = os.environ.get('EMAIL_PASSWORD')

# Define los detalles del correo electrónico del destinatario
to_address = 'marianpasse1@gmail.com'

# Define el asunto y el cuerpo del correo electrónico
subject = 'Nuevo mensaje desde mi sitio web'
body = 'Se ha recibido un nuevo mensaje desde el formulario de contacto en mi sitio web.'

# Abre el archivo adjunto y conviértelo en un objeto MIMEApplication
with open('data.csv', 'rb') as attachment:
    file = MIMEApplication(attachment.read(), _subtype='csv')
    file.add_header('Content-Disposition', 'attachment', filename='data.csv')

# Crea un objeto MIMEMultipart para el correo electrónico
message = MIMEMultipart()
message['From'] = from_address
message['To'] = to_address
message['Subject'] = subject

# Agrega el cuerpo del correo electrónico y el archivo adjunto
message.attach(MIMEText(body))
message.attach(file)

# Inicia una conexión con el servidor de correo electrónico y envía el correo electrónico
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(from_address, from_password)
server.sendmail(from_address, to_address, message.as_string())
server.quit()
