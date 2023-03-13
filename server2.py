import socketio
import io
import base64
from PIL import Image

sio = socketio.Client()
sio.connect('http://localhost:3333')


def get_base64_code(images: list[str]) -> list[str]:
    result = []
    for image in images:
        string = ''
        for i in range(22, len(image)):
            string += image[i]
        result.append(string)
    return result


@sio.on('server1 server2')
def process_images(images):
    print('Processando imagem...')
    images = get_base64_code(images)

    result = []
    for image in images:
        img_bytes = base64.b64decode(image)
        img = Image.open(io.BytesIO(img_bytes))
        img.convert('L')

        with io.BytesIO() as buffer:
            img.save(buffer, format='PNG')
            result.append(buffer.getvalue())

    print('Processo finalizado. Enviando imagem de volta...')
    sio.emit('server2 server1', [base64.b64encode(img).decode('utf-8') for img in result])
