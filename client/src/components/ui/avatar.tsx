import { useState, useEffect } from 'react';

const generateRandomAvatar = () => {
  const randomSeed = Math.random().toString(36).substring(2, 15);  // Generate random seed
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;
};

const Avatar = ({ width = 40, height = 40 }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const avatar = generateRandomAvatar();  // Generate avatar URL when component mounts
    setAvatarUrl(avatar);
  }, []);

 

  return (
    <div>
        <span>
          <img src={avatarUrl} alt="Random Avatar" width={width} height={height} style={{ objectFit: 'cover' }} />
        </span>
    </div>
  );
};

export default Avatar;
