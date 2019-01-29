import socket
sk=socket.socket()
address=('127.0.0.1', 8888)

sk.bind(address)
sk.listen()

while True:
    print('等待客户端链接' + '.' * 20)
    connect, client = sk.accept()
    print(str(client)+'上线')
    while True:
        try:
            data = connect.recv(2048)
            if not data:break
            print(str(data, 'utf8'))
            connect.send(bytes("aaaa", 'utf8'))
        except ConnectionResetError:
            print('-'*10+'对方离线'+'-'*10)
            break

sk.close()
