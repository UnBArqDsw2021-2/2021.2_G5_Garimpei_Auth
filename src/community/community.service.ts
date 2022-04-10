import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { getRepository, Repository } from "typeorm";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { Community } from "./entities/community.entity";

@Injectable()
export class CommunityService {
    constructor(
        @InjectRepository(Community)
        private readonly communityRepository: Repository<Community>,
    ) {}

    async create(createCommunityDto: CreateCommunityDto) {
        await this.checkEmailAvailability(createCommunityDto.email);

        const userExists = await getRepository(User).findOne(createCommunityDto.admin.id);
        if (!userExists) {
            throw new NotFoundException(`There is no User with id: ${createCommunityDto.admin.id}`);
        }

        const userIsAdminAlready = await this.communityRepository.findOne({
            where: {
                admin: {id: createCommunityDto.admin.id}
            }
        });
        if (userIsAdminAlready) {
            throw new BadRequestException(`The user ${createCommunityDto.admin.id} is an admin from other community`);
        }

        const community = this.communityRepository.create(createCommunityDto);
        return this.communityRepository.save(community);
    }

    async findOne(id: number) {
        const community = await this.communityRepository.findOne(id, {
            relations: ["admin"],
            loadRelationIds: true,
        });
        if (!community) {
            throw new NotFoundException(`Community not found with id ${id}`);
        }
        return community;
    }

    async findAll() {
        return this.communityRepository.find({
            relations: ["admin"],
            loadRelationIds: true,
        });
    }

    async update(id: number, updateCommunityDto: UpdateCommunityDto) {
        this.findOne(id);

        if (updateCommunityDto.email) {
            await this.checkEmailAvailability(updateCommunityDto.email);
        }

        await this.communityRepository.update({ id }, updateCommunityDto);
        return this.communityRepository.findOne(id);
    }

    async remove(id: number) {
        this.findOne(id);
        await this.communityRepository.delete(id);
        return { message: `Community ${id} deleted successfully` };
    }

    async checkEmailAvailability(email: string) {
        const emailTaken = await this.communityRepository.findOne({
            email: email
        });
        if (emailTaken) {
            throw new BadRequestException(`There already is a community with email ${email}`);
        }
    }
}