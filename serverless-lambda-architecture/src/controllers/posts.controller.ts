import { AppContainer } from '../utils/container.utils';
import { Response, route } from '../utils/api.utils';
import { AppError } from '../utils/errors.utils';
import PostModel from '../models/post.model';
import { Post } from '../types/data.types';

export const create = route<Post>(async ({ appIdentityContext: idc, ...request }) => {
  request.appBody.author = idc.sub;
  const postM = AppContainer.resolve<PostModel>('PostModel');
  const posts = await postM.create(request.appBody);
  return Response({ data: posts });
});

export const get = route(async ({ appIdentityContext: idc }) => {
  const postM = new PostModel(idc.code);
  const posts = await postM.retrieveUserPosts(idc.sub);
  return Response({ data: posts });
});

export const update = route<Post>(async ({ appIdentityContext: idc, ...request }) => {
  const { postId } = request.pathParameters || {};

  if (postId) {
    const postM = new PostModel(idc.code);
    const posts = await postM.update(postId, request.appBody);
    return Response({ data: posts });
  } else {
    throw new AppError(400, 'Missing post id in the request path to update post');
  }
});

export const remove = route(async ({ appIdentityContext: idc, ...request }) => {
  const { postId } = request.pathParameters || {};

  if (postId) {
    const postM = new PostModel(idc.code);
    const posts = await postM.delete(postId);
    return Response({ data: posts });
  } else {
    throw new AppError(400, 'Missing post id in the request path to update post');
  }
});
