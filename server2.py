import socketio
import requests
import base64

sio = socketio.Client()
sio.connect('http://localhost:3333')


@sio.on('server1 server2')
def process_images(images):
    print('Processando imagem...')

    color_images = []
    for image in images:
        try:
            data = requests.get(image).content
            color_images.append(data)
        except Exception as e:
            print(type(e))

    result = []
    for image in color_images:
        '''
        TODO - transformar imagem em grayscale em color_images
        '''

    print('Processo finalizado. Enviando imagem de volta...')
    sio.emit('server2 server1', images)
