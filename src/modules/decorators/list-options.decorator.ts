import { createParamDecorator } from '@nestjs/common';

export const ListOptionsDecoration = createParamDecorator((data, req) => {
  let { categories } = req.query;
  if (categories) {
    categories = categories.split('-');
  }
  return { categories };
});
