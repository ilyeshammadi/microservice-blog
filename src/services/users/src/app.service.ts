import { Injectable } from '@nestjs/common';
import { logger, grpcClients } from '../common/js/tools';
import { User } from './users.model';
import { CreateDto } from './dto/create.dto';
import { ListDto } from './dto/list.dto';
import { GetDto } from './dto/get.dto';

const authorization = grpcClients.authorization;

@Injectable()
export class AppService {
  async list({ query, paginate }: ListDto): Promise<any[]> {
    try {
      const { docs } = await User.paginate(query, paginate);
      return docs;
    } catch (error) {
      const message = "could not fetch users";
      logger.error({
        message,
        payload: { query, paginate }
      });
      throw Error(message);
    }
  }

  async get({ id }: GetDto) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      const message = "could not get user";
      logger.error({
        message,
        payload: { id }
      });
      throw Error(message);
    }
  }

  async create(createDto: CreateDto) {
    const { username, password } = createDto;
    const message = "could not create user";
    try {
      // Check if the user already exists
      const found = await User.find({ username });
      if (found.length !== 0) throw Error(message);
      // Create a new user
      const user = new User({ username, password });
      user.save();
      // Create the user role, if error delete the user
      try {
        const createRoleRequest = { userId: user.id, type: "user" };
        await new Promise((resolve, reject) => {
          authorization.createRole(createRoleRequest, (err, res) => {
            if (err) reject(err);
            resolve(res);
          });
        });
      } catch (error) {
        // If error, delete the created user
        await User.deleteOne({ id: user.id });
        throw new Error("could not create role");
      }

      return { user };
    } catch (error) {
      logger.error({
        error,
        message,
        payload: { username }
      });
      throw Error(message);
    }
  }
}
