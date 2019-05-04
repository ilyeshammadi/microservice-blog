import { createParamDecorator } from "@nestjs/common";

export const UserEntity = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.user,
);