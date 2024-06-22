import requests


endpoint ="http://127.0.0.1:8000/"



user = {
    "username": "test", "password": "test"}

#register 

register = endpoint+"base/user/register/"
get_response = requests.post(register, json=user)
print(get_response.status_code)
print(get_response.text)


