export type Staff = {
  username: string,
  nickname: string,
  position: string,
  name: string,
  id: string | number
}

export type UpdateStaffBody = {
  username: string,
  nickname: string,
  position: string,
  name: string
}

export type DropdownType = {
  text: string,
  value: string
}

export interface State {
  staffsList: Staff[]
}