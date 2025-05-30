import React from 'react';
import s from './UserAvatar.module.scss';

interface UserAvatarProps {
  name: string;
  avatar: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  avatar,
  className = '',
  size = 'medium'
}) => {
  return (
    <div className={`${s.userCell} ${s[size]} ${className}`}>
      <div className={s.avatar}>
        <img src={avatar} alt={name} />
      </div>
      <span className={s.username}>{name}</span>
    </div>
  );
};

export default UserAvatar;
