import requests

endpoint ="http://127.0.0.1:8000/"

user = {
    "username": "test", "password": "test3"}

login = endpoint+"base/token/"

access_token = ""
refresh_token = ""

response = requests.post(login, json=user)



access_token = response.json()['access']
refresh_token = response.json()['refresh']


#get user details

user_get_endpoint = endpoint+"base/user/"

user_response = requests.get(user_get_endpoint, headers={'Authorization': f'Bearer {access_token}'})



user_detail = user_response.json()

print(user_detail)
print(user_detail['username'])

#update username 


# update_endpoint = endpoint+f"base/user/update/{user_detail['id']}/"

# update_response = requests.patch(update_endpoint, json={'password': "test2"}, headers={'Authorization': f'Bearer {access_token}'})



# print(update_response.status_code)


# password change

# password_endpoint = endpoint +f"base/user/change-password/"

# password_response = requests.patch(password_endpoint, json={'old_password': "test2", 'new_password': "test3"}, headers={'Authorization': f'Bearer {access_token}'})


# print(password_response.status_code)



#delete

delete = endpoint+f"base/user/delete/{user_detail['id']}/"


response = requests.delete(delete, headers={'Authorization': f'Bearer {access_token}'})

print(response.status_code)