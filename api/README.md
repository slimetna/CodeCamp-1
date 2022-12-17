# Documentation
## Auth
> GET `/auth`

Check informations about user

Body:
`token='token'`

> POST `/auth`

Login user

Body:
```
login='login'
password='password'
```

## Trombi
> GET `/trombi`

Get all promos

Body:
`token='token'`

> GET `/trombi/:id`

Get students and other informations about a promotion.

Body:
`token='token'`

Ex:
`http://localhost:3001/trombi/67`

## Users
> GET `/users`

Get all students

Body:
`token='token'`

> GET `/users/:login`

Login user

Body:
`token='token'`

Ex:
`http://localhost:3001/users/carra_c`
