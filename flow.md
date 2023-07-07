trong file index cần
cookieParser / @type
compression / @type
cors / @type

```js
app.use(cors({
  credentials: true
})
```

gắn middleware vào app

cài mongoose @types

Tạo usershema trong db/users.ts
Gồm username, email và authentication gồm password salt và sessionToken với select : false

export usermodel và các method để xử lí như getUsers, getUsersByEmail, by sessiontoken, id
create, deletebyid va updatebyid

Tạo helper để mã hóa

```js
import crypto from 'crypto';

const SECRET = 'ANTONIO-REST-API';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');
```

Tạo authentication controller

- Register :

1. lấy và destructuring email pw và username từ body
2. check xem nếu thiếu thì sendstatus400
3. check xem có user r thì trả 400
4. tạo salt = random
5. dùng authentication để mã hóa tạo ra password
6. Tạo route và test

- Login:

1. lấy và destructuring email pw từ body
2. `const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');`
3. check xem có k user r thì trả 400
4. tạo `const expectedHash = authentication(user.authentication.salt, password);`
5. nếu user.auth.pass khác expectedHash trả 403
6. Tạo salt bằn random
7. set ` user.auth.sessionToken = authentication(salt, user._id.toString());`
8. user.save()
9. set cookie ` res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });`
10. return 200 và json user
11. Tạo route và test

Tạo middleware để check authenticated user cho users route

- isAuthenticated: nhận (req, res, next)
- try sessionToken = req.cookies ['ANTONIO-AUTH']
- nếu k có sessionToken thì trả về 403
- lấy user từ sessionToken - k có trả về 403
- merge(req, {identity: existingUser})
- return next()
