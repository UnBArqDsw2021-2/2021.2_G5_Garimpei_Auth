import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
        const emailTaken = await this.communityRepository.findOne({
            email: createCommunityDto.email
        })
        const userIsAdminAlready = await this.communityRepository.createQueryBuilder()
            .where("Community.adminId = :adminId", {adminId: createCommunityDto.adminId})
            .execute();

        if (emailTaken) {
            throw new BadRequestException(`There already is a community with email ${createCommunityDto.email}`);
        }
        else if (userIsAdminAlready.length > 0) {
            console.log(userIsAdminAlready)
            throw new BadRequestException(`The user ${createCommunityDto.adminId} is an admin from other community`);
        }
        const community = this.communityRepository.create(createCommunityDto);
        return this.communityRepository.save(community);
    }

    async findOne(id: number) {
        const community = await this.communityRepository.findOne(id);
        if (!community) {
            throw new NotFoundException(`Community not found with id ${id}`);
        }
        return community;
    }

    async update(id: number, updateCommunityDto: UpdateCommunityDto) {
        this.findOne(id);
        await this.communityRepository.update({ id }, updateCommunityDto);
        return this.communityRepository.findOne(id);
    }

    async remove(id: number) {
        this.findOne(id);
        await this.communityRepository.delete(id);
        return { message: `Community ${id} deleted successfully` };
    }
}