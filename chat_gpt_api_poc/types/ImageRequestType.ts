export type OneToTenType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ImageSizeType = "256x256" | "512x512" | "1024x1024";

export type ImageRequestType = {
  prompt: string;
  n: OneToTenType;
  size: ImageSizeType;
};

export type ImageUrlType = {
  url: string;
};

export type ImageResponseType = {
  created: number;
  data: ImageUrlType[];
};
