import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  var userN = `${new Date().getTime()}`;

  describe('createUser', () => {
    it('should create user', async () => {
      const createdUser = await userService.createUser({
        username: userN, // her test ettiğinde username değiştir çünkü unique
        password: '12345',
        name: 'Özkan',
      });
      //await userService.deleteUser({id: createdUser.id});
      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser); // TODO : burda bi resolve işlemi yap eğer dönen data doğru ise success mesajı döndür ve datayı sil!
      expect(await userService.createUser(createdUser)).toBe(createdUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const deletedUser = await userService.deleteUser({ username: userN});
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser); // TODO : burda bi resolve işlemi yap eğer dönen data doğru ise success mesajı döndür ve datayı sil!
      expect(await userService.deleteUser(deletedUser)).toBe(deletedUser);
    });
  });
});
