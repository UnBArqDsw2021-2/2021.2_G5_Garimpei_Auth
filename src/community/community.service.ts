import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReferenceDto } from 'src/user/dto/user-reference.dto';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto, requestUser: any) {
    await this.checkEmailAvailability(createCommunityDto.email);

    if (requestUser.id != createCommunityDto.admin.id) {
      throw new BadRequestException(
        `Attempt to create a community with user ${createCommunityDto.admin.id} as admin while logged with a different user ${requestUser.id}`,
      );
    }

    const userExists = await getRepository(User).findOne(
      createCommunityDto.admin.id,
    );
    if (!userExists) {
      throw new NotFoundException(
        `There is no User with id: ${createCommunityDto.admin.id}`,
      );
    }

    const userIsAdminAlready = await this.communityRepository.findOne({
      where: {
        admin: { id: createCommunityDto.admin.id },
      },
    });
    if (userIsAdminAlready) {
      throw new BadRequestException(
        `The user ${createCommunityDto.admin.id} is an admin from other community`,
      );
    }

    const community = this.communityRepository.create(createCommunityDto);
    return this.communityRepository.save(community);
  }

  async findOne(id: number) {
    const community = await this.communityRepository.findOne(id, {
      relations: ['admin'],
      loadRelationIds: true,
    });
    if (!community) {
      throw new NotFoundException(`Community not found with id ${id}`);
    }
    return community;
  }

  async findAll() {
    return this.communityRepository.find({
      relations: ['admin'],
      loadRelationIds: true,
    });
  }

  async update(
    id: number,
    updateCommunityDto: UpdateCommunityDto,
    requestUser: any,
  ) {
    this.findOne(id);

    await this.validateUserIsAdminFromCommunity(requestUser.id, id);

    if (updateCommunityDto.email) {
      await this.checkEmailAvailability(updateCommunityDto.email);
    }

    await this.communityRepository.update({ id }, updateCommunityDto);
    return this.communityRepository.findOne(id);
  }

  async remove(id: number, requestUser: any) {
    this.findOne(id);

    await this.validateUserIsAdminFromCommunity(requestUser.id, id);

    await this.communityRepository.delete(id);
    return { message: `Community ${id} deleted successfully` };
  }

  async addUser(
    id: number,
    userReferenceDto: UserReferenceDto,
    requestUser: any,
  ) {
    await this.validateUserIsAdminFromCommunity(requestUser.id, id);

    const user = await this.fetchUser(userReferenceDto);

    if (user.community != undefined) {
      throw new BadRequestException(
        `User ${user.id} takes part in a community already!`,
      );
    }

    user.community = await this.communityRepository.findOne({ id: id });
    await getRepository(User).save(user);
    return { message: 'success' };
  }

  async removeUser(
    id: number,
    userReferenceDto: UserReferenceDto,
    requestUser: any,
  ) {
    await this.validateUserIsAdminFromCommunity(requestUser.id, id);

    const user = await this.fetchUser(userReferenceDto);

    if (user.community == undefined || user.community.id != id) {
      throw new BadRequestException(
        `User ${user.id} does not belong to the community ${id}`,
      );
    }

    user.community = null;
    await getRepository(User).save(user);
    return { message: 'success' };
  }

  async members(id: number) {
    const userRepository = getRepository(User);
    return await userRepository.find({
      select: ['id', 'name', 'nickname'],
      where: {
        community: { id: id },
      },
    });
  }

  async fetchUser(userReferenceDto: UserReferenceDto) {
    let user = undefined;
    const userRepository = getRepository(User);
    if (userReferenceDto.id) {
      user = await userRepository.findOne(
        { id: userReferenceDto.id },
        { relations: ['community'] },
      );
    } else if (userReferenceDto.email) {
      user = await userRepository.findOne(
        { email: userReferenceDto.email },
        { relations: ['community'] },
      );
    } else if (userReferenceDto.nickname) {
      user = await userRepository.findOne(
        { nickname: userReferenceDto.nickname },
        { relations: ['community'] },
      );
    } else {
      throw new NotFoundException(
        `No user was found with attributes id: ${userReferenceDto.id}, email: ${userReferenceDto.email}, nickname: ${userReferenceDto.nickname}`,
      );
    }
    return user;
  }

  async validateUserIsAdminFromCommunity(userId: number, communityId: number) {
    const userIsAdmin = await this.communityRepository.findOne({
      id: communityId,
      admin: {
        id: userId,
      },
    });
    if (!userIsAdmin) {
      throw new UnauthorizedException(
        `User ${userId} is not admin from community ${communityId}`,
      );
    }
  }

  async checkEmailAvailability(email: string) {
    const emailTaken = await this.communityRepository.findOne({
      email: email,
    });
    if (emailTaken) {
      throw new BadRequestException(
        `There already is a community with email ${email}`,
      );
    }
  }
}
