import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import placeholderAvatar from '../../assets/placeholderAvatar.png'

export const UserProfile = () => (
  <div className="flex items-center space-x-2">
    <Avatar className="w-8 h-8">
      <AvatarImage src={placeholderAvatar} />
      <AvatarFallback>ET</AvatarFallback>
    </Avatar>
    <div className="text-sm">
      <div>Sujal Kumar</div>
      <div className="text-xs text-gray-400">sujal@gmail.com</div>
    </div>
  </div>
)