import { Photo } from "./photo"

export interface Member {
introduction: any
interests: any
lookingFor: any
  id: number
  username: string
  age: number
  photoUrl: string
  knownAs: string
  created: Date
  lastActive: Date
  gender: string
  city: string
  country: string
  photos: Photo[]
}


