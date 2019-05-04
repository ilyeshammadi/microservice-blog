import { SetMetadata } from '@nestjs/common';
import { HasAccessToArgs } from '../interfaces/has-access-to.interface';

export const HasAccessTo = (ability: HasAccessToArgs) => SetMetadata('ability', ability);