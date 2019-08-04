# nodework-
## ##  API Guide 

## Start a mongodb server first , install all dependencies using command 'npm install'
## and then run application using command 'npm restart' in command prompt.

## 1. File upload :- 

link :- localhost:3005/Test/upload/file
method :- POST
form-data :-  file(file,'required field'),description(String,'required field')
Description :- It will upload any file in a folder named 'Upload' created dynamically in application.

## 2. Download File :-

link :- localhost:3005/Test/download/file/:_id
method :- GET
path variable :- _id(ObjectId)
Description :- Use the InsertedId after successful upload of a file and use browser to download the same file.

## 3. Excel Report :-

link :- localhost:3005/Test/excel/export
method :- GET
Description :- Use browser to download a sample excel report.

## 4. PDF Report :-

link :- http://localhost:3005/Test/export/pdf
method :- GET
Description :- Use browser to download a sample pdf report.

## 5. SignUp :-

link :- localhost:3005/Test/signup
method :- POST
raw-data :- email(String,'required field') , password(String,'required field')
Description :- After successful signup you will get a token in header with key 'x-auth'.

## 6. Find User By Token :-

link :- localhost:3005/Test/user/me
method :- GET
Description :- Copy the token and set the header with key 'x-auth' to find the user.
