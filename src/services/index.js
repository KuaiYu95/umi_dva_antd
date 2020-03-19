import request from '@/utils/request';
import { stringify, parse } from 'qs';

export async function queryGetBlog(params) {
  return request(`/api/get-blog?${stringify(params.payload)}`);
}

export async function queryGetBlogDetail(params) {
  return request(`/api/get-blog-detail?${stringify(params.payload)}`);
}

export async function queryAddBlog(params) {
  return request('/api/add-blog', {
    method: 'POST',
    data: { ...params.payload }
  });
}