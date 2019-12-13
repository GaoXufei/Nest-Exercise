import { createParamDecorator } from '@nestjs/common';

export const ListOptionsDecoration = createParamDecorator((data, req) => {
  let { categories, tags, limit, page, sort, order } = req.query;
  if (categories) {
    categories = categories.split('-');
  }
  if (tags) {
    tags = tags.split('-');
  }
  // 分页设置默认
  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 10;
  // 排序设置默认
  sort = sort ? sort : 'created';
  order = order ? order.toUpperCase() : 'DESC';

  return { categories, tags, limit, page, sort, order };
});
