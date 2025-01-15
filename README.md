# Authentication

### Dependencies:
- mongoose (date base)
- bcrypt
- jsonwebtoken
#### install Dependenceis:
```
npm install mongoose
npm install jsonwebtoken
npm install bcrypt
```
Don't forget to place the ``` env ``` file in the project root and enter the following values ​​into that file.

```

DATABASE_DB="mongodb://localhost:27017/test_auth"
JWT_SECRET="ahUsjwlisbchDDFGytukKDFhsfggrtyTyutghfhdfytyth"


```

  You need to replace ```  mongodb://localhost:27017/test_auth ``` with your database link.
  And instead of JWT_SECRET=" ``` ahUsjwlisbchDDFGytukKDFhsfggrtyTyutghfhdfytyth ``` " put another string, you can get help from sites that generate this code online for free.
