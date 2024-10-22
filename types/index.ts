export type PostProps = {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
};

export type VideoCardProps = {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
};