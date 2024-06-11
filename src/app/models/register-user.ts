enum UserGender {male , female}

export interface RegisterUser {
  userName:string
  password:string
 // ConfirmPassword:string
  firstName:string
  lastName:string
  email:string
  gender:UserGender
  country:string
  phoneCode:string
  phoneNumber :string
  image :string
  dateOfBirth:Date
}
