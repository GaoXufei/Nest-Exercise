import { PermissionInterface } from '../interfaces/permission.interface';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: PermissionInterface[]) => SetMetadata('permissions', permissions);
