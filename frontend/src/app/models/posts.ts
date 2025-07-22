export class posts{
      id: number;
  user_id: number;
  msg: string | null;
  image: string | null;
  video: string | null;
  likes: number;
  dislikes: number;
  comments: any[]; 
  created_at: string;
  updated_at: string;
  showComments: boolean = false;
   constructor() {
    this.id = 0;
    this.user_id = 0;
    this.msg = null;
    this.image = null;
    this.video = null;
    this.likes = 0;
    this.dislikes = 0;
    this.comments = [];
    this.created_at = '';
    this.updated_at = '';
     this.showComments = false;
  }
}