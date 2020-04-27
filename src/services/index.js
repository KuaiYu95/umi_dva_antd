import request from '@/utils/request';
import { stringify } from 'qs';

// 博客
export async function queryGetBlog(params) {
  return request(`/api/get-blog?${stringify(params.payload)}`);
}

export async function queryGetBlogDetail(params) {
  return request(`/api/get-blog-detail?${stringify(params.payload)}`);
}

export async function queryAddBlogView(params) {
  return request(`/api/add-blog-viewCount?${stringify(params.payload)}`);
}

export async function queryAddBlogLike(params) {
  return request(`/api/add-blog-likeCount?${stringify(params.payload)}`);
}

export async function queryDecBlogLike(params) {
  return request(`/api/dec-blog-likeCount?${stringify(params.payload)}`);
}

export async function queryBlogDownload(params) {
  return request(`/api/download-blog?${stringify(params.payload)}`);
}

export async function queryDelBlog(params) {
  return request(`/api/del-blog?${stringify(params.payload)}`);
}

export async function queryUpdateBlog(params) {
  return request('/api/update-blog', {
    method: 'POST',
    data: { ...params.payload }
  });
}

export async function queryAddBlog(params) {
  return request('/api/add-blog', {
    method: 'POST',
    data: { ...params.payload }
  });
}

// 足迹
export async function queryGetAtlas() {
  return request(`/api/get-atlas`);
}

export async function queryAddAtlas(params) {
  return request(`/api/add-atlas`, {
    method: 'POST',
    data: { ...params.payload }
  });
}

// 评论
export async function queryAddComment(params) {
  return request('/api/add-comment', {
    method: 'POST',
    data: { ...params.payload }
  });
}

export async function queryGetComment(params) {
  return request(`/api/get-comment?${stringify(params.payload)}`);
}
