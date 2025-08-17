export interface Giphy {
  id: string;
  url: string;
  title: string;
  images: {
    original: { url: string };
    preview: { url: string };
  };
}
