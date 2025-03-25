# Backend-ClaryLisk

```
ER diagram for backend:
<a href="https://drive.google.com/file/d/1KurwPZ5nijn0efekE1CY-hqMWTnSp8Ge/view?usp=sharing">ERD klik<a/>
```
# How to run
```
npm run server

```

# Endpoint
## AI 

### post /ai-clarylisk
request headers: token
request body:
```json
{
     "text":"jp nih"
}
```
response status 200:
```json
{
    "text": "jp",
    "predicted_label": 1,
    "judol":"yes"
}
```
response status 404:
```json
{
    "error": "InvalidUser input"
}
```
response status 500:
```json
{
    "error": "Internal Server Error"
}
```

## user

### post /user/register
request body:
```json
{
    "username": "clarylisk",
    "password": "clarylisk",
    "walletAddress":"oxjdoajdojajsf",
    "role":"creator",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA...",
    "facebook":"optional",
    "instagram":"optional",
    "twitter":"optional",
    "youtube":"optional",
    "description":"blablaba"
}
```
response status 200:
```json
{
    "message":"success registered",
    "walletAddress":"kasdfjkafjdaaf"
}
```
response status 404:
```json
{
    "error": "Invalid data"
}
```
response status 500:
```json
{
    "error": "Internal Server Error"
}
```

### post user/login
request body:
```json
{
    "walletAdress":"kafdsakljfdlkasfkda",
    "password":"clarylisk"
}
```
response status 200:
```json
set cookie token
{
    "message": "success login",
    "username":"name"
    "idUser":1,
}
```
response status 500:
```json
{
    "error": "Internal Server Error"
}
```

### delete user/logout/:idUser
response status 200:
revoke token
```json
{
    "message": "success"
}
```
response status 500:
```json
{
    "error": "Internal Server Error"
}
```

### get /listcreator
request headers: cookie token
response status 200:
```json
{
    "data":[
        {
            "idUser":1,
            "username":"username",
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA...",
            "facebook":"optional",
            "instagram":"optional",
            "twitter":"optional",
            "youtube":"optional",
            "description":"blablaba",
            "walletAddress":"kafdsakljfdlkasfkda",
            "rating":5
        },
         {
            "idUser":2,
            "username":"username",
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA...",
            "facebook":"optional",
            "instagram":"optional",
            "twitter":"optional",
            "youtube":"optional",
            "description":"blablaba",
            "walletAddress":"kafdsakljfdlkasfkda",
            "rating":5
        }
    ]
}
```
response status 500:
```json
{
    "error": "Internal Server Error"
}
```

### get /listcreator/:idUser
request headers: cookie token
response status 200:
```json
 {
        "idUser":1,
        "username":"username",
        "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA...",
        "facebook":"optional",
        "instagram":"optional",
        "twitter":"optional",
        "youtube":"optional",
        "description":"blablaba",
        "walletAddress":"kafdsakljfdlkasfkda",
        "rating":5
}
```
response status 404:
```json
{
    "error": "Not Found"
}
```

### validation for rating
```json
if the creator take a donation that indicated judol so they rating will be minus 1
```