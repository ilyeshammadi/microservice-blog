// @ts-ignore
import { logger } from '../common/js/tools';
import { generateToken, getLoggedinUser, getUserById } from './utils/index'
import { Auth } from './models';
import { LoginDto } from './dto/login.dto';
import { GetUserDto } from './dto/get-user.dtp';

export class AppService {
  async login({ username, password }: LoginDto) {
    const message = 'wrong username or password';
    if (!username || !password) throw Error('missing username or password');

    try {
      // Query the list of users with username and password
      // it should return one, I hope 😅
      const user: any = await getLoggedinUser(username, password);
      if (!user) throw Error(message);

      // Retreive the token if the user was found
      if (user) {
        // Get the token otherwise create a new one
        const query = { userId: user.id }
        let auth: any = await Auth.findOne(query);
        if (!auth) {
          const token = generateToken();
          const data = { token, userId: user.id };
          auth = await Auth.create(data);
        }
        return { token: auth.token };
      }
    } catch (error) {
      logger.error({ message, error, username });
      throw Error(message);
    }

  }

  async getUser({ token }: GetUserDto) {
    const message = 'invalid token'
    try {
      // Get the userId that has this token
      const auth: any = await Auth.findOne({ token });
      if (!auth) throw Error(message);
      const user = await getUserById(auth.userId);
      logger.info('authenticated user by token');
      return user;
    } catch (error) {
      logger.error({
        message,
        error
      })
      throw Error(message);
    }
  }

}