#Auth
#Register
curl -X 'POST' \
  'http://localhost:8086/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "2018minh@gmail.com",
  "pass_word": "123456",
  "phone": "0913205175",
  "birth_day": "2024-06-10",
  "gender": 1,
  "role": 1,
  "name": "Le Tuan Minh"
}'
#Login
curl -X 'POST' \
  'http://localhost:8086/auth/Login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@gmail.com",
  "pass_word": "123456"
}'

#Comment
#Get comments
curl -X 'GET' \
  'http://localhost:8086/comment/get-comments?page=1&size=2' \
  -H 'accept: */*'
#create comment
curl -X 'POST' \
  'http://localhost:8086/comment/create-comment' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "room_id": 2,
  "comment": "check comment",
  "date": "2024-12-02T11:35:47.519Z"
}'
#update comment
curl -X 'PATCH' \
  'http://localhost:8086/comment/update-comment/24' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "comment": "check comment update"
}'
#delete comment
curl -X 'DELETE' \
  'http://localhost:8086/comment/delete-comment/24' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE'
#get comment by room
curl -X 'GET' \
  'http://localhost:8086/comment/get-comment-by-room/2' \
  -H 'accept: */*'

#Booking
#create booking
curl -X 'POST' \
  'http://localhost:8086/booking/create-bookings' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "room_id": 3,
  "checkin": "2024-12-02T11:37:24.282Z",
  "checkout": "2024-12-02T11:37:24.282Z",
  "regis_num": 3
}'
#get bookings
curl -X 'GET' \
  'http://localhost:8086/booking/get-bookings?page=1&size=5' \
  -H 'accept: */*'
#get booking by id
curl -X 'GET' \
  'http://localhost:8086/booking/get-booking-by-id/13' \
  -H 'accept: */*'
#update booking
curl -X 'PATCH' \
  'http://localhost:8086/booking/update-booking/13' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "checkin": "2024-12-02T11:38:30.491Z",
  "checkout": "2024-12-02T11:38:30.491Z",
  "regis_num": 4
}'
#delete booking
curl -X 'DELETE' \
  'http://localhost:8086/booking/delete-booking/13' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE'
#get booking by user
curl -X 'GET' \
  'http://localhost:8086/booking/get-booking-by-user/3' \
  -H 'accept: */*'

#Location
#create location
curl -X 'POST' \
  'http://localhost:8086/location/create-location' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTJ9LCJpYXQiOjE3MzMxMzk5NzMsImV4cCI6MTczMzE0MTc3M30.HsuhyegmUNovQyhNBLAKI6h9R1VB9aytfpYBFLVjCIw' \
  -H 'Content-Type: application/json' \
  -d '{
  "locate_name": "locate 1",
  "city": "city 1",
  "country": "country 1",
  "image": "public/imgs/locations/1733140062338.png"
}'
#get locations
curl -X 'GET' \
  'http://localhost:8086/location/get-locations?page=1&size=4' \
  -H 'accept: */*'
#get locations by id
curl -X 'GET' \
  'http://localhost:8086/location/get-location-by-id/2' \
  -H 'accept: */*'
#update location
curl -X 'PATCH' \
  'http://localhost:8086/location/update-location/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTJ9LCJpYXQiOjE3MzMxMzk5NzMsImV4cCI6MTczMzE0MTc3M30.HsuhyegmUNovQyhNBLAKI6h9R1VB9aytfpYBFLVjCIw' \
  -H 'Content-Type: application/json' \
  -d '{
  "locate_name": "test update 1",
  "city": "update 2",
  "country": "update 3",
  "image": "public/imgs/locations/1733140062338.png"
}'
#delete location
curl -X 'DELETE' \
  'http://localhost:8086/location/delete-location/12' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTJ9LCJpYXQiOjE3MzMxMzk5NzMsImV4cCI6MTczMzE0MTc3M30.HsuhyegmUNovQyhNBLAKI6h9R1VB9aytfpYBFLVjCIw'
#upload location
curl -X 'POST' \
  'http://localhost:8086/location/upload-location-image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTJ9LCJpYXQiOjE3MzMxMzk5NzMsImV4cCI6MTczMzE0MTc3M30.HsuhyegmUNovQyhNBLAKI6h9R1VB9aytfpYBFLVjCIw' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@Background.png;type=image/png'

#Room
#create room
curl -X 'POST' \
  'http://localhost:8086/room/create-room' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "room_name": "room 1",
  "guests": 2,
  "bed_rooms": 1,
  "beds": 1,
  "bath_rooms": 1,
  "description": "descrip 1",
  "price": 10000,
  "washing": true,
  "iron": true,
  "tivi": true,
  "wifi": true,
  "kitchen": true,
  "parking": true,
  "pool": true,
  "image": "public/imgs/videos/1733139626069.png",
  "locate_id": 2
}'
#get rooms
curl -X 'GET' \
  'http://localhost:8086/room/get-rooms?page=1&size=4' \
  -H 'accept: */*'
#get room by id
curl -X 'GET' \
  'http://localhost:8086/room/get-room-by-id/12' \
  -H 'accept: */*'
#get room by location
curl -X 'GET' \
  'http://localhost:8086/room/get-room-by-location/2' \
  -H 'accept: */*'
#update room
curl -X 'PATCH' \
  'http://localhost:8086/room/update-room/12' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "room_name": "updare room",
  "guests": 1,
  "bed_rooms": 2,
  "beds": 3,
  "bath_rooms": 4,
  "description": "update descrip",
  "price": 100000,
  "washing": true,
  "iron": true,
  "tivi": true,
  "wifi": true,
  "kitchen": true,
  "parking": true,
  "pool": true,
  "image": "string",
  "locate_id": 1
}'
#delete room
curl -X 'DELETE' \
  'http://localhost:8086/room/delete-room/12' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE'
#upload image
curl -X 'POST' \
  'http://localhost:8086/room/upload-room-image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@csxd0sbqu55a1.png;type=image/png'

#User
#get users
curl -X 'GET' \
  'http://localhost:8086/user/get-users?page=1&size=4' \
  -H 'accept: */*'
#get user by id
curl -X 'GET' \
  'http://localhost:8086/user/get-user-by-id/3' \
  -H 'accept: */*'
#update user
curl -X 'PATCH' \
  'http://localhost:8086/user/update-user/3' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "update name",
  "email": "example@gmail.com",
  "phone": "0991123",
  "birth_day": "string",
  "gender": 1,
  "role": 1
}'
#delete user
curl -X 'DELETE' \
  'http://localhost:8086/user/delete-room/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE'
#upload image
curl -X 'POST' \
  'http://localhost:8086/user/upload-location-image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTN9LCJpYXQiOjE3MzMxMzkzMDUsImV4cCI6MTczMzE0MTEwNX0.1ZFfDMnuhv5c1esdvclnPmHsIBwYnqHEiDR-5KEDuvE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@csxd0sbqu55a1.png;type=image/png'
