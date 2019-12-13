import { createParamDecorator } from '@nestjs/common';
import { ListOptionsInterface } from '../interfaces/list-options.interface';

export const ListOptionsDecoration = createParamDecorator((data, req) => {
  let { categories, tags  } = req.query;
  const { limit, page } = req.query;
  if (categories) {
    categories = categories.split('-');
  }
  if (tags) {
    tags = tags.split('-');
  }
  return { categories, tags, limit, page };
});
