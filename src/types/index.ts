export type Room = {
  map(
    arg0: (item: any) => import('react').JSX.Element
  ): import('react').ReactNode
  createdAt: string // A timestamp indicating when the room was created
  isGroupRoom: boolean // A boolean indicating whether it's a group room or not
  members: Array<{
    _id: string // User ID
    username: string // User's username
    profile_pic: string // URL of the user's profile picture
  }>
  updatedAt: string // A timestamp indicating when the room was last updated
  __v: number
  _id: string // Room ID
}
