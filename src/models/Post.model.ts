export default interface Post {
  title: string;
  description: string;
  attachments?: File[];
  _id?: string;
}
