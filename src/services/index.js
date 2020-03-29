import request from '@/utils/request';
import { stringify, parse } from 'qs';

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