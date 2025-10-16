import { Controller, Delete, Get, HttpCode, Param } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Protect } from '../auth/_utils/decorator/protect.decorator';
import { User, UserDocument } from './users.schema';
import { UsersService } from './users.service';

import { getDocumentByIdPipe } from 'src/_utils/get-document-by-id.pipe';
import { ConnectedUser } from './_utils/decorator/connecter-user.decorator';
import { UserByIdPipe } from './_utils/user-by-id.pipe';
import { UserRoleEnum } from './_utils/user-role.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @Get('me')
  @ApiOperation({ summary: "Get the current user's information." })
  getCurrentUser(@ConnectedUser() user: UserDocument) {
    return this.usersService.getUser(user);
  }

  @Protect(UserRoleEnum.ADMIN)
  @Get(':userId')
  @ApiParam({ type: 'string', name: 'userId' })
  @ApiOperation({ summary: "Get a user's information by its ID." })
  getUserById(@Param('userId', UserByIdPipe) user: UserDocument) {
    return this.usersService.getUser(user);
  }

  @Protect(UserRoleEnum.ADMIN)
  @Delete(':userId')
  @HttpCode(204)
  @ApiParam({ type: 'string', name: 'userId' })
  @ApiOperation({ summary: "Delete a user's account by its ID." })
  @ApiNoContentResponse({ description: 'User deleted.' })
  deleteUser(@Param('userId', getDocumentByIdPipe(User)) user: UserDocument) {
    return this.usersService.deleteUser(user);
  }
}
