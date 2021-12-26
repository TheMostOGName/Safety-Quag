import os

status = 2

while status == 2 or status == 512:
    status = os.system("node ./safety/quag")
    os.system("bash ./safety/quag/receive.sh")
    print(status)